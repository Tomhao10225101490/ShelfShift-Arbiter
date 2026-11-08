# Verification

Eight Node tests pass: year-boundary date arithmetic, expired-stock exclusion, portion scaling, exact inventory deduction without mutation, missing/stale stock rejection, dietary/time filters, earliest-date batch allocation, and malformed backup rejection.

Native Chrome QA verified: empty first-run state; sample pantry has 10 ingredients and 4 near-date ingredients; recipe inspection for roasted tomato pasta uses 200g pasta + 300g tomato + 100g spinach; logging shows 0.60kg used and 0.40kg near date; undo restores the original quantities and 0.00kg journal; browser refresh retains the pantry.

The demo uses sample inventory and simulated meal logging to demonstrate the software. No actual cooking or field study is claimed. Film frames are actual browser screenshots, with synthetic narration and explanatory captions.

Run locally: `npm run dev`; open http://localhost:8766. Test: `npm test`. Public demonstration is deployed by the Pages workflow from dist/.

Limitations: 7 curated recipe templates, 12 ingredient types, manual weights/dates, localStorage on a single browser, no proven waste-prevention outcome. Suggested evaluation: weighed discarded-food baseline and post-adoption comparison normalized by meals.
