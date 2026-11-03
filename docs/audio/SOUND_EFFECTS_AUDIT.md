# Sound-effects audit

Audited November2,2026 against all251 maps, map/default movement routes, common and troop events,224 pre-existing animations, System sounds and13 enabled plugins. This is a sound-reference and focused native-playback pass, not a calibrated headphone/speaker listening certification of every recording.

## Library and reference findings

- **220 distinct SE names in438 files**;218 have Ogg/M4A pairs. Chainsaw1 and accept have Ogg only. There are also18 distinct ME names in36 files.
- All **474 existing SE/ME files decoded successfully** in Chromium. All220 Ogg effects were checked for duration, signal and silence; none was empty or had more than one second of leading silence. This does not certify every browser/device or replace listening-based mix approval.
- The initial scan found **three nonexistent Elevator references**, on Map001 events13/16/20. They now use the available Machine recording at reduced gain/pitch. The dedicated elevator set remains a production request below.
- The updated catalog has **zero unresolved literal audio references** across SE/ME/BGM/BGS. Dynamic JavaScript can select names, so this is bounded by the literal/default/caller scan; enabled plugin audio lines were reviewed separately.
- BGM/BGS/ME choices, original recordings, audio mixer configuration and user volume controls were retained. Existing sounds are not deleted merely because no static caller was found.

## Applied changes

- **261 physical-door pages:** quiet Door1/Door3 only immediately before an actual transfer inside its existing branch. Existing door cues/move-route sounds are retained. Locked/refused/cancelled choices do not gain a door sound. Ordinary world/room-boundary movement is not blanket-sonified.
- **42 successful interaction cues** plus three implant fittings: pickups, joke cards, paid clinic recovery, selected diagnostic/calibration commits and Dojo controls. Read-only revisits, failed tests, unaffordable services and cancelled choices retain their guards.
- **37 animation palettes differentiated**: physical cuts, stapler click, paper, poison, electrical disruption, armor latching/shattering, stone and recovery now use more fitting existing textures instead of universal Magic1/Heal1/Gun1. Existing cells, flashes and original timing frames are unchanged.
- **15 additional timed cues** cover bulldozer motor/contact, grenade toss/burst stages, DDOS, laser and paper launch. Grenade sounds start at the first burst-sheet frame rather than exploding at the beginning of the incoming flight.
- **Three audio-only native animations225–227** add a quiet corporate warning, clamp impact and scanner jam to12 suitable existing skills. They draw nothing and add only the native short animation wait. There is no new shared audio/battle plugin.

## Integration gaps that are not missing files

- Repossessor scan151 and reset154 have **scope0**. Stock cues could be used, but these need explicit action-log/controller integration rather than an animation-ID-only change. They were excluded from the applied-cue claims.
- Smoke Bomb76 still has animationId0 and choreography in inactive Yanfly notes. Sounds are now authored on the existing grenade animations, but those notes do not become playable merely because the animation has a sound. A native fallback or the separately scoped battle-core integration is required.
- Sprite art for SEAM’s needle, Duke’s register, MAX’s treads and boss phase changes does not automatically provide action/movement sound hooks. Deliver the matching recordings and wire their lifecycle deliberately; never play effects from every drawing update.
- Blank animations156–175 and unused legacy Diarrhea/Dysentery/Regen/barrier animations were not filled with arbitrary noise. Silence and unreferenced drafts are not automatically defects.

## Effects we need but have not identified in the catalog

The following proposed names are **requests**, not live game references. Stock approximations remain in place where usable. High/medium identity requests are separate from optional custom replacements and format-only work. Audition the library before commissioning any replacement.

