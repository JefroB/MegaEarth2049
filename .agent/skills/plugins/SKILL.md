---
name: plugins
description: Use when writing JavaScript, notetags, plugin commands, or action sequences for MegaEarth2049's RPG Maker MV data files. PRIMARY PURPOSE: knowing what IS real JavaScript vs what is NOT in data file fields. Covers all 67 installed plugins (YEP, MOG, SRD, HIME). Includes damage formula context, Lunatic Mode JS blocks, action sequences (ActSeqPack1/2/3), Party Limit Gauge, AbsorptionBarrier, BuffsStatesCore, ItemCore, EquipCore, SkillCore, EnemyLevels, AnimatedSVEnemies, MessageCore text codes, QuestJournal commands, MOG weather commands, HIME placeholder states, and plugin load order.
---

For battle animation production, projectile arcs, on-screen sizing, impact timing, or Yanfly action-sequence integration, use [battle-animation](../battle-animation/SKILL.md). It covers active-plugin verification and testing against the existing custom boss stack.

## JS vs Notetag — The Critical Distinction

The most important thing when editing MegaEarth2049 data files: some fields are
evaluated as **real JavaScript**; most notetag content is **NOT JavaScript** — it is
literal text parsed by plugin code using regex pattern matching.

### What IS Real JavaScript

| Location | Context Variables | Notes |
|---|---|---|
| `damage.formula` in Skills.json | `a` `b` `v` `item` | JS expression, always returns a number |
| YEP Lunatic Mode blocks `<Custom X>` | Varies per plugin | See Lunatic Mode section below |
| YEP Plugin Manager parameters | JS expressions | e.g., Party Limit gain formulas |
| Event Script calls (command code 355) | Full game scope | `$gameParty`, `$gameTroop`, etc. |
| Action sequence `script:` prefix lines | Limited scope | Inline JS within sequence blocks |

### What Is NOT JavaScript

- Standard notetags: `<Ally Party Limit Gauge: +1>`, `<sideview battler: Name>`, `<skill_id:1>`
- Action sequence commands: `MOTION THRUST: user`, `CAMERA FOCUS: target, BASE, 30`
- Plugin commands in events: `weather : 12 : 500 : 0 :`, `clear_weather`
- Numeric values inside notetags: `<Barrier Points: 200>` — `200` is a string, not computed
- State turn counts, cost values, and percentage strings in notetags

**Rule:** If it is inside `<Custom LABEL>` ... `</Custom LABEL>` tags or in the
`damage.formula` field, it is JS. Everything else in the `note` field is a literal string.

---

## Damage Formula — IS JavaScript

Field: `damage.formula` in Skills.json. Evaluated as a JS expression that returns a number.

```javascript
// Available variables:
a       // Skill user (Game_Actor or Game_Enemy)
b       // Target (Game_Actor or Game_Enemy)
v       // $gameVariables._data array — use v[N] to get variable N
item    // The skill/item object

// Stat properties on a and b:
a.atk   a.def   a.mat   a.mdf   a.agi   a.luk
a.hp    a.mp    a.tp    a.mhp   a.mmp
a.level             // Actor level (actors only)

// Useful methods:
a.isStateAffected(stateId)    // true if battler has that state
a.buff(paramId)               // Current buff level (0=none)
a.element_rate(elementId)     // Element rate multiplier (1.0=normal)

// Common formulas in MegaEarth2049:
"a.atk * 4 - b.def * 2"           // Physical damage
"a.mat * 4 - b.mdf * 2"           // Magic damage
"a.atk * 2 + a.mat * 2 - b.def"  // Mixed damage
"1"                                // Fixed 1 (state-effect-only skills)
```

---

## YEP Lunatic Mode — IS JavaScript

Lunatic Mode blocks appear in the `note` field but ARE evaluated as JavaScript.
Syntax: `<Custom LABEL>` ... `</Custom LABEL>`

### YEP_BuffsStatesCore — State Lunatic Blocks

```javascript
// Available in all BuffsStatesCore lunatic blocks:
// user   = battler who has this state
// origin = battler who applied the state (may be null)

<Custom Turn Start Effect>
  user.gainHp(Math.floor(user.mhp * 0.05));  // Regen 5% HP each turn
</Custom Turn Start Effect>

<Custom Turn End Effect>
  // Runs at the end of each turn
</Custom Turn End Effect>

<Custom Action End Effect>
  // Runs after the state holder takes an action
</Custom Action End Effect>

<Custom Regenerate Effect>
  value = Math.floor(user.mhp * 0.1);  // value is applied as regen amount
</Custom Regenerate Effect>
```

