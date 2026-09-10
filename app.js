const KANA=[
['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o'],['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko'],['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so'],['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to'],['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no'],['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho'],['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo'],['ヤ','ya'],['ユ','yu'],['ヨ','yo'],['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro'],['ワ','wa'],['ヲ','wo'],['ン','n']];
const CONF=[['シ','shi',['ツ','ソ','ン']],['ツ','tsu',['シ','ソ','ン']],['ソ','so',['ン','シ','ツ']],['ン','n',['ソ','シ','ツ']],['ク','ku',['ケ','ワ','タ']],['ケ','ke',['ク','サ','チ']],['ヌ','nu',['ス','メ','ネ']],['ス','su',['ヌ','フ','ワ']],['ワ','wa',['ウ','ク','フ']],['ウ','u',['ワ','フ','ク']],['マ','ma',['ム','ア','ヤ']],['ム','mu',['マ','ヌ','ス']]];
const VOCAB=[
{j:'ホテル',r:'hoteru',c:'酒店',src:'hotel',cat:'旅行'}, {j:'タクシー',r:'takushii',c:'出租车',src:'taxi',cat:'交通'}, {j:'バス',r:'basu',c:'公交/巴士',src:'bus',cat:'交通'}, {j:'ホーム',r:'hoomu',c:'站台',src:'platform（铁路语境）',cat:'车站'}, {j:'エレベーター',r:'erebeetaa',c:'电梯',src:'elevator',cat:'车站'}, {j:'エスカレーター',r:'esukareetaa',c:'自动扶梯',src:'escalator',cat:'车站'}, {j:'トイレ',r:'toire',c:'洗手间',src:'toilet',cat:'生活'}, {j:'コンビニ',r:'konbini',c:'便利店',src:'convenience store',cat:'购物'}, {j:'スーパー',r:'suupaa',c:'超市',src:'supermarket',cat:'购物'}, {j:'レジ',r:'reji',c:'收银台',src:'register',cat:'购物'},
{j:'メニュー',r:'menyuu',c:'菜单',src:'menu',cat:'餐饮'}, {j:'レストラン',r:'resutoran',c:'餐厅',src:'restaurant',cat:'餐饮'}, {j:'コーヒー',r:'koohii',c:'咖啡',src:'coffee',cat:'餐饮'}, {j:'サンドイッチ',r:'sandoicchi',c:'三明治',src:'sandwich',cat:'餐饮'}, {j:'デザート',r:'dezaato',c:'甜点',src:'dessert',cat:'餐饮'}, {j:'アイス',r:'aisu',c:'冰淇淋/冰品',src:'ice / ice cream',cat:'餐饮'}, {j:'ジュース',r:'juusu',c:'果汁/软饮',src:'juice',cat:'餐饮'}, {j:'ビール',r:'biiru',c:'啤酒',src:'beer',cat:'餐饮'}, {j:'チーズ',r:'chiizu',c:'芝士',src:'cheese',cat:'餐饮'}, {j:'バター',r:'bataa',c:'黄油',src:'butter',cat:'餐饮'},
{j:'クリーム',r:'kuriimu',c:'奶油',src:'cream',cat:'餐饮'}, {j:'ケーキ',r:'keeki',c:'蛋糕',src:'cake',cat:'餐饮'}, {j:'チョコレート',r:'chokoreeto',c:'巧克力',src:'chocolate',cat:'餐饮'}, {j:'ハンバーガー',r:'hanbaagaa',c:'汉堡',src:'hamburger',cat:'餐饮'}, {j:'フライドポテト',r:'furaido poteto',c:'薯条',src:'fried potato',cat:'餐饮'}, {j:'セット',r:'setto',c:'套餐/套装',src:'set',cat:'餐饮'}, {j:'サイズ',r:'saizu',c:'尺寸/杯型',src:'size',cat:'购物'}, {j:'テイクアウト',r:'teikuauto',c:'外带',src:'take out',cat:'餐饮'}, {j:'サービス',r:'saabisu',c:'服务/赠送',src:'service',cat:'生活'}, {j:'スタッフ',r:'sutaffu',c:'工作人员',src:'staff',cat:'生活'},
{j:'カード',r:'kaado',c:'卡/银行卡',src:'card',cat:'购物'}, {j:'クレジットカード',r:'kurejitto kaado',c:'信用卡',src:'credit card',cat:'购物'}, {j:'ポイント',r:'pointo',c:'积分/点数',src:'point',cat:'购物'}, {j:'セール',r:'seeru',c:'促销',src:'sale',cat:'购物'}, {j:'チケット',r:'chiketto',c:'票',src:'ticket',cat:'旅行'}, {j:'ロッカー',r:'rokkaa',c:'储物柜',src:'locker',cat:'旅行'}, {j:'コインロッカー',r:'koin rokkaa',c:'投币储物柜',src:'coin locker',cat:'旅行'}, {j:'インフォメーション',r:'infomeeshon',c:'问讯处/信息',src:'information',cat:'旅行'}, {j:'チェックイン',r:'chekkuin',c:'办理入住/值机',src:'check-in',cat:'旅行'}, {j:'チェックアウト',r:'chekkuauto',c:'退房',src:'check-out',cat:'旅行'},
{j:'フロント',r:'furonto',c:'酒店前台',src:'front desk',cat:'酒店'}, {j:'ルーム',r:'ruumu',c:'房间',src:'room',cat:'酒店'}, {j:'シングル',r:'shinguru',c:'单人房/单人规格',src:'single',cat:'酒店'}, {j:'ダブル',r:'daburu',c:'双人床/双倍',src:'double',cat:'酒店'}, {j:'キャンセル',r:'kyanseru',c:'取消',src:'cancel',cat:'旅行'}, {j:'予約',r:'yoyaku',c:'预约',src:'※汉字词，不是片假名',cat:'旅行'}, {j:'スマホ',r:'sumaho',c:'智能手机',src:'smartphone（缩略）',cat:'科技'}, {j:'パソコン',r:'pasokon',c:'电脑',src:'personal computer（缩略）',cat:'科技'}, {j:'コンセント',r:'konsento',c:'电源插座',src:'concentric plug → 日语独特用法',cat:'科技'}, {j:'カメラ',r:'kamera',c:'相机',src:'camera',cat:'科技'},
{j:'テレビ',r:'terebi',c:'电视',src:'television（缩略）',cat:'科技'}, {j:'リモコン',r:'rimokon',c:'遥控器',src:'remote control（缩略）',cat:'科技'}, {j:'エアコン',r:'eakon',c:'空调',src:'air conditioner（缩略）',cat:'生活'}, {j:'ドア',r:'doa',c:'门',src:'door',cat:'生活'}, {j:'シャワー',r:'shawaa',c:'淋浴',src:'shower',cat:'生活'}, {j:'タオル',r:'taoru',c:'毛巾',src:'towel',cat:'生活'}, {j:'スリッパ',r:'surippa',c:'拖鞋',src:'slipper',cat:'生活'}, {j:'ベッド',r:'beddo',c:'床',src:'bed',cat:'酒店'}, {j:'ドリンク',r:'dorinku',c:'饮料',src:'drink',cat:'餐饮'}, {j:'ランチ',r:'ranchi',c:'午餐',src:'lunch',cat:'餐饮'}
];
const SCENES=[
{ctx:'东京地铁站内标识',p:'「エレベーター」最可能指什么？',a:'电梯',o:['自动扶梯','出口','检票口'],note:'东京 Metro 的车站无障碍页面实际使用 エレベーター。'},
{ctx:'东京地铁站内标识',p:'「エスカレーター（上り）」是什么意思？',a:'上行自动扶梯',o:['上行电梯','楼梯入口','上行列车'],note:'（上り）表示向上运行。'},
{ctx:'站内指示：ホーム（中央）～改札',p:'这里的「ホーム」是什么？',a:'站台',o:['大厅','酒店','家'],note:'铁路语境的 ホーム 不是“家”，而是 platform。'},
{ctx:'便利店结账时店员问：ポイントカードはありますか？',p:'「ポイントカード」是什么？',a:'积分卡',o:['信用卡','车票','菜单'],note:'point + card，在商店极常见。'},
{ctx:'咖啡店菜单：アイスコーヒー / ホットコーヒー',p:'想喝冰咖啡应选？',a:'アイスコーヒー',o:['ホットコーヒー','コーヒーゼリー','ミルク'],note:'アイス 常表示 iced / ice cream，结合商品判断。'},
{ctx:'酒店大堂：フロントはこちら',p:'应该往哪里走？',a:'酒店前台',o:['浴室','餐厅','车站月台'],note:'ホテル语境下 フロント = front desk。'},
{ctx:'餐厅菜单：ランチセット 1,200円',p:'最合理的理解是？',a:'午餐套餐 1200 日元',o:['午餐单品 120 日元','晚餐套餐 1200 日元','房间服务 1200 日元'],note:'ランチ + セット 都是高频外来语。'},
{ctx:'车站：コインロッカー →',p:'这个箭头指向什么？',a:'投币储物柜',o:['售票机','自动贩卖机','卫生间'],note:'旅行时非常实用。'},
{ctx:'店门口：テイクアウト OK',p:'这家店支持什么？',a:'外带',o:['预约','刷卡','免税'],note:'テイクアウト = takeout。'},
{ctx:'酒店：チェックアウト 11:00',p:'11:00 是什么时间？',a:'退房时间',o:['入住时间','早餐时间','门禁时间'],note:'check-out 直接音译。'},
{ctx:'电器附近：コンセント',p:'你应该找什么？',a:'电源插座',o:['电脑','转换器','遥控器'],note:'这是很典型的“知道英文也猜不出”的和制/日式外来语。'},
{ctx:'房间说明：エアコンのリモコン',p:'指的是什么？',a:'空调遥控器',o:['电视遥控器','空调插座','房间电话'],note:'エアコン = air conditioner；リモコン = remote control。'}
];

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let state=JSON.parse(localStorage.getItem('kanaSprintState')||'null')||{xp:0,streak:0,lastDate:null,doneToday:0,items:{},sessions:0};
let queue=[],idx=0,correct=0,wrong=[],mode='daily',answered=false;
const today=()=>new Date().toLocaleDateString('en-CA');
function save(){localStorage.setItem('kanaSprintState',JSON.stringify(state))}
function itemStat(key){return state.items[key]||(state.items[key]={right:0,wrong:0,box:0,due:today()})}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function sample(a,n){return shuffle(a).slice(0,n)}
function distract(correctVal,pool,n=3){return sample(pool.filter(x=>x!==correctVal),n)}
function show(id){$$('.screen').forEach(x=>x.classList.remove('active'));$('#'+id).classList.add('active');scrollTo(0,0)}
function updateHome(){
 $('#xp').textContent=state.xp; $('#streak').textContent=state.streak; $('#dailyProgress').style.width=Math.min(100,state.doneToday/15*100)+'%';
 const stats=Object.values(state.items), attempts=stats.reduce((a,x)=>a+x.right+x.wrong,0), rights=stats.reduce((a,x)=>a+x.right,0); $('#mastery').textContent=(attempts?Math.round(rights/attempts*100):0)+'%';
 const due=Object.values(state.items).filter(x=>x.due<=today()).length; $('#dueCount').textContent='复习 '+due;
 const weak=Object.entries(state.items).sort((a,b)=>((b[1].wrong+1)/(b[1].right+b[1].wrong+2))-((a[1].wrong+1)/(a[1].right+a[1].wrong+2))).slice(0,6).map(x=>x[0]);
 $('#weakList').innerHTML=(weak.length?weak:['シ / ツ','ソ / ン','コンセント','ホーム']).map(x=>`<span class="chip">${x}</span>`).join('');
}
function kanaQ(){const [j,r,ds]=CONF[Math.floor(Math.random()*CONF.length)]; return {key:j,type:'易混速辨',prompt:`「${j}」怎么读？`,sub:'不要靠慢慢描笔画，训练第一眼反应。',answer:r,options:shuffle([r,...ds.map(d=>KANA.find(x=>x[0]===d)?.[1]||d)]),note:`${j} = ${r}。易混组：${[j,...ds].join(' / ')}`}}
function vocabQ(v=VOCAB[Math.floor(Math.random()*VOCAB.length)]){const reverse=Math.random()<.28;if(reverse){return{key:v.j,type:`${v.cat} · 反向识别`,prompt:`“${v.c}”是哪一个？`,sub:'从意思反推片假名。',answer:v.j,options:shuffle([v.j,...distract(v.j,VOCAB.map(x=>x.j))]),note:`${v.j} · ${v.r} · ${v.c}。词源：${v.src}`}}return{key:v.j,type:`${v.cat} · 外来语`,prompt:`${v.j}`,sub:'看到这个词，你能直接理解吗？',answer:v.c,options:shuffle([v.c,...distract(v.c,VOCAB.map(x=>x.c))]),note:`读作 ${v.r}。词源/联想：${v.src}`}}
function sceneQ(){const s=SCENES[Math.floor(Math.random()*SCENES.length)];return{key:'scene:'+s.p,type:'真实场景',context:s.ctx,prompt:s.p,sub:'按在日本现场看到它时的实际含义回答。',answer:s.a,options:shuffle([s.a,...s.o]),note:s.note}}
function speedQ(){if(Math.random()<.55)return kanaQ();return vocabQ()}
function buildQueue(m){mode=m; let q=[];if(m==='confuse')q=Array.from({length:15},kanaQ);else if(m==='vocab')q=sample(VOCAB,15).map(v=>vocabQ(v));else if(m==='scene')q=Array.from({length:12},sceneQ);else if(m==='speed')q=Array.from({length:20},speedQ);else{
 const dueKeys=Object.entries(state.items).filter(([,v])=>v.due<=today()).map(([k])=>k); const dueV=VOCAB.filter(v=>dueKeys.includes(v.j)).slice(0,5).map(v=>vocabQ(v));
 q=[...dueV,...Array.from({length:4},kanaQ),...sample(VOCAB,6).map(v=>vocabQ(v)),...Array.from({length:5},sceneQ)]; q=shuffle(q).slice(0,15);
 } return q}
