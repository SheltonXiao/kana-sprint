# AGENTS.md

## Product intent
Kana Sprint is a mobile-first Japanese reading trainer for a learner who already knows most **katakana** but is still building speed, confidence, and real-world recognition.

The primary loop is short daily practice, weak-item review, and practical reading from Japanese travel, shopping, food, hotel, station, and everyday contexts. The app should feel lightweight and pleasant rather than like a textbook or a dense analytics dashboard.

## Learner state
- Katakana: already mostly memorized; emphasize recognition speed, confusing forms, sound changes, long words, and real-world use.
- Hiragana: **not learned yet**. Do not make hiragana required knowledge unless the learner explicitly says they have started learning it.
- Kanji: advanced/optional layer only. Kanji readings default to **katakana**, e.g. `改札 → カイサツ`, not hiragana.
- Romaji: supportive scaffolding, not the end goal. Keep `auto / always / minimal`; wrong answers may show romaji even when hints are minimized.

## Learning behavior
- Daily practice: about 15 mixed questions, around 5–10 minutes.
- Mistake review is first-class. Wrong, due, or weak items may repeat intentionally.
- Normal mastered items should avoid needless repetition in nearby sessions.
- Moderate repetition across nearby days is desirable for memory reinforcement.
- Use frequency weights for vocabulary: `w:3` common, `w:2` useful, `w:1` occasional.
- Recent-question suppression and SRS should work together: high-frequency words recur over days, but not annoyingly within the same or adjacent session.
- Chunked reading must test real segmentation, not answer-format tricks. If asking for the best split, all choices should reconstruct the same original word.
- Real-world scenarios should foreground the Japanese text itself.
- Kanji mode stays separate from the normal katakana daily flow unless explicitly requested otherwise.

## UI and visual direction
- Mobile-first. Test layouts at roughly 375–430 px widths.
- Do **not** imitate Duolingo branding or its bright green palette.
- Current direction: calm blue-gray / ink colors, generous whitespace, restrained accents.
- Functional symbols such as `↺`, `⚡`, `◉`, `✓`, `→` are welcome when they improve scanning. Do not decorate every card with emoji.
- `片假名复习表` is a reference/tool entry, not a quiz mode. Keep its subtle warm-tinted visual treatment.
- Real-world scene cards may use category-specific soft backgrounds, but readability is primary.
- Learning history belongs near the bottom of the home page. Keep it compact and check-in-like, not a metrics dashboard.
- Weekly check-in uses a **natural week, Monday through Sunday**.
- Do not show low-value metrics such as longest-ever streak unless explicitly requested.

## Canonical repository structure

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
        ├── clothing-study.js
        ├── sightseeing.js
        └── health.js
```

## File-creation rules
- **Do not create versioned content files** such as `content-pack-03.js`, `new-vocab.js`, `enhancements-2.js`, or similar update-history files.
- Existing stable categories must be extended in place.
- Create a new `data/vocab/<category>.js` only when a genuinely new, durable semantic domain appears and at least several entries belong there.
- Do not create a new file merely because one update is large.
- Assign each vocabulary spelling to one primary category. Avoid duplicating the same `j` value across category files.
- Cross-category usage belongs in scenes or metadata, not duplicate vocabulary records.
- Keep **one vocabulary object per physical line** so humans can review Japanese spelling, romaji, Chinese meaning, source/English, and frequency weight easily.
- Keep data files behavior-free. They may only initialize or append content to `KanaData`.

## Architecture rules
- `index.html`: semantic page structure and deterministic script order only.
- `styles/main.css`: the single canonical stylesheet.
- `app.js`: the single canonical runtime for state, SRS, queue building, rendering, answer handling, study summaries, and settings.
- `data/kana.js`: basic kana, dakuten, yōon, and confusable-character data.
- `data/sound-rules.js`: dakuten, handakuten, yōon, small-ッ, long-vowel, and foreign-sound questions.
- `data/chunks.js`: long-word chunk-reading entries.
- `data/scenes.js`: real-world scenario entries.
- `data/kanji.js`: optional advanced kanji entries using katakana readings.
- `data/vocab/*.js`: vocabulary only, grouped by stable semantic category.
- `data/vocab/sightseeing.js`: museums, visitor guides, tours, and attraction services.
- `data/vocab/health.js`: clinics, medical staff, medicine, and travel-health vocabulary.
- `README.md`: user-facing feature description plus current inventory counts.
- `AGENTS.md`: maintenance rules and learner/product constraints.
- Avoid monkey-patching and layered function reassignment such as `const old = fn; fn = function(){...old()...}`.
- There must be one canonical implementation for queue building, rendering, answer handling, home updates, and study summaries.
- Modify canonical runtime directly when behavior changes; never add an enhancement script that overrides it later.
- Preserve the existing localStorage key `kanaSprintState` unless an intentional migration is implemented.
- Internal keys such as `scene:` / `chunk:` / `kanji:` / `pattern:` must never appear directly in the UI.

## Content conventions
- Favor high-confidence, high-frequency Japanese usage.
- Vocabulary fields normally include `j` Japanese spelling, `r` romaji, `c` Chinese meaning, `src` English/source association, `cat` category, and `w` frequency weight.
- English comparison is a memory aid, not a claim that the Japanese meaning is identical to English.
- Highlight Japanese-specific meanings such as `コンセント`, `リモコン`, `パソコン`, `モーニングコール`.
- Explanations should briefly include relevant sound logic: dakuten, handakuten, yōon, small `ッ`, long vowel `ー`, and foreign-sound combinations such as `フォ / ティ / チェ`.
- Keep real-world contexts practical: stations, airports, hotels, convenience stores, restaurants/cafés, shopping, phone/web UI, road travel.

## README inventory rule
- **Every content addition, deletion, deduplication, or category move must be followed by a README inventory update in the same maintenance pass.**
- Count vocabulary by unique `j` spelling, not by rendered question variants.
- Report chunks, scenes, sound-rule prompts, kanji entries, and reference-table entries separately.
- If category files are rebalanced without changing unique vocabulary count, update category descriptions when materially changed.

## Review and stats
- Keep item-level right/wrong counts and due dates.
- Keep cumulative study days, current streak, total answers, and overall accuracy.
- Weekly display should be Monday → Sunday and use the learner's local browser date.
- Do not let cosmetic or architectural refactors erase existing local progress.

## Change checklist
Before finishing an update:
1. Confirm normal daily practice starts and renders choices.
2. Confirm mistake review can build a queue even with no accumulated mistakes.
3. Confirm katakana reference table opens and romaji show/hide works.
4. Confirm scene cards remain readable at phone widths.
5. Confirm kanji questions use katakana readings, not hiragana.
6. Confirm chunk segmentation choices do not reveal the answer through different source words.
7. Confirm `kanaSprintState` is still used and older state fields are tolerated.
8. Confirm internal storage keys are not visible in weak-item labels.
9. Confirm vocabulary files remain one-entry-per-line and contain no duplicate `j` spelling across categories.
10. Confirm README inventory is updated whenever content changes.
11. Do not add a new behavior file merely to override an existing function.