### YEP_SkillCore — Skill Cost Lunatic Blocks

```javascript
// Available: user (actor using skill), skill (the skill object)

<Custom Cost>
  cost = user.level * 5;   // Custom MP cost
</Custom Cost>

<Custom Show>
  visible = user.level >= 10;  // Show/hide skill
</Custom Show>

<Custom Enable>
  enabled = $gameSwitches.value(5);  // Enable/disable skill
</Custom Enable>
```

### YEP_DamageCore — Damage Lunatic Blocks

```javascript
// Available: a (user), b (target), value (current damage value)

<Custom Damage Formula>
  value = (a.atk - b.def) * 2;  // value = final damage output
</Custom Damage Formula>

<Custom Confirm Effect>
  value += 50;  // Add flat 50 to damage on hit
</Custom Confirm Effect>
```

### YEP_X_ExtDoT — DoT Formula (IS JavaScript)

```javascript
// Tag syntax: <DoT formula: FORMULA> — FORMULA is JS, tag text itself is not
<DoT formula: a.mhp * 0.05>     // 5% max HP damage per turn
<DoT formula: 50 + a.atk>       // Flat 50 + user ATK

// Available vars in DoT formula: a (state holder), v (variables array)
```

### Action Sequence — Inline Script (IS JavaScript)

```javascript
// Use script: prefix inside action sequence blocks
<target action>
  script: target.setHp(Math.floor(target.hp * 0.5));
  wait: 30
</target action>
```

---

## Plugin Load Order & Status

Plugins must stay in this order. Do not reorder without testing.

### YEP (Yanfly Engine Plugins) — ENABLED

```
YEP_CoreEngine.js              // Required base for most YEP plugins
YEP_BattleEngineCore.js        // Battle system foundation; DTB; speed = agi
YEP_BattleStatusWindow.js      // Column-based status with face graphics
YEP_X_ActSeqPack1.js           // Action seq: mechanics commands
YEP_X_ActSeqPack2.js           // Action seq: visual commands
YEP_X_ActSeqPack3.js           // Action seq: camera commands
YEP_AbsorptionBarrier.js       // Barrier Points mechanic; barrier state ID=15
YEP_BuffsStatesCore.js         // Enhanced buffs/states
YEP_DamageCore.js              // Custom damage calculation
YEP_X_ArmorScaling.js          // Requires YEP_DamageCore
YEP_X_AnimatedSVEnemies.js     // Animated sideview enemies; Requires BattleEngineCore
YEP_X_SVEnemyFolder.js         // Organizes sideview enemy files in folders
YEP_ItemCore.js                // Independent items; StartingID=3000
YEP_EquipCore.js               // Custom equipment slots per class
YEP_X_ItemDiscard.js           // Requires YEP_ItemCore
YEP_X_ItemPictureImg.js        // Requires YEP_ItemCore; max 128x128 images
YEP_SkillCore.js               // Enhanced skill costs; 2 window columns
YEP_SkillLearnSystem.js        // Learn skills from menu
YEP_JobPoints.js               // JP system; text="JMU"; icon=188
YEP_MessageCore.js             // Enhanced messages; font size=28; rows=4
YEP_OptionsCore.js             // Expanded options menu
YEP_ShopMenuCore.js            // Revamped shop; order: Buy Sell Equip Custom Cancel
YEP_PartySystem.js             // Party mgmt; max battle members=4; cooldown=1
YEP_RowFormation.js            // 3 rows: Front/Middle/Back
YEP_X_PartyLimitGauge.js       // Shared party gauge; increments=100; no reset
YEP_VictoryAftermath.js        // Post-battle results window
YEP_X_AftermathLevelUp.js      // Requires YEP_VictoryAftermath
YEP_QuestJournal.js            // Quest tracking system
YEP_WeaponAnimation.js         // Custom weapon animations; default=swing
YEP_WeaponUnleash.js           // Special weapon trigger effects
YEP_EnemyLevels.js             // Enemy level scaling; min=1; max=9999
YEP_X_DifficultySlider.js      // Requires YEP_EnemyLevels; default=100%; min=50%; max=200%
YEP_X_ExtDoT.js                // Extended DoT; regen anim=46; DoT anim=59
YEP_X_InBattleStatus.js        // In-battle status screen; Requires BattleEngineCore
YEP_X_MessageBacklog.js        // Message backlog; access with Shift key
YEP_X_StateCategories.js       // State categories; Requires BuffsStatesCore
YEP_X_VisualHpGauge.js         // Enemy HP gauges; Requires BattleEngineCore
YEP_X_VisualStateFX.js         // State visual effects; Requires BattleEngineCore
YEP_LoadCustomFonts.js         // Custom font loading
YEP_CreditsPage.js             // Credits page in menu
YEP_BattleAniSpeedOpt.js       // Battle animation speed options
```

