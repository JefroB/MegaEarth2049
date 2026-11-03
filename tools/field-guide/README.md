# A07 execution

- [x] Fixed reference for64 public states and3 calibrated implants.
- [x] Derive effects, durations and native application/remover lists from live data.
- [x] Party condition counters and module inventory/equipped users.
- [x] Native menu, clinic and reusable Key Item routes; existing saves supported.
- [x] Keyboard/gamepad-native categories, entry list, scrollable detail pane and back.
- [x] Wrap all text; enlarge footer and inspect updated screenshots.
- [x] Correct Herpes/Queasy HP-drain trait IDs and test actual turn-end HP loss.
- [x] Verify mod-clinic services still work; document behavior and limitations.

Test:node tools/field-guide/test.js (43 checks). Related regressions:tools/mod-clinic/test.js (84), test-counters.js (7). Snapshot:before.zip. build.py is initial-construction/snapshot guarded; do not rerun on updated data. The plugin is read-only except granting one free guide when first opened; it adds no new persistent fields or combat hooks. All-entry overflow check and native entry/exit routes are exercised in the running game.
