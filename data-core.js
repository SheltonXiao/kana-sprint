// Core Kana Sprint learning data. Keep this file behavior-free.
const KANA=[['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o'],['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko'],['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so'],['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to'],['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no'],['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho'],['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo'],['ヤ','ya'],['ユ','yu'],['ヨ','yo'],['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro'],['ワ','wa'],['ヲ','wo'],['ン','n']];
const DAKUTEN=[['ガ','ga'],['ギ','gi'],['グ','gu'],['ゲ','ge'],['ゴ','go'],['ザ','za'],['ジ','ji'],['ズ','zu'],['ゼ','ze'],['ゾ','zo'],['ダ','da'],['ヂ','ji/di'],['ヅ','zu/du'],['デ','de'],['ド','do'],['バ','ba'],['ビ','bi'],['ブ','bu'],['ベ','be'],['ボ','bo'],['パ','pa'],['ピ','pi'],['プ','pu'],['ペ','pe'],['ポ','po']];
const YOUON=[['キャ','kya'],['キュ','kyu'],['キョ','kyo'],['シャ','sha'],['シュ','shu'],['ショ','sho'],['チャ','cha'],['チュ','chu'],['チョ','cho'],['ニャ','nya'],['ニュ','nyu'],['ニョ','nyo'],['ヒャ','hya'],['ヒュ','hyu'],['ヒョ','hyo'],['ミャ','mya'],['ミュ','myu'],['ミョ','myo'],['リャ','rya'],['リュ','ryu'],['リョ','ryo'],['ギャ','gya'],['ギュ','gyu'],['ギョ','gyo'],['ジャ','ja'],['ジュ','ju'],['ジョ','jo'],['ビャ','bya'],['ビュ','byu'],['ビョ','byo'],['ピャ','pya'],['ピュ','pyu'],['ピョ','pyo']];
const CONF=[['シ','shi',['ツ','ソ','ン']],['ツ','tsu',['シ','ソ','ン']],['ソ','so',['ン','シ','ツ']],['ン','n',['ソ','シ','ツ']],['ク','ku',['ケ','ワ','タ']],['ケ','ke',['ク','サ','チ']],['ヌ','nu',['ス','メ','ネ']],['ス','su',['ヌ','フ','ワ']]];

