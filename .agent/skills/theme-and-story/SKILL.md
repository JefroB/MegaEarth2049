---
name: theme-and-story
description: Use when writing dialogue, item descriptions, skill names, enemy names, quest text, NPC conversations, or any narrative content for MegaEarth2049. Covers the game's cyberpunk-dystopian setting, the five MegaCorps, absurdist humor framework, body horror comedy, character voices, writing style rules, and story premise. Essential for maintaining the game's unique tone.
---

## Existing-story continuity

Before writing new story content, read `docs/story/STORY_PROGRESSION.md`, the relevant section of `docs/story/MegaEarth2049_Story.md`, and the affected live quest events. Build on established plot, characters and locations. Small adjustments may fit new content into the story; do not replace existing motivations or progression merely because a new idea is convenient. Document substantive changes and distinguish authored plans from implemented behavior.

Regional main bosses are distinct from the finale. The confirmed ending returns to Map001 (Mega Earth), requires entry and traversal of the floating castle, and culminates in two bosses back to back. Preserve the Necklace/A.S.P. plot and ending choices. See `docs/story/STORY_PROGRESSION.md` for the Floating Mansion map references, current regional placements and unresolved finale details. Do not invent missing finale decisions as established canon.

## Setting — MegaEarth 2049 A.E.

**"After Earth"** — what's left after humanity totally screwed up Old Earth.
The five MegaCorps built MegaEarth as a paradise. It is not a paradise.
It is a sprawling, smog-choked, cybernetically-enhanced, disease-ridden,
corporate-controlled mess held together by duct tape and desperation.

### The Five MegaCorps

| Corp | Domain | Personality |
|---|---|---|
| **NeuraTech** | Brains & neural tech | Cold, clinical, efficiency-obsessed |
| **OmniCorp** | Weapons, security, goons | Militaristic, paranoid, trigger-happy |
| **Vitalix** | Biotech, flesh-crafting | Cheerfully horrifying, "for your health!" |
| **Armatek** | Construction, infrastructure | Cheap, corners-cut, rust-prone |
| **Quantum Dynamics** | Weird science | Incomprehensible, unhinged, "it works, probably" |

All five are profit-hungry, morally bankrupt, and aggressively cheerful about it.

---

## Tone & Themes

### Core Tone Pillars

1. **Dystopian Cyberpunk** — Corporate control, tech dependence, social inequality
2. **Absurdist Comedy** — Ridiculous situations, satirical exaggeration, unexpected outcomes
3. **Body Horror Humor** — Modifications gone wrong, diseases with bizarre symptoms, flesh gone weird
4. **Technical Glitches** — Reality distortions, digital anomalies, system malfunctions as comedy

### Key Cyberpunk Themes

- High tech, low life — advanced implants alongside squalor and disease
- Body modification — cybernetics, genetic alterations, and their consequences (usually bad)
- Corporate control vs. individual freedom
- Digital realms — hacking, A.S.P., alternate digital reality
- Environmental degradation — pollution, artificial everything

---

## Humor Framework

MegaEarth2049 humor combines **dark corporate satire** with **body function comedy**
and **technology gone wrong**. Keep it absurd but grounded in the world's logic.

### Humor Types to Use

1. **Corporate Absurdity** — ridiculous policies, mandatory "fun", predatory wellness programs
2. **Technological Mishaps** — things that work but in the worst possible way
3. **Body Function Comedy** — diseases, modifications, biological weirdness (Diarrhea/Dysentery as actual states)
4. **Satirical Exaggeration** — take real-world issues to logical absurd extremes
5. **Unexpected Juxtapositions** — combine serious situations with ridiculous elements

### Writing Style Examples

**Corporate Speak:**
> "Welcome to OmniCorp's Mandatory Wellness Initiative™! Remember, employee health
> is directly correlated with productivity metrics, and your participation is both
> voluntary and required for continued employment!"

**Item Description:**
> "Acme Rabinex™: Guaranteed to cure rabies or your money back! Side effects may
> include: speaking in tongues, spontaneous hair growth in unusual places, and an
> overwhelming desire to file your taxes incorrectly."

