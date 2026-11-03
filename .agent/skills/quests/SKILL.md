---
name: quests
description: Use when creating, modifying, or debugging quests in MegaEarth2049. Covers RPG quest design principles, MegaEarth2049 quest patterns, YEP_QuestJournal plugin integration, switch/variable allocation, event scripting conventions, item assignment, and the pre-submit testing checklist.
---

## What Makes a Good RPG Quest

Before touching a single event, anchor every quest to these principles:

### Narrative Hook
- Open with a clear **why**: what does the NPC want, and why should the player care?
- Tie the hook to MegaEarth2049's core themes: corporate control, cybernetic body modification, post-Earth survival satire.
- Great hooks introduce personal stakes (survival, loyalty, greed) rather than generic "collect 3 things."

### Player Agency
- Offer at least **two approaches** to a major obstacle (combat vs. stealth, persuasion vs. hacking, etc.).
- If only one path exists, at least let the player express attitude through dialogue choices.
- Consequential choices — ones that visibly change something in the world or a relationship — massively increase replay value.

### Pacing Triangle
Every satisfying quest mixes three activities in rotation:

| Activity | Examples |
|---|---|
| Exploration | Finding hidden rooms, reading lore objects, entering restricted areas |
| Combat/Challenge | Boss fights, enemy gauntlets, skill checks, hacking mini-games |
| Social/Narrative | NPC conversations, moral choices, cutscene reveals |

A quest that is *only* combat or *only* fetch feels thin. Aim for at least two categories.

### Clarity Without Hand-Holding
- The first journal objective must tell the player WHERE to go and WHAT to do.
- Subsequent objectives appear progressively — never dump all steps at once.
- Lore and hints in subtext entries; critical instructions in objective text.

### Reward Proportionality
| Quest Size | Appropriate Rewards |
|---|---|
| Minor side quest | 100–300 EXP, consumables, access to a new area |
| Major side quest | 300–600 EXP, a unique item, minor stat boost |
| Character recruitment | Party member + class abilities |
| Main story quest | Story progression, unique key items, significant stat changes |

---

## MegaEarth2049 Quest Types & Established Patterns

### Main Story Quests (IDs 1–10)
Drive the A.S.P. / neural-implant central narrative. Must connect to Rex's arc. Typically multi-map and multi-phase.

### Character Recruitment Quests (IDs 11–30)
Follow the **Jen Pattern**:
1. NPC has a personal problem they can't solve alone.
2. Player investigates and defeats an enemy or retrieves a lost item.
3. NPC is grateful and joins the party.
4. Reward: new party member + unique class/skill access.

Switch range: **50–59**. Item IDs: **141–150**.

### Side Quests (IDs 31–50)
Follow the **Engine Blueprint Pattern**:
1. Expert NPC frames a problem.
2. Player gathers 2–4 components from diverse locations (exploration + combat mix).
3. Components assembled/returned at a fixed hub.
4. Reward: functional key item or gold + EXP.

Switch range: **60–69** (item collection) or **80–89** (combat/challenge).

### Collection Quests (IDs 51–70)
Follow the **Necklace Pattern**:
1. First piece found triggers the quest.
2. Each additional piece in progressively harder areas.
3. Final assembly at a special location or NPC.
4. Transformative reward (lore + significant ability).

Variable: use a **collection counter variable** (e.g., Variable 20 = pieces found, 0–N).

### Challenge / Combat Quests (IDs 71–90)
- Clear structure: encounter → escalation → boss.
- Always state upfront whether the quest can fail.
- If player can lose, add a `Quest Fail [ID]` branch with a meaningful consequence.

### Special / Event Quests (IDs 91–100)
Time-limited or unique-trigger quests. Use sparingly.

---

## Switch & Variable Allocation

> ⚠️ **Always check `system/SKILL.md` before assigning any switch or variable ID.**
> The system skill is the authoritative registry. Pre-register new IDs there before implementing.

### Already-Allocated Switches (from `system/SKILL.md`)

These are in use — **do not reassign or repurpose them**:

| ID | Name | Quest |
|---|---|---|
| 1 | Oldman1 | Oldman quest series |
| 2 | Oldman2 | Oldman quest series |
| 3 | Oldman3 | Oldman quest series |
| 4 | Oldman4 | Oldman quest series |
| 5 | Oldman5 | Oldman quest series |
| 6 | Intro | Main story intro |
| 7 | Necklace quest started | Collection quest |
| 8 | Necklace quest ended | Collection quest |
| 9 | Jen Recruitment | Jen joins party |
| 10 | Poopoo Caca | Boss encounter |
| 11 | Engine quest started | Engine quest |
| 12 | Engine quest ended | Engine quest |
| 20 | In Mod Center | Location flag |
| 21 | Beanstalk Access | Story gate |
| 22 | Alien Encounter Complete | Story gate |

### Switch Ranges for NEW Quests (start at 23)

| Range | Purpose |
|---|---|
| 23–49 | Available for new main story and side quest gates |
| 50–79 | New character recruitment and collection quest gates |
| 80–99 | New challenge / exploration quest gates |

### Switch Naming Convention
In the RPG Maker editor name field:
```
[Quest Name] - [Specific State]
```
Example: `Engine Quest - Component A Found`

### Self Switches — Prefer These for Local State
Use self switches (`A`, `B`, `C`, `D`) on individual events whenever the state only matters for that one event (e.g., "this chest has been opened"). Reserve global switches for cross-map quest logic.

### Already-Allocated Variables (from `system/SKILL.md`)

| ID | Name | Notes |
|---|---|---|
| 1 | Oldman | Oldman quest progress counter |
| 2 | Intro | Intro sequence stage |
| 3 | Necklace piece | Collection count (0–N) |
| 4 | Engine | Engine quest progress |
| 5 | Poopoo Caca | Boss encounter state |
| 10 | Mining Event roll | Temp; overwritten on every mine — do not use for persistent state |
| 21 | Current Planet | 1=MegaEarth, 2=Ork, 3=TingTing — read by Ship Transponder |

### Variable Ranges for NEW Quests (use 22+, skip 10 and 21)

| Range | Purpose |
|---|---|
| 22–49 | New quest counters and progress trackers |
| 50–99 | Additional counters as needed |

---

## Item ID Allocation

| Range | Type |
|---|---|
| 1–100 | Common consumables |
| 101–140 | General key items |
| 141–150 | Character recruitment quest items |
| 151–200 | Quest-specific items (components, crafting materials) |

When creating a quest item:
1. Set `itypeId: 2` (Key Item) for non-consumable quest objects.
2. Set `price: 0` and add `<Key Item>` in `note` to prevent selling.
3. Write a description that tells the player what the item is *for*.
4. Choose a unique `iconIndex` so the item is visually distinctive.

---

## YEP_QuestJournal Integration

### Quest Entry Template (YEP_QuestJournal.js → QuestData section)

```javascript
// Quest [ID]: [Quest Name]
{
    name: "[Quest Name]",
    cat: [1–10],          // see category table below
    diff: [1–10],         // 1 = easiest, 10 = hardest
    desc: "[One-paragraph description shown in journal]",
    obj: [
        "[Objective 1 — first step]",
        "[Objective 2 — second step]",
        "[Objective 3 — completion step]"
    ],
    subtext: [
        "[Hint or lore for objective 1]",
        "[Hint or lore for objective 2]",
        "[Hint or lore for objective 3]"
    ],
    note: "[Optional developer note]",
    rewards: [
        "[Reward 1]",
        "[Reward 2]"
    ],
    tracking: [
        "[Step 1 reminder]",
        "[Step 2 reminder]"
    ]
},
```

### Quest Categories

| # | Category |
|---|---|
| 1 | Main Quest |
| 2 | Side Quest |
| 3 | Character Quest |
| 4 | Item Quest |
| 5 | Exploration Quest |
| 6 | Challenge Quest |
| 7 | Crafting Quest |
| 8 | Delivery Quest |
| 9 | Escort Quest |
| 10 | Special Quest |

---

## Plugin Commands — Quick Reference

All plugin commands go in event command code **605**.
Quest keys are string identifiers (e.g. `NecklaceQuest`), NOT numeric IDs.

> ⚠️ **Cross-reference `plugins/SKILL.md` (YEP_QuestJournal section) for the authoritative command list.**
> The commands below match the syntax documented there.

