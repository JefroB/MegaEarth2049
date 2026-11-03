> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Quest Switch Documentation

This document provides a comprehensive list of all game switches used in quests throughout MegaEarth2049. Proper documentation of switches is essential to avoid conflicts and ensure quest logic functions correctly.

## Switch Usage Guidelines

1. **Dedicated Purpose**: Each switch should have a single, clearly defined purpose
2. **Descriptive Naming**: Use descriptive names in the game editor to indicate the switch's purpose
3. **Documentation**: Document all switches in this file when creating or modifying quests
4. **Avoid Reuse**: Do not reuse switches for multiple purposes, even if they seem unrelated
5. **Testing**: Test all switch-dependent logic thoroughly after implementation

## Known Switches

| Switch ID | Name/Purpose | Used In | Description | Notes |
|-----------|--------------|---------|-------------|-------|
| 7 | Necklace Pieces Collection | Map015.json | Controls visibility of necklace piece events (22-25) | Used to hide necklace piece events when not needed |
| 9 | Jen's Recruitment Quest | Map056.json, Map057.json | Controls access to Jen's house and recruitment event | Set to ON after defeating Trash Octopus boss |
| 12 | Door Key - Map020 | Map015.json (Event 21) | Unlocks door to Map020 | Used with Smelly Keys quest |
| 28 | Door Key - Map021 | Map015.json (Event 12) | Unlocks door to Map021 | Used with Smelly Keys quest |
| 29 | Door Key - Map017 | Map015.json (Event 16) | Unlocks door to Map017 | Used with Smelly Keys quest |
| 30 | Door Key - Map032 | Map015.json (Event 13) | Unlocks door to Map032 | Used with Smelly Keys quest |
| 31 | Door Key - Map018 | Map015.json (Event 14) | Unlocks door to Map018 | Used with Smelly Keys quest |
| 32 | Door Key - Map019 | Map015.json (Event 15) | Unlocks door to Map019 | Used with Smelly Keys quest |
| 33 | Door Key - Map016 | Map015.json (Event 26) | Unlocks door to Map016 | Used with Smelly Keys quest |
| 60 | Smelly Keys Quest Active | Map015.json | Tracks if the Smelly Keys quest is active | Set when player finds first key |
| 61 | Engine Blueprint Quest Active | Map015.json, Component Maps | Tracks if the Engine Blueprint quest is active | Set when player receives the blueprint |
| 62 | Engine Blueprint Obtained | Map015.json | Tracks if the player has obtained the engine blueprint | Set when the engineer gives the blueprint |
| 63 | Component A Found | Map015.json, Construction Site Map | Tracks if Component A has been found | Set when player finds Component A |
| 64 | Component B Found | Map015.json, A.S.P. Drone Location Map | Tracks if Component B has been found | Set when player finds Component B |
| 65 | Component C Found | Map015.json, Armatek Office Map | Tracks if Component C has been found | Set when player finds Component C |
| 66 | All Components Found | Map015.json | Tracks if all components have been found | Set when all three components are found |
| 67 | Engine Blueprint Quest Completed | Map015.json | Tracks if the Engine Blueprint quest is completed | Set when the quest is completed |
| 68 | Necklace Pieces Quest Active | Map015.json | Tracks if the Necklace Pieces quest is active | Set when player finds first necklace piece |
| 69 | Necklace Piece 1 Found | Map015.json | Tracks if Necklace Piece 1 has been found | Set when player finds Necklace Piece 1 |
| 70 | Necklace Piece 2 Found | Map015.json | Tracks if Necklace Piece 2 has been found | Set when player finds Necklace Piece 2 |
| 71 | Necklace Piece 3 Found | Map015.json | Tracks if Necklace Piece 3 has been found | Set when player finds Necklace Piece 3 |
| 72 | Necklace Piece 4 Found | Map015.json | Tracks if Necklace Piece 4 has been found | Set when player finds Necklace Piece 4 |
| 73 | All Necklace Pieces Found | Map015.json | Tracks if all necklace pieces have been found | Set when all four pieces are found and combined |

## Potential Conflicts and Issues

### Dungeon expansion reservations — 2026-11-01

The following are reserved outside the historical 1–99 ranges. Quest state uses
native switches; Dungeon Field Notes (item 151, common event 5) reports progress.
No existing quest flags, items, or variables are repurposed.