const VOCAB=[
{j:'ホテル',r:'hoteru',c:'酒店',src:'hotel',cat:'旅行',w:3},{j:'タクシー',r:'takushii',c:'出租车',src:'taxi',cat:'交通',w:3},{j:'バス',r:'basu',c:'公交/巴士',src:'bus',cat:'交通',w:3},{j:'ホーム',r:'hoomu',c:'站台',src:'platform（铁路语境）',cat:'车站',w:3},{j:'エレベーター',r:'erebeetaa',c:'电梯',src:'elevator',cat:'车站',w:3},{j:'エスカレーター',r:'esukareetaa',c:'自动扶梯',src:'escalator',cat:'车站',w:3},{j:'トイレ',r:'toire',c:'洗手间',src:'toilet',cat:'生活',w:3},{j:'コンビニ',r:'konbini',c:'便利店',src:'convenience store',cat:'购物',w:3},{j:'スーパー',r:'suupaa',c:'超市',src:'supermarket',cat:'购物',w:3},{j:'レジ',r:'reji',c:'收银台',src:'register',cat:'购物',w:3},
{j:'メニュー',r:'menyuu',c:'菜单',src:'menu',cat:'餐饮',w:3},{j:'レストラン',r:'resutoran',c:'餐厅',src:'restaurant',cat:'餐饮',w:3},{j:'コーヒー',r:'koohii',c:'咖啡',src:'coffee',cat:'餐饮',w:3},{j:'サンドイッチ',r:'sandoicchi',c:'三明治',src:'sandwich',cat:'餐饮',w:3},{j:'デザート',r:'dezaato',c:'甜点',src:'dessert',cat:'餐饮',w:2},{j:'ジュース',r:'juusu',c:'果汁/软饮',src:'juice',cat:'餐饮',w:2},{j:'ビール',r:'biiru',c:'啤酒',src:'beer',cat:'餐饮',w:2},{j:'チーズ',r:'chiizu',c:'芝士',src:'cheese',cat:'餐饮',w:2},{j:'バター',r:'bataa',c:'黄油',src:'butter',cat:'餐饮',w:2},{j:'クリーム',r:'kuriimu',c:'奶油',src:'cream',cat:'餐饮',w:2},
{j:'ケーキ',r:'keeki',c:'蛋糕',src:'cake',cat:'餐饮',w:3},{j:'チョコレート',r:'chokoreeto',c:'巧克力',src:'chocolate',cat:'餐饮',w:3},{j:'ハンバーガー',r:'hanbaagaa',c:'汉堡',src:'hamburger',cat:'餐饮',w:3},{j:'セット',r:'setto',c:'套餐/套装',src:'set',cat:'餐饮',w:3},{j:'テイクアウト',r:'teikuauto',c:'外带',src:'take out',cat:'餐饮',w:3},{j:'スタッフ',r:'sutaffu',c:'工作人员',src:'staff',cat:'生活',w:2},{j:'カード',r:'kaado',c:'卡/银行卡',src:'card',cat:'购物',w:3},{j:'クレジットカード',r:'kurejitto kaado',c:'信用卡',src:'credit card',cat:'购物',w:3},{j:'ポイント',r:'pointo',c:'积分/点数',src:'point',cat:'购物',w:3},{j:'チケット',r:'chiketto',c:'票',src:'ticket',cat:'旅行',w:3},
{j:'ロッカー',r:'rokkaa',c:'储物柜',src:'locker',cat:'旅行',w:2},{j:'コインロッカー',r:'koin rokkaa',c:'投币储物柜',src:'coin locker',cat:'旅行',w:3},{j:'インフォメーション',r:'infomeeshon',c:'问讯处/信息',src:'information',cat:'旅行',w:2},{j:'チェックイン',r:'chekkuin',c:'办理入住/值机',src:'check-in',cat:'旅行',w:3},{j:'チェックアウト',r:'chekkuauto',c:'退房',src:'check-out',cat:'旅行',w:3},{j:'フロント',r:'furonto',c:'酒店前台',src:'front desk',cat:'酒店',w:3},{j:'ダブル',r:'daburu',c:'双人床/双倍',src:'double',cat:'酒店',w:2},{j:'キャンセル',r:'kyanseru',c:'取消',src:'cancel',cat:'旅行',w:3},{j:'スマホ',r:'sumaho',c:'智能手机',src:'smartphone（缩略）',cat:'科技',w:3},{j:'パソコン',r:'pasokon',c:'电脑',src:'personal computer（缩略）',cat:'科技',w:3},
{j:'コンセント',r:'konsento',c:'电源插座',src:'consent（日语独特用法）',cat:'科技',w:3},{j:'カメラ',r:'kamera',c:'相机',src:'camera',cat:'科技',w:3},{j:'テレビ',r:'terebi',c:'电视',src:'television（缩略）',cat:'科技',w:3},{j:'リモコン',r:'rimokon',c:'遥控器',src:'remote control（缩略）',cat:'科技',w:3},{j:'エアコン',r:'eakon',c:'空调',src:'air conditioner（缩略）',cat:'生活',w:3},{j:'シャワー',r:'shawaa',c:'淋浴',src:'shower',cat:'生活',w:3},{j:'スリッパ',r:'surippa',c:'拖鞋',src:'slipper',cat:'生活',w:2},{j:'ベッド',r:'beddo',c:'床',src:'bed',cat:'酒店',w:3},{j:'ドリンク',r:'dorinku',c:'饮料',src:'drink',cat:'餐饮',w:3},{j:'ランチ',r:'ranchi',c:'午餐',src:'lunch',cat:'餐饮',w:3}
];