function start(m='daily'){queue=buildQueue(m);idx=0;correct=0;wrong=[];show('quiz');renderQ()}
function renderQ(){answered=false;const q=queue[idx];$('#qType').textContent=q.type;$('#context').textContent=q.context||'';$('#prompt').textContent=q.prompt;$('#subprompt').textContent=q.sub||'';$('#quizCounter').textContent=`${idx+1}/${queue.length}`;$('#quizProgress').style.width=(idx/queue.length*100)+'%';$('#feedback').className='feedback hidden';$('#next').classList.add('hidden');$('#options').innerHTML='';q.options.forEach(o=>{const b=document.createElement('button');b.className='option';b.textContent=o;b.onclick=()=>answer(b,o,q);$('#options').appendChild(b)})}
function schedule(st,ok){if(ok){st.box=Math.min(5,(st.box||0)+1);const days=[0,1,3,7,14,30][st.box];const d=new Date();d.setDate(d.getDate()+days);st.due=d.toLocaleDateString('en-CA')}else{st.box=0;st.due=today()}}
function answer(btn,val,q){if(answered)return;answered=true;const ok=val===q.answer;const st=itemStat(q.key); if(ok){correct++;st.right++;btn.classList.add('correct')}else{st.wrong++;wrong.push(q.key);btn.classList.add('wrong');$$('.option').find(x=>x.textContent===q.answer)?.classList.add('correct')}schedule(st,ok);$$('.option').forEach(x=>x.disabled=true);const f=$('#feedback');f.className='feedback '+(ok?'ok':'no');f.innerHTML=`<b>${ok?'✓ 很好':'✗ 正确答案：'+q.answer}</b>${q.note||''}`;$('#next').classList.remove('hidden');save()}
function finish(){const pct=Math.round(correct/queue.length*100), earned=correct*7+(pct===100?25:0);state.xp+=earned;state.sessions++;if(mode==='daily'){state.doneToday=Math.max(state.doneToday,queue.length);const t=today();if(state.lastDate!==t){const y=new Date();y.setDate(y.getDate()-1);const ys=y.toLocaleDateString('en-CA');state.streak=state.lastDate===ys?state.streak+1:1;state.lastDate=t}}
save();$('#scorePct').textContent=pct+'%';$('#earnedXp').textContent='+'+earned;$('#wrongCount').textContent=new Set(wrong).size;$('#resultTitle').textContent=pct>=90?'片假名反应很稳！':pct>=75?'不错，继续压缩反应时间':'薄弱项已经抓到了';$('#resultText').textContent=wrong.length?`这轮有 ${new Set(wrong).size} 个项目会被提前安排复习。`:'本轮全对，复习间隔会自动拉长。';show('result')}
$('#next').onclick=()=>{idx++;idx>=queue.length?finish():renderQ()};$('#startDaily').onclick=()=>start('daily');$$('.mode[data-mode]').forEach(b=>b.onclick=()=>start(b.dataset.mode));$('#quit').onclick=()=>{show('home');updateHome()};$('#backHome').onclick=()=>{show('home');updateHome()};
if(state.lastOpen!==today()){state.doneToday=0;state.lastOpen=today();save()}updateHome();

const KANA_ROWS=[
[['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o']],
[['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko']],
[['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so']],
[['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to']],
[['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no']],
[['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho']],
[['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo']],
[['ヤ','ya'],null,['ユ','yu'],null,['ヨ','yo']],
[['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro']],
[['ワ','wa'],null,null,null,['ヲ','wo']],
[null,null,null,null,['ン','n']]
];
let romajiShown=true;
function renderChart(){
  $('#kanaChart').innerHTML=KANA_ROWS.flat().map(x=>{
    if(!x)return '<div class="kana-cell empty"></div>';
    return `<button class="kana-cell${romajiShown?'':' hide-romaji'}"><b>${x[0]}</b><small>${x[1]}</small></button>`;
  }).join('');
  $$('.kana-cell:not(.empty)').forEach(cell=>cell.onclick=()=>cell.classList.toggle('hide-romaji'));
  $('#toggleRomaji').textContent=romajiShown?'隐藏全部读音':'显示全部读音';
}
$('#openChart').onclick=()=>{renderChart();show('chart')};
$('#closeChart').onclick=()=>show('home');
$('#toggleRomaji').onclick=()=>{romajiShown=!romajiShown;renderChart()};
