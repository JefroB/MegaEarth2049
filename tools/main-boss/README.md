# Main-boss controller and The Underwriter

Story authority: ../../STORY_PROGRESSION.md and the relevant sections of ../../MegaEarth2049_Story.md. This is a regional boss, not either final boss.

## Find the encounter

Planet Ork (Map028) -> Dorlund extraction works (Map060) -> The Unpaid Shift (Map114) -> Payroll Ossuary (Map115). Recover the existing erased crew roster; either disclosure choice qualifies. The executive claims hearing leads to Map238. Victory opens Map239, the Dorlund Claims Audit Archive. The original investigation, roster choice and reward remain intact. No route from the Core vestibule remains.

The Underwriter personifies the existing denial of compensation for the missing crews. The archive connects their twelve names to rejected injury claims and leaves Mags/the union to pursue restitution. It does not replace the Act3 scorpion Necklace guardian or change the final castle/A.S.P. sequence.

IDs: enemy151, troop60, skills176–184, switch174. Victory pays1500 credits once plus1800 native XP. Escape gives no reward. Defeat restores the party and permits retry/return. This is an initial balance pass; automated tests use a level20 party with healing between rounds to isolate mechanics, not establish campaign difficulty.

## Combat contract

| Attack | Phase | Warning / strike | Effect and response |
|---|---|---|---|
| Claim Denied | 1+ | 176 / 177 | Single marked target; Guard reduces damage |
| Herpes Fine Print | 1+ | 178 / 179 | Single marked target, 70% Parcel Fever (fictional existing state47, two turns); Guard reduces the hit but not the state chance |
| Open Enrollment Outbreak | 2 | 180 / 181 | Whole-party damage; party Guard, then recover |
| Premium Extraction | 2 | 182 / 183 | HP drain from marked actor; Guard reduces damage and therefore healing |
| Audit Recess | both | 184 | Recovery; no damage/healing |

Phase1 cycles slam then spit. At <=50% HP, phase2 latches and cycles outbreak, slam, siphon, spit. Each attack currently follows warning -> next-turn slow strike -> recovery. All significant actions use speed-2000; native Guard is fast. Exactly one meaningful boss action per turn, even if a state adds actions. Phase2 retains learned responses and adds party-wide defense and drain denial; it does not simply speed up the animation.

Threshold crossing is remembered until the current action ends, even if the boss heals within that action. Transition announces once, clears the previous warning explicitly and suppresses remaining boss actions that turn. The next round begins a new warning. Death wins normally: no HP clamp, forced resurrection or mandatory phase2. Healing after transition cannot revert it.

A strike requires the matching executed warning, exact due turn and valid marked target. Restrictions cancel charges. Missed due turns expire. Dead/removed targets cancel without silent retargeting. Forced phase2 moves in phase1 and unwarned strikes become harmless recovery. Warning/impact selection and damage belong to the native action queue; drawing frames never deals damage.

## Reuse and limits

Enabled plugin: js/plugins/ME_MainBoss.js, after existing ME plugins. Tag an enemy `<ME_MainBoss: Key>` and add a definition under `ME_MainBoss.definitions`. Fields include image, common scale, source rectangles/anchors/exclusions, named pose sequences with durations in engine frames, phaseAt, recovery skill, ordered phase attack cycles, and per-attack warning/strike IDs, minimum phase, target policy and text. The example implements two irreversible phases, one-round warnings, deterministic attack cycles and one meaningful action per turn. More phases, summons, cooldown systems, alternate transition resources or multiple simultaneous main bosses need deliberate extension and testing; they are not claimed implemented.

The Underwriter is organic. Six complete drawn poses supply idle, slam, spit, outbreak, siphon and transition/recovery. Named sequences combine those poses; these are deliberately economical pose animations, not six full smooth frame-by-frame clips. Native skill effects add impact animation. There is no separate damaged skin. Existing boss plugins and untagged enemies retain their own behavior. The map portrait uses only the idle source region and becomes a terminal after victory.

Source: art/bosses/underwriter/Underwriter.png. Installed copy: img/bosses/main/Underwriter.png. Preview and game use the same renderer. Registration is recorded in art/bosses/underwriter/registration.json. Alpha components were inspected independently; exact pose pixel counts verify that source exclusions preserve all six silhouettes without neighboring limbs. Visual review remains necessary for anatomy and motion quality.

## Verification

- `node tools/main-boss/test-main-boss.js`: native map battle escape/defeat/victory callbacks, one-time reward and archive transfer; eighteen real command-menu battle rounds through both phases; threshold, healed crossing, death, forced attacks, interruptions, target loss, expired warnings, extra actions and native Guard checks. See validation.json.
- `node tools/main-boss/test-art.js`: all six silhouettes and runtime pose review; see art-validation.json and pose-review.png.
- `node tools/main-boss/test-maps.js`: collision reachability and boss/terminal page graphics before/after victory.
- `node tools/main-boss/test-access.js`: locked, public, private and completed-quest access; return to Payroll Ossuary.
- Existing `tools/bosses/test_commands.js` and `tools/custodians/test-septic-idle.js` passed with the new plugin enabled.

Backups: before-main-boss.zip (original records) and before-regional-relocation.zip (task-local placement before user clarification). install.py and relocate-to-dorlund.py document the two installation steps; they are not safe regeneration commands. Do not republish old dungeon snapshots or rerun either over live edits.

Defeat art: UnderwriterDefeat.png is a separate complete prone corpse. Its fixed registration (scale0.24, anchor724/969) accounts for its higher source resolution; it is not resized dynamically per frame. The preview includes defeat at the end of the showcase. Native collapse holds the dead pose for90 frames, then fades for30, preserving the victory callback. Test: node tools/main-boss/test-defeat.js.