const CHUNKS=[
{j:'チョコレート',chunks:['チョ','コ','レー','ト'],r:'cho · ko · ree · to',c:'巧克力',tip:'チョ是一个拗音块；レー里的ー拉长e。'},
{j:'チェックアウト',chunks:['チェッ','ク','アウ','ト'],r:'chek · ku · au · to',c:'退房',tip:'チェ是外来音；小ッ和后面的ク要一起感受停顿。'},
{j:'チェックイン',chunks:['チェッ','ク','イン'],r:'chek · ku · in',c:'办理入住/值机',tip:'先认熟悉的チェック，再接イン。'},
{j:'エスカレーター',chunks:['エス','カ','レー','ター'],r:'esu · ka · ree · taa',c:'自动扶梯',tip:'レー和ター都有长音。'},
{j:'エレベーター',chunks:['エ','レ','ベー','ター'],r:'e · re · bee · taa',c:'电梯',tip:'ベ是浊音；ベー和ター都有长音。'},
{j:'インフォメーション',chunks:['イン','フォ','メー','ション'],r:'in · fo · mee · shon',c:'信息/问讯处',tip:'フォ是外来音；ション是很常见的尾部声音块。'},
{j:'コインロッカー',chunks:['コイン','ロッ','カー'],r:'koin · rok · kaa',c:'投币储物柜',tip:'ロッ有小ッ，カー有长音。'},
{j:'サンドイッチ',chunks:['サン','ド','イッ','チ'],r:'san · do · ic · chi',c:'三明治',tip:'イッ和后面的チ连起来读得更自然。'},
{j:'クレジットカード',chunks:['クレ','ジッ','ト','カー','ド'],r:'kure · jit · to · kaa · do',c:'信用卡',tip:'ジ是浊音；ジッ有小ッ；カー有长音。'},
{j:'ハンバーガー',chunks:['ハン','バー','ガー'],r:'han · baa · gaa',c:'汉堡',tip:'バー、ガー都有长音；ガ是浊音。'},
{j:'コンセント',chunks:['コン','セン','ト'],r:'kon · sen · to',c:'电源插座',tip:'这是日本生活里很重要的独特外来语用法。'},
{j:'エアコン',chunks:['エア','コン'],r:'ea · kon',c:'空调',tip:'air conditioner 的日语缩略。'},
{j:'リモコン',chunks:['リモ','コン'],r:'rimo · kon',c:'遥控器',tip:'remote control 的日语缩略。'},
{j:'パソコン',chunks:['パソ','コン'],r:'paso · kon',c:'电脑',tip:'personal computer 的日语缩略。'},
{j:'テイクアウト',chunks:['テイ','ク','アウ','ト'],r:'tei · ku · au · to',c:'外带',tip:'按 take-out 的节奏分块。'},
{j:'ポイントカード',chunks:['ポイン','ト','カー','ド'],r:'poin · to · kaa · do',c:'积分卡',tip:'カード里的ー把a拉长。'}
];

const SCENES=[
{ctx:'东京地铁站内标识：エレベーター',p:'最可能指什么？',a:'电梯',o:['自动扶梯','出口','检票口'],note:'エレベーター = elevator；读 erebeetaa。'},
{ctx:'站内指示：ホーム（中央）～改札',p:'这里的「ホーム」是什么？',a:'站台',o:['大厅','酒店','家'],note:'铁路语境的ホーム = platform；读 hoomu。'},
{ctx:'便利店：ポイントカードはありますか？',p:'「ポイントカード」是什么？',a:'积分卡',o:['信用卡','车票','菜单'],note:'ポイントカード = point card / loyalty card。'},
{ctx:'咖啡店：アイスコーヒー / ホットコーヒー',p:'想喝冰咖啡应选？',a:'アイスコーヒー',o:['ホットコーヒー','コーヒーゼリー','ミルク'],note:'アイス = iced；ホット = hot。'},
{ctx:'酒店：チェックアウト 11:00',p:'11:00 是什么时间？',a:'退房时间',o:['入住时间','早餐时间','门禁时间'],note:'チェックアウト = check-out，退房。'},
{ctx:'商店结账：レジはこちら',p:'「レジ」是什么？',a:'收银台',o:['问讯处/信息','相机','芝士'],note:'レジ来自 register，在日语里就是收银台。'},
{ctx:'酒店大堂：フロントはこちら',p:'应该往哪里走？',a:'酒店前台',o:['浴室','餐厅','车站月台'],note:'酒店语境下フロント = front desk。'},
{ctx:'餐厅菜单：ランチセット 1,200円',p:'最合理的理解是？',a:'午餐套餐 1200 日元',o:['午餐单品 120 日元','晚餐套餐 1200 日元','房间服务 1200 日元'],note:'ランチ = lunch；セット = set / 套餐。'},
{ctx:'车站：コインロッカー →',p:'箭头指向什么？',a:'投币储物柜',o:['售票机','自动贩卖机','卫生间'],note:'コインロッカー = coin locker。'},
{ctx:'房间说明：エアコンのリモコン',p:'指的是什么？',a:'空调遥控器',o:['电视遥控器','空调插座','房间电话'],note:'エアコン = air conditioner；リモコン = remote control。'}
];

