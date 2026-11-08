# ShelfShift

## Tagline
Use what you have. Waste a little less. An expiry-first pantry and meal planner with traceable food-use records.

## Inspiration
Food is often wasted because the next meal is planned separately from what is already at home. A date reminder alone does not answer “what can I make tonight?” ShelfShift connects that warning to a usable recipe and an exact inventory change.

## What it does
ShelfShift tracks food batches by grams and entered date. Use Soon surfaces ingredients due within two days. Meal Studio scales seven curated recipes to the household and filters by eating preference and preparation time. Suggestions rank usable pantry grams, prioritize near-date food, and expose missing quantities. After cooking, a person can log a meal to deduct exact quantities, reopen the cooking journal, undo the last meal, and export or restore a JSON backup. No account or API key is required.

## How we built it
The static application uses semantic HTML, responsive CSS, and browser JavaScript modules. A pure engine allocates the earliest-date batches first, excludes expired stock, and scores each recipe as four times near-date grams plus other usable grams minus twice missing grams. Logging revalidates inventory and updates copied state. LocalStorage persists the pantry; backup validation rejects invalid weights, dates, duplicate batch IDs and malformed history. Eight Node tests cover these invariants. GitHub Actions runs tests and deploys the same static files to Pages.

## Challenges
Weight-based planning only works when units and state transitions are explicit. We distinguish dry grains from ready-to-eat chickpeas, scale every ingredient by people count, show incomplete recipes, and prevent logging missing stock. Impact claims were another challenge: logged consumption is evidence of app use, not a measured counterfactual waste reduction. The interface preserves that distinction.

## Accomplishments
A complete pantry-to-meal-to-journal flow, transparent ranking, exact batch deductions, one-step recovery, persistent local records, and an executable test suite. The sample pantry starts with ten ingredients and no fabricated history. A demonstrated pasta meal uses 600g of stock, of which 400g is near date; undo restores it.

## What we learned
A small deterministic system can make a useful recommendation when it makes its assumptions visible. A credible waste project also needs a way to separate observed use from hoped-for environmental benefit.

## What's next
Add a discarded-food diary, editable and custom ingredients, more recipes, and a small household pilot. Compare weighed discarded-food grams over a seven-day baseline and two post-adoption weeks, normalized by household meals. Track suggestion-to-cooking completion and planning time. No field study or reduction percentage is claimed yet.

## Specific waste problem and measurement
ShelfShift targets edible household food forgotten before its entered date, and unnecessary purchases caused by recipe-first planning. Its primary workflow starts with at-risk inventory, not a recycling label added to a general app. The prototype records self-reported total grams used and grams used within two days of the entered date. To measure actual effectiveness, compare weekly weighed food discarded before and after adoption, normalized by household meals. Current app usage metrics are proxies, not proof of waste prevented.

## Disclosure
Built in November 2026 with OpenAI Codex assistance for design, code, testing, documentation and demo preparation. The app uses deterministic ranking and does not call an AI model. The demo uses actual browser screenshots, sample inventory, simulated meal logging and labeled synthetic narration. It does not depict actual cooking or a field trial.
