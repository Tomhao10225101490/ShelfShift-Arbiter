# ShelfShift

**Good food. Better timing.** An expiry-first household pantry and meal planner for Arbiter Hacks V1 · Rethinking Waste.

## Try it

No account, API key, backend, or build step. Run `npm run dev` and open http://localhost:8766. Node 20+ is needed only for `npm test`; the app runs as static browser files. All pantry records stay in browser localStorage. Export a JSON backup before changing devices or clearing site data. Google Fonts is optional; system fonts work offline.

1. Load the sample pantry (clearly labeled example inventory with dates relative to today).
2. Inspect “Use soon” or add an ingredient in grams with its entered date.
3. Open Meal studio, adjust people, eating preference and cooking time.
4. Inspect exact ingredient allocation and any missing amounts.
5. After actually cooking, log the meal. This deducts those amounts, creates a journal entry and updates reported food use.
6. Undo the most recent meal from Your impact. Export and restore backups to move records.

## What makes it useful

Generic recipe search starts with a dish. ShelfShift starts with food already on the shelf and the time left to use it. Each recipe is scaled by household size. Available, non-expired batches are allocated earliest-date-first. The score is **4 × near-date grams + other usable grams − 2 × missing grams**. Near-date means 0–2 days inclusive. Missing ingredients stay visible and block meal logging. This is deterministic allocation and ranking, not machine learning or generative AI. Seven curated recipe templates cover twelve supported ingredient types. Oil, water and seasoning are assumed basics.

Cooking validates current stock again, updates a copied state, removes empty batches and appends a record. Old quantities cannot be logged against changed or expired inventory. Removing an ingredient does not count as consumption. Undo restores the pre-meal state during the current session and is invalidated by pantry changes. Dates and quantities are entered by the user. The app does not certify food safety or allergen suitability.

## Impact and evaluation

The specific waste problem is edible household ingredients forgotten until their dates pass, followed by buying food for unrelated recipes. ShelfShift makes at-risk stock visible and turns it into concrete meal options with quantity accounting. The prototype measures self-reported grams used and grams used within two days of the entered date, **not proven waste prevented**. A practical evaluation would compare seven days of weighed discarded food before adoption with two weeks after, normalize by household meals, and measure weekly discarded grams, completion rate of suggested meals, and planning time. No household study has been run and no reduction percentage is claimed.

## Architecture

- `dist/engine.js`: pure date, batch allocation, ranking, cooking, sample data and backup validation functions.
- `dist/app.js`: accessible native forms/dialogs, views, local persistence and JSON backups.
- `dist/style.css`: responsive design and CSS ingredient illustration; no image-generation assets.
- `tests/engine.test.mjs`: eight tests of inventory invariants, expiration, scaling, missing ingredients, filters and malformed backups.
- `.openai/hosting.json`: static Sites deployment configuration.

Run `npm test`. Serve over HTTP, not file://, because this app uses JavaScript modules.

## Boundaries and next steps

Single-device, manual-entry prototype. No image recognition, barcode scanning, delivery, donations, cloud sync, live safety database or verified environmental outcomes. Next: add discarded-food logging for baseline comparisons, editable ingredient entries, broader recipe coverage, user-defined recipes, and a small consented household pilot. A conservative past-date exclusion intentionally trades flexibility for predictable behavior.

## AI and authorship disclosure

Built in November 2026 with OpenAI Codex assistance for product design, source code, tests, documentation and demo preparation. The app itself does not call an AI service. Demo pantry values are examples. Video narration, when present, is synthetic and is labeled. Source is provided for review; participant eligibility and attribution must remain truthful.

MIT licensed. No proprietary assets or credentials are needed to run this project.
