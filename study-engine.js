// Study history + recent-question rotation
state.studyHistory=Array.isArray(state.studyHistory)?state.studyHistory:[];
state.longestStreak=state.longestStreak||state.streak||0;
state.recentQuestionKeys=Array.isArray(state.recentQuestionKeys)?state.recentQuestionKeys:[];
if(state.lastDate&&!state.studyHistory.includes(state.lastDate))state.studyHistory.push(state.lastDate);
save();

function qSignature(q){return q?.key||`${q?.type||''}:${q?.prompt||''}`}

const buildQueueBeforeRotation=buildQueue;
buildQueue=function(m){
  if(m==='review')return buildQueueBeforeRotation(m);
  const recent=new Set((state.recentQuestionKeys||[]).slice(-36));
  let pool=[],attempt=0;
  while(pool.length<15&&attempt<6){
    const candidate=buildQueueBeforeRotation(m);
    for(const q of candidate){
      const sig=qSignature(q);
      if(!recent.has(sig)&&!pool.some(x=>qSignature(x)===sig))pool.push(q);
      if(pool.length>=candidate.length)break;
    }
    attempt++;
  }
  if(!pool.length)pool=buildQueueBeforeRotation(m);
  const target=m==='speed'?20:(m==='scene'?12:15);
  return pool.slice(0,target);
};

const renderQBeforeHistory=renderQ;
renderQ=function(){
  renderQBeforeHistory();
  const q=queue[idx];
  if(q){
    const sig=qSignature(q);
    state.recentQuestionKeys=(state.recentQuestionKeys||[]).filter(x=>x!==sig);
    state.recentQuestionKeys.push(sig);
    state.recentQuestionKeys=state.recentQuestionKeys.slice(-60);
    save();
  }
};

const finishBeforeSummary=finish;
finish=function(){
  const t=today();
  if(!state.studyHistory.includes(t))state.studyHistory.push(t);
  state.studyHistory=state.studyHistory.sort().slice(-365);
  finishBeforeSummary();
  state.longestStreak=Math.max(state.longestStreak||0,state.streak||0);
  save();
  renderStudySummary();
};

function totalAttempts(){return Object.values(state.items||{}).reduce((n,s)=>n+(s.right||0)+(s.wrong||0),0)}
function totalRight(){return Object.values(state.items||{}).reduce((n,s)=>n+(s.right||0),0)}
function fmtDate(d){return d.toLocaleDateString('en-CA')}
function weekdayCN(d){return ['日','一','二','三','四','五','六'][d.getDay()]}
function startOfWeekMonday(base=new Date()){
  const d=new Date(base);d.setHours(12,0,0,0);
  const day=d.getDay();
  d.setDate(d.getDate()-(day===0?6:day-1));
  return d;
}
function humanDate(d){return `${d.getMonth()+1}/${d.getDate()}`}

function friendlyWeakLabel(key){
  if(!key)return '';
  if(key.startsWith('chunk:'))return key.slice(6)+' · 拆词';
  if(key.startsWith('scene:')){
    const raw=key.slice(6);
    const s=typeof SCENES!=='undefined'?SCENES.find(x=>x.ctx===raw):null;
    if(s){
      const focus=(s.ctx.split(/[:：]/).slice(1).join('：')||s.ctx).trim();
      return (focus.length>18?focus.slice(0,18)+'…':focus)+' · 场景';
    }
    return (raw.length>18?raw.slice(0,18)+'…':raw)+' · 场景';
  }
  return key;
}
function renderFriendlyWeakLabels(){
  const wrap=document.getElementById('weakList');
  if(!wrap)return;
  [...wrap.children].forEach(el=>{el.textContent=friendlyWeakLabel(el.textContent)});
}

function renderStudySummary(){
  const history=new Set(state.studyHistory||[]),attempts=totalAttempts(),rights=totalRight();
  const byId=id=>document.getElementById(id);
  if(byId('studyDays'))byId('studyDays').textContent=history.size;
  if(byId('currentStreak'))byId('currentStreak').textContent=state.streak||0;
  if(byId('totalAnswers'))byId('totalAnswers').textContent=attempts;
  if(byId('overallAccuracy'))byId('overallAccuracy').textContent=attempts?Math.round(rights/attempts*100)+'%':'—';

  const week=byId('weekCheckins');
  if(week){
    week.innerHTML='';
    const monday=startOfWeekMonday();
    const sunday=new Date(monday);sunday.setDate(monday.getDate()+6);
    const range=byId('weekRange');
    if(range)range.textContent=`${humanDate(monday)} – ${humanDate(sunday)}`;
    for(let i=0;i<7;i++){
      const d=new Date(monday);d.setDate(monday.getDate()+i);
      const dateKey=fmtDate(d),hit=history.has(dateKey),isToday=dateKey===today();
      const el=document.createElement('div');
      el.className='day-dot '+(hit?'done ':'')+(isToday?'today':'');
      el.innerHTML=`<span>周${weekdayCN(d)}</span><b>${hit?'✓':d.getDate()}</b>${isToday?'<small>TODAY</small>':''}`;
      week.appendChild(el);
    }
  }

  const note=byId('summaryNote');
  if(note){
    if((state.streak||0)>=7)note.textContent='本周节奏很稳';
    else if((state.streak||0)>=3)note.textContent='连续学习正在形成';
    else if(history.size)note.textContent='保持轻量、持续就好';
    else note.textContent='从今天开始记录';
  }
}

const updateHomeBeforeSummary=updateHome;
updateHome=function(){updateHomeBeforeSummary();renderFriendlyWeakLabels();renderStudySummary()};
renderFriendlyWeakLabels();
renderStudySummary();
