# Kana Sprint · 片假名实战

A zero-backend static Japanese reading practice site designed for learners who already know most katakana and want faster recognition, better real-world reading, and light spaced repetition.

## Current learning modes

- Daily 15-question mixed practice
- Mistake review with due/weak-item prioritization
- Confusable katakana drills
- Practical loanword vocabulary
- Chunked reading for long katakana words
- Dakuten / handakuten / yōon / small ッ / long-vowel ー practice
- Real-world Japan scenarios
- Quick-reaction mode
- Katakana reference table
- Advanced practical kanji reading / furigana-style reading practice
- Adaptive romaji hints: automatic / always show / minimal
- Weekly check-in summary (Monday to Sunday)
- Recent-question rotation to reduce unnecessary repetition

## Current content inventory

> The app generates multiple question forms and randomized distractors from these entries, so the number of possible rendered multiple-choice questions is larger than the raw content-entry count below.

| Content area | Current size | Coverage |
| --- | ---: | --- |
| Basic katakana | 46 | Standard katakana set used by the trainer |
| Dakuten / handakuten | 25 | ガ〜ゴ, ザ〜ゾ, ダ〜ド, バ〜ボ, パ〜ポ |
| Common yōon | 33 | キャ / シュ / チョ / ジュ / ピョ etc. |
| Confusable kana targets | 8 | シ/ツ, ソ/ン, ク/ケ, ヌ/ス families |
| Practical katakana vocabulary | 132 | Food, shopping, hotel, travel, station/airport, technology, daily life |
| Long-word chunking templates | 31 templates, 30 unique words | e.g. チョコレート, チェックアウト, インフォメーション, モバイルバッテリー |
| Real-world scenario prompts | 30 | Station, airport, hotel, restaurant, convenience store, shopping, phone/web UI, road travel |
| Sound-pattern / special-sound prompts | 16 | Dakuten, handakuten, yōon, small ッ, long vowel ー, フォ / ウォ / ティ / ファ / チェ / ディ |
| Advanced practical kanji | 40 | 改札, 乗換, 予約, 無料, 禁煙, 急行, 特急, 温泉, 朝食, 会計, 税込, 営業時間 etc. |

## Vocabulary coverage

The current katakana vocabulary bank emphasizes practical recognition rather than textbook ordering. Major areas include:

- **Food & cafés:** コーヒー, サンドイッチ, カレー, パスタ, トッピング, ドレッシング, ミネラルウォーター
- **Shopping:** レジ, セルフレジ, レシート, クーポン, バーコード, ラッピング, ペットボトル
- **Hotels:** フロント, ルームキー, アメニティ, ランドリー, ドライヤー, モーニングコール
- **Transport & airports:** ホーム, ターミナル, ゲート, カウンター, シャトルバス, レンタカー, サービスエリア
- **Technology & daily life:** スマホ, パソコン, コンセント, リモコン, バッテリー, アプリ, ログイン, ダウンロード

## Advanced kanji scope

The kanji mode is intentionally kept separate from the main katakana daily flow because it is a harder layer. It currently focuses on high-frequency words likely to appear in Japan:

- **Station / transport:** 改札, 切符, 乗換, 急行, 特急, 各駅停車, 終電, 運休, 遅延, 到着, 出発
- **Signs:** 出口, 入口, 無料, 有料, 禁煙, 非常口, 立入禁止, 注意
- **Hotels / travel:** 予約, 温泉, 大浴場, 朝食, 夕食, 受付
- **Restaurants / shopping:** 会計, 注文, 現金, 税込, 税別, 売切, 免税, 営業時間, 定休日

Questions mainly ask **kanji → hiragana reading**, with some meaning-recognition questions mixed in.

## Learning logic

Progress is stored locally in `localStorage`. The trainer tracks item-level right/wrong counts, review due dates, current streak, study days, and recent-question history.

For normal practice, recently seen mastered questions are de-prioritized to reduce boring repetition. Mistakes and due review items are intentionally allowed to return more often.

Romaji support can be set to:

- **Auto:** keep hints early, then gradually reduce them for items that are repeatedly answered correctly
- **Always:** keep romaji visible in feedback
- **Minimal:** hide most auxiliary romaji when answers are correct, but still show it after mistakes

## Deployment

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.
5. The site will be available at `https://sheltonxiao.github.io/kana-sprint/` once Pages finishes publishing.

## Notes

Progress is browser-local. Clearing site data or switching to another device/browser creates a separate progress history.

When adding future content packs, update this README so the inventory reflects the current deployed question bank.