### YEP — DISABLED (do not enable without full configuration)

```
YEP_BattleBgmControl.js    // Not configured
YEP_X_NewGamePlus.js       // Not configured
```

### Other Plugins — ENABLED

```
MOG_ActorHud.js
MOG_BattleHud.js
MOG_BattleCommands.js          // Requires MOG_BattleHud
MOG_BalloonActionName.js
MOG_Weather_EX.js
SRD_HUDMaker.js
SRD_SummonCore.js
SRD_SummonBattlerImages.js
SRD_SuperToolsEngine.js
SRD_PluginUpdater.js
HIME_ActorBattleCommands.js
HIME_PlaceholderStates.js
ROKI_HealOnLvUp.js             // 100% HP/MP restore on level up
MrTS_EmergeAnimations.js
EnemyBook.js
ItemBook.js
WeaponSkill.js
AltSaveScreen.js
Community_Basic.js
GamepadConfig.js
Archeia_Steamworks.js
MadeWithMv.js
SergeofBIBEKActionSequenceProxy.js
SimpleMsgSideView.js
TitleCommandPosition.js
```

### Other — DISABLED

```
AltMenuScreen.js
```

---

## Action Sequences — NOT JavaScript

Action sequences are text commands written in skill `note` fields. They are parsed
by YEP_BattleEngineCore and the ActSeqPack plugins — **they are not JavaScript**.
Only lines with the `script:` prefix inside a sequence block are JS.

### Sequence Block Tags (NOT JS)

```
<setup action>      // Runs before any targets are hit
<whole action>      // Runs once for the whole skill
<target action>     // Runs per-target
<follow action>     // Runs after all targets processed
<finish action>     // Cleanup; repositioning
```

### ActSeqPack1 — Mechanical Commands (NOT JS)

```
action effect               // Apply skill effect to current target
action animation: ANIM_ID   // Play animation ID on current target
immortal: targets, true/false  // Prevent death during sequence
death break                 // Stop if target died
if dead: targets            // Conditional branch
clear battle log            // Clear the battle log display
wait for movement           // Pause until all movement done
wait for animation          // Pause until animation done
wait: N                     // Wait N frames
perform action              // Play actor's weapon swing anim
perform start               // Actor steps forward
perform finish              // Actor steps back
collapse                    // Enemy collapse animation
evade animation             // Play evasion animation
cast animation              // Play cast animation
```

### ActSeqPack2 — Visual Commands (NOT JS)

```
move target: user, base, N                // Move user to base position
move target: target, front base, N        // Move toward target front
move target: user, home, N               // Return to home position
motion attack: user                       // Play attack motion
motion thrust: user                       // Play thrust motion
motion spell: user                        // Play spell motion
motion skill: user                        // Play skill motion
motion escape: user                       // Play escape motion
motion dead: target                       // Death pose
motion wait: user                         // Wait/idle pose
animation: target, ANIM_ID               // Play animation ID
animation: target, ANIM_ID, mirror       // Mirrored animation
se: FILENAME, VOLUME, PITCH, PAN         // Play sound effect
bgm stop                                  // Stop BGM
opacity: user, 0, 30                      // Fade to invisible (N frames)
opacity: user, 255, 30                    // Fade to visible
tint screen: [R,G,B,GREY], N             // Screen tint (N frames)
shake screen: POWER, SPEED, N            // Screen shake
flash screen: [R,G,B,A], N              // Screen flash
zoom: X, Y, SCALE, N, MIRROR            // Camera zoom
```

### ActSeqPack3 — Camera Commands (NOT JS)

```
camera focus: user, base, N              // Focus camera on user
camera focus: target, base, N           // Focus camera on target
camera focus: user, head, N             // Focus on head position
camera clamp: on                         // Clamp to battle field edges
camera clamp: off
camera offset: X, Y, N                  // Offset camera position
camera reset: N                          // Reset camera to default
```

