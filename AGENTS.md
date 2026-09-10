# AGENTS.md

## Product intent
Kana Sprint is a mobile-first Japanese reading trainer for a learner who already knows most **katakana** but is still building speed, confidence, and real-world recognition.

The primary learning loop is short daily practice, weak-item review, and practical reading from Japanese travel / shopping / food / hotel / station contexts. The app should feel lightweight and pleasant rather than like a textbook or a dense analytics dashboard.

## Learner state
- Katakana: already mostly memorized; practice should emphasize recognition speed, confusing forms, sound changes, long words, and real-world use.
- Hiragana: **not learned yet**. Do not make hiragana required knowledge anywhere in the app unless the learner explicitly says they have started learning it.
- Kanji: advanced/optional layer only. When showing a kanji reading, default to **katakana reading**, e.g. `改札 → カイサツ`, not hiragana.
- Romaji: supportive scaffolding, not the end goal. Keep adaptive controls: `auto / always / minimal`. Wrong answers may show romaji even when hints are minimized.

## Learning behavior
- Daily practice: approximately 15 mixed questions, around 5–10 minutes.
- Mistake review is a first-class mode. Wrong / due / weak items may repeat intentionally.
- Normal mastered items should avoid unnecessary repetition across nearby sessions.
- Use spaced review rather than pure random repetition.
- Chunked reading should teach the learner to parse long katakana words into useful sound blocks.
- Real-world scenarios should foreground the Japanese text itself. Scene context must be visually obvious before the question.
- The kanji mode stays separate from the normal katakana daily flow unless explicitly requested otherwise.

## UI and visual direction
- Mobile-first. Test layouts at ~375–430 px widths.
- Do **not** imitate Duolingo branding or its bright green palette.
- Current visual direction: calm blue-gray / ink colors, generous whitespace, restrained accent colors.
- Functional symbols such as `↺`, `⚡`, `◉`, `✓`, `→` are welcome when they improve scanning. Do not decorate every card with emoji.
- `片假名复习表` is a reference/tool entry, not a quiz mode. Give it a visually distinct but subtle warm-tinted treatment.
- Real-world scene cards may use category-specific soft backgrounds, but keep text readability primary.
- Learning history belongs near the bottom of the home page. Keep it compact and check-in-like, not a metrics dashboard.
- Weekly check-in uses a **natural week, Monday through Sunday**.
- Do not show low-value metrics such as longest-ever streak unless the learner explicitly asks for them.

## Architecture rules
- Avoid monkey-patching and layered function reassignment such as `const old = fn; fn = function(){...old()...}`.
- There should be one canonical implementation for queue building, rendering, answer handling, home updates, and study summaries.
- Data/content files may add data, but they should not override application behavior.
- If a feature needs new behavior, modify the canonical runtime directly rather than adding another `enhancements-*` behavior layer.
- Prefer this responsibility split:
  - `index.html`: semantic page structure only
  - `style.css`: canonical styling
  - `app.js`: canonical runtime / state / quiz / rendering logic
  - `content-*.js`: data-only katakana vocabulary, chunks, scenes, sound rules
  - `kanji-pack.js`: data-only advanced kanji entries
  - `README.md`: current content inventory and user-facing project notes
  - `AGENTS.md`: maintenance rules and learner/product constraints
- Preserve the existing `localStorage` key `kanaSprintState` during refactors unless a migration is intentionally implemented.
- Internal keys such as `scene:` / `chunk:` / `kanji:` must never be shown directly in the UI.

## Content conventions
- Favor high-confidence, high-frequency Japanese usage.
- For loanwords, keep fields for Japanese spelling, romaji, Chinese meaning, origin/association, and category when useful.
- Explanations should briefly include relevant sound logic: dakuten, handakuten, yōon, small `ッ`, long vowel `ー`, or extended foreign sounds such as `フォ / ティ / チェ`.
- Avoid relying on English resemblance alone; include Japanese-specific meanings such as `コンセント`, `リモコン`, `パソコン`, `モーニングコール`.
- Keep real-world contexts practical: stations, airports, hotels, convenience stores, restaurants/cafés, shopping, phone/web UI, road travel.
- When content changes, update the inventory counts / coverage notes in `README.md`.

## Review and stats
- Keep item-level right/wrong counts and due dates.
- Keep cumulative study days, current streak, total answers, and overall accuracy.
- Weekly display should be Monday → Sunday and use the learner's local browser date.
- Do not let a cosmetic refactor erase existing local progress.

## Change checklist
Before finishing an update:
1. Confirm normal daily practice still starts and renders choices.
2. Confirm mistake review can build a queue even when there are no accumulated mistakes.
3. Confirm katakana reference table opens and romaji show/hide works.
4. Confirm scene cards remain readable on phone widths.
5. Confirm kanji questions use katakana readings, not hiragana.
6. Confirm `kanaSprintState` is still used and older state fields are tolerated.
7. Confirm internal storage keys are not visible in weak-item labels.
8. Confirm README inventory is updated when content is added or removed.
9. Avoid adding a new behavior file merely to override an existing function.
