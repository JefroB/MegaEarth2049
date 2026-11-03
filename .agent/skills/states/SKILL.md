---
name: states
description: Use when creating or modifying states (buffs, debuffs, status effects) in data/States.json for MegaEarth2049. Covers the JS vs notetag distinction, restriction/autoRemovalTiming/motion/overlay enumerations, traits array codes, YEP_BuffsStatesCore notetags, the placeholder state pattern, and a complete reference of all 43 named states with their IDs and mechanical effects.
---

For state icons and effect sheets, follow the shared [atlas-packing workflow](../graphics/references/atlas-packing.md). Complete silhouettes, declared gutters and per-cell runtime review are required before integration.

## ⚠️ JS vs Notetags — The Critical Distinction

| Location | IS JavaScript? | Context Variables | Notes |
|---|---|---|---|
| `<Custom State N Turn>` … `</Custom State N Turn>` | ✅ YES (Lunatic) | `turn` (writable int); full game scope | YEP_BuffsStatesCore; runs each turn the state persists |
| `<Custom Replace Attack>` … `</Custom Replace Attack>` | ✅ YES (Lunatic) | `id` (writable skill ID); full game scope | YEP_SkillCore; replaces Attack command while state active |
| `<Custom Add State>` … `</Custom Add State>` | ✅ YES (Lunatic) | `condition` (writable bool) | YEP_BuffsStatesCore; condition for auto-applying state |
| `<placeholder state>` … `</placeholder state>` | ⚠️ NOT EVALUATED | — | Game-specific pattern; JS-like code inside is NOT executed; used as design notes only |
| `<State Animation: N>` | ❌ NOT JS | — | Literal string; N = animation database ID; loops on affected battler |
| `<Reapply Add Turns>` | ❌ NOT JS | — | When state is reapplied to someone who already has it, add turns instead of reset |
| `<Reapply Ignore Turns>` | ❌ NOT JS | — | Ignore reapplication (don't extend or reset turns) |
| `note` field other notetags | ❌ NOT JS | — | Literal strings; parsed by regex |
| `traits[].code/dataId/value` | ❌ NOT JS | — | All values stored as numbers; no formula support |
| `restriction`, `autoRemovalTiming`, `motion`, `overlay` | ❌ NOT JS | — | Enumeration integers only |
| `minTurns`, `maxTurns`, `priority`, `successRate` | ❌ NOT JS | — | Integer fields only |
| `message1`–`message4` | ❌ NOT JS | — | Display strings; `%1`=actor name |

---

## States.json Field Reference

```json
{
  "id": 11,
  "name": "Diarrhea",
  "restriction": 0,          // Action restriction (see Restriction table)
  "autoRemovalTiming": 2,    // When to count turns for auto-removal (see table)
  "minTurns": 5,             // Minimum duration (turns or actions)
  "maxTurns": 5,             // Maximum duration; actual = random(min..max)
  "priority": 50,            // Display priority for overlay icon (higher = shown first)
  "motion": 0,               // Battler pose when state is active (see Motion table)
  "overlay": 0,              // Overlay icon index 0–7 (0=none; see Overlay table)
  "removeByDamage": false,   // If true, taking damage may cure this state
  "removeByRestriction": false, // If true, restriction change removes state
  "removeByWalking": false,  // If true, walking on map removes state (steps-based)
  "chanceByDamage": 100,     // % chance damage removes state (if removeByDamage: true)
  "message1": " has diarrhea, cha cha cha!",  // Applied to actor; NOT JS
  "message2": " has diarrhea!",               // Applied to enemy; NOT JS
  "message3": " has explosive diarrhea!",     // Persists (shown each turn); NOT JS
  "message4": " no longer has the shits.",    // Removed; NOT JS
  "note": "<State Animation: 133>\n<Reapply Add Turns>\n",  // Notetag string
  "traits": [
    {"code": 21, "dataId": 5, "value": 0.9},  // DEF rate 90% (−10% defense)
    {"code": 21, "dataId": 3, "value": 0.9}   // MDF rate 90% (−10% mag defense)
  ]
}
```

---

## Enumerations

### restriction (action restriction while state is active)
| Value | Effect |
|---|---|
| 0 | Normal — no restriction |
| 1 | Attack a random enemy (auto-attack, no skill choice) |
| 2 | Attack a random target (ally or enemy) — Confusion |
| 3 | Attack a random ally — Fascination |
| 4 | Cannot take any action — Knockout, Sleep, Stuck |

### autoRemovalTiming (when turns count down)
| Value | Meaning |
|---|---|
| 0 | Never auto-removed by turns (permanent until cured) |
| 1 | Action-end removal check; native turn counters still decrement at turn end. Verify actual duration with the active battle core. |
| 2 | Turn-end removal check after native counter decrement. A one-counter state applied mid-turn normally expires at that turn's end. |

### motion (battler sprite pose)
| Value | Pose |
|---|---|
| 0 | Walk (default upright pose) |
| 1 | Abnormal (leaning pose — used for most debuffs) |
| 2 | Sleep (lying down) |
| 3 | Dead (lying flat — used by Knockout) |

### overlay (icon displayed on battler sprite)
| Value | Icon |
|---|---|
| 0 | None |
| 1 | Poison (purple droplet) |
| 2 | Blind (wavy lines) |
| 3 | Silence (musical note X) |
| 4 | Rage (flame) |
| 5 | Confusion (swirl) |
| 6 | Fascination (heart) |
| 7 | Sleep (ZZZ) |

---

## Traits Array — Codes Used in States

Each trait entry: `{"code": N, "dataId": M, "value": V}` — ALL integers/floats, NOT JavaScript.

### code 11 — Element Rate (damage vulnerability)
`value` = multiplier (1.5 = 150% = takes more of that element; 0.5 = 50% = resists)
`dataId` = element ID (see system skill for element IDs)

| Example | Meaning |
|---|---|
| `{"code":11,"dataId":3,"value":1.5}` | Ice element hits for 150% damage |
| `{"code":11,"dataId":2,"value":1.5}` | Fire element hits for 150% damage |

### code 21 — Param Rate (base stat multiplier)
`value` = rate (0.9 = 90% of normal = nerf; 1.1 = 110% = buff)
`dataId` = param ID: 0=mhp, 1=mmp, 2=atk, 3=def, 4=mat, 5=mdf, 6=agi, 7=luk

| Example | Meaning |
|---|---|
| `{"code":21,"dataId":2,"value":1.2}` | ATK ×1.2 (20% boost) |
| `{"code":21,"dataId":5,"value":0.9}` | MDF ×0.9 (10% nerf) |

### code 22 — Ex-Param Rate (extended parameters)
`value` = additive modifier (−0.1 = −10%; +0.02 = +2%)
`dataId`: 0=HIT, 1=EVA, 2=CRI, 3=CEV, 4=MEV, 5=MRF, 6=CNT, 7=HRG (HP regen), 8=MRG (MP regen), 9=TRG (TP regen)

**Key use**: Poison/Bleed = `{"code":22,"dataId":7,"value":-0.1}` (negative HP regen = damage per turn)

### code 23 — Sp-Param Rate (special parameters)
`dataId`: 0=TGR(target rate), 1=GRD, 2=REC(recovery rate), 3=PHA, 4=MCR, 5=TCR, 6=PDR, 7=MDR, 8=FDR, 9=EXR

### code 14 — Special Flags
`dataId`: 0=Auto Battle, 1=Guard, 2=Substitute, 3=Preserve TP

### code 42 — Seal Skill Type
`dataId` = stypeId (1=Incantation, 2=Ability, 3=Tech, 4=Squad Attack, 5=Cheer)

### code 44 — Seal Skill
`dataId` = specific skill ID to block



---

## ⚠️ Mechanical Constraints — States Must Be Implementable

### The Core Rule

A state's described effect must map to real trait codes, restriction values, or Lunatic Mode JS blocks.
Flavor text in `message1`–`message4` and `description` is unlimited. The *mechanical effect* must use
actual engine primitives.

> ✅ "Hepatitis B: The classic post-waterpark souvenir. Reduces max HP by 10% per action."
> *(Flavor unlimited. Mechanic: `code 21, dataId 0, value 0.9` — MHP rate 90%)*

> ❌ "Quantum Sickness: Randomly teleports the afflicted between dimensions, skipping their turn 30% of the time."
> *(Probabilistic turn-skip is not a native state trait. Closest real option: restriction 4 = always can't act, or use `<Custom State N Turn>` Lunatic Mode JS to apply a restriction conditionally.)*

### What States CAN Do

| Mechanic | How to Implement |
|---|---|
| Restrict all actions (Paralysis/Sleep) | `restriction: 4` |
| Force random attacks on enemies (Berserk) | `restriction: 1` |
| Confusion (attack random target) | `restriction: 2` |
| Force attacks on allies (Fascination) | `restriction: 3` |
| Reduce/increase base stats | `traits[]` code 21 (param rate) |
| Damage per turn (Poison/Bleed) | `traits[]` code 22, dataId 7 (HRG negative) |
| Heal per turn (Regen) | `traits[]` code 22, dataId 7 (HRG positive) |
| Increase/decrease element vulnerability | `traits[]` code 11 (element rate) |
| Block a skill type | `traits[]` code 42 (seal skill type) |
| Replace the Attack command | `<Custom Replace Attack>` Lunatic JS in `note` |
| Loop animation on battler | `<State Animation: N>` in `note` |
| Extend state duration on reapplication | `<Reapply Add Turns>` in `note` |
| Auto-remove after N turns or actions | `autoRemovalTiming` + `minTurns`/`maxTurns` |
| Remove state when taking damage | `removeByDamage: true` |

### What States CANNOT Do

| Claimed Effect | Reality |
|---|---|
| Drain HP from target to caster each turn | No "drain on turn" trait; use Common Events via damage skill |
| Change the actor's appearance/sprite | Sprite changes require event commands, not states |
| Permanently change stats (forever) | Param rate only lasts while state is active; use Grow (effect code 32) for permanent |
| Trigger a skill automatically at turn start | No "auto-skill" trait natively; `<Custom State N Turn>` can call JS but is complex |
| Apply to enemies based on a formula | Inflicting states uses skill's `effects[]` code 41 with a fixed chance (0.0–1.0) |

---

## YEP Notetags for States

All notetag text in `note` is a literal string — NOT JavaScript — unless marked ✅ JS.

| Notetag | JS? | Plugin | Description |
|---|---|---|---|
| `<State Animation: N>` | ❌ NO | YEP_BuffsStatesCore | Loop animation ID N on the afflicted battler while state persists |
| `<Reapply Add Turns>` | ❌ NO | YEP_BuffsStatesCore | When state is reapplied, add new turns to remaining instead of resetting |
| `<Reapply Ignore Turns>` | ❌ NO | YEP_BuffsStatesCore | Ignore reapplication; don't add or reset turns |
| `<Custom State N Turn>` … `</Custom State N Turn>` | ✅ YES | YEP_BuffsStatesCore | JS block run each turn. `turn` var = current turn count. Modify to change duration. |
| `<Custom Replace Attack>` … `</Custom Replace Attack>` | ✅ YES | YEP_SkillCore | JS block; `id` var = skill ID to use instead of Attack. Set `id` to change the attack. |
| `<Custom Add State>` … `</Custom Add State>` | ✅ YES | YEP_BuffsStatesCore | JS condition block; `condition` bool determines if state auto-applies |
| `<placeholder state>` … `</placeholder state>` | ⚠️ NOT EVALUATED | (none) | Game-specific design note pattern; code inside is NOT run by engine |

### Lunatic Mode Examples from the Game

**State 19 "Hyped" — Custom Replace Attack (✅ IS JS):**
```javascript
<Custom Replace Attack>
var rand = Math.floor(Math.random() * 100);
  if (rand >= 95) {
    id = 3;          // 5% chance: use skill 3
  } else if ((rand >= 80) && (rand < 95)) {
    id = 4;          // 15% chance: use skill 4
  } else {
    id = 0;          // 80% chance: use normal Attack (id 0)
  }
</Custom Replace Attack>
```
`id` is the only writable variable here. Set it to any valid skill ID or 0 for default Attack.

**State 17 "test state" — Custom State Turn (✅ IS JS):**
```javascript
<Custom State 17 Turn>
turn = 5;   // Override: always 5 turns remaining
</Custom State 17 Turn>
```

**`<placeholder state>` pattern (⚠️ NOT EVALUATED):**
States 14 and 18 use `<placeholder state>` … `</placeholder state>` with JS-like conditional logic
inside the block. **This code is NOT executed by the engine.** It documents design intent for a
state selection mechanic (e.g., "if Diarrhea has ≥11 turns left, apply Dysentery instead").
To actually implement such logic, use a Common Event (effects[] code 51) or `<Custom Add State>`.

---

## MegaEarth2049 State Reference

### System States (IDs 1–3)
| ID | Name | restriction | Key traits | Notes |
|---|---|---|---|---|
| 1 | Knockout | 4 (can't act) | code 23 dataId 9 = EXR | HP=0 auto-applies; `motion: 3` (dead pose) |
| 2 | Guard | 0 | code 62 dataId 1 | Auto-removes after 1 action; guard stance |
| 3 | Immortal | 0 | code 14 dataId 1 | Used by action sequences to prevent death mid-combo |

### Standard Status Effects (IDs 4–10)
| ID | Name | restriction | Effect | removeByDamage |
|---|---|---|---|---|
| 4 | Poison | 0 | HRG −10% (damage per turn) | false |
| 5 | Blind | 0 | HIT −50%, lasts 3–5 turns | false |
| 6 | Silence | 0 | Seals Skill Type 1 (Incantation) | false |
| 7 | Rage | 1 (attack enemies) | No traits; lasts 2–4 turns | true |
| 8 | Confusion | 2 (random target) | No traits; lasts 2–4 turns | true |
| 9 | Fascination | 3 (attack allies) | No traits; lasts 2–4 turns | true |
| 10 | Sleep | 4 (can't act) | MMP −100%; lasts 3–5 turns | true |

### MegaEarth2049 Custom States (IDs 11–43)
| ID | Name | restriction | Key Effects | Notes |
|---|---|---|---|---|
| 11 | Diarrhea | 0 | DEF −10%, MDF −10%, anim 133 | `<Reapply Add Turns>`; 5 actions |
| 12 | Constipation | 0 | None (placeholder) | Unimplemented; no traits |
| 13 | Dysentary | 0 | All params ×0.5–0.75, anim 134 | Severe debuff; removes by restriction. ⚠️ Misspelled in source data ("Dysentary" not "Dysentery") — do NOT correct it, state ID references depend on the exact string |
| 14 | Dia/Dys | 0 | `<placeholder state>` | Design note state; NOT functional; see note |
| 15 | Barrier | 0 | DEF ×1.1, anim 139 | Physical defense boost |
| 16 | Regen | 0 | REC ×1.1, anim 137 | Increases recovery effect rate |
| 17 | test state | 0 | `<Custom State 17 Turn>` JS | Test/dev state; turn count locked to 5 |
| 18 | Hyped/Stoked | 0 | `<placeholder state>` | Design note state; see note |
| 19 | Hyped | 0 | ATK/MAT ×1.2, TRG/MRG +2%, `<Custom Replace Attack>` JS | 5-turn boost; replaces Attack randomly |
| 20 | Stoked | 0 | All stats boosted, `<Custom Replace Attack>` JS, immunity to state 19 | 15-action elite boost |
| 21 | Bummed | 0 | Immunity to state 19 (code 14 dataId 19?) | 3-action |
| 22 | Bleed | 0 | HRG −2% (slow HP loss) | Permanent until cured |
| 23 | Magic Barrier | 0 | MDF ×1.1 | Lasts 1–5 turns |
| 24 | Quarantine | 4 (can't act) | Removes skill types 1–4, features 1–2 | 2-action; cures disease conditions |
| 25 | Frostbite | 0 | Ice vulnerability ×1.5, DEF ×1.2, HRG −2% | Permanent until cured |
| 26 | Rabies | 2 (confusion) | HRG −2% | Lasts 3–7 actions; removes by restriction |
| 27 | Herpes | 0 | None (placeholder) | |
| 28 | Aids | 0 | None (placeholder) | |
| 29 | Gonorrhea | 0 | None (placeholder) | |
| 30 | Syphalis | 0 | None (placeholder) | Note: misspelled in data |
| 31 | The Clap | 0 | None (placeholder) | |
| 32 | Hepatitis B | 0 | MHP −10% | Lasts 1–15 actions |
| 33 | Stuck | 4 (can't act) | AGI vulnerability ×1.5 | 3-action |
| 34 | Soaked | 0 | Ice/electric vulnerability ×1.2×1.5; HRG −2% | Permanent until cured |
| 35 | Burn | 0 | Fire vulnerability ×1.5; LUK via HRG −2% | Permanent until cured |
| 36 | Shock | 0 | Electric vulnerability ×1.5; HRG −2% | Permanent until cured |
| 37 | Fever | 0 | None (placeholder) | |
| 38 | Sickness | 0 | None (placeholder) | |
| 39 | Hysterical | 3 (attack allies) | None | Lasts 1–5 actions |
| 40 | Windblown | 0 | Wind vulnerability ×1.5; HRG −2% | Permanent until cured |
| 41 | Blessed | 0 | Holy vulnerability ×1.5; HRG −2% | Permanent until cured |
| 42 | Vexed | 0 | Dark vulnerability ×1.5; HRG −2% | Permanent until cured |
| 43 | Protection | 0 | None yet | 5-action; likely barrier placeholder |

**Note on states 14 and 18 (placeholder states)**: These use `<placeholder state>` blocks containing
JS-like branching logic to choose between Diarrhea/Dysentery and Hyped/Stoked respectively.
The code inside is NOT evaluated by the engine. To make this mechanic real, a Common Event (effects[] code 51)
triggered by the skill would be needed.

---

## Adding a New State — Checklist

1. **Choose restriction**: 0=normal, 1=berserk, 2=confusion, 3=fascination, 4=paralysis/sleep
2. **Set autoRemovalTiming + minTurns/maxTurns**: 0=permanent, 1=turns, 2=actions
3. **Add traits[]** with appropriate codes (21 for stat rates, 22 for xparams, 11 for element rates)
4. **Set motion**: 0=walk, 1=abnormal, 2=sleep, 3=dead
5. **Set overlay**: 0–7 (existing icons only; no custom overlay without new sprites)
6. **For looping animation**: `<State Animation: N>` in note — N must exist in Animations database
7. **For attack replacement**: `<Custom Replace Attack>` Lunatic JS block — `id` var only
8. **message4** must say something; it shows when the state ends
9. **Mechanical effects**: must map to trait codes or Lunatic Mode JS (see constraints above)

*See also: skills (inflicting states via effects[] code 41/42), items (same), plugins (YEP_BuffsStatesCore full docs), system (element IDs for vulnerability traits)*