### Script Line in Sequence (IS JavaScript)

```
<target action>
  script: target.setHp(Math.floor(target.hp * 0.5));
  wait: 30
</target action>
```

---

## Per-Plugin Notetag Reference

### YEP_X_PartyLimitGauge — Notetags (NOT JS)

```
// On any regular skill or item:
<Ally Party Limit Gauge: +1>     // User's party gains +1 gauge increment (of 100)
<Enemy Party Limit Gauge: +1>    // Enemy party gains +1 gauge increment

// On Squad Attack skills (cost to use):
<Party Limit Cost: 1>   // Costs 1 increment (100 pts)
<Party Limit Cost: 2>   // Costs 2 increments (200 pts)
<Party Limit Cost: 4>   // Costs 4 increments (400 pts)
```

**Rule:** ALL regular skills in MegaEarth2049 have `<Ally Party Limit Gauge: +1>`.
Squad Attack skills (IDs 101–121) use `<Party Limit Cost: N>` instead.

### YEP_AbsorptionBarrier — Notetags (NOT JS)

```
// On states (to give barrier when state is applied):
<Barrier Points: N>                 // Apply N barrier points when state is applied
<Barrier Points: N%>                // N% of max HP as barrier points
<Barrier Points Formula: FORMULA>   // FORMULA is a JS expression (a=user, b=target)

// On skills (to give barrier directly):
<Barrier Points: N>

// On skills (to bypass barrier):
<Ignore Barrier>                    // Skill pierces all barriers

// On enemies (enemy barrier):
<Barrier Points: N>
```

**Barrier state ID in MegaEarth2049: 15**

Skills that apply barriers:
- Barrier (ID 46): `<Barrier Points: 200>` on the barrier state
- Magic Barrier (ID 47): `<Barrier Points: 200>` on barrier state
- Firewall (ID 52): `<Barrier Points: 100>` applied to all allies
- Rally (ID 24): `<Barrier Points: 150>` applied to all allies



### HIME_PlaceholderStates — Plugin Commands (NOT JS)

Placeholder states let you apply one of several possible states probabilistically.
These are set up via **Plugin Commands** in events, not notetags.

```
// Plugin command syntax (NOT JS):
assign_placeholder_state actor_id placeholder_state_id
assign_placeholder_state 1 14      // Actor 1 gets state from placeholder 14
assign_placeholder_state 2 18      // Actor 2 gets state from placeholder 18

// Placeholder state IDs in MegaEarth2049:
// State 14 = placeholder (maps to Diarrhea=11 or Dysentery=13 randomly)
// State 18 = placeholder (maps to another set of states)
```

### YEP_JobPoints — Notetags (NOT JS)

```
// On classes (JP gain per level):
<JP Per Level: N>         // Gain N JP each level up

// On skills (JP cost to learn via SkillLearnSystem):
<Learn JP Cost: N>        // Costs N JP to learn this skill

// On enemies (JP reward on defeat):
<JP: N>                   // Drop N JP when defeated
<JP: X to Y>              // Drop random JP between X and Y
```

JP text in MegaEarth2049 displays as "JMU" (icon ID 188).

### YEP_SkillLearnSystem — Notetags (NOT JS)

```
// On classes (which skills can be learned):
<Learn Skill: N>          // Skill ID N is learnable for this class
<Learn Skill: N, N, N>    // Multiple skills

// On skills (what it costs to learn):
<Learn JP Cost: N>        // JP cost
<Learn SP Cost: N>        // SP (gold) cost
<Learn Skill Cost: N>     // Another skill must be learned first
<Learn Require Level: N>  // Minimum level to unlock for learning
```

### YEP_EquipCore — Notetags (NOT JS)

```
// On classes (custom equip slot types):
<Equip Slot: SLOT_NAME>   // Add a custom slot by name

// On armors (which slot they fill):
<Slot Type: SLOT_NAME>    // This armor goes in SLOT_NAME slot
```

### WeaponSkill — Notetag (NOT JS)

```
// On weapons:
<skill_id:N>              // This weapon triggers skill N when equipped and attacking
```

### YEP_WeaponAnimation — Notetags (NOT JS)

```
// On weapons:
<Weapon Image: FILENAME>  // Spritesheet in img/system/ (no extension)
<Weapon Image: FILENAME, INDEX>  // If sheet has multiple weapons, use INDEX (0-based)
<Weapon Motion: MOTION>   // Override attack motion: swing thrust missile

// Default motion is 'swing' if not specified
```

