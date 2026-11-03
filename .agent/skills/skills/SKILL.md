---
name: skills
description: Use when creating or modifying skills in data/Skills.json for MegaEarth2049. Covers the JS vs notetag distinction (critical!), all skill fields, damage formulas, effects array, action sequence animation, mechanical constraints, and YEP notetag reference. Skills used in battle must be animatable. Includes scope, occasion, hitType enumerations.
---

For skill icons and packed effect art, follow the shared [atlas-packing workflow](../graphics/references/atlas-packing.md); a plausible-looking source grid is not crop validation.

For battle animation production, projectile arcs, on-screen sizing, impact timing, or Yanfly action-sequence integration, use [battle-animation](../battle-animation/SKILL.md). It covers active-plugin verification and testing against the existing custom boss stack.

## ⚠️ JS vs Notetags — The Critical Distinction

This is the primary purpose of this skill file. Kiro MUST know which fields are JavaScript and which are not.

| Location | IS JavaScript? | Context Variables | Notes |
|---|---|---|---|
| `damage.formula` | ✅ YES | `a`=user, `b`=target, `v[n]`=variable n, `item`=skill object | Full JS expression; `Math.floor()`, `Math.randomInt(N)`, `.clamp()` all valid |
| `<JP Gain: formula>` | ✅ YES | Standard JS math | YEP_JobPoints evaluates the string as JS |
| `<Custom X>` … `</Custom X>` | ✅ YES (Lunatic Mode) | Varies per block; typically `user`, `target`, `value` | YEP plugin-specific; see plugins skill |
| `script: myCode()` inside action seq | ✅ YES | Full game scope | ONLY the `script:` line; rest of action sequence is NOT JS |
| `note` field notetags (e.g., `<Ally Party Limit Gauge: +1>`) | ❌ NOT JS | — | Parsed by regex; literal strings only |
| `<Party Limit Cost: N>` | ❌ NOT JS | — | Integer N only; no math expressions |
| Action sequence commands in `note` | ❌ NOT JS | — | Text parser commands; NOT JS (except `script:` lines) |
| `effects[].code/dataId/value1/value2` | ❌ NOT JS | — | All integers; no formula support |
| `stypeId`, `scope`, `occasion`, `hitType` | ❌ NOT JS | — | Enumeration integers only |
| `message1`, `message2` | ❌ NOT JS | — | Display strings; `%1`=user name, `%2`=skill name |
| `description` | ❌ NOT JS | — | Display text in menus only |

---

## Skills.json Field Reference

```json
{
  "id": 127,
  "animationId": 128,         // 0=none, -1=weapon animation, N=Animations database ID
  "damage": {
    "critical": false,        // boolean — can this skill critically hit?
    "elementId": 0,           // -1=weapon element, 0=none, 1–9=element IDs (see system skill)
    "formula": "floor(a.atk * 4.5)",  // ✅ IS JavaScript
    "type": 1,                // 0=none, 1=HP dmg, 2=MP dmg, 3=HP heal, 4=MP heal, 5=HP drain, 6=MP drain
    "variance": 20            // integer; % randomization range applied to formula result
  },
  "description": "",          // Menu display text; NOT JS
  "effects": [],              // Array of effect objects; see Effects Array section
  "hitType": 0,               // 0=certain, 1=physical, 2=magical
  "iconIndex": 14,            // Icon ID from system iconset
  "message1": " uses %1!",   // Battle log line 1; NOT JS; %1=user name
  "message2": "",             // Battle log line 2; NOT JS
  "mpCost": 0,                // MP cost; integer
  "name": "Chew",             // Display name
  "note": "...",              // Notetag string; see Notetags section
  "occasion": 0,              // 0=always, 1=battle only, 2=menu only, 3=never
  "repeats": 1,               // How many times the effect applies; integer
  "requiredWtypeId1": 0,      // Required weapon type slot 1 (0=none); see system skill
  "requiredWtypeId2": 0,      // Required weapon type slot 2 (0=none)
  "scope": 1,                 // Target scope; see Scope table
  "speed": 0,                 // Turn order modifier; integer (higher = acts sooner)
  "stypeId": 2,               // Skill type ID (0=none, 1–5); gates which menu it appears in
  "successRate": 100,         // Base hit chance %; integer 0–100
  "tpCost": 10,               // TP cost; integer
  "tpGain": 0                 // TP gained by user when skill hits; integer
}
```

---

## Enumerations

### damage.type
| Value | Meaning |
|---|---|
| 0 | None (no damage/heal; use `effects[]` for HP/MP changes) |
| 1 | HP Damage |
| 2 | MP Damage |
| 3 | HP Recovery |
| 4 | MP Recovery |
| 5 | HP Drain (steal HP from target) |
| 6 | MP Drain (steal MP from target) |

