# MegaEarth 2049 — Getting started

These FAQs consolidate the current guides as of November 2, 2026. Implemented routes are described here; proposed work belongs in [ROADMAP.md](ROADMAP.md). Source snapshots and test evidence remain under `tools/` and `art/`.

| FAQ | Topic |
|---|---|
|01|[Getting started](FAQ_01_Getting_Started.md)|
|02|[Combat](FAQ_02_Combat_System.md)|
|03|[Locations and spaceship travel](FAQ_03_Locations_Guide.md)|
|04|[Characters, recruitment and companion chapters](FAQ_04_Characters_and_NPCs.md)|
|05|[Equipment, items and exchanges](FAQ_05_Equipment_and_Items.md)|
|06|[Quests, local projects and Completion Log](FAQ_06_Quests_and_Storylines.md)|
|07|[Secrets, salvage and off-clock collections](FAQ_07_Secrets_and_Easter_Eggs.md)|
|08|[Technical help, repair history and verification](FAQ_08_Technical_Issues.md)|
|09|[Diseases, states and Field Guide](FAQ_09_Disease_System.md)|
|10|[Ninjas and Hidden Dojo](FAQ_10_Ninja_System.md)|
|11|[Prototype calibration and cosmetic skin](FAQ_11_Body_Modification_System.md)|

## What is this game?

A single-player, side-view RPG about corporate control, neural implants and deeply questionable healthcare. Absurd dialogue is part of the world; troubleshooting instructions are not jokes.

## Who starts in the party?

New games start with **Rex, Zack and Zed**. Pink Ninja is no longer a starting member. Jen and the other actors have their own records/events; an actor existing in the database does not mean they are automatically recruited. Existing saves retain their party.

## What are the controls?

| Action | Default keyboard input |
|---|---|
| Move | Arrow keys or numeric keypad directions |
| Confirm/interact | Enter, Z, Space |
| Cancel/menu | Escape, X, numpad 0 |
| Dash | Hold Shift |
| Page/cycle | Q/W or Page Up/Page Down |

WASD movement is not configured in the current input map. **F5 reloads the desktop game; it is not Quick Save.** F8 opens developer tools only in supported desktop test mode; it is not Quick Load or a bug reporter. Save through the game menu when saving is allowed.

## Where should I begin?

The configured start is Mega Earth (Map001). Timbuc and its cellar contain early quest/event material. Follow the live dialogue and quest requirements rather than old instructions promising unsupported unlocks or hundreds of completed quests. Reversible prototype calibration and Rex cosmetics are available at the existing clinics.

## What should I keep?

Keep quest items such as Necklace pieces, Smelly Keys and engine components. Regular consumables and equipment are separate from key items. Use multiple save slots before major encounters or story choices.

## Are the old secret unlock instructions reliable?

No. Unverified steps have been removed from these FAQs. Unfinished and unstarted work is explicitly listed in [the roadmap](ROADMAP.md), not presented as playable content.

Evidence: `data/System.json` (start and party); `js/rpg_core.js` (`Input.keyMapper`); `js/rpg_managers.js` (`SceneManager.onKeyDown`).
