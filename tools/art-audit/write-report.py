from pathlib import Path
import json,html
P=Path('tools/art-audit')
r=json.loads((P/'references.json').read_text())
report='''# Local art audit — 2026-11-01

## Priority findings

| Priority | Finding | Recommended work |
|---|---|---|
| 1 | Finished enemy animation sheets are not being selected by the current plugin setup. 102 enemy records contain Sideview Battler tags without a current ME override; 16 have direct map encounter/event references. | Restore compatible animated-enemy loading, then review the actual rendered enemies before commissioning replacements. |
| 2 | Map089, Basement room #4, event2 still uses `img/characters/poopoocaca.png`, the simplistic old poop map sprite. | Replace the overworld sprite to match the approved redesigned poop character; retain its finished battle art. |
| 3 | Field Mouse, enemy99, requests `rat8615651156`; that sheet is absent. `rat861565115.png` exists. No direct map usage found. | Verify the intended rat variant and correct the reference; likely no new art needed. |
| Optional | Graffiti Artist9 reuses SF_Thug, the same image as Thug3. | Consider a distinct artist design if encounter identity warrants it. The existing art is finished, not crude. |
| Future review | A.S.P. actor11/12 use Monster portraits and demon/dark-lord battlers. | Check these against the established story when implementing the endgame. Treat as possible thematic stand-ins, not confirmed missing art. |

## Runtime evidence

Loaded the real index.html and enabled plugins in Chrome, then instantiated native Game_Enemy / Sprite_Enemy objects. This checks actual bitmap selection, not just database filenames; it is not a full battle playthrough.

- Green Ninja12 selects `img/sv_enemies/Mimic.png` instead of greenninja.
- Grey Wolf33 selects `img/sv_enemies/Slime.png` instead of wolf-grey-sv_orig.
- Drone47 has no bitmap selected in the sample.
- PunkBoss117 selects `img/sv_enemies/Bat.png` instead of punkBoss1.

The enabled list has YEP_QuestJournal and six ME boss plugins, but no animated sideview enemy loader. PunkBoss's approved art is present and should be preserved. The recently rebuilt bosses have explicit ME rendering overrides; their fallback database images alone are not evidence of incorrect art. Spider78–82 also have ID-based overrides and are excluded from the 102 count.

See runtime.json, references.json and enemies.json for reproducible evidence and direct-use locations.

## Art reviewed and retained

The intended ninja, punk, animal, alien and soldier sheets generally look finished. Static enemy art and the character/face contact sheets did not reveal a broad pool of crude replacements. The current title uses the finished stock SF_City background; a bespoke title is an optional polish item. The pictures directory is empty, but no direct Show Picture filename references were missing in the scanned map events.

Preserve the approved PunkBoss and recently rebuilt Repossessor, poop family, SEAM, drone, spiders, custodians and Underwriter designs. This audit does not propose regenerating them.

## Scope and limits

Inventoried 1,665 PNG files and 132 named enemy records. Visually reviewed contact sheets of intended enemy first frames, static enemies, map-character sheets, face samples and title backgrounds. This is a triage audit, not every-frame animation QA or a visual review of every tileset, effect and battleback.

Checked file existence for actor graphics, map-event character graphics/dialogue faces/pictures, map battlebacks/parallaxes, database tileset filenames and the selected title. No missing files in those categories. Sideview enemy tags were checked separately and revealed Field Mouse above.

Direct use includes map random encounters, fixed troop battle commands and common-event battle commands. Scripted/variable selections, conditional reachability, plugin-selected files and full progression are not exhaustively resolved. Unreferenced records are not assumed to appear in a playable route. Portrait contact sheets sample the first cell, so a blank first cell alone is not a missing portrait finding.

The historical GitHub missing-art folder was not available locally and is not treated as current evidence. No game data, plugins or source artwork were changed during this audit.

## Reproduce

Run `python tools/art-audit/inventory.py`, `python tools/art-audit/check-references.py`, and `node tools/art-audit/check-runtime.js`. `render.js` renders the contact sheet HTML using the installed Playwright/Chrome environment.
'''
(P/'REPORT.md').write_text(report,encoding='utf-8')
files=sorted(p for p in P.glob('*.html') if p.name!='index.html')
(P/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>Art audit</title><style>body{background:#20282d;color:#eee;font:18px sans-serif;max-width:900px;margin:40px auto}a{color:#8fd5ff}li{margin:12px}</style><h1>Local art audit</h1><p>Priority: restore existing enemy sprite loading, replace the old poop map sprite, verify the Field Mouse filename.</p><p>Contact sheets are triage views, not animation playback.</p><ul>'+''.join('<li><a href="'+p.name+'">'+html.escape(p.stem)+'</a></li>' for p in files)+'</ul>',encoding='utf-8')
