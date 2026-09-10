// Kana Sprint optional learning enhancements
state.settings=state.settings||{};
state.settings.romajiMode=state.settings.romajiMode||'auto';
save();

function cleanRomajiText(text){
  return String(text||'')
    .replace(/\([^)]*[A-Za-z][^)]*\)/g,'')
    .replace(/\b[A-Za-z][A-Za-z·\- ]{1,}\b/g,'')
    .replace(/\s{2,}/g,' ')
    .replace(/。\s*。/g,'。')
    .trim();
}

function adaptiveRomajiVisible(q,wasCorrect){
  const mode=state.settings.romajiMode||'auto';
  if(mode==='always')return true;
  if(mode==='minimal')return !wasCorrect;
  if(!wasCorrect)return true;
  const st=state.items?.[q.key]||{right:0,wrong:0};
  if((state.sessions||0)<5)return true;
  if((st.right||0)<3)return true;
  const accuracy=(st.right||0)/Math.max(1,(st.right||0)+(st.wrong||0));
  if(accuracy<0.8)return true;
  return false;
}

const baseAnswer=answer;
answer=function(btn,val,q){
  const ok=val===q.answer;
  baseAnswer(btn,val,q);
  if(!adaptiveRomajiVisible(q,ok)){
    const span=$('#feedback span');
    if(span){
      const cleaned=cleanRomajiText(span.textContent);
      if(cleaned)span.textContent=cleaned+'  · 已减少罗马音提示';
    }
  }
};

function questionForKey(key){
  if(!key)return null;
  const v=VOCAB.find(x=>x.j===key); if(v)return vocabQ(v);
  const c=typeof CHUNKS!=='undefined'?CHUNKS.find(x=>x.j===key):null; if(c&&typeof chunkQ==='function')return chunkQ(c);
  const p=PATTERNS.find(x=>x.key===key); if(p)return {...p,options:shuffle(p.options),sub:'错题回炉：先想规则，再选答案。'};
  const cf=CONF.find(x=>x[0]===key);
  if(cf){const [j,r,ds]=cf;return{key:j,type:'错题复习 · 易混字',prompt:`「${j}」怎么读？`,sub:'这是你之前容易卡住的字符。',answer:r,options:shuffle([r,...ds.map(d=>KANA.find(x=>x[0]===d)?.[1]||d)]),note:`${j} = ${r}。再对照：${[j,...ds].join(' / ')}`}}
  if(key.startsWith('scene:')){const ctx=key.slice(6),s=SCENES.find(x=>x.ctx===ctx);if(s)return{key,type:'错题复习 · 真实场景',context:s.ctx,prompt:s.p,sub:'重新放回真实语境里判断。',answer:s.a,options:shuffle([s.a,...s.o]),note:s.note}}
  return null;
}

function getReviewKeys(){
  const now=today();
  return Object.entries(state.items||{})
    .filter(([,s])=>(s.wrong||0)>0 || (s.due&&s.due<=now))
    .sort((a,b)=>{
      const sa=a[1],sb=b[1];
      const aDue=sa.due&&sa.due<=now?2:0,bDue=sb.due&&sb.due<=now?2:0;
      const aRate=(sa.wrong||0)/Math.max(1,(sa.right||0)+(sa.wrong||0));
      const bRate=(sb.wrong||0)/Math.max(1,(sb.right||0)+(sb.wrong||0));
      return (bDue+(sb.wrong||0)*.35+bRate)-(aDue+(sa.wrong||0)*.35+aRate);
    })
    .map(([k])=>k);
}

const baseBuildQueue=buildQueue;
buildQueue=function(m){
  if(m!=='review')return baseBuildQueue(m);
  const keys=getReviewKeys();
  let q=keys.map(questionForKey).filter(Boolean).slice(0,15);
  if(!q.length){
    q=shuffle([...Array.from({length:4},kanaQ),...Array.from({length:3},patternQ),...sample(VOCAB,4).map(v=>vocabQ(v))]).slice(0,10);
    q.forEach(x=>x.type='预防性复习 · '+x.type);
  }
  return q;
};

const baseUpdateHome=updateHome;
updateHome=function(){
  baseUpdateHome();
  const keys=getReviewKeys();
  const badge=$('#reviewBadge'),copy=$('#reviewCopy');
  if(badge)badge.textContent=keys.length;
  if(copy)copy.textContent=keys.length?`有 ${keys.length} 个错题/到期项目，优先从最薄弱的开始`:'目前没有积压错题，可以做一轮预防性复习';
};

function sceneMeta(ctx=''){
  const rules=[
    [/机场|ゲート|チェックインカウンター|シャトルバス/,['AIRPORT','机场','AIR']],
    [/酒店|房间|前台|大堂|ランドリー|モーニングコール|Wi-Fi/,['HOTEL','酒店','HOTEL']],
    [/便利店|收银|商店|百货|礼品|店内|饮料区/,['SHOP','商店 / 便利店','SHOP']],
    [/餐厅|咖啡|菜单|トッピング/,['FOOD','餐厅 / 咖啡店','FOOD']],
    [/地铁|站内|车站|ホーム/,['STATION','车站','STATION']],
    [/高速|租车|レンタカー/,['ROAD','道路 / 交通','ROAD']],
    [/手机|网页|アップデート|ログイン|バッテリー/,['SCREEN','手机 / 网页','SCREEN']]
  ];
  for(const [re,v] of rules)if(re.test(ctx))return v;
  return ['SCENE','真实场景','GENERIC'];
}

function splitSceneContext(ctx=''){
  const m=ctx.match(/^([^：:]{1,14})[：:]\s*(.+)$/);
  return m?{where:m[1],focus:m[2]}:{where:'',focus:ctx};
}

function renderSceneCard(q){
  const box=$('#context');
  if(!box||!q?.context||!String(q.type||'').includes('场景'))return;
  const [code,label,kind]=sceneMeta(q.context);
  const {where,focus}=splitSceneContext(q.context);
  box.className='context scene-context scene-'+kind.toLowerCase();
  box.innerHTML=`<div class="scene-topline"><span class="scene-mark">◉</span><span class="scene-label">${label}</span><span class="scene-code">${code}</span></div>${where?`<div class="scene-where">${where}</div>`:''}<div class="scene-focus">${focus}</div>`;
}

const baseRenderQEnhancement=renderQ;
renderQ=function(){
  baseRenderQEnhancement();
  const q=queue[idx];
  renderSceneCard(q);
};

const select=$('#romajiMode');
if(select){
  select.value=state.settings.romajiMode;
  select.onchange=()=>{
    state.settings.romajiMode=select.value;save();
    const msg={auto:'自动模式：前期多显示；熟练项目答对后逐步隐藏；答错仍显示。',always:'始终显示：每次反馈都保留罗马音，适合巩固阶段。',minimal:'尽量隐藏：答对时隐藏辅助罗马音，答错时再显示。'};
    $('#romajiExplain').textContent=msg[select.value];
  };
  select.onchange();
}

// Keep learning history as the closing section of the home screen.
(function moveStudySummaryToBottom(){
  const summary=document.querySelector('.study-summary');
  const settings=document.querySelector('.settings-card');
  if(summary&&settings&&settings.parentNode){settings.insertAdjacentElement('afterend',summary)}
})();

updateHome();