# Sound-effects audit and integration

[Audit report / production needs](../../docs/audio/SOUND_EFFECTS_AUDIT.md) · [Audition page](../../art/audio/preview.html) · [CSV](needed-effects.csv).

`audit.py` scans the live audio library, System defaults, all map/common/troop commands and movement routes, animation timing sounds and enabled plugin audio lines. `audit-before.json` preserves initial findings; `audit.json` is the post-pass inventory. Only literal/default references are statically enumerable; arbitrary JavaScript names are not assumed exhaustive. Unused assets and silent drafts are not automatically mistakes.

`apply.py` is an already-applied one-time sound pass, guarded by the pre-pass animation count and exclusive `before.zip`. Do not rerun over live data or force past the snapshot guard. It adds SE commands within existing success/transfer branches, repairs missing Elevator names with a stock Machine fallback, adjusts existing animation sound choices, adds native visual-free animations225–227 and opts12 targetable skills into them. Original animation cells, original timing frames/flashes, targeting/effects and event logic remain intact. Native audio-only animations add a short normal animation wait. No shared runtime plugin is added.

Scope0 Repossessor scan151/reset154 are deliberately excluded: target animations do not run without targets. Charge loops, phase-change stingers, MAX movement loops and SEAM/register foley need explicit lifecycle hooks when their dedicated recordings are delivered. Smoke Bomb76 still relies on inactive Yanfly notes; cues authored on grenade animation assets do not make those notes active.

## Evidence and replay

- `before.zip`: original data JSON files; do not restore wholesale over later work.
- `audio-hashes.json`: all existing audio-file hashes; recordings remain byte-identical.
- `changes.json`: exact map/page, skill and animation changes, including deferred integration.
- `python tools/audio-audit/audit.py`: refresh inventory/callers; expected unresolved literal references0.
- `node tools/audio-audit/decode.js`:474 existing SE/ME files decoded through Chromium Web Audio, including M4A; not a Safari-device certification.
- `python tools/audio-audit/quality.py`: Ogg signal/duration/silence metrics; these do not establish perceptual mix quality.
- `python tools/audio-audit/preserve.py`:267 preservation checks across original databases/events/visual fields/audio recordings.
- `node tools/audio-audit/runtime.js`: native walk/action door cancellation/transfer, unpaid/paid clinic service, wrong/completed diagnostic guards, full battle actions and actual emitted audio calls. Fixture party/item changes are in memory only; no user saves are written.
- `node tools/audio-audit/preview-test.js`: responsive audition page, filtering and actual sample playback; all referenced report/CSV assets load.

Regressions: `tools/main-boss/test-main-boss.js` passes phase/charge/guard/outcome/reward/archive checks; `tools/custodians/test-battle.js` completes all six warning/strike/recovery rounds; `tools/bosses/test_boss.js` verifies scan/charge/clamp, interrupts, registration and all map outcomes. Their evidence files remain in those folders.

The14 production requests are12 dedicated sound families (three optional custom replacements) and2 format-copy tasks. Proposed names are not live asset references. Existing stock fallbacks are explicitly identified rather than represented as custom recordings. See roadmap B16 for remaining work.
