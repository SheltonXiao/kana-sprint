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
function renderStudySummary(){
  const history=new Set(state.studyHistory||[]),attempts=totalAttempts(),rights=totalRight();
  const byId=id=>document.getElementById(id);
  if(byId('studyDays'))byId('studyDays').textContent=history.size;
  if(byId('currentStreak'))byId('currentStreak').textContent=state.streak||0;
  if(byId('longestStreak'))byId('longestStreak').textContent=Math.max(state.longestStreak||0,state.streak||0);
  if(byId('totalSessions'))byId('totalSessions').textContent=state.sessions||0;
  if(byId('totalAnswers'))byId('totalAnswers').textContent=attempts;
  if(byId('overallAccuracy'))byId('overallAccuracy').textContent=attempts?Math.round(rights/attempts*100)+'%':'—';
  const week=byId('weekCheckins');
  if(week){
    week.innerHTML='';
    for(let i=6;i>=0;i--){
      const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-i);
      const hit=history.has(fmtDate(d));
      const el=document.createElement('div');el.className='day-dot '+(hit?'done':'');
      el.innerHTML=`<span>${weekdayCN(d)}</span><b>${d.getDate()}</b>`;
      week.appendChild(el);
    }
  }
  const note=byId('summaryNote');
  if(note){
    if((state.streak||0)>=7)note.textContent='已经连续学习一周以上';
    else if((state.streak||0)>=3)note.textContent='连续节奏正在形成';
    else if(history.size)note.textContent='保持轻量但持续的练习';
    else note.textContent='从今天开始记录';
  }
}

const updateHomeBeforeSummary=updateHome;
updateHome=function(){updateHomeBeforeSummary();renderStudySummary()};
renderStudySummary();