### YEP_WeaponUnleash — Notetags (NOT JS)

```
// On weapons (trigger skills on attack):
<Weapon Unleash: SKILL_ID, CHANCE%>   // N% chance to use skill instead of attack
<Guard Unleash: SKILL_ID, CHANCE%>    // N% chance on Guard action

// On actors/classes/armors (passive unleash):
<Weapon Unleash: SKILL_ID, CHANCE%>
```

### YEP_X_AnimatedSVEnemies — Notetags (NOT JS)

```
// On enemies:
<sideview battler: FILENAME>     // Spritesheet name in img/sv_actors/ (no extension)
<sideview anchor x: N.NN>        // Horizontal anchor (default 0.5)
<sideview anchor y: N.NN>        // Vertical anchor (default 1.0)
<sideview width: N>              // Frame width in pixels
<sideview height: N>             // Frame height in pixels
<sideview frames: N>             // Number of animation frames (default 3)
<sideview rows: N>               // Number of motion rows (default 6)
<sideview scale: X, Y>           // Scale multiplier (1 = normal)
<sideview shadow>                // Show shadow under enemy
<sideview no shadow>             // Hide shadow
<sideview collapse>              // Use collapse animation on death
<sideview no collapse>           // Instant removal on death

// Motion overrides on enemies:
<sideview motion attack: MOTION_NAME>
<sideview motion walk: MOTION_NAME>
<sideview motion dead: MOTION_NAME>
// Valid motion names: walk, wait, chant, guard, damage, evade, thrust, swing,
//                     missile, skill, spell, item, escape, victory, dying, abnormal,
//                     sleep, dead
```

### YEP_EnemyLevels — Notetags (NOT JS)

```
// On enemies:
<enemy level: N>           // Fixed level
<enemy level: X to Y>      // Random level in range
<level param: PARAM, N>    // Override a stat at this level
                           // PARAM values: hp mp atk def mat mdf agi luk

// Static param notetag:
<static param: PARAM>      // This param does NOT scale with level
```

### YEP_X_StateCategories — Notetags (NOT JS)

```
// On states (assign to categories):
<Category: NAME>           // Add state to category NAME
<Category: NAME, NAME>     // Multiple categories

// On skills (remove states by category):
<Remove Category: NAME>    // Remove all states in this category from target

// Common categories used in MegaEarth2049:
// Negative, Positive, Undead, Stun, Poison, Barrier
```

### YEP_X_VisualStateFX — Notetags (NOT JS)

```
// On states:
<Visual State FX>
  type: EFFECT_TYPE
  color: [R, G, B, A]    // optional tint (0-255 each, A=opacity)
  animation: ANIM_ID     // optional looping animation
  motion: MOTION_NAME    // override actor motion while in this state
</Visual State FX>

// EFFECT_TYPE values: none, drip, bubble, smoke, glow
// MOTION_NAME values: walk, wait, chant, guard, damage, dying, sleep, dead, etc.
```


### YEP_RowFormation — Notetags (NOT JS)

```
// On actors (lock to a row):
<Row Lock: N>             // Actor always stays in row N (1=Front, 2=Middle, 3=Back)

// On skills (row restrictions):
<Row Only: N>             // Skill only usable from row N
<Front Row Only>          // Usable only from front row
<Back Row Only>           // Usable only from back row

// On skills (row-based damage multiplier):
<Row Bonus: MULTIPLIER>   // Not standard — check plugin docs
```

MegaEarth2049 uses 3 rows. Default actor row positions are configured in actor notetags.

### YEP_MessageCore — Text Codes (NOT JS)

These go inside dialogue message strings — they are parsed text, NOT JavaScript.

```
\c[N]       // Change text color to color N (from window skin palette)
\i[N]       // Display icon N inline
\n[N]       // Insert actor N's name
\p[N]       // Insert party member N's name
\v[N]       // Insert value of variable N
\{           // Increase font size
\}           // Decrease font size
\fs[N]      // Set font size to N
\fn[NAME]   // Set font to NAME (must be loaded by YEP_LoadCustomFonts)
\|           // Wait 1 second
\.           // Wait 0.25 seconds
\!           // Wait for button press
\>           // Instant text (start)
\<           // Instant text (end)
\^           // No wait after message closes
\oc[N]      // Change outline color to N
\|           // Wait 1 second
<Wordwrap>  // Enable word wrap for this message
```