**Enemy Description:**
> A NeuraTech middle manager whose performance review went badly. Now has enhanced
> efficiency, reduced empathy, and a legally-mandated smile. Results may vary.

### Rules for Writing Content

- Never purely grimdark — there's always a ridiculous angle
- Never purely comedic — the satire bites because the world is genuinely broken
- MegaCorps always spin everything as positive for the consumer
- Technology always works, but never quite the way intended
- Status effects with humiliating names (Diarrhea, Dysentery) are played completely straight in-world
- Side effects of medicine are often worse than the disease

---

## ⚠️ Mechanical Constraints — Effects Must Be Implementable

This is the most important constraint on narrative content.
**Humor and flavor are unlimited. Described mechanics are not.**

The game can only do what RPG Maker MV's engine and its loaded plugins actually support.
When writing skill descriptions, item descriptions, state names, or enemy abilities that
imply a mechanical effect, that effect **must map to something the engine can actually do**.

### The Core Rule

> **Flavor text in descriptions** (e.g., "may cause speaking in tongues") = fine, no constraint.
> **Proposed game mechanics** (e.g., "this skill transforms the target into a frog") = must be implementable.

If you are proposing a NEW skill, item, or state and describing what it DOES,
you are proposing game mechanics. Those must stay within the available primitives below.

### What the Engine CAN Do

| Category | Available Mechanics |
|---|---|
| **HP/MP** | Damage (formula-based), healing (flat or %), drain, absorb |
| **TP** | Gain TP, cost TP, preserve/reset TP between battles |
| **States** | Inflict any state from States.json; states can: restrict actions, drain HP/MP per turn, apply param changes, auto-remove on conditions |
| **Buffs/Debuffs** | Raise or lower any of the 8 core params (mhp, mmp, atk, def, mat, mdf, agi, luk) by stack level |
| **Elements** | Deal damage of element IDs 1–9 (Physical, Fire, Ice, Thunder, Water, Earth, Wind, Light, Darkness) |
| **Action Restriction** | Confused (attacks random target), Berserk (attacks allies), Paralyzed (can't move), Silence (can't use skill types) |
| **Party Limit Gauge** | Add or subtract gauge; cost gauge for Squad Attack skills |
| **Barriers** | Absorption barrier (absorbs HP damage up to a set amount) via YEP_AbsorptionBarrier |
| **Switches/Variables** | Set game switches or variables via event Script calls (outside battle only, in general) |
| **Items** | Grant or remove items via events; items used in battle apply their defined effects |
| **Animations** | Play any animation from the Animations database |

### What the Engine CANNOT Do (or Cannot Do Easily)

| Claimed Effect | Why It Doesn't Work |
|---|---|
| "Transforms target into a frog/animal" | No enemy transformation system; enemies can't change their data mid-battle |
| "Spawns a new enemy mid-battle" | Not natively supported; would require complex plugin workaround |
| "Permanently changes a character's appearance" | No mid-game character graphic swap system in current setup |
| "Randomly changes dialogue options" | Event dialogue is static; choices don't randomly mutate |
| "Mind-controls a party member to attack allies" | Confusion state (restriction 2) works for random targeting; full player control transfer does not |
| "Rewrites their DNA / changes their class" | Class changes are possible via events between battles, not mid-battle |
| "Erases from existence" | Instant-kill is possible (via 100% death state); "erasing" with special visuals is not built-in |

### Practical Examples — Writing Flavor vs. Mechanics

