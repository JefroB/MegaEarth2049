# A15 — final existing-companion chapters

`build.py` is an append-only, one-time installer guarded by live switch counts and exclusive `before.zip`. **Do not rerun after installation.** It snapshots all11 touched maps, System and Completion Log. `finalize.py` is an idempotent prose polish for this batch's new contact messages. No new actor, map, item, skill, state, battle, runtime plugin or artwork is created.

`manifest.json` records five chapter configurations, exact task/contact coordinates, native switch reservations229–258 and rewards. Explicit invitations add existing actors5/6/8/9/10 with native129 and `initialize=false`. Existing memberships are honored. Four prior chapters plus these five finish A15's one-chapter-per-existing-companion scope. Actor1 is the protagonist;11/12 are antagonist-only; proposed new actors remain A26.

Each new chapter requires an explicit acceptance, two sequenced posted-rule checks, a final persistent local decision and a capacity-checked one-time personal reward. State and dialogue are native MV commands. Recruitment never resets an actor or changes party order. Formation is required for reserve companions. Completed task consoles use existing green switch sprites; an in-party contact displays its crew station instead of a duplicate walking actor.

Verification:

- `test.js`:166 checks and all five live native invitation/task/resolution flows, both outcomes, reserve/KO guards, save/retry, full capacity/deferred payment, exact200 personal EXP, no duplicate rewards, earlier campaign flags, native map reachability, message/font geometry and36-entry log.
- `battle-test.js`: all five existing sideview assets load and complete a native Attack action; the native Formation menu moves reserve Jack into the walking party.
- `travel-test.js`: fixture assumes the intro is already complete (variable2=-1) and the reusable transponder owned. Actual navigation from the Marcus Garvey2.0 spaceship to each of four existing planetary maps and return via its existing berth; reusable transponder and Jack remain aboard.
- `preservation.json`: original tiles/settings/events on all11 maps match the snapshot; the Blue instructor's old practice and Pink branches are exactly preserved.
- Prior suites: Zack76, Jen78, Zed58, Pink41, original Dojo68, Completion Log93. Added event reachability checks account for increased Dojo/Pink totals. No user saves are written.
- `preview-validation.json`: game-canvas captures are816×624 and preview fits360/600/1000px without horizontal overflow or aspect distortion.

Tests use isolated runtime fixtures, deterministic choices and direct event starts; map reachability is checked using native tile/event collision. They are not a full campaign playthrough or whole-party balance certification. Existing planet travel, ship ownership, bosses, Necklace and final castle route remain separate.

See `GameFAQs/FAQ_04_Characters_and_NPCs.md#companion-chapters` and `art/companions-final/preview.html`.

Subsequent floor audit: see `tools/map-placement-audit/` for shared collision fixes, revised positions and the one return landing. The current companion test walks145 floor steps through25 native action interactions instead of transferring directly below NPCs. The original preservation report predates that explicit placement correction; current map tiles and quest commands are covered by the newer audit preservation report.