### hitType
| Value | Meaning |
|---|---|
| 0 | Certain Hit (always connects) |
| 1 | Physical Attack (uses HIT/EVA stats) |
| 2 | Magical Attack (uses MEV stat) |

### scope
| Value | Targets |
|---|---|
| 0 | None |
| 1 | One enemy |
| 2 | All enemies |
| 3 | One random enemy |
| 4 | 2 random enemies |
| 5 | 3 random enemies |
| 6 | 4 random enemies |
| 7 | One ally |
| 8 | All allies |
| 9 | One dead ally (revive) |
| 10 | All dead allies (revive) |
| 11 | User only |

### occasion
| Value | Meaning |
|---|---|
| 0 | Always (menu and battle) |
| 1 | Battle only |
| 2 | Menu only |
| 3 | Never (system/hidden skills) |

---

## Effects Array

Each entry in `effects[]` uses four integer fields — **NOT JavaScript**:
`code` (effect type), `dataId` (target of effect), `value1`, `value2`

| code | Effect | dataId | value1 | value2 |
|---|---|---|---|---|
| 11 | Recover HP | 0 | Flat HP amount | % of max HP (0.0–1.0) |
| 12 | Recover MP | 0 | Flat MP amount | % of max MP (0.0–1.0) |
| 13 | Gain TP | 0 | TP amount | 0 |
| 21 | Add Buff | param ID (0–7) | Duration (turns) | 0 |
| 22 | Add Debuff | param ID (0–7) | Duration (turns) | 0 |
| 23 | Remove Buff | param ID | 0 | 0 |
| 24 | Remove Debuff | param ID | 0 | 0 |
| 31 | Special Effect | 0=escape | 0 | 0 |
| 32 | Grow (permanent param+1) | param ID | 1 | 0 |
| 33 | Learn Skill | skill ID | 0 | 0 |
| 41 | Add State | state ID | Chance (0.0–1.0) | 0 |
| 42 | Remove State | state ID | 0 | 0 |
| 51 | Common Event | event ID | 0 | 0 |

**Param IDs for buff/debuff/grow**: 0=mhp, 1=mmp, 2=atk, 3=def, 4=mat, 5=mdf, 6=agi, 7=luk

**Note on HP recovery**: `value1` is flat HP; `value2` is percentage (e.g., `value2: 1.0` = full heal).
Both apply simultaneously. Use `value1: 0, value2: 1.0` for a 100% max HP heal.



---

## ⚠️ Mechanical Constraints — Skills Must Be Implementable

### The Core Rule

Every skill's described effect must map to something the engine can actually do.
Flavor text in `description` is unlimited. Proposed mechanics must use real engine primitives.

> ✅ A skill can be *described* as "Rex hacks the enemy's brain implant, making it glitch."
> That flavor is fine. But the *actual mechanic* must be: HP damage + a state + a debuff.
> It cannot invent new systems that don't exist.

### Damage Formula (✅ IS JavaScript)

The `damage.formula` field is evaluated as JavaScript by the engine.

**Context variables:**
- `a` — skill user (Game_Battler): `a.atk`, `a.mat`, `a.mhp`, `a.hp`, `a.level`, `a.tp`
- `b` — target (Game_Battler): `b.def`, `b.mdf`, `b.mhp`, `b.hp`
- `v[n]` — game variable n: `v[1]` reads $gameVariables.value(1)
- `item` — the skill object itself (rarely needed)

**Valid JS in formula:**
```
"a.atk * 4 - b.def * 2"            // standard physical damage
"floor(a.atk * 4.5)"               // floor applied to result
"a.mat * 3 + Math.randomInt(50)"   // magic with random bonus
"(a.atk + a.mat) * 2 - b.def"     // hybrid stat formula
"100"                              // fixed damage
"0"                                // no damage (use effects[] instead)
"a.hp * 0.5"                       // damage based on user's current HP
```

**NOT valid in formula:**
- `$gameVariables.value(1)` — use `v[1]` instead
- Multi-line JS or semicolons — formula is a single JS expression
- Function calls that require game context outside `a`, `b`, `v`, `item`

### What Skills CAN Do

| Mechanic | How to Implement |
|---|---|
| HP damage / healing | `damage.type` 1 or 3 + `damage.formula`; or `effects[]` code 11 |
| MP damage / healing | `damage.type` 2 or 4 + formula; or `effects[]` code 12 |
| HP/MP drain | `damage.type` 5 or 6 |
| Inflict a state | `effects[]` code 41, dataId=state ID, value1=chance (0.0–1.0) |
| Remove a state | `effects[]` code 42, dataId=state ID |
| Buff a stat | `effects[]` code 21, dataId=param ID, value1=turns |
| Debuff a stat | `effects[]` code 22, dataId=param ID, value1=turns |
| Deal elemental damage | Set `damage.elementId` to element ID 1–9 |
| Gain TP | `effects[]` code 13, value1=TP amount; or `tpGain` field |
| Add Party Limit Gauge | `<Ally Party Limit Gauge: +1>` in note (NOT JS) |
| Consume Party Limit Gauge | `<Party Limit Cost: N>` in note + stypeId 4 |
| Trigger a Common Event | `effects[]` code 51, dataId=event ID |
| Absorb damage (barrier) | YEP_AbsorptionBarrier — apply barrier state to target |

