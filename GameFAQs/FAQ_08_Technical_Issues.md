# MegaEarth 2049 — Technical issues

Jump to: [Current status](#documentation-audit-and-current-status) · [Closed repairs](#legacy-repair-record) · [Map audit](#map-placement-and-passage-audit) · [Completed A-register](#completed-additions-register) · [Test evidence](#feature-verification-and-art-evidence)

## How tested is the game?

Recent features have automated checks and battle previews, but those are not a complete campaign playtest. A missing sprite, stalled event or rendering error is a bug, not an intentional disease symptom. No hardware minimums, release-platform guarantees or performance statistics are asserted without measurements.

## Where are saves stored?

In the desktop NW.js build, the current storage code uses the **save/** directory next to the application's main module, with `fileN.rpgsave`, `global.rpgsave` and `config.rpgsave`. Browser play uses local storage for that browser origin. These are different save locations.

Back up the desktop save folder before replacing a build. Avoid clearing browser site storage if it contains saves. The engine has save-backup routines, but there is no verified cloud-sync service or universal `saves/backup/` recovery folder. Keep a separate copy rather than relying on imaginary recovery commands.

## Does F5 save, or F8 load/report bugs?

No. F5 reloads the desktop application and can lose unsaved progress. F8 opens NW.js developer tools when test mode permits it. Use the normal Save/Load interfaces. No tilde-console `unstuck` or `CompleteQuest` command is implemented.

## What settings are actually available?

The native Options window includes Always Dash, Command Remember, and BGM/BGS/ME/SE volumes. There are no verified volumetric-STD, neural-audio, shader-cache, corporate-translation or launcher-repair controls.

## What should I do about a crash, loading hang or missing image?

Record the exact error, location, action and build/files being used. Preserve the save before trying a different build. Check that referenced assets are present and their filenames match. Developers can inspect the console and the affected map/event/plugin. Do not disable antivirus, rename your operating-system account, delete configuration folders blindly, or use clothing changes as a repair procedure.

## What if I am stuck or a quest will not complete?

Reload a separate earlier save if available, and report the map, event or doorway, last dialogue/choice and relevant inventory. Developers should inspect passability, transfers and event conditions. Do not discard quest items or force switches as a generic fix. The transponder now boards the existing ship from the three supported world maps; it is unavailable inside dungeons.

## How do I report a bug?

Provide reproducible steps, expected/actual behavior, error text, a screenshot if useful, and a copy of the relevant save through your existing project communication channel. No official website, email address, Discord, in-game reporter or bug-bounty program has been verified for publication in this FAQ.

Evidence: `js/rpg_managers.js` StorageManager and SceneManager; `js/rpg_windows.js` Window_Options; `package.json`; active plugins in `js/plugins.js`.


## Documentation audit and current status

The November1 imported-FAQ audit covered13 source pages and 154 question sections; it was not a campaign playthrough. Fabricated modding/community material was removed. Original wording and the initial database are preserved in the audit snapshot (local snapshot: `../tools/faq-audit/before.zip`) and [original section index](../tools/faq-audit/original-sections.json).

The November2 consolidation keeps11 topical FAQs plus one unfinished-work roadmap. It absorbs completed-addition reports and walkthroughs, updates references, and renumbers Disease/Ninja/Body Modification as09/10/11. Pre-consolidation documents and migration evidence are retained under [tools/faq-cleanup](../tools/faq-cleanup/README.md).

Current scope:251 maps, actor13 MAX-E-MUM after the original12 actor records, unchanged starting party[1,3,4], and 38 Completion Log activities (25 projects,4 collections,9 encounters/trials). Custom boss controllers and native battle flow are active; installed Yanfly Battle Engine Core/action-sequence packs remain inactive. The enabled QuestJournal file contains descriptions without a working journal UI. Field Guide and Completion Log are separate implemented menus.

A01–A26 are complete only within their documented bounded scope. A15 covers one local chapter for each original companion actor2–10; A26 implements MAX-E-MUM, not every proposed character. Older absence findings about these now-finished features are historical, not current limitations. Move future work into a player FAQ only after its prerequisites, actual route/effects/rewards, exits and persistence are verified.


## Legacy repair record

R01–R06 below describe completed focused repairs. Subsequent additions extend these foundations; they are not open roadmap tasks.


- Transponder144 is menu-only and reusable. From worlds1/28/39 it boards existing ship50 at7,11. Navigation retains its existing destinations and castle progression is unchanged. Ownership matches existing berth checks; switch21 (Beanstalk Access) is not repurposed as a travel unlock. The old switch1 autorun is removed.
- Pink troop15 grants temporary death resistance at turn zero. At zero HP the existing dialogue recruits actor7 if absent, then removes resistance so victory proceeds. Starting party and existing saves retain their intended behavior.
- Canonical events: Map001/17 engine, Map002/23 shop, Map010/10 package and /11 researcher. Duplicate event IDs remain reserved with no pages. Completion guards honor either old self-switch, owned reward and engine switch12. Engine checks actual inventory, consumes128–131, grants132 and sets12; it no longer executes malformed script checks or adds accidental credits.
- States27–31 retain IDs and custom icons, gain modest three-turn traits, and clear after battle. Clinical Flush211 and Pathogen Purge157 remove all five. The subsequent A01 pass added ordinary application paths and named Acme cures without rewriting existing boss attacks.
- Empty-state audit: Rage/Confusion/Fascination/Hysterical use restriction mechanics; Dia/Dys14 and Hyped/Stoked18 contain scripted placeholder notes; test17 and unnamed44–46 are not public ailments. Constipation12, Fever37, Sickness38 and Protection43 have no native application callers and remain drafts rather than receiving invented behavior. Full inventory: tools/backlog-repairs/empty-state-audit.json.
- Debug-room skill no longer directs overwriting maps103/105/112 or fabricating chapter presets. It requires isolated saves, verified IDs/prerequisites and the existing floating-castle finale.
- Embedded journal descriptions now distinguish the cellar necklace from unimplemented regional-fragment assembly, remove unsupported payouts and ninja prerequisites, and label unimplemented clinic/device quests. The file contains no journal runtime/UI; building one remains separate work. No automatic quest-completion tracking is claimed.


The original repair suite records49 native checks, including actual Pink recruitment through victory. [Evidence](../tools/backlog-repairs/validation.json) · original snapshot (local snapshot: `../tools/backlog-repairs/before.zip`).


## Map placement and passage audit

Audited November 2, 2026 after the companion screenshots showed a player in a cliff face.

The initial248-map repair corrected209 shared flags,21 event positions and one landing. Current inventory:251 maps,197 person-event pages at156 coordinates,635 fixed transfers and 2148 used decoration/tileset combinations. The latest static scan reports no suspect people/landings or vertical-wall passage errors. The 2182-check native report belongs to the preceding250-map audit; separate MAX route tests cover the added gym. These are different evidence layers, not a251-map campaign playthrough.

### What was wrong

The screenshot fixture transferred the player to `(event.x,event.y+1)` and started the event directly. That proved dialogue execution, not a walkable approach. In the Cellar, that coordinate was a cliff face. The placement generator also selected any tile with an open passage edge, which admitted cliff caps and scenery corners.

There were separate shared passage problems: normal decorative tiles could override a blocked wall below them, and some solid console, furniture and counter pieces were marked as walking surfaces. Star/upper art is skipped by the native passage resolver; it is not itself a solid obstacle.

### Repairs

- **209 reviewed shared passage flags:** wall-mounted pieces defer collision to the wall, physical console/medical-furniture footprints block walking, and service counters both block movement and support counter interaction. Other flag metadata is retained.
- **21 event-coordinate corrections:** the new casing and Jack's contact; the navigator, engineer and sickbay staff; a wandering resident placed on a table; a resident too close to a roof edge; berth/elevator contacts over scenery; and legacy scientist, dealer and engine-component contacts outside bounds or over water. Duplicate legacy event IDs retain their conditions and commands.
- **One return destination:** the lava-area return to Dorlund now lands beside the original access console rather than inside a machine.
- **Two counter interaction points:** Thaw House and Canteen staff stand on the clear floor behind their two-tile counters. Invisible service points route the action to the original staff event, preserving all services and quest logic.
- **Live screenshot approach:** the companion test starts from known floor entries, walks with native collision, verifies floor/scenery at every step, and uses the action button to reach the intended event. The casing is on the Cellar entrance-chamber floor. Reviewed flat ground vegetation remains traversable; walls, cliffs and furniture are not admitted as generic floor.

No map artwork, tile painting, dimensions, tileset assignment, environmental setting, reward, recruitment condition or campaign gate was changed. The original quest lists are preserved; the only changed existing transfer command is the one corrected return.235 maps retain their original data unchanged. The shared flags can affect every map using their tilesets.

### Reviewed exceptions

The used vertical-wall autotiles themselves already had blocked direction bits. The error was chiefly decorative overrides and placement/fixture assumptions, not a reason to make every A4 tile impassable.

Door openings, rope/metal ladders, raised walkway overlays and the Floating Mansion's carpet threshold retain their passage behavior. A few authored maps use flat A4 textures as ordinary concrete or stone floor: the Internet Cafe exterior step, the open Dorlund arrival surface and Dorlund's stone floor. The five remaining heuristic transfer warnings from those surfaces were visually reviewed; none is a vertical wall face. The remaining normal scenery flags are not all errors merely because they permit passage: flat decals, foliage, floor features and openings require context.

The audit found no variable-based transfer commands, Set Event Location commands or person pages with Through enabled. Normal character movement continues to use the engine's collision rules. Arbitrary plugin behavior and every possible campaign sequence are outside this static placement check; this is not a full campaign playthrough.

### Evidence and prevention

- [Audit inventory](../tools/map-placement-audit/audit.json)
- [Exact flags, moves and exceptions](../tools/map-placement-audit/repairs.json)
- [2182 native all-map checks](../tools/map-placement-audit/validation.json)
- [Preservation checks](../tools/map-placement-audit/preservation.json)
- [Five clear-floor room captures](../tools/map-placement-audit/visual-validation.json)
- [166 companion checks,25 interactions and 145 floor-walking steps](../tools/companions-final/validation.json)

The original Dojo, Pink chapter, all four planetary travel/return routes, clinic, bounded collection/state content and Rivet local projects passed their relevant regression suites. The map and tileset skills now require rendered-footprint inspection, shared-flag usage review, correct bounds and a native walking approach for interaction screenshots.

[Placement preview](../art/map-placement/preview.html) · [Corrected companion preview](../art/companions-final/preview.html)


## Completed additions register

Original A-identifiers are retained for source/test traceability. These are completed scoped additions, not pending roadmap tasks.

| ID | Candidate and source FAQ | What exists / missing | Engine-appropriate implementation | Effort |
|---|---|---|---|---|
| A01 | **Implemented: STD application and Acme cures** | Items165–169 cure legacy27–31; samples173–177 and skills255–259 apply them | Ordinary enemy sources, two remedy shops, 50% boss state rates; all finite durations retained | Small–medium |
| A02 | **Implemented: bounded mod clinic** | Three prototypes calibrate into accessories62–64 at four existing counters | Visible component/credit costs; one each per party; free unequip and prototype return; native save compatibility; Third Eye reveal preserved | Medium |
| A03 | **Implemented: ninja specialties** | Actors5/6/7 each gain two personal techniques260–265 | Black disruption, Blue combat, Pink support; manual control and existing blade/throwing limits | Small–medium |
| A04 | **Implemented: Burlap quest payoff and clothing** | Researcher hand-in after SEAM; armors65–67 and safe clothing shops | Choose one garment +150 Credits once; old completions accepted, defeat retry preserved, no new SEAM outcome or animation changes | Medium |
| A05 | **Implemented: Clown Court case** | Timbuc bailiff, three connected court maps241–243, summons138 and pie139 | Ledger or mime defence, persistent good graces176, one-time250 Credits, engine clue; recess/retry and exits always available | Medium |
| A06 | **Implemented: Vending Machine Uprising** | Three diagnostic machines and SLF collective room244 | Confirm opt-in advice/co-op prices or disable module/supply payout; persistent policy, native shops and one-time rewards | Medium |
| A07 | **Implemented: Body & Firmware Field Guide** | 67 public state entries and 3 calibrated implants | Live effects/durations/cures, party conditions, scrolling native UI; menu, clinics and reusable Key Item178 | Medium |
| A08 | **Implemented: Green Herb / Panacea** | Items170/171 sold at the item shop and market pharmacy | Explicit cure lists; no KO, immortality or plot-quarantine removal | Small |
| A09 | **Implemented: fixed weapon upgrades** | Workshop108 tool librarian exchanges base weapons plus Credits for weapons73–75 | Chicken180, brick240, stapler220; unequipped inputs, no recursive upgrades; approved battle motions retained | Small–medium |
| A10 | **Implemented: Probably Not Poison** | Item172 and focused ME_DubiousPotion plugin | 50% heal150 HP; 25% restore30 MP; 25% temporary Queasy; one ally, battle-only | Small |
| A11 | **Implemented: Third Eye / filter route** | Underworks110 maintenance panel leads to optional supply annex240 | Third Eye reveals clean bypass; consume one Pathogen Purge for alternate filter route; unconditional exit, one-time cache, no campaign-gate changes | Small–medium |
| A12 | **Implemented: Hidden Dojo first trial** | Cafe/Matrix handshake after Pink recruitment; four connected maps245–248 | Visible alarm route, safe practice fight, care/protocol challenge; one bandana, credential and party EXP reward; Compiler identity remains unresolved | Medium |
| A13 | **Implemented: marked disease salvage** | Warning caches110/112/114 offer sterilization, resistance-aware exposure or safe refusal | Three existing diseases and cures; one-time caches, full-pack guard, no automatic contagion | Small–medium |
| A14 | **Implemented: Rivet crew standing** | Three finite deeds produce local standing0-3; existing recycling saves count | At2/3 Beryl offers10% off hardware; native selling/global prices and other shops unchanged | Medium |
| A15 | **Implemented: nine bounded companion chapters** | Zack, Jen, Zed, Pink, Black, Blue, Niles, Jack and Dick each have one playable chapter; missing recruitment paths now use explicit invitations | Existing story anchors, conscious walking-party checks, local outcomes, one-time rewards, native saves; protagonist/antagonists and A26 actors excluded. See [all chapters](FAQ_04_Characters_and_NPCs.md#companion-chapters). | Medium |
| A16 | **Implemented: six-part recycling** | Six unique sources103/105/108/110/112/114 and Beryl103 exchange | Consume one each for 250 Credits +1 Panacea once; capacity/cancel/save guards | Small–medium |
| A17 | **Implemented: archive sandbox puzzle** | Workshop terminal has isolate/copy/verify choices with hints and saved partial progress | Safe reset/retry,80 Credits +1 Energy Drink once; no code execution or timer | Medium |
| A18 | **Implemented: Workers Memory archive** | Splice collects workshop, canteen and SLF authorized records in any order | Public/crew-only outcome,180 Credits +1 Panacea once; existing privacy and SLF entry retained | Medium |
| A19 | **Implemented: off-clock collection** | Three joke cards, cookbook payoff, archived machine letter and reusable scrapbook | Existing NPCs/uprising outcomes; readable cards, exact counts, finite rewards and source clues | Small |
| A20 | **Implemented: The Perfect Fit** | Two linked fitting-room projections after the SEAM hand-in; original tape and mirror-maintenance clues | Native4-1-3 calibration, disconnected/opt-in outcomes, unconditional exits, guarded150 Credits +1 Panacea; no physics or OS effects. See [route](FAQ_06_Quests_and_Storylines.md#the-perfect-fit). | Medium |
| A21 | **Implemented: bounded combat states** | Paralysis77, Temporal Stasis78 and Stone Skin79; applications, removers and animations220–224 | Class/enemy paths, two pharmacy remedies, live Guide entries and boss hard-lock immunity; no Doom | Small–medium |
| A22 | **Implemented: two local outfits** | Wearable work/inspector pairs sold at Rivet clothing vendor; three NPC reactions | Same walking actor must wear both pieces; no reserve/split outfit trigger or quest bypass | Small–medium |
| A23 | **Implemented: three-bin sorting practice** | Three safe authored classifications, rules, hints and free retries | First perfect run pays150 Credits +1 Green Herb; deferred claim, free repeat practice without rewards | Medium |
| A24 | **Implemented: Rex chromatic skin** | Two matching face/walk/battle colour finishes at four existing clinics | Mint80 / Ultraviolet120 Credits once; free refitting/restoration, native previews, saved ownership, no stat changes. See [service guide](FAQ_11_Body_Modification_System.md#chromatic-skin). | Medium |
| A25 | **Implemented: Local Completion Log** | Native menu reads38 real optional-activity records from existing flags and current collections | Categories, route hints, pending rewards and scrolling; old-save compatible, read-only, no backend or reward farming | Medium |
| A26 | **Implemented: bounded MAX-E-MUM companion** | Iron Circuits gym, optional inspection/invitation, new actor/class and three support/combat abilities | Complete matching portrait/walk/SV art, rigid joint motion, save/Formation support; no automatic replacement/death/romance ecosystem or castle bypass. See [recruitment guide](FAQ_04_Characters_and_NPCs.md#max-e-mum). | Large |


## Feature verification and art evidence

| Feature | Evidence | Verified scope |
|---|---|---|
|Prototype calibration|[Report](../tools/mod-clinic/validation.json) · [tool files](../tools/mod-clinic/)|84 transaction/stat checks;7 counter integration checks|
|Named cures, weapons, ninja techniques and service annex|[Report](../tools/high-value-additions/validation.json) · [tool files](../tools/high-value-additions/)|107 focused checks;27 full actions;8 pharmacy purchases in visual evidence|
|Burlap payoff|[Report](../tools/burlap-quest/validation.json) · [tool files](../tools/burlap-quest/)|39 checks including defeat/retry/victory and hand-in|
|Clown Court|[Report](../tools/clown-court/validation.json) · [tool files](../tools/clown-court/)|61 checks and actual case flow|
|Vending uprising|[Report](../tools/vending-uprising/validation.json) · [tool files](../tools/vending-uprising/)|65 checks;12 purchases and town-access checks|
|Field Guide|[Report](../tools/field-guide/validation.json) · [tool files](../tools/field-guide/)|43 mechanics/UI checks|
|Collections, states and outfits|[Report](../tools/bounded-additions/logic-validation.json) · [tool files](../tools/bounded-additions/)|159 logic checks;11 full actions and 48 atlas cells in companion reports|
|Rivet local projects|[Report](../tools/local-projects/validation.json) · [tool files](../tools/local-projects/)|84 checks plus live routes and discounted shop purchase|
|Hidden Dojo|[Report](../tools/hidden-dojo/validation.json) · [tool files](../tools/hidden-dojo/)|Native movement, alarm, care and battle outcomes; separate access checks|
|Zack chapter|[Report](../tools/zack-story/validation.json) · [tool files](../tools/zack-story/)|76 checks plus free/paid live routes|
|Jen chapter|[Report](../tools/jen-story/validation.json) · [tool files](../tools/jen-story/)|78 checks plus clinic walking/consent/care routes|
|Zed chapter|[Report](../tools/zed-story/validation.json) · [tool files](../tools/zed-story/)|58 checks including earn/purchase/free-calibration flow|
|Pink chapter|[Report](../tools/pink-story/validation.json) · [tool files](../tools/pink-story/)|Both routes, three fight outcomes and full skill actions|
|Other five original companion chapters|[Report](../tools/companions-final/validation.json) · [tool files](../tools/companions-final/)|166 checks, invitations and native walking/action routes|
|Perfect Fit|[Report](../tools/illusion-room/validation.json) · [tool files](../tools/illusion-room/)|49 checks and full walking/policy/reward route|
|Completion Log|[Report](../tools/completion-log/validation.json) · [tool files](../tools/completion-log/)|93 model/native UI checks, now 38 activities|
|Rex chromatic skins|[Report](../tools/cosmetic-skins/validation.json) · [tool files](../tools/cosmetic-skins/)|35 state/loading/pixel/clinic checks; three native battles in battle-validation.json|
|MAX-E-MUM|[Report](../tools/max-e-mum/validation.json) · [tool files](../tools/max-e-mum/)|36 recruitment/save/mechanics/walking/Formation checks;6 battle checks,67 runtime art cells and four moving tread directions|

Reports are scoped fixture results, not release-wide guarantees. Preserve manifests, original snapshots, measured crop rectangles and atlas reports with the tools. Generated icon/animation art uses exact runtime-cell review on contrasting backgrounds; do not cure neighbouring fragments by deleting disconnected pieces or cropping through limbs/cables. Mechanical sprite geometry stays registered. The clapping-hands disease icon intentionally remains as a pun. Previews and production files remain under `art/` and `img/`.

The static map audit recorded a separate unresolved Golden Gear duplicate-event/variable51 conflict. It was not repaired by moving contacts onto floor. See [roadmap repair priorities](ROADMAP.md#repair-priorities).

## Sound-effects audit

The sound pass catalogued220 effects, decoded all474 SE/ME files, fixed three nonexistent Elevator references, and added quiet guarded interaction/door cues and more appropriate battle palettes. Dedicated sound assets and codec gaps remain explicit production requests. See [the full sound audit and audition page](../docs/audio/SOUND_EFFECTS_AUDIT.md) and roadmap B16; stock fallback coverage is separate from new recordings still needed.