| ID | Priority | Effect and use | Current coverage | Needed delivery / integration |
|---|---|---|---|---|
|SFX01|High|**Elevator start / travel / stop** — Beanstalk and explicit lift travel|Machine / Door3 stock approximation|Start/stop0.2–0.7s; travel loop0.8–1.5s, seamless. Literal Elevator references are repaired with Machine; no dedicated motor/cable/arrival set identified. Proposed: `ME_ElevatorStart`, `ME_ElevatorRun`, `ME_ElevatorStop`.|
|SFX02|High|**Rubber chicken squeak** — Executive/Union Rubber Chicken impact|Blow1 impact retained|0.2–0.7s rubber squeak; no animal voice or speech. Signature joke weapon currently has impact sound but no identified squeaker recording. Proposed: `ME_RubberChickenSqueak`.|
|SFX03|High|**Sewing machine and cloth feed** — SEAM-3000 needle, wheel and cloth attack|Existing slash/attack audio|0.5–1s needle loop;0.3–0.7s cloth pull. Needs an attack-timed cue, not a new sound on every rendered sprite frame. Proposed: `ME_SeamNeedleRun`, `ME_ClothFeed`.|
|SFX04|High|**Scanner / actuator charge / jam / reset** — Repossessor scan, charge and reset; clamp/jam identity|Hammer impact and Paralyze1 jam; scanner/reset still need wiring|Ping/reset0.2–0.5s; charge0.6–1.2s; jam0.2–0.5s. Skills151/154 have scope0. They require an explicit action cue; assigning an animation alone does not play it. Avoid repeated charge overlap. Proposed: `ME_ScannerPing`, `ME_ClampCharge`, `ME_ClampJam`, `ME_ActuatorReset`.|
|SFX05|Medium|**Wet body-horror impact / pathogen burst** — Organic miniboss attacks and disease applications|Poison/Liquid-type stock palette|0.15–0.6s; viscous flesh/pop, not toilet comedy. No identified bespoke visceral body/lesion recording; generic poison is a functional fallback. Proposed: `ME_WetImpact`, `ME_PathogenBurst`.|
|SFX06|Medium|**Cough / sneeze** — Influenza onset or explicitly authored sick NPC action|No substitute voice added|0.3–0.8s, restrained nonverbal performance. Trigger on an authored onset/action, not every dialogue line or every turn. Do not imply all STDs cause respiratory symptoms. Proposed: `ME_Cough`, `ME_Sneeze`.|
|SFX07|Medium|**Stapler clack / staple bite** — Pink-Slip/Tenured Stapler launch and impact|Switch1 replaces the gunshot|0.1–0.3s mechanical clack;0.1–0.25s metal bite. Switch1 is a click fallback, not a verified stapler recording. Proposed: `ME_StaplerClack`, `ME_StapleHit`.|
|SFX08|Medium|**MAX tread roll** — MAX-E-MUM walking motion|No continuous walking SE added|Short start/stop; seamless0.6–1.2s loop. Movement/stop/map-transfer/menu cleanup integration is required. Never restart a loop every animation frame. Proposed: `ME_TreadStart`, `ME_TreadLoop`, `ME_TreadStop`.|
|SFX09|Medium|**Distinct boss warning / phase break** — Custom boss telegraph and main-boss phase change|Computer warning on self-targeted warning actions|Warning0.25–0.6s; phase0.8–1.5s, restrained. Keep text primary; dedicated phase-transition cue still needs a controller hook. No vocal performance or music replacement is implied. Proposed: `ME_BossWarning`, `ME_PhaseBreak`.|
|SFX10|Optional polish|**Paper projectile outbound / return** — Terms & Conditions and Boomerang Invoice|Book1 page flick + existing impact|0.2–0.5s paper flap/flick with distinct return. Stock Book1 already covers the paper material; bespoke travel sound is optional polish, not a broken reference. Proposed: `ME_PaperThrow`, `ME_PaperReturn`.|
|SFX11|Optional polish|**Cash-register mechanism** — Deductible Duke chest-register action|Existing drain/impact animation audio|0.25–0.8s spring drawer / till rattle. Requires pose/action timing; do not fake it with an unrelated applause or cash reward cue. Proposed: `ME_RegisterOpen`, `ME_RegisterClose`.|
|SFX12|Optional polish|**Nanite swarm / plating latch** — Repair Swarm, Active Recovery and Install Plating|Recovery / Equip1|0.4–1s delicate assembly;0.15–0.4s armor latch. Existing stock cues are usable; dedicated technology textures are optional replacements. Proposed: `ME_NaniteSwarm`, `ME_PlatingLatch`.|
|FMT01|High for M4A-backend release|**Chainsaw AAC counterpart** — Animation125 chainsaw|Existing Chainsaw1.ogg|Transcode the existing recording; same content/duration. Missing format, not a missing sound recording. M4A delivery is still needed; the existing Ogg was not renamed or fabricated. Proposed: `Chainsaw1.m4a`.|
|FMT02|Low / unused asset|**Accept AAC counterpart** — Currently unreferenced library effect|Existing accept.ogg|Transcode only if retaining this asset for M4A-backend use. No current native caller was found; this is library/portability housekeeping. Proposed: `accept.m4a`.|

## Delivery and mix contract

For a new effect, supply licensed/owned source plus matching `.ogg` and `.m4a` exports with the exact same basename; do not rename one codec to imitate another. Prefer mono short one-shots,44.1/48kHz source, clean starts/tails and headroom. Loops need genuinely seamless boundaries and explicit stop/reset rules. Record creator/source/license alongside masters. Trim leading silence; compare at native game SE volume against existing assets before approving a mix.

The current changes use modest40–60 per-cue volumes, with lower launch/motor layers, and leave global volume alone. A full hearing-based mix pass is still needed across quiet dialogue, rapid attacks, multi-target overlap and different output devices. Current evidence verifies decoding, emitted playback calls and battle/event behavior, not perceptual loudness equivalence.

## Evidence and use

- [Audition library and change comparisons](../../art/audio/preview.html)
- [Machine-readable needed-effects list](../../tools/audio-audit/needed-effects.csv)
- [Exact changes](../../tools/audio-audit/changes.json), [inventory and callers](../../tools/audio-audit/audit.json), [codec decoding](../../tools/audio-audit/decode-validation.json)
- [Preservation proof](../../tools/audio-audit/preservation.json), [native audio/action checks](../../tools/audio-audit/runtime-validation.json), [tools and replay notes](../../tools/audio-audit/README.md)

The unfinished work is tracked as B16 in [the single roadmap](../../GameFAQs/ROADMAP.md). This report is its detailed asset/caller inventory, not another claim that all those sounds already exist.