### What Skills CANNOT Do (mid-battle)

| Claimed Effect | Reality |
|---|---|
| Change the actor's class | Class changes require event commands between battles |
| Transform enemy into a different enemy | No enemy substitution system |
| Spawn new enemies | Not natively supported |
| Equip or remove equipment from actors | Equipment changes via events only, not mid-battle |
| Directly control another party member's actions | Confusion state (restriction 2) is the closest available |
| Award experience or gold | Handled by battle end, not skill effects |

---

## ⚠️ Animation Constraint — Battle Skills Must Be Visually Animated

Any skill with `occasion: 0` (always) or `occasion: 1` (battle only) **must** have
a visual in battle. A skill with `animationId: 0` and no action sequence plays with
no feedback — this is a design problem.

### Option 1: Set animationId

Set `animationId` to a non-zero value from the Animations database:
- `0` = no animation (avoid for battle skills)
- `-1` = use the battler's weapon animation
- `N` = specific animation ID from the Animations editor

### Option 2: Action Sequences in note (YEP_BattleEngineCore + ActSeqPack2)

Write a full custom animation sequence. The sequence commands are **NOT JavaScript**
(text parser), except for `script:` prefixed lines.

**Minimal sequence template for a physical skill:**
```
<target action>
perform start
motion thrust: user
move user: target, front base, 20
wait for movement
attack animation: target
wait for animation
action effect: target
move user: home, 20
</target action>
<finish action>
perform finish
</finish action>
```

**AoE magic sequence template:**
```
<whole action>
animation N: targets
wait for animation
action effect: targets
</whole action>
```

### Option 3: Copy Another Skill's Sequence

```
<action copy: skill:11>
```
Copies ALL action sequence phases from Skill ID 11. Use when the animation is
visually similar to an existing skill.

### Action Sequence Phase Reference

| Phase tag | When it runs | Typical use |
|---|---|---|
| `<setup action>` | Before costs are paid; battler stationary | `display action`, `immortal: targets, true` |
| `<whole action>` | After costs; affects all targets at once | AoE animations, `animation N: targets` |
| `<target action>` | Per-target; runs once per target | Movement, hit, `action effect: target` |
| `<follow action>` | After all targets processed | Wrap-up effects, camera reset |
| `<finish action>` | Final cleanup | `immortal: targets, false`, `perform finish` |

### Key Action Sequence Commands

**IMPORTANT: These are text commands, NOT JavaScript.**

| Command | Plugin | Effect |
|---|---|---|
| `action effect: target` | ActSeqPack1 | Apply skill damage/states to target — REQUIRED |
| `action animation: target` | ActSeqPack2 | Play the skill's `animationId` on target |
| `attack animation: target` | ActSeqPack2 | Play battler's weapon animation on target |
| `animation N: target` | ActSeqPack2 | Play specific animation ID N |
| `wait for animation` | ActSeqPack1 | Pause until animation finishes |
| `wait for movement` | ActSeqPack2 | Pause until movement finishes |
| `wait: N` | ActSeqPack1 | Wait N frames |
| `motion thrust: user` | ActSeqPack2 | Play thrust motion (shows weapon) |
| `motion swing: user` | ActSeqPack2 | Play swing motion (shows weapon) |
| `motion skill: user` | ActSeqPack2 | Play skill-use motion |
| `motion spell: user` | ActSeqPack2 | Play spell-cast motion |
| `motion attack: user` | ActSeqPack2 | Auto weapon motion (thrust/swing/missile) |
| `move user: target, front base, 20` | ActSeqPack2 | Move user to target in 20 frames |
| `move user: home, 20` | ActSeqPack2 | Return user to starting position |
| `zoom: 120%, 20` | ActSeqPack3 | Zoom screen to 120% over 20 frames |
| `zoom: 100%, 20` | ActSeqPack3 | Return to normal zoom |
| `camera screen: target, front center, 20` | ActSeqPack3 | Move camera to target |
| `immortal: targets, true` | ActSeqPack1 | Prevent targets dying mid-sequence |
| `immortal: targets, false` | ActSeqPack1 | Allow death (use in finish action) |
| `display action` | ActSeqPack1 | Show skill name in battle log |
| `perform start` | ActSeqPack1 | Play battler's start motion |
| `perform finish` | ActSeqPack1 | Play battler's return motion |

