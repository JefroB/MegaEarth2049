# A Thought of Her Own

Implemented A15's fourth companion chapter with native MV events, a training troop, two skills and a read-only Completion Log entry. No new runtime plugin.

`build.py` is a **one-time append-only installer**, guarded by exclusive `before.zip` creation and live ID counts. Do not rerun after installation. `before.zip` contains the prior database/maps, log source and IconSet. `manifest.json` records allocated IDs. `pack.js` is an idempotent Canvas placement of the complete isolated icon source into cell2129; no production raster is edited with Python.

Icon source was generated with imagegen on2026-11-02. Prompt: one isolated chunky pixel-art RPG icon, pink-violet brain in a dark steel circle, severed puppet-control thread overhead and tiny cyan circuit glint; restore one's own voice/clear confusion; transparent background, generous margins, no text/grid/glow. Original: `exec-7e70337a-e836-4d6a-bba8-95503e161076.png`. Workspace copy: `art/pink-story/own-voice-source.png`. `crops.json` uses the whole1254-square canvas, preserving even faint peripheral alpha. Target is26-square centered inside32-square; all old cells remain unchanged. Native32px/3× light/dark review is in the preview.

Run `node tools/pink-story/test.js` for40 native checks, both routes, escape/defeat/victory and two complete animated skill actions. The positive Directive Loop action uses a deterministic RNG fixture to demonstrate the native45% condition path; ordinary enemy selection retains its actual chance. Tests add recruited Pink and her credential only to isolated test fixtures, and do not write user saves. Battle tests are scoped, not a campaign balance certification.

Regression: `tools/hidden-dojo/test.js` passes64 checks including original trial UI, full silent route, care trial, battle outcomes and credential reward. `tools/completion-log/test.js` passes93 checks, including all31 entries' native geometry and read-only save compatibility. Prior IconSet cells compare unchanged on black/white composites; all non-event Dojo map properties compare unchanged against the snapshot. Atlas validator passes alpha0 margins for the source and exact runtime cell.

Jack's prospective chapter was deferred: no live recruitment was found in native actor additions or literal `addActor(9)` scripts. Pink uses the established recruitment and existing NeuraTech backstory. Remaining A15 companion stories are open.