| IDs | Quest | States in ascending ID order |
| --- | --- | --- |
| 101–106 | A Lien on Your Spleen | Accepted; meter bypassed; billing isolated; ledger recovered; public disclosure; reward claimed |
| 111–117 | Cold Storage, Warm Bodies | Accepted; pressure vented; coolant drained; heat restored; staff released; reward claimed; names protected |
| 121–127 | The Haunted Shift | Accepted; air log recovered; timecards recovered; archive unlocked; roster recovered; public memorial; reward claimed |

Maps 110–115 contain the dungeon floors. Quest givers are in Rivet Commons (103),
the Municipal Thaw House (104), and the Last Shift Canteen (106). Rewards are
one-time, with local treasure using self switches. No bosses or minibosses are
allocated. See tools/dungeons/README.md for the implemented flow.

1. **Switch 7 vs. Switch 9**:
   - Switch 7 controls necklace piece events (22-25) in Map015.json for the Ancient Necklace quest
   - Switch 9 controls Jen's recruitment quest which involves a different necklace
   - These are separate quests with different purposes and rewards
   - Recommendation: Ensure clear dialogue in both quests to avoid player confusion

## Recommended Switch Assignments for New Quests

When implementing new quests, use the following switch ID ranges to avoid conflicts:

1. **Character Recruitment Quests**: 50-59
2. **Item Collection Quests**: 60-69
3. **Location Discovery Quests**: 70-79
4. **Combat/Challenge Quests**: 80-89
5. **Story Progression Switches**: 90-99

## Implementation Notes

1. **Self Switches**:
   - Use self switches (A, B, C, D) whenever possible for event-specific state
   - Reserve global switches for cross-map quest logic

2. **Switch Naming**:
   - In the RPG Maker editor, name all switches according to this format:
     `[Quest Name] - [Specific Purpose]`
   - Example: "Jen's Quest - House Access"

3. **Documentation Updates**:
   - When implementing new quests, update this document with any new switches
   - Include the switch ID, name/purpose, used in (maps/events), description, and notes

## Maze expeditions

Reserved switches 131–166 for the six maze sidequests (six switches per quest: acceptance, two clues, recovery, public choice, completion). Item 152 and Common Event 6 provide Expedition Notes. Full names and references are in tools/mazes/manifest.json; see tools/mazes/README.md for routes and validation.

## Repossessor

Switch167 = Repossessor defeated, set only on victory at the optional Map138 console. Enemy142 / Troop51 / Skills151–155. The console also uses its own self-switch A to prevent repeat battles/rewards.
## Remaining legacy miniboss replacements

Enemy IDs 143–144 and Troop IDs 52–53 are reserved for SEAM-3000 and the malfunctioning A.S.P. drone. Skills156–157 are Mandatory Hemming and Security Pulse. Spider variants retain Enemy IDs78–82 and their existing troop/key rewards.

No new global switches: Pants-O-Rama uses shared self-switch A on Map002 events23/26; the drone uses shared self-switch A on Map030 runtime events1/2. Map030 slot1 retains its legacy serialized id0, but MV addresses it as event1. Completion synchronizes between entrances, including old saves. Item137 is awarded only after SEAM victory; Item130 remains the drone victory reward. See tools/remaining-bosses/README.md for installation and validation.

## Custodian mandates

- Switch168: Identity mandate; Chief Compliance Orifice defeated in Map224.
- Switch169: Repair mandate; The Deductible Duke defeated in Map226.
- Switch170: Routing mandate; Postmaster Septic defeated in Map228.
- Switch171: Flow mandate; Admiral Clap defeated in Map230.
- Switch172: Wake mandate; The REMployee of the Month defeated in Map232.
- Switch173: Thermal mandate; The Ticket Widow defeated in Map234.

Set only in native battle victory branches. See tools/custodian-placement/manifest.json for hatch, gate and return routes.

## Regional main boss: Dorlund Underwriter

Switch174 = Underwriter defeated; set only on victory in Map238. Unlocks local Claims Audit Archive Map239. Access branches from Map115 after roster switch125 (or completed quest127); preserves disclosure switch126. Enemy151 / Troop60 / Skills176–184. Not a finale flag. See docs/story/STORY_PROGRESSION.md and tools/main-boss/README.md.
