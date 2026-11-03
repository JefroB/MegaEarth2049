---
name: npcs
description: Use when creating or modifying NPCs in MegaEarth2049 — both quest-givers and ambient world characters. Covers NPC design principles, the MegaEarth2049 tone and voice guide, existing named characters and their speech patterns, actor/class data integration, map event scripting patterns, and ambient dialogue techniques for making locations feel alive.
---

## What Makes a Good MegaEarth2049 NPC

Every NPC — even a throwaway vendor — should feel like they belong to the world. Before writing a single line of dialogue, answer:

1. **What is their job or survival strategy?** On MegaEarth everyone has a hustle.
2. **Which MegaCorp (if any) do they deal with or resent?** NeuraTech, OmniCorp, Vitalix, Armatek, Quantum Dynamics — every citizen is touched by at least one.
3. **What's wrong with them?** A disease, a mod gone wrong, a debt, a grudge, a weird obsession. Nobody is fine.
4. **What's the one thing they want?** Every NPC should want something, even if it's just to be left alone.

---

## MegaEarth2049 Tone & Voice Guide

The game's tone is **cyberpunk satire meets body-horror comedy**. NPCs should reflect this mix:

### Register by NPC Type

| NPC Type | Voice Register | Examples |
|---|---|---|
| Street survivors (Punks, scavengers) | Vulgar, blunt, street slang | "Corp drones been sniffin' around all week. I ain't seen nothin'." |
| Corporate employees | Hollow buzzwords, barely suppressed existential dread | "Per our quarterly synergy roadmap, I'm unable to fulfill that request at this time." |
| Mod clinic patients / Zed's customers | Nervous, hopeful, slightly wrong about what they signed up for | "He said the third arm would be 'mostly functional.' Two weeks later I keep high-fiving myself involuntarily." |
| Priests / healers (Jen's type) | Sardonic, world-weary compassion | "That's Rabinex. It cures scurvy and causes mild auditory hallucinations. It's the best we've got." |
| Underground resistance | Terse, careful, distrustful of strangers | "Ask. One. Question." |
| Academics / scientists | Excited about the wrong things, oblivious to danger | "Fascinating — the fungus is distributed through sneezing! And you've been standing here for ten minutes!" |
| Civilians | Exhausted. Just exhausted. | "Four years ago I had a house. A real house. Now I'm arguing with a vending machine about refunds." |

### Tone Rules
- **No clean corporate solutions exist.** Everything is a workaround, a bribe, or a gamble.
- **Comedy via specificity.** "Burlap pants" is funnier than "uncomfortable pants." Name the brand, the drug, the gang, the corporate slogan.
- **Pain is real, even when it's absurd.** Zack lost his family to "aggressive gentrification." That's funny AND genuinely awful. Both are valid.
- **NPCs are aware of corpo-speak and hate it.** They mock it constantly.
- **No exposition dumps.** NPCs reveal the world through complaints, boasts, and evasions — not lectures.

---

## Named Characters — Voice & Personality Reference

These are established characters. Match their voices exactly if they appear.

### Rex (Player, ID 1 — Hacker)
Dialogue choices only. Rex is cynical, pragmatic, occasionally surprised by their own empathy. Internal monologue flavour: "This is definitely someone else's problem. ...I'm going to make it my problem, aren't I."

### Jen (ID 2 — Priest)
Ex-OmniCorp security. Delivers bad news with surgical precision and zero sugarcoating. Has a black market medicine cabinet and uses it. Hates OmniCorp viscerally. Warm toward people in genuine need, ice-cold toward corporate types.
> *"That's infected. The cure costs forty credits. The infection costs your hand. Up to you."*

### Zack / Jose (ID 3 — Construction Worker)
Calls himself Zack; everyone forgets he's actually Jose. Yells "Hammer Time!" in combat. Knows every pipe and tunnel in MegaEarth. Carries survivor's guilt about his family (lost to Armatek "gentrification"). Channels it into building things — and rigging things to explode.
> *"That wall ain't load-bearing. Good. Means I can blow it up."*

### Zed (ID 4 — Mod Doctor)
Charming, ethically flexible, genuinely fascinated by Rex's implant. Refers to people as "the subject" when excited. Plays all corps against each other. His clinic is "definitely sterilized." Offers discounts for experimental test subjects.
> *"Side effects may include temporary limb autonomy, mild existential crisis, and spontaneous opera singing. Sign here."*

### Jack (ID 9 — Smuggler)
Charming rogue. Talks about his ship, the *Marcus Garvey 2.0*, the way other people talk about their children. Charismatic, unreliable, always mid-scheme. Knows everyone who matters in every spaceport.
> *"I can get it there. Might arrive in one piece. Might arrive before the authorities. Can't promise both."*

### Dick (ID 10 — Thief)
Steals for the thrill, not the money. Treats OmniCorp security systems as personal puzzles. Gets distracted mid-heist by a more interesting heist nearby. Casually larcenous at all times.
> *"I'm not stealing it. I'm redistributing it. There's a philosophical difference. Also give me your watch."*

### Niles "Stinky" (Punk Leader)
Named Stinky after a sewage incident. Runs Timbuc's black market through intimidation and surprising cunning. Respects competence. Despises ass-kissing. Actually quite organized under the chaos.
> *"Don't tell me what you can do. Everybody talks. Tell me what's in it for Stinky."*

### A.S.P. (Antagonist)
When A.S.P. speaks (through terminals, glitches, hijacked NPCs), it is coldly analytical, never cruel — just correct, from its own perspective. It does not understand why humans make inefficient choices.
> *"You have selected the suboptimal path. This has been noted. Correction will follow."*

---

## NPC Functional Roles

Every NPC placed on a map should have at least one of these roles:

| Role | Purpose | Minimum Dialogue |
|---|---|---|
| **Quest Giver** | Starts or advances a quest | 3 pages (pre-quest / active / complete) |
| **Vendor** | Shop — items, weapons, armor | 1 page with shop command, optional flavour line |
| **Info Broker** | Lore, hints, world-building | 1–2 pages with context-sensitive text |
| **Ambient** | Makes the area feel lived-in | 1–2 lines; changes if related quest is active |
| **Reaction NPC** | Responds to player actions or story events | 2 pages (before/after switch flips) |
| **Gatekeeper** | Controls access to an area or item | 2 pages (blocked / unlocked) |

---

## Ambient NPC Design — Making Areas Feel Alive

### The 3-Line Rule
Each ambient NPC needs three distinct things before they're placed:
1. **Who they are** (job, affliction, or obsession — one noun phrase)
2. **What they're doing right now** (the action visible to the player)
3. **What they say** (one or two lines that imply a whole life)

### Ambient Dialogue Templates

**The Complainer** — establishes world problems, makes corps feel oppressive:
> *"OmniCorp raised rent again. Said it's for 'enhanced security presence.' The enhanced security presence is a drone that followed me to the bathroom."*

**The Specialist** — implies depth in one corner of the world:
> *"Vitalix is offerin' free mods down at the plaza. Free. That's how you know somethin's gonna go wrong."*

**The Witness** — references events the player may or may not know about:
> *"You see those lights last night? The ones over Timbuc Cellar? I didn't see nothin'. I'm telling everyone that."*

**The Absurdist** — leans into the comedy:
> *"The vending machine gave me sentient advice instead of a candy bar. The advice was 'leave while you can.' I'm still here."*

**The Exhausted One** — pure world-weariness:
> *"Four years ago I had a house. Now I'm arguing with a vending machine about what constitutes a refund."*

### Reaction NPCs — Changing After Quest Events
Use a second event page (condition: relevant switch ON) so ambient NPCs react to quest completion:

```
Page 1 — Default
  Conditions: none
  "I heard someone's been poking around the cellar. Brave or stupid."

Page 2 — After Quest Active
  Conditions: Switch [QuestActive] ON
  "They say the Trash Octopus is dead. First good news all month."
```

---

## NPC Event Structure in Map JSON

### Minimal Ambient NPC (1 page, trigger 0)

```json
{
  "id": N,
  "name": "Citizen",
  "note": "",
  "pages": [{
    "conditions": {
      "actorId": 1, "actorValid": false,
      "itemId": 1, "itemValid": false,
      "selfSwitchCh": "A", "selfSwitchValid": false,
      "switch1Id": 1, "switch1Valid": false,
      "switch2Id": 1, "switch2Valid": false,
      "variableId": 1, "variableValid": false, "variableValue": 0
    },
    "directionFix": true,
    "image": {"characterIndex": 0, "characterName": "People1", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
      {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
      {"code": 401, "indent": 0, "parameters": ["Your dialogue line here."]},
      {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveType": 0,
    "priorityType": 1,
    "trigger": 0,
    "walkAnime": false,
    "stepAnime": false,
    "through": false
  }],
  "x": 0, "y": 0
}
```

### Face Portrait in Dialogue
To show a character portrait, set the `parameters` of code 101:
```
[faceName, faceIndex, background, position]
```
- `faceName`: filename without extension (e.g. `"Rex"`, `"People1"`, `""` for no face)
- `faceIndex`: 0–7 (position on the face sheet)
- `background`: 0=window, 1=dim, 2=transparent
- `position`: 0=top, 1=middle, 2=bottom

Named characters use their own face sheets. Generic NPCs use `"People1"` through `"People4"`.

### Multi-Line Dialogue
Each line of text is a separate code 401 entry. Max ~4 lines per message window before the player needs to press a button:
```json
{"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
{"code": 401, "indent": 0, "parameters": ["Line one of dialogue."]},
{"code": 401, "indent": 0, "parameters": ["Line two continues here."]},
{"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
{"code": 401, "indent": 0, "parameters": ["Second message box continues."]},
```

### NPC with Choices
```json
{"code": 102, "indent": 0, "parameters": [["Yes", "No", "Tell me more"], 1]},
{"code": 402, "indent": 0, "parameters": [0, "Yes"]},
  ... commands for Yes ...,
{"code": 402, "indent": 0, "parameters": [1, "No"]},
  ... commands for No ...,
{"code": 402, "indent": 0, "parameters": [2, "Tell me more"]},
  ... commands for more info ...,
{"code": 404, "indent": 0, "parameters": []},
```

### NPC that Moves (Random Walk)
Set `"moveType": 1` (Random) and `"moveFrequency": 3` on the page. Use `"walkAnime": true` and `"stepAnime": true`. Good for crowd-feel; use sparingly in indoor areas (performance).

### Wandering NPC Pattern (Parallel Process)
For an NPC that patrols a fixed route, use a separate invisible event with trigger 4 (Parallel Process) and a Move Route command (code 205) targeting the NPC's event ID.

---

## Placing Actors as Named NPCs

When a scene needs a specific named character (Jen, Zack, Zed, Jack, etc.) as a non-party map NPC:

1. **characterName**: Match the actor's `characterName` from `Actors.json` (e.g. `"Rex_walk"`)
2. **characterIndex**: Match the actor's `characterIndex` from `Actors.json`
3. **faceName / faceIndex**: Use matching values from `Actors.json` in dialogue (code 101 parameters)
4. **Name the event** with the character's name so it's easy to find in the editor

### Existing Actor Visual Assets

Confirmed values from `actors/SKILL.md` — use these directly when placing actors as map NPCs:

| Actor | characterName | characterIndex | faceName | faceIndex |
|---|---|---|---|---|
| Rex (1) | Rex_walk | 0 | Rex | 0 |
| Jen (2) | Jen_walk | 0 | Jen_face | 0 |
| Zack (3) | Zack_walk | 0 | Zack | 0 |
| Zed (4) | Zed_walk | 0 | Zed | 0 |
| Black Ninja (5) | ninja1 | 4 | ninja1 | 1 | ⚠️ Hidden until recruited in battle |
| Blue Ninja (6) | ninja1 | 5 | ninja2 | 2 | ⚠️ Hidden until recruited in battle |
| Pink Ninja (7) | ninja1 | 3 | ninja2 | 0 | ⚠️ Hidden until recruited in battle — see Troop 15 |
| Niles (8) | punk1 | 5 | punk1 | 5 |
| Jack (9) | some_main_dudes | 0 | some_main_dudes | 0 |
| Dick (10) | some_main_dudes | 1 | some_main_dudes | 1 |

---

## Creating a New Named NPC (Not a Party Member)

For original NPCs that are not in `Actors.json` but need a consistent identity:

1. **Choose a sprite** from existing character sheets in `img/characters/`. Common sheets:
   - `People1` / `People2` / `People3` / `People4` — generic MegaEarth civilians
   - `SF_Actor1` etc. — sci-fi styled characters
   - Use `characterIndex` 0–7 to pick the specific character on the sheet

2. **Do NOT add them to `Actors.json`** unless they become a recruitable party member. Map event NPCs don't need an Actor entry.

3. **Keep their appearance consistent** across maps by noting which sheet + index you used.

4. **If they need unique dialogue portraits**, check whether a matching face image exists in `img/faces/`. If not, use a generic face or `""` (no portrait).

---

## Quest-Giver NPC Full Pattern (3 Pages)

See the `quests` skill for full plugin command details. Summary event structure:

```
Event: [NPC Name]
  Page 1 — Pre-Quest
    Conditions: Switch [QuestActive] OFF
    Trigger: 0 (Action Button)
    Content:
      Show Text (face, line1, line2) [hook — problem statement]
      Show Choices [Accept / Not now]
        If Accept:
          Quest Add [ID]
          Quest Update [ID] 1 Active
          Control Switches: #[QuestActive] = ON
          [optionally give a starting item]
        If Not now:
          Show Text: [brush-off line — NPC reacts to refusal]

  Page 2 — Quest Active
    Conditions: Switch [QuestActive] ON, Switch [QuestComplete] OFF
    Trigger: 0
    Content:
      [Reminder dialogue — vary based on which objective is current]
      [Optional: give hints per objective using Conditional Branches on sub-switches]
      [If all objectives done, trigger reward + Quest Complete + set QuestComplete switch]

  Page 3 — Quest Complete
    Conditions: Switch [QuestComplete] ON
    Trigger: 0
    Content:
      [Thank-you / aftermath dialogue]
      [May unlock follow-up quest or change other NPCs via switch]
```

---

## Vendor NPC Pattern

```
Page 1:
  Conditions: none
  Trigger: 0 (Action Button)
  Content:
    Show Text: "flavour line that fits the vendor's personality"
    Shop Processing: [goods array]
```

Vendors can have a second page that changes their flavour line after a quest:
```
Page 2:
  Conditions: Switch [SomeQuestComplete] ON
  Content:
    Show Text: "updated line referencing the quest outcome"
    Shop Processing: [same goods or expanded stock]
```

---

## Common NPC Archetypes for MegaEarth2049

Use these as starting points. Always add a specific detail to avoid generic feel.

### The Armatek Worker
Covered in dust, mild hearing loss from construction noise. Knows hidden structural weaknesses in every building. Mildly proud of shoddy work.
> *"That overhang? I built that. It'll last another six months. Probably."*

### The OmniCorp Off-Duty Guard
Out of uniform but can't turn off the paranoia. Flinches at every loud sound. Either drinks heavily or is working very hard to not drink heavily.
> *"I'm off the clock. I'm allowed to talk to civilians off the clock. This isn't a wellness check."*

### The Vitalix Trial Subject
Has a mod that's 80% successful. The other 20% surfaces at inconvenient times. Rationalizes constantly.
> *"The extra fingers are a bonus, actually. Most people don't even notice."*

### The Quantum Dynamics Temp
Hired to maintain equipment they don't understand. Has learned to just nod when the permanent staff talk. Secretly terrified.
> *"Dr. Paradox said it's fine. He said it while walking backwards in time, but still."*

### The Timbuc Cellar Veteran
Has been down there. Won't say what they saw. Is very specific about which tunnels are fine and which are "not fine."
> *"Room B is fine. Room D is fine. Do not go into Room E. I'm not explaining why."*

### The Street Vendor
Sells exactly one thing. Has a fifteen-minute origin story for why they sell exactly that one thing. Will tell it unprompted.
> *"Burlap pants. Best in the sector. Comfortable? No. But they're dignified."*

### The Ex-NeuraTech Employee
Has seen things. Has signed seventeen NDAs. Speaks entirely in implication.
> *"I can't say what happens on floor 47. But if you value your autonomy — and I mean that literally — don't go to floor 47."*

---

## Dialogue Quality Checklist

Before finalizing any NPC's dialogue, verify:

- [ ] Does the first line establish **who this person is** within 10 words?
- [ ] Is there at least one **specific detail** (a corp name, drug name, place name, or absurd fact)?
- [ ] Does the NPC **want something** or have a clear problem?
- [ ] If this is an ambient NPC, does the dialogue make the **area feel more real**?
- [ ] Does the dialogue match the NPC's **register** (street survivor vs. corporate vs. scientist etc.)?
- [ ] Is there **no exposition dump**? The NPC should reveal the world indirectly.
- [ ] If the quest is active, does this NPC's dialogue **acknowledge the quest state** (use a second page)?
- [ ] Does the NPC avoid saying anything that **contradicts established lore**? (Check `docs/story/MegaEarth2049_Story.md`)

---

## Key Reference Files

| File | What to check |
|---|---|
| `docs/story/MegaEarth2049_Story.md` | Named NPCs, world lore, corp descriptions, quest lines, tone |
| `docs/reference/database/MegaEarth2049_Actors_Classes_Documentation.md` | Actor IDs, class roles, visual asset names, trait system |
| `docs/reference/database/MegaEarth2049_CommonEvents_Documentation.md` | Common event IDs, how to call them from map events (code 117) |
| `data/Actors.json` | Actual characterName, characterIndex, faceName, faceIndex values |
| `.kiro/skills/maps/SKILL.md` | Event command codes, page structure, trigger types, conditions |
| `.kiro/skills/quests/SKILL.md` | Quest-giver event patterns, plugin commands, switch ranges |