const PATTERNS=[
{key:'ガ',type:'浊音',prompt:'カ 加上浊点「゛」以后变成？',answer:'ガ (ga)',options:['ガ (ga)','カ (ka)','パ (pa)','ザ (za)'],note:'カ行 + ゛：k → g。カ ka → ガ ga。'},
{key:'ジ',type:'浊音',prompt:'「ジ」怎么来的、怎么读？',answer:'シ + ゛ → ジ (ji)',options:['シ + ゛ → ジ (ji)','チ + ゛ → ジ (ji)','シ + ゜ → ジ (ji)','ス + ゛ → ジ (zu)'],note:'サ行 + ゛整体变成 z/j 系：サ za、シ ji、ス zu、セ ze、ソ zo。'},
{key:'パ',type:'半浊音',prompt:'ハ 加上半浊点「゜」以后变成？',answer:'パ (pa)',options:['パ (pa)','バ (ba)','ガ (ga)','ハ (ha)'],note:'ハ行加「゜」变 p：ハ→パ、ヒ→ピ、フ→プ、ヘ→ペ、ホ→ポ。'},
{key:'キャ',type:'拗音',prompt:'キ + 小ャ「ャ」合起来读什么？',answer:'キャ (kya)',options:['キャ (kya)','キヤ (kiya)','チャ (cha)','ギャ (gya)'],note:'イ段音 + 小ャ/ュ/ョ 合成一拍。'},
{key:'ジュ',type:'拗音 + 浊音',prompt:'「ジュ」读什么？',answer:'ju',options:['ju','shu','jo','zu'],note:'シ→ジ 是浊化；ジ + 小ュ → ジュ (ju)。'},
{key:'ベッド',type:'小ッ',prompt:'「ベッド」里的小ッ有什么作用？',answer:'让后面的 d 加倍：beddo',options:['让后面的 d 加倍：beddo','把 e 拉长','读成一个独立的 tsu','让 ベ 变成 ペ'],note:'小ッ不单独读 tsu，而是制造停顿/辅音加倍。'},
{key:'チケット',type:'小ッ',prompt:'「チケット」应该怎样读？',answer:'chiketto',options:['chiketto','chiketsuto','chiiketo','chigetto'],note:'チケット = chiketto；小ッ形成 tt。'},
{key:'コーヒー',type:'长音',prompt:'「コーヒー」里的「ー」表示什么？',answer:'把前面的元音拉长',options:['把前面的元音拉长','让后面辅音加倍','变成浊音','停顿一拍但不延长元音'],note:'ー 是长音符号：コー≈koo，ヒー≈hii。'},
{key:'スーパー',type:'长音',prompt:'「スーパー」怎么读？',answer:'suupaa',options:['suupaa','supapa','sutsupaa','suupa'],note:'スー = suu，パー = paa。'},
{key:'チョ',type:'拗音',prompt:'チ + 小ョ「ョ」合起来是？',answer:'チョ (cho)',options:['チョ (cho)','チヨ (chiyo)','ジョ (jo)','ショ (sho)'],note:'チ + 小ョ → チョ (cho)，小ョ不单独占一拍。'}
];
