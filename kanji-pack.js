// Advanced practical kanji reading pack
const KANJI_WORDS=[
{k:'改札',y:'かいさつ',c:'检票口',cat:'车站'},
{k:'出口',y:'でぐち',c:'出口',cat:'标识'},
{k:'入口',y:'いりぐち',c:'入口',cat:'标识'},
{k:'予約',y:'よやく',c:'预约',cat:'通用'},
{k:'無料',y:'むりょう',c:'免费',cat:'标识'},
{k:'有料',y:'ゆうりょう',c:'收费',cat:'标识'},
{k:'禁煙',y:'きんえん',c:'禁烟',cat:'标识'},
{k:'喫煙',y:'きつえん',c:'吸烟/吸烟区相关',cat:'标识'},
{k:'切符',y:'きっぷ',c:'车票',cat:'车站'},
{k:'乗換',y:'のりかえ',c:'换乘',cat:'车站'},
{k:'乗車',y:'じょうしゃ',c:'乘车',cat:'交通'},
{k:'降車',y:'こうしゃ',c:'下车',cat:'交通'},
{k:'急行',y:'きゅうこう',c:'急行',cat:'车站'},
{k:'特急',y:'とっきゅう',c:'特急',cat:'车站'},
{k:'各駅停車',y:'かくえきていしゃ',c:'各站停车',cat:'车站'},
{k:'終電',y:'しゅうでん',c:'末班电车',cat:'车站'},
{k:'始発',y:'しはつ',c:'首班车/始发',cat:'车站'},
{k:'運休',y:'うんきゅう',c:'停运',cat:'交通'},
{k:'遅延',y:'ちえん',c:'延误',cat:'交通'},
{k:'到着',y:'とうちゃく',c:'到达',cat:'交通'},
{k:'出発',y:'しゅっぱつ',c:'出发',cat:'交通'},
{k:'温泉',y:'おんせん',c:'温泉',cat:'酒店/旅行'},
{k:'大浴場',y:'だいよくじょう',c:'大浴场',cat:'酒店'},
{k:'朝食',y:'ちょうしょく',c:'早餐',cat:'酒店'},
{k:'夕食',y:'ゆうしょく',c:'晚餐',cat:'酒店'},
{k:'受付',y:'うけつけ',c:'接待处/受理处',cat:'通用'},
{k:'会計',y:'かいけい',c:'结账',cat:'餐饮'},
{k:'注文',y:'ちゅうもん',c:'点单/下单',cat:'餐饮'},
{k:'現金',y:'げんきん',c:'现金',cat:'购物'},
{k:'税込',y:'ぜいこみ',c:'含税',cat:'购物'},
{k:'税別',y:'ぜいべつ',c:'未含税',cat:'购物'},
{k:'売切',y:'うりきれ',c:'售罄',cat:'购物'},
{k:'営業時間',y:'えいぎょうじかん',c:'营业时间',cat:'商店'},
{k:'定休日',y:'ていきゅうび',c:'固定休息日',cat:'商店'},
{k:'免税',y:'めんぜい',c:'免税',cat:'购物'},
{k:'非常口',y:'ひじょうぐち',c:'紧急出口',cat:'标识'},
{k:'立入禁止',y:'たちいりきんし',c:'禁止入内',cat:'标识'},
{k:'注意',y:'ちゅうい',c:'注意',cat:'标识'},
{k:'案内',y:'あんない',c:'指南/问讯/引导',cat:'通用'},
{k:'精算',y:'せいさん',c:'结算/补票结算',cat:'车站'}
];

function kanjiQ(item=KANJI_WORDS[Math.floor(Math.random()*KANJI_WORDS.length)]){
  const askMeaning=Math.random()<0.25;
  if(askMeaning){
    return {key:'kanji:'+item.k,type:'进阶 · 汉字实用词',prompt:item.k,sub:`${item.cat}场景：先认读法，再判断实际含义。`,answer:item.c,options:shuffle([item.c,...distract(item.c,KANJI_WORDS.map(x=>x.c))]),note:`${item.k}（${item.y}）= ${item.c}。`};
  }
  return {key:'kanji:'+item.k,type:'进阶 · 汉字标音',prompt:`「${item.k}」怎么读？`,sub:`${item.cat}里常见的实用汉字词。`,answer:item.y,options:shuffle([item.y,...distract(item.y,KANJI_WORDS.map(x=>x.y))]),note:`${item.k} → ${item.y}，意思是“${item.c}”。`};
}

const buildQueueBeforeKanji=buildQueue;
buildQueue=function(m){
  if(m==='kanji')return sample(KANJI_WORDS,15).map(kanjiQ);
  return buildQueueBeforeKanji(m);
};

if(typeof questionForKey==='function'){
  const questionForKeyBeforeKanji=questionForKey;
  questionForKey=function(key){
    if(key&&key.startsWith('kanji:')){
      const item=KANJI_WORDS.find(x=>x.k===key.slice(6));
      if(item)return kanjiQ(item);
    }
    return questionForKeyBeforeKanji(key);
  };
}