**What you CANNOT do with action sequences:**
- Generate new visual effects not in the Animations database
- Play video or cutscene files mid-battle
- Spawn or remove battler sprites
- Call arbitrary plugin functions (use `script:` line for that, with caution)

---

## YEP Notetags for Skills

All notetag text in the `note` field is a literal string — NOT JavaScript — unless marked ✅ JS.

| Notetag | JS? | Plugin | Description |
|---|---|---|---|
| `<Ally Party Limit Gauge: +1>` | ❌ NO | YEP_PartyLimitGauge | Adds 1 to Party Limit Gauge when skill is used. Integer only. |
| `<Party Limit Cost: N>` | ❌ NO | YEP_PartyLimitGauge | Squad Attack gauge cost. N must be a literal integer. |
| `<JP Gain: formula>` | ✅ YES | YEP_JobPoints | JP earned on use. Formula evaluated as JS. Example: `100 + Math.randomInt(50)` |
| `<Cooldown: N>` | ❌ NO | YEP_X_SkillCooldowns | Turns before skill can be used again. Integer only. |
| `<action copy: skill:N>` | ❌ NO | YEP_BattleEngineCore | Copy full action sequence from skill N. |
| `<action copy: item:N>` | ❌ NO | YEP_BattleEngineCore | Copy full action sequence from item N. |
| `<Custom Apply Effect>` … `</Custom Apply Effect>` | ✅ YES (Lunatic) | YEP_SkillCore | JS block; vars: `user`, `target`, `skill` |
| `<Custom Confirm Effect>` … `</Custom Confirm Effect>` | ✅ YES (Lunatic) | YEP_SkillCore | JS block run on skill confirmation |
| `<Bypass Reflect>` | ❌ NO | YEP_SkillCore | Skill ignores magic reflection |
| `<Seal Skill Type: N>` | ❌ NO | YEP_SkillCore | Prevents target using skill type N (on states) |

---

## MegaEarth2049 Skill Patterns

### Skill Type (stypeId) Reference
| stypeId | Name | Key Skills |
|---|---|---|
| 0 | (System) | Attack(1), Guard(2), Escape(6) — built-in commands |
| 1 | Incantation | Priest magic spells (IDs ~8–39) |
| 2 | Ability | Most physical/special combat skills |
| 3 | Tech | Mod Doctor technology skills |
| 4 | Squad Attack | Party combo skills (IDs 101–121); ALL need `<Party Limit Cost: N>` |
| 5 | Cheer | Support/buff skills (IDs 202–223, to be added) |

### Key Skill ID Ranges
- **1–5**: System skills (Attack=1, Guard=2, Escape=6)
- **7–99**: Standard combat skills
- **100**: Separator entry (---Squad Attacks---)
- **101–121**: Squad Attack skills (stypeId 4; all need `<Party Limit Cost: N>`)
- **122–150**: Additional skills (Chew=127, etc.)
- **202–223**: Cheer skills (planned; IDs 202+ currently undefined in Skills.json)

### Standard Notetag Pattern — Regular Battle Skills
Every non-Squad-Attack battle skill should include:
```
<Ally Party Limit Gauge: +1>
<JP Gain: X + Math.randomInt(Y)>
```
Example from Guard (skill 2): `<Ally Party Limit Gauge: +1>` + `<JP Gain: 12 + Math.randomInt(10)>`

### Standard Notetag Pattern — Squad Attack Skills (stypeId 4)
```
<Party Limit Cost: N>
<JP Gain: 100 + Math.randomInt(50)>
```
Where N is the gauge cost (integer, NOT JS). `<JP Gain:>` formula IS JS.

### Real Example — Skill 127 "Chew" (Beastman ability)
```json
{
  "id": 127, "animationId": 128, "stypeId": 2,
  "damage": {"formula": "floor(a.atk * 4.5)", "type": 1, "elementId": 0},
  "scope": 1, "occasion": 0, "tpCost": 10,
  "note": "<setup action>\ndisplay action\nimmortal: targets, true\n</setup action>\n<target action>\nperform start\nend\nzoom: 120%, 20\ncamera screen: target, front center, 20\nwait for movement\nmotion attack: user\nwait: 10\nattack animation: target\nwait for animation\naction effect\n</target action>\n\n<Ally Party Limit Gauge: +1>"
}
```
Key points: `animationId: 128` + action sequence both set; `damage.formula` IS JS;
notetag `<Ally Party Limit Gauge: +1>` is NOT JS; action sequence commands NOT JS.

*See also: plugins (full YEP notetag/Lunatic Mode reference), classes (skill learnings), actors (battle commands), system (element/type IDs), states (state IDs for effects[])*