```
Quest Add QUEST_KEY                          ← Adds quest to journal (defaults to Failed state)
Quest Set QUEST_KEY to Active                ← Sets quest active/in-progress
Quest Set QUEST_KEY to Completed             ← Marks quest completed
Quest Set QUEST_KEY to Failed                ← Marks quest failed; use with fail branches
Quest Remove QUEST_KEY                       ← Removes from journal entirely (use sparingly)

Quest Set QUEST_KEY Objective N to Normal    ← Resets objective N (unlocks it)
Quest Set QUEST_KEY Objective N to Completed ← Ticks off objective N
Quest Set QUEST_KEY Objective N to Failed    ← Marks objective N as failed

Quest Show QUEST_KEY Objective N             ← Makes objective N visible in journal
Quest Hide QUEST_KEY Objective N             ← Hides objective N until relevant
```

**Standard quest start sequence** (run when player accepts):
```
Quest Add QUEST_KEY
Quest Set QUEST_KEY to Active
Quest Show QUEST_KEY Objective 1
```

**Progressive Revelation Rule**: at quest start only activate `Objective 1`. Activate later objectives as the player reaches each milestone. This is the single biggest factor in player clarity.

---

## Event Scripting Conventions

### Standard NPC Quest-Giver Structure (3-page pattern)

```
Page 1 — Pre-quest
  Conditions: [no quest switch set]
  Trigger: Action Button (0)
  Content: Introduction dialogue → Show Choices [Accept / Decline]
           If Accept:
             Quest Add [ID]
             Quest Update [ID] 1 Active
             Control Switches: #[QuestActive] = ON
             Give any starting item if applicable

Page 2 — Quest Active
  Conditions: Switch [QuestActive] ON, Switch [QuestComplete] OFF
  Trigger: Action Button (0)
  Content: Reminder dialogue, per-objective hints
           If all objectives done: give rewards, Quest Complete [ID],
             Control Switches: #[QuestComplete] = ON

Page 3 — Quest Complete
  Conditions: Switch [QuestComplete] ON
  Trigger: Action Button (0)
  Content: Thank-you dialogue; may unlock follow-up quest
```

### Standard Collectible / One-Shot Object (2-page pattern)

```
Page 1 — Available
  Conditions: Switch [QuestActive] ON, Self Switch A OFF
  Trigger: Action Button (0)
  Content: Describe object → Collect item
           Control Switches: #[ComponentFound] = ON
           Quest Update [ID] [Obj#] Completed
           Quest Update [ID] [Obj#+1] Active
           Self Switch A = ON   ← CRITICAL: prevents re-collecting

Page 2 — Already Collected
  Conditions: Self Switch A ON
  Trigger: Action Button (0)
  Content: Short "already collected" flavour line
```

### Boss / Combat Gate (2-page pattern)

```
Page 1 — Boss Present
  Conditions: Self Switch A OFF
  Trigger: Action Button (0) or Player Touch (1)
  Content: Flavour description → Show Choices [Fight / Flee]
           If Fight:
             Battle Processing: Troop [ID], Can Escape = OFF, Can Lose = OFF
             If Win:
               Give item, set switch, update quest objectives
               Self Switch A = ON

Page 2 — Boss Defeated
  Conditions: Self Switch A ON
  Content: Short "defeated" description (no interaction)
```

### Checking Multiple Conditions After Parallel-Collected Components

When all components can be found in any order, use a **Parallel Process** (trigger 4) event or check all switches at the turn-in NPC:

```
Conditional Branch: Switch [CompA] ON
  Conditional Branch: Switch [CompB] ON
    Conditional Branch: Switch [CompC] ON
      ← Set [AllFound] switch ON here
    End
  End
End
```

---

## Quest Narrative Checklist for MegaEarth2049

Before writing dialogue, answer:

1. **Who gives the quest?** Name, location, map ID.
2. **What do they want and why?** Root motivation (survival, greed, revenge, grief).
3. **What is the player's reward?** Define before writing — it shapes the whole pitch.
4. **How does this fit MegaEarth2049's themes?**
   - Corporate satire (Armatek, Vitalix, A.S.P. exploitation)
   - Cyberpunk body horror / black comedy
   - Post-Earth survival
