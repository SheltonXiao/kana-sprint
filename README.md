# Kana Sprint · 片假名实战

A zero-backend static Japanese reading practice site for a learner who already knows most katakana and wants faster recognition, better real-world reading, and light spaced repetition.

## Current learning modes

- Daily 15-question mixed practice
- Mistake review with due / weak-item prioritization
- Confusable katakana drills
- Practical loanword vocabulary
- Chunked reading for long katakana words
- Dakuten / handakuten / yōon / small `ッ` / long-vowel `ー` practice
- Real-world Japan scenarios
- Quick-reaction mode
- Katakana reference table
- Advanced practical kanji reading with **katakana pronunciation guides**
- Adaptive romaji hints: automatic / always show / minimal
- Weekly check-in summary using Monday → Sunday natural weeks
- Recent-question rotation to reduce unnecessary repetition

## Current content inventory

> Counts below refer to source content entries, not rendered multiple-choice variants. The app can generate multiple question forms and randomized distractors from the same source item.

| Content area | Current size | Coverage |
| --- | ---: | --- |
| Basic katakana | 46 | Standard katakana set used by the trainer |
| Dakuten / handakuten reference | 25 | ガ〜ゴ, ザ〜ゾ, ダ〜ド, バ〜ボ, パ〜ポ |
| Common yōon reference | 33 | キャ / シュ / チョ / ジュ / ピョ etc. |
| Confusable kana targets | 8 | シ/ツ, ソ/ン, ク/ケ, ヌ/ス families |
| Practical katakana vocabulary | **237 unique words** | Food, shopping, hotel, transport/travel, technology, daily life, clothing and study/work |
| Long-word chunking entries | **50** | Long vowels, small ッ, yōon, foreign-sound combinations, abbreviations and compounds |
| Real-world scenario prompts | **40** | Station, airport, hotel, convenience store, shopping, restaurant/café, phone/web UI, road travel |
| Sound-pattern / special-sound prompts | **20** | Dakuten, handakuten, yōon, small ッ, long vowel ー, フォ / ウォ / ティ / ファ / チェ / ディ |
| Advanced practical kanji | **40** | 改札, 乗換, 予約, 無料, 禁煙, 急行, 特急, 温泉, 朝食, 会計, 税込, 営業時間 etc. |

## Vocabulary organization

Vocabulary is grouped by stable semantic category rather than by update batch:

- `data/vocab/food.js` — food, drinks, cafés, restaurant vocabulary
- `data/vocab/shopping.js` — stores, checkout, payment, discounts, packaging
- `data/vocab/hotel.js` — hotel rooms, front desk, amenities, bathroom items
- `data/vocab/transport.js` — stations, airports, tickets, rental cars, travel
- `data/vocab/tech.js` — phone, computer, apps, web, devices
- `data/vocab/daily.js` — everyday objects, services, activities
- `data/vocab/clothing-study.js` — clothing, stationery, classes, meetings, projects

Each vocabulary entry uses a simple human-reviewable format:

```js
{j:'レシート', r:'reshiito', c:'小票/收据', src:'receipt', cat:'购物', w:3}
```

`w` is a frequency / usefulness weight used by the question selector:

- `w:3` — high-frequency / highly useful, allowed to return more often across days
- `w:2` — useful common vocabulary
- `w:1` — occasional exposure; lower repetition priority

Vocabulary files keep **one entry per physical line** for easier human checking.

## Repetition and question rotation

The trainer intentionally balances repetition and novelty:

- Wrong, weak, and due items are allowed to return quickly.
- High-frequency vocabulary appears more often over multiple days.
- Recently seen normal items are strongly de-prioritized in nearby sessions.
- The recent-question history is kept locally so the app avoids the feeling of seeing the same handful of questions over and over.
- Repetition is not removed completely: some recurrence over nearby days is intentional for memory reinforcement.

## Chunked reading

Chunked-reading questions now avoid the earlier giveaway where only one answer could reconstruct the source word.

For segmentation questions, **all options reconstruct the same original katakana word**. The learner must choose the split that best preserves useful sound blocks such as yōon, small `ッ`, long vowels, and familiar word chunks.

Example:

```text
チェックアウト
→ チェッ・ク・アウ・ト
```

The other options may place boundaries differently, but still contain the same source characters.

## English comparison

Practical vocabulary feedback includes a short English/source association where useful, for example:

- `レシート` → receipt → 小票/收据
- `エレベーター` → elevator → 电梯
- `チェックアウト` → check-out → 退房
- `コンセント` → Japanese-specific loanword usage → 电源插座

English is only used as a memory aid. Japanese-specific meanings are explicitly called out when a direct English guess would be misleading.

## Advanced kanji scope

The kanji mode is intentionally kept separate from the main katakana daily flow because it is a harder layer.

The learner has **not started hiragana yet**, so kanji pronunciation guides are currently written in katakana:

- `改札 → カイサツ` — 检票口
- `予約 → ヨヤク` — 预约
- `温泉 → オンセン` — 温泉
- `特急 → トッキュウ` — 特急

Current areas include station/transport, signs, hotels/travel, restaurants, and shopping.

## Repository structure

```text
kana-sprint/
├── index.html
├── app.js
├── README.md
├── AGENTS.md
├── styles/
│   └── main.css
└── data/
    ├── kana.js
    ├── sound-rules.js
    ├── chunks.js
    ├── scenes.js
    ├── kanji.js
    └── vocab/
        ├── food.js
        ├── shopping.js
        ├── hotel.js
        ├── transport.js
        ├── tech.js
        ├── daily.js
        └── clothing-study.js
```

The structure is based on responsibility and stable content domains, **not update history**. New vocabulary should normally be added to an existing category file. A new category file is only appropriate for a genuinely new durable domain.

## Learning state

Progress is stored locally in `localStorage` under `kanaSprintState`. The trainer keeps item-level right/wrong counts, review due dates, current streak, study days, recent-question history, total answers, and overall accuracy.

Romaji support can be set to:

- **Auto:** keep hints early, then gradually reduce them for repeatedly correct items
- **Always:** keep romaji visible in feedback
- **Minimal:** hide most auxiliary romaji when answers are correct, but still show it after mistakes

## Deployment

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.
5. The site will be available at `https://sheltonxiao.github.io/kana-sprint/` once Pages finishes publishing.

## Maintenance notes

`AGENTS.md` is the source of truth for future maintenance behavior, learner constraints, repository structure, UI direction, and content-file rules.

Whenever vocabulary, chunks, scenes, sound prompts, or kanji entries change, update the inventory in this README in the same maintenance pass.
