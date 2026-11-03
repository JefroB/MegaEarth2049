# MegaEarth 2049 — Combat

## How does combat work?

The current game uses RPG Maker MV side-view, turn-based battle flow with custom animated-enemy and boss plugins. WeaponSkill supplies per-weapon Attack skills. The enabled QuestJournal file contains descriptions only, without a journal interface; the installed Yanfly Battle Engine Core and action-sequence packs are not currently enabled. Installing a plugin file or writing its notetags does not activate it.

## Which skill types and elements exist?

Skill types: **Incantation, Ability, Tech, Squad Attack, Cheer**. Basic Attack/Guard are separate battle commands. Actor commands and access depend on their current class/equipment.

Elements: **Physical, Fire, Ice, Thunder, Water, Earth, Wind, Light, Darkness**. Funk, radiation and a separate Tech damage element are not in the current element list. An elemental attack applies an ailment only when its actual skill effects specify one.

## What makes the new weapons different?

The twelve surplus weapons use distinct Attack skills and native animations. Examples include a slowing stapler, a spike driver that benefits from Stapled, an MP-draining Boomerang Invoice, and a weak Rubber Chicken that reduces enemy TP. Foam Finger and Percussive Care Manual target allies. They are not an unlimited upgrade system.

See [weapon preview](../art/weapons/preview.html) and [equipment FAQ](FAQ_05_Equipment_and_Items.md).

## Which status effects work?

States52–75 provide24 temporary ailments, buffs and debuffs. Later additions include Paralysis77, Temporal Stasis78 and Stone Skin79, with application/removal paths and remedies. These additions expire and clear after battle. Some diseases deliberately combine benefits and costs. Legacy state names must not be treated as complete implementations; see [diseases](FAQ_09_Disease_System.md).

## Are bosses phased?

Custom miniboss and main-boss controllers exist. The Underwriter is a regional boss, not the game's final encounter. Follow its telegraphs and the actual fight's move set. Enemy vulnerabilities must be checked individually; there is no general rule that all ninjas lose to area attacks or all trash enemies are physically immune.

## Can we add more cinematic attacks?

Yes. Native animation cells already support authored projectile positions and rotation. Yanfly choreography is a feasible integration task with compatibility testing, not currently active behavior. There is no implemented universal Pandemic Party bonus, disease achievement, or Charisma/Finger Dexterity damage system.

Evidence: `data/System.json`, `data/Weapons.json` 61–72, `data/Skills.json` 185–254, `js/plugins.js`, `js/plugins/ME_MainBoss.js`.