5. **Does it connect to any existing characters or quests?** Check `docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md` for switch conflicts first.
6. **What level/phase of the game?** Early game quests should have minimal pre-requisites and low difficulty.

---

## Implementing a New Quest — Step-by-Step

1. **Assign IDs**
   - Pick an unused Quest ID from the right range.
   - Reserve contiguous switches from the appropriate range.
   - Reserve item IDs if new items are needed.
   - *Update `docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md` immediately.*

2. **Write the YEP_QuestJournal entry** in `js/plugins/YEP_QuestJournal.js` using the template above.

3. **Create or update map events**
   - Quest-giver NPC: 3-page pattern.
   - Each collectible/trigger: 2-page pattern with self-switch lock.
   - Boss gates: 2-page battle pattern.

4. **Wire plugin commands** at every milestone:
   - `Quest Add` when quest starts.
   - `Quest Update … Active` when a step becomes relevant.
   - `Quest Update … Completed` when a step is done.
   - `Quest Complete` at final handoff.

5. **Document everything** in this project's quest switch/item documentation files.

---

## Common Pitfalls (Anti-Patterns)

| Problem | Symptom | Fix |
|---|---|---|
| Missing Self Switch lock | Collectible can be grabbed repeatedly | Add Self Switch A = ON after pickup; add Page 2 with that condition |
| Switch range collision | Quest A's completion switch turns off Quest B | Check `Quest_Switch_Documentation.md` before assigning; stay in correct range |
| Quest journal out of sync | Player can see "completed" when quest not done, or vice versa | Always pair every `Control Switches` call with the matching `Quest Update` command |
| All objectives dumped at start | Player overwhelmed; no sense of discovery | Start with only Objective 1 Active; reveal rest progressively |
| Reward imbalance | Players skip the quest or feel cheated | Match reward size to effort (see Reward Proportionality table above) |
| Softlock on required boss | Player can never beat boss → quest stuck | Set `Can Lose = OFF` on required battles OR provide a retry option |
| Narrative disconnect | Quest tone clashes with the area's vibe | Re-read the area's lore and nearby NPC dialogue before writing |
| Switch 9 / item ID confusion | Two quests share a necklace | The "Trash Octopus necklace" is **Switch 9 / Item 146**; the "Ancient Necklace" collection uses Switch 7. Never mix them. |

---

## Testing Checklist

Run through every quest before declaring it done:

### Basic Flow
- [ ] Quest can be started under normal conditions
- [ ] First objective appears in journal on accept
- [ ] Each subsequent objective activates exactly when expected
- [ ] Quest marks Complete in journal after final step
- [ ] All rewards (items, EXP, gold) correctly granted

### Edge Cases
- [ ] Starting the quest twice (re-talking to NPC after accept) — no duplicate adds
- [ ] Collecting items before quest is active — items don't trigger switches early
- [ ] Completing objectives out of order — no broken states
- [ ] Leaving and returning to maps mid-quest — events show correct pages
- [ ] Saving and loading mid-quest — all switches and journal state restored

### Integration
- [ ] Quest switches don't conflict with existing documented switches
- [ ] Quest items don't conflict with existing item IDs
- [ ] NPC pages transition cleanly: pre-quest → active → complete
- [ ] Self switches prevent any one-time event from repeating

---

## Key Documentation Files

| File | Purpose |
|---|---|
| `docs/archive/quests/MegaEarth2049_Quest_Design_Documentation.md` | Quest types, patterns, design principles |
| `docs/archive/quests/MegaEarth2049_Quest_Implementation_Guide.md` | Step-by-step implementation walkthrough |
| `docs/archive/quests/MegaEarth2049_Quest_Plugin_Commands.md` | Full YEP_QuestJournal plugin command reference |
| `docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md` | All assigned switches — **check before allocating new ones** |
| `docs/archive/quests/MegaEarth2049_Quest_System_Analysis_Summary.md` | Known issues and improvement roadmap |
| `docs/archive/quests/Engine_Blueprint_Quest_Implementation.md` | Reference: side quest / component-collection pattern |
| `docs/archive/quests/Jen_Recruitment_Quest_Implementation_Summary.md` | Reference: character recruitment pattern |
| `docs/archive/quests/Necklace_Pieces_Collection_Implementation.md` | Reference: collection quest pattern |