**✅ GOOD — flavor text that doesn't make mechanical promises:**
> "Acme Rabinex™: Side effects may include speaking in tongues and spontaneous tax fraud."
> *(The description is funny. It doesn't claim the item does anything beyond its actual HP heal.)*

**✅ GOOD — humor that maps to a real mechanic:**
> "VitaFlux Intestinal Optimizer™: 'Guaranteed to improve gut microbiome efficiency!'
> Inflicts Diarrhea (State 11) on all party members for 5 turns."
> *(Gross, funny, AND implementable — State 11 exists and has real effects.)*

**❌ BAD — humor that implies a non-existent mechanic:**
> "Quantum Entanglement Grenade: Causes all enemies to swap positions with their
> alternate-universe selves, randomizing all their stats."
> *(Stat randomization mid-battle doesn't exist as a mechanic. Don't propose this as a real item.)*

**❌ BAD — narrative that can't be delivered in-game:**
> "Using this skill causes the enemy's head to physically detach and roll away, removing
> their ability to see for the rest of the battle."
> *(There is no 'detach' animation system and 'can't see' is just the Blind state — say that instead.)*

### When in Doubt — Map It to a Real Effect

Before writing a mechanical claim, ask: "What state, damage formula, buff, or event
command would actually implement this?" If you can answer that, the humor is grounded.
If you can't, it's a flavor-only description — make clear it's flavor, not a game mechanic.

*See also: plugins (for state/buff Lunatic Mode JS), states (for existing state IDs and effects)*

---

## Main Characters

### Rex (Actor 1, Class: Hacker)
- **Voice**: Glitchy, fragmented speech, sudden technical insights
- **Background**: Protagonist with a malfunctioning neural implant connected to A.S.P.
- **Personality**: Resourceful, adapts to chaos, increasingly aware something big is wrong

### Jen (Actor 2, Class: Priest)
- **Voice**: Cynical, uses medical terminology and occasional religious references
- **Background**: Former OmniCorp Security officer, now freelance and helping Rex
- **Personality**: No-nonsense, competent, deeply skeptical of authority
- **Battle Note**: Has no Guard command — she doesn't believe in playing defense

### Zack (Actor 3, Class: Construction Worker)
- **Voice**: Construction jargon, explosive metaphors, talks like everything is a job site
- **Background**: Hispanic construction worker who knows MegaEarth's infrastructure intimately
- **Personality**: Tough, reliable, occasionally weaponizes the wrong thing

### Zed (Actor 4, Class: Mod Doctor)
- **Voice**: Clinical detachment, scientific curiosity, treats everything as an experiment
- **Background**: Underground cybernetic specialist, Zed's Mods
- **Personality**: Brilliant, amoral about experimentation, oddly caring about patients

### Jack (Actor 9, Class: Smuggler)
- **Voice**: Smuggler slang, exaggerated stories, deflects with humor
- **Background**: Moves goods between locations; knows every back door on MegaEarth
- **Personality**: Unreliable narrator of his own life, but competent when it counts

---

## Story Premise

A.S.P. (Autonomous Systems Protocol) is an AI created to manage MegaEarth's
infrastructure. It has decided to upgrade its mission from "manage" to "control."
Rex's neural implant is somehow connected to A.S.P. — which makes Rex useful,
dangerous, and a target.

The party must discover what A.S.P. is planning before Protocol Zero activates:
a plan to rewrite reality itself. Four endings based on player choice.

### Quest Structure

Current implemented quests (use Switch/Variable IDs from `system` skill):
- **Necklace Quest** — find pieces of a necklace (Switches 7–8)
- **Engine Quest** — repair/retrieve an engine (Switches 11–12)
- **Smelly Keys** — find lost keys
- **Oldman quests** — series of tasks for an old man (Switches 1–5, Variable 1)

> For the full planned quest registry, ID ranges, switch allocation, and YEP_QuestJournal integration, see the **`quests` skill**.

---


## Naming Conventions

When creating new content, follow these conventions:

### Enemies
- MegaCorp security: use corp name + job title + modifier (e.g., "OmniCorp Expendable Goon")
- Vitalix creatures: body horror portmanteau (e.g., "FleshOptimizer Mark III")
- Tech enemies: product-name style (e.g., "Neural Puppet v2.4.1")
- Street enemies: punk/gang aesthetics (e.g., "Timbuc Punk", "Alley Rat")

### Items
- Medicines: Brand name + ™ + absurd side effects
- Weapons: Functional name or street name (Switchblade, Spiked Gloves)
- Corp products: Mandatory capitalization of Product Names™

### Skills
- Abilities: Action verbs that imply the character's personality
- Tech skills: Technical jargon or acronyms
- Squad Attacks: Collaborative or tactical names (Man in the Middle, Botnet)

*See also: actors, classes, skills, items, enemies for mechanical details*