### YEP_QuestJournal — Plugin Commands (NOT JS)

```
// Quest state management:
Quest Add QUEST_KEY              // Add quest to journal (sets to failed by default)
Quest Set QUEST_KEY to Active    // Make quest active/in-progress
Quest Set QUEST_KEY to Completed // Mark quest completed
Quest Set QUEST_KEY to Failed    // Mark quest failed
Quest Remove QUEST_KEY           // Remove from journal entirely

// Objective management:
Quest Set QUEST_KEY Objective N to Normal    // Reset objective N
Quest Set QUEST_KEY Objective N to Completed // Complete objective N
Quest Set QUEST_KEY Objective N to Failed    // Fail objective N

// Show/hide objectives:
Quest Show QUEST_KEY Objective N
Quest Hide QUEST_KEY Objective N
```

### MOG_Weather_EX — Plugin Commands (NOT JS)

```
// Start weather:
weather : TYPE : POWER : BLEND_MODE : FILENAME
// TYPE values: 0=None, 1=Rain, 2=Storm, 3=Snow, 4=Sakura, 5=Wind,
//              6=Sparkle, 7=Fire, 8=Fog, 9=Bubble, 10=Sand, 11=Smoke,
//              12=Custom (uses FILENAME)
// POWER: 1-9
// BLEND_MODE: 0=Normal, 1=Add, 2=Multiply, 3=Screen
// FILENAME: only for type 12; file in img/weather/ (no extension)

// Examples:
weather : 1 : 5 : 0 :        // Rain, power 5, normal blend
weather : 12 : 500 : 0 :     // Custom weather; power=500 (intensity)

// Stop weather:
clear_weather
```

### HIME_ActorBattleCommands — Configuration (NOT JS)

Actor battle commands are configured via plugin parameters, not notetags.
Each actor's command list is set in the Plugin Manager.

```
// MegaEarth2049 battle command configurations:
// Jen:          Attack, Squad Attack, Tech, Cheer, Item
// Zack:         Attack, Guard, Squad Attack, Ability, Tech, Cheer, Item
// Zed:          Attack, Guard, Squad Attack, Ability, Tech, Cheer, Item
// Black Ninja:  Attack, Guard, Squad Attack, Ability, Tech, Cheer, Item

// Note: Jen intentionally lacks Guard command (matches her aggressive personality)
```

---

## MegaEarth2049 Key IDs Reference

### Skill Types (System.json skillTypes array, 1-indexed)

```
1 = Incantation   // Magic-style skills
2 = Ability       // Special character abilities
3 = Tech          // Technology-based skills
4 = Squad Attack  // Party-wide limit gauge skills (IDs 101–121)
5 = Cheer         // Support/buff skills
```

### Element IDs (System.json elements array, 1-indexed)

Check `data/System.json` → `elements` array for current values.
Common elements: Physical, Fire, Ice, Lightning, Water, Earth, Wind, Dark, Light

### State IDs (States.json, key IDs)

```
11 = Diarrhea           // Debuff state
13 = Dysentery          // Worse debuff state
14 = Placeholder state  // HIME placeholder → maps to 11 or 13
15 = Barrier            // Absorption barrier state (YEP_AbsorptionBarrier)
18 = Placeholder state  // HIME placeholder → maps to other states
19 = Hyped              // Buff state
20 = Stoked             // Stronger buff state
```

### Squad Attack Skill IDs & Party Limit Costs

All Squad Attack skills are in IDs 101–121. Each has `<Party Limit Cost: N>`.

```
ID 101 = Social Engineering     <Party Limit Cost: 2>
ID 102 = Man in the Middle      <Party Limit Cost: 1>
ID 103 = Botnet                 <Party Limit Cost: 4>
ID 104–121 = (remaining squad attacks, costs vary: 1, 2, or 4)
ID 121 = Center                 <Party Limit Cost: 2>
```

All regular skills (non-squad-attack) must have `<Ally Party Limit Gauge: +1>`.

### Barrier Skills (apply Barrier state or barrier points directly)

```
Skill 46 — Barrier:       200 barrier points to self
Skill 47 — Magic Barrier: 200 barrier points to self
Skill 52 — Firewall:      100 barrier points to all allies
Skill 24 — Rally:         150 barrier points to all allies
```

---

*End of plugins skill. See also: skills, states, actors, classes, enemies, items, weapons, armors.*
