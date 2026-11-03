# Historical document writer; consolidated FAQs supersede this output layout.
raise SystemExit("Retired FAQ writer: edit the consolidated FAQ_01–11 files and GameFAQs/ROADMAP.md. See tools/faq-cleanup/README.md.")
from pathlib import Path
pages={
'FAQ_01_Getting_Started.md':'''# MegaEarth 2049 — Getting started

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

The configured start is Mega Earth (Map001). Timbuc and its cellar contain early quest/event material. Follow the live dialogue and quest requirements rather than old instructions promising nonexistent clinic upgrades or a fixed list of hundreds of quests.

## What should I keep?

Keep quest items such as Necklace pieces, Smelly Keys and engine components. Regular consumables and equipment are separate from key items. Use multiple save slots before major encounters or story choices.

## Are the old secret unlock instructions reliable?

No. Unverified steps have been removed from these FAQs. Feasible future ideas are explicitly listed in [the additions backlog](ADDITIONS_BACKLOG.md), not presented as playable content.

Evidence: `data/System.json` (start and party); `js/rpg_core.js` (`Input.keyMapper`); `js/rpg_managers.js` (`SceneManager.onKeyDown`).
''',
'FAQ_02_Combat_System.md':'''# MegaEarth 2049 — Combat

## How does combat work?

The current game uses RPG Maker MV side-view, turn-based battle flow with custom animated-enemy and boss plugins. WeaponSkill supplies per-weapon Attack skills. Yanfly Quest Journal is enabled; the installed Yanfly Battle Engine Core and action-sequence packs are not currently enabled. Installing a plugin file or writing its notetags does not activate it.

## Which skill types and elements exist?

Skill types: **Incantation, Ability, Tech, Squad Attack, Cheer**. Basic Attack/Guard are separate battle commands. Actor commands and access depend on their current class/equipment.

Elements: **Physical, Fire, Ice, Thunder, Water, Earth, Wind, Light, Darkness**. Funk, radiation and a separate Tech damage element are not in the current element list. An elemental attack applies an ailment only when its actual skill effects specify one.

## What makes the new weapons different?

The twelve surplus weapons use distinct Attack skills and native animations. Examples include a slowing stapler, a spike driver that benefits from Stapled, an MP-draining Boomerang Invoice, and a weak Rubber Chicken that reduces enemy TP. Foam Finger and Percussive Care Manual target allies. They are not an unlimited upgrade system.

See [weapon preview](../art/weapons/preview.html) and [equipment FAQ](FAQ_05_Equipment_and_Items.md).

## Which status effects work?

The two recent batches add 24 temporary states, with application skills, enemy variants, removers and shop remedies. They expire and clear after battle. Some diseases deliberately combine benefits and costs. Legacy state names must not be treated as complete implementations; see [diseases](FAQ_11_Disease_System.md).

## Are bosses phased?

Custom miniboss and main-boss controllers exist. The Underwriter is a regional boss, not the game's final encounter. Follow its telegraphs and the actual fight's move set. Enemy vulnerabilities must be checked individually; there is no general rule that all ninjas lose to area attacks or all trash enemies are physically immune.

## Can we add more cinematic attacks?

Yes. Native animation cells already support authored projectile positions and rotation. Yanfly choreography is a feasible integration task with compatibility testing, not currently active behavior. There is no implemented universal Pandemic Party bonus, disease achievement, or Charisma/Finger Dexterity damage system.

Evidence: `data/System.json`, `data/Weapons.json` 61–72, `data/Skills.json` 185–254, `js/plugins.js`, `js/plugins/ME_MainBoss.js`.
''',
'FAQ_03_Locations_Guide.md':'''# MegaEarth 2049 — Locations

## Which areas have maps?

| Area | Map IDs / examples |
|---|---|
| Mega Earth | 001 world map; 010 Timbuc; 002 Timbuc 2 |
| Early dungeon | 015 Timbuc Cellar and linked rooms |
| Digital / medical areas | 008 Internet Cafe, 009 Matrix, 024–027 and 041 B.M.N.E.C. |
| Planet Ork | 028 world map, Dorlund maps, 062 lava fields |
| Planet Ting Ting | 039 world map, Snowy Village, Newtown and lake maps |
| Planet Needsaname | 102 world map and 107 naming office |
| Floating Mansion/castle | 038 exterior, 040/091 floors and associated rooms |
| New local settlements | 103 salvage yard, 104 thaw house, 105 reclamation market, 106 canteen |
| New dungeon branches | 110–115 and interconnected maze maps 116–223 |
| Custodian chambers and service access | 224–237 |
| Underwriter branch | 238 Executive Liability, 239 Claims Audit Archive |

These are map records, not a promise that every older story location or every passage has been fully playtested.

## Is there fast travel?

The Ship Transponder and a travel common event exist, but **the old travel implementation needs repair before it can be documented as a reliable route**. Its planet labels reference maps 2/3 where the live world maps are 28/39; its condition/trigger and item wiring also need review. Use established map exits. No universal clinic hotline, VIP teleport or random body-swapping transport system is verified.

## Does Needsaname rearrange itself every day?

No. It has authored maps. A small scripted illusion/puzzle route is feasible; automatic daily regeneration of the campaign geography has been removed from the FAQ.

## Where is the finale?

The confirmed plan returns to **Map001**, enters and traverses the floating castle, then presents **two consecutive final bosses**. Their final identities and handoff still require implementation decisions. The new service vestibule is not a shortcut that replaces the castle or Necklace requirements.

## What about the Hidden Dojo, Clown Court and vending-machine headquarters?

They are candidates, not verified destinations. Court/manifesto items exist, but that does not establish complete maps or quests. See [the backlog](ADDITIONS_BACKLOG.md).

Evidence: `data/MapInfos.json`, `data/CommonEvents.json` 1, `data/Items.json` 144, [confirmed progression](../STORY_PROGRESSION.md).
''',
'FAQ_04_Characters_and_NPCs.md':'''# MegaEarth 2049 — Characters

## Which actors are defined?

| Actor IDs | Names | Current class |
|---|---|---|
| 1 | Rex | Hacker |
| 2 | Jen | Priest |
| 3 | Zack | Construction Worker |
| 4 | Zed | Clown |
| 5–7 | Black, Blue, Pink Ninja | Ninja |
| 8 | Niles | Punk |
| 9 | Jack | Smuggler |
| 10 | Dick | Thief |
| 11–12 | A.S.P. records | Hacker |

Zed's mod-doctor story role does not change his current database class. Duplicate A.S.P. actor records are not evidence of two separately recruitable companions. New games now start with Rex, Zack and Zed only.

## How are Jen and Pink Ninja recruited?

Jen has a recruitment event in Map057/event2 gated by switch9; it adds actor2. Pink Ninja has a recruitment branch in troop15 which adds actor7 when the troop event condition is reached and she is not already in the party. The old automatic-alley recruitment story should not be used as a walkthrough. End-to-end progression still needs campaign testing.

## Are all named story NPCs available companions?

No. The imported FAQs described MAX-E-MUM, Captain Calamari, The Narrator and other proposed companions as already recruitable. No matching actor records exist in the current actor table. Their story potential is retained in the backlog, not as unlock instructions.

## Are romance, jealousy and global reputation implemented?

A general relationship/reputation system was not found in the current named variables, active plugins or searched event commands. Individual authored choices are not proof of that larger system. A bounded relationship quest or one-faction reputation prototype is feasible; the claimed automatic discounts, rival romances, faction bounty hunters and alternate endings are not current features.

## Can NPC deaths be reversed by cloning or retcons?

There is no verified universal NPC death/replacement/resurrection system. Such outcomes would need explicit events for specific characters. Ordinary actor Knockout/revival mechanics are a different system.

## Who is the final boss?

The final pair has not been fixed as playable content. Preserve the existing A.S.P./Necklace story and [confirmed finale route](../STORY_PROGRESSION.md); the imported list of unrelated romance and developer bosses is not an authoritative ending design.

Evidence: `data/Actors.json`, `data/Classes.json`, `data/System.json`, `data/Map057.json` event2, `data/Troops.json` troop15; event-search evidence in `tools/faq-audit/event-evidence.json`.
''',
'FAQ_05_Equipment_and_Items.md':'''# MegaEarth 2049 — Equipment and items

## What can be equipped?

The configured slots are **Weapon, Shield, Hat, Jacket, Gloves, Pants, Shoes, Accessory**. Classes and actor traits determine equipment access. There is no separate general-purpose implant/program slot system in the active configuration.

## What weapons and armor are actually present?

Examples include the BFG, Chainsaw, Railgun, Yo-Yo, laser weapons, Bermuda Shorts and Armortech clothing. New surplus weapons include Executive Rubber Chicken, Boomerang Invoice, OSHA-Approved Brick and support weapons. Exact effects come from the database, not their names: the chicken has no implemented secret maximum-upgrade form.

No named Burlap armor record is currently defined even though the Burlap quest and fabric items exist. That is a feasible addition, not evidence that wearing a complete burlap set already opens a dimension.

## What consumables can I use?

Hot Links restore 100 HP; Spicy Burrito restores 150 HP; Energy Drink restores 30 MP; Stimulant grants 20 TP and removes Sleep; Rabinex removes Rabies. Acetaminophen and the new status remedies also exist. Check the in-game description and usable targets.

Newtown's reclamation-market pharmacy and salvage dealer stock the new cures and dispels. [State previews](../art/states/preview.html) and [second batch](../art/states-2/preview.html) show their effects.

## Is inventory limited by weight or durability?

The current native inventory is shared and normally caps each item at 99. A weight-by-Strength system, global weapon degradation, universal contraband checks and automatic STD contamination are not implemented by the active stack. Individual quest-specific checks can be added without building a full simulation.

## Are there upgrades or surgery services?

A named item alone is not an installed enhancement. Disco Implant, Third Eye Mod and Experimental Neural Enhancer are currently key-item records without direct use effects. No complete general upgrade/crafting/surgery loop was verified. A small exchange-based weapon upgrade service and explicit implant choices are promising additions.

## Can I buy Probably Not Poison, Finger Guns or a Panacea?

Those older FAQ names do not have matching current item/weapon records. They are feasible candidates, not available purchases. A randomized potion should use a bounded outcome table and a clear description, not undocumented quest-breaking transformations.

Evidence: `data/System.json` equipTypes; `js/rpg_objects.js` `Game_Party.maxItems`; `data/Items.json`, `Weapons.json`, `Armors.json`; `data/Map105.json` events4/5.
''',
'FAQ_06_Quests_and_Storylines.md':'''# MegaEarth 2049 — Quests and storyline

## What story should new content follow?

Build on Rex's implant, corporate control, the Necklace and A.S.P./Protocol Zero material. The authoritative current constraints are in [STORY_PROGRESSION.md](../STORY_PROGRESSION.md). Older story outlines remain sources, but their proposed quest names and ending variants are not proof of playable events.

## Are there 800 side quests and six completed endings?

Those counts were unsupported and have been removed. The repository contains named quest switches, journal text and map events at different levels of completion. Journal entries alone do not prove a complete quest chain, rewards or traversable route. No replacement completion count is asserted without a quest-by-quest playthrough.

## What existing quest material can we build on?

- Necklace pieces and assembly requirements.
- Smelly Keys and the Timbuc Cellar rooms.
- Jen's necklace/recruitment event.
- Engine Blueprint/components and completion events.
- Burlap Package, Fabric Sample and SEAM-3000 confrontation.
- Armatek Underworks, Cold Storage and Dorlund's Unpaid Shift/Payroll Ossuary.
- Six newer maze investigations and their custodian encounters.

Some older maps contain duplicate-looking quest events. The engine completion events, for example, differ in switch handling. These need reconciliation before a definitive walkthrough is published.

## How much of the Burlap Pants Conspiracy exists?

Timbuc has package/researcher events; Timbuc 2's Pants-O-Rama events lead to troop52 and the SEAM control module. The imported walkthrough's delivery-truck pursuit, factory levels, lab analysis and reprogram-or-destroy ending are not established by that shorter live chain. The safe extension is to finish and de-duplicate the existing chain first.

## What is the Underwriter's role?

It is a regional Dorlund boss connected to the recovered payroll roster. Defeating it opens the Claims Audit Archive. It neither replaces the Necklace guardian nor completes the game's final castle sequence.

## What remains feasible to add?

Clown Court, vending-machine liberation, bounded ninja missions, character side quests and optional radio/food/archive quests are retained in [ADDITIONS_BACKLOG.md](ADDITIONS_BACKLOG.md). They need explicit maps, events, rewards and verification. Relationship-driven quest availability and global timed failures are not current guarantees.

## What is the endgame plan?

Return to the first world map, gain entry to and navigate the floating castle, then fight two bosses back to back. Preserve existing resource/Necklace requirements and ending themes. The number of endings, final identities and checkpoint policy remain unresolved; no secret seventh ending is advertised.

Evidence: `data/System.json` named switches; `data/Map001.json` events10/17; `data/Map002.json` events23/26; `data/Map010.json` events10–13; `data/Map057.json` event2; `STORY_PROGRESSION.md`.
''',
'FAQ_07_Secrets_and_Easter_Eggs.md':'''# MegaEarth 2049 — Secrets and jokes

## Which older secret instructions can I rely on?

The imported document invented precise encounter rates, passwords, collectible counts and endings. Those unlock instructions have been removed. Existing Smelly Key doors and authored exploration rewards are real material; further secrets should be documented only after their trigger and reward are verified.

## Is the Rubber Chicken real?

Yes: Executive Rubber Chicken is weapon66, a deliberately weak weapon with a TP effect. Its hidden upgrade tree and legendary Squawk form were not implemented. A small optional upgrade quest is feasible.

## Is the poo boss a 1-in-1000 secret encounter?

The existing Poopoo Caca and Crap enemy records are 115/116 and have updated artwork. That does not establish the imported legendary-poop family encounter rates or named secret accessories. Those claims were removed.

## Is there a Developer Room password or title-screen Konami minigame?

Neither unlock was verified in live events. An old debug-room skill even refers to Map103, which is now the Workers' Salvage Yard; it must not be followed by overwriting that map. Debug tools are not player rewards. F8/F9 behavior depends on desktop test mode and is not a secret ending system.

## What silly secrets could we add?

A vending-machine love letter chain, a fixed set of collectible jokes, a small trash-sorting reward, a ninja cookbook, a hidden challenge room or a scripted burlap-themed room are practical event-based additions. Preserve the absurdity; give every secret a real trigger, bounded reward and nonblocking exit.

No automatic toilet/cow dimensions, real-world system changes, arbitrary developer-console powers, or unreconciled alternate finale are promised. See [the additions backlog](ADDITIONS_BACKLOG.md) for retained ideas.

Evidence: `data/Weapons.json` 66; `data/Enemies.json` 115/116; `data/MapInfos.json` 103; current event search and `js/plugins.js`.
''',
'FAQ_08_Technical_Issues.md':'''# MegaEarth 2049 — Technical issues

## How tested is the game?

Recent features have automated checks and battle previews, but those are not a complete campaign playtest. A missing sprite, stalled event or rendering error is a bug, not an intentional disease symptom. No hardware minimums, release-platform guarantees or performance statistics are asserted without measurements.

## Where are saves stored?

In the desktop NW.js build, the current storage code uses the **save/** directory next to the application's main module, with `fileN.rpgsave`, `global.rpgsave` and `config.rpgsave`. Browser play uses local storage for that browser origin. These are different save locations.

Back up the desktop save folder before replacing a build. Avoid clearing browser site storage if it contains saves. The engine has save-backup routines, but there is no verified cloud-sync service or universal `saves/backup/` recovery folder. Keep a separate copy rather than relying on imaginary recovery commands.

## Does F5 save, or F8 load/report bugs?

No. F5 reloads the desktop application and can lose unsaved progress. F8 opens NW.js developer tools when test mode permits it. Use the normal Save/Load interfaces. No tilde-console `unstuck` or `CompleteQuest` command is implemented.

## What settings are actually available?

The native Options window includes Always Dash, Command Remember, and BGM/BGS/ME/SE volumes. There are no verified volumetric-STD, neural-audio, shader-cache, corporate-translation or launcher-repair controls.

## What should I do about a crash, loading hang or missing image?

Record the exact error, location, action and build/files being used. Preserve the save before trying a different build. Check that referenced assets are present and their filenames match. Developers can inspect the console and the affected map/event/plugin. Do not disable antivirus, rename your operating-system account, delete configuration folders blindly, or use clothing changes as a repair procedure.

## What if I am stuck or a quest will not complete?

Reload a separate earlier save if available, and report the map, event or doorway, last dialogue/choice and relevant inventory. Developers should inspect passability, transfers and event conditions. Do not discard quest items or force switches as a generic fix. The ship-transponder route is a known static-audit discrepancy tracked in [the audit](CURRENT_IMPLEMENTATION_AUDIT.md).

## How do I report a bug?

Provide reproducible steps, expected/actual behavior, error text, a screenshot if useful, and a copy of the relevant save through your existing project communication channel. No official website, email address, Discord, in-game reporter or bug-bounty program has been verified for publication in this FAQ.

Evidence: `js/rpg_managers.js` StorageManager and SceneManager; `js/rpg_windows.js` Window_Options; `package.json`; active plugins in `js/plugins.js`.
''',
'FAQ_12_Ninja_System.md':'''# MegaEarth 2049 — Ninjas

## Which ninjas are party characters?

Black Ninja (actor5), Blue Ninja (actor6) and Pink Ninja (actor7) exist and share class5, Ninja. Other colors have enemy/art records; that is not the same as a complete recruitable party character.

Pink Ninja has been removed from the configured starting party. Existing saves are not stripped of their members.

## How does Pink Ninja recruitment currently work?

Troop15 contains a recruitment branch: its event checks the first enemy's HP, then adds actor7 if she is not already present. This is evidence of a live recruitment implementation, not proof of every encounter path. The older automatic Shadow Collective quest trigger was not found alongside it.

## Do the colors have unique classes and the advertised powers?

Not yet. All three party ninjas share class5, though actor traits differ. Blue Ninja is not granted every weapon type merely by being blue. The older Mind Shield, Thought Scan, Compiler's Mask, Shadow Step and color-specific ability lists are design candidates, not verified skill packages.

Current Ninja class additions include skills for temporary states such as Aim Assist, Reflex Cache, Packet Loss and Optic Desync. Use the live skill list and equipment restrictions.

## Is the Hidden Dojo available?

No matching dojo map/entry or Compiler/Shadow Collective quest event was found in the current map/event audit. The Internet Cafe and Matrix do exist and could support a bounded future dojo entrance. Allocate a new map; do not repurpose occupied map IDs from old instructions.

## Should the Collective and Compiler lore be discarded?

No. They can support future ninja missions, but the claim that the Compiler is A.S.P.'s creator must first be reconciled with the existing creator revelations and finale. Do not silently establish an incompatible origin through this FAQ.

## What ninja additions are practical?

Distinct actor-granted skills, state-resistance bandanas, a small dojo challenge chain, a cookbook collectible or a scripted cat companion are feasible. A full faction simulation, universal corporate disguises and freeform phasing through every wall are not current features.

Evidence: `data/Actors.json` 5–7; `data/Classes.json` 5; `data/Troops.json` 15; `data/System.json`; `data/MapInfos.json`; [backlog](ADDITIONS_BACKLOG.md).
''',
'FAQ_13_Body_Modification_System.md':'''# MegaEarth 2049 — Body modification

## How much of the older modification system exists?

The setting and maps support neural/body-modification stories. B.M.N.E.C. and other mod-center maps exist. However, there is no verified general catalog with permanent limb replacement, surgery, maintenance, rejection rolls, compatibility slots, cosmetic compositing and achievements.

Disco Implant (item133), Third Eye Mod (134) and Experimental Neural Enhancer (153) are currently key items without direct use effects. Having these records does not implement a permanent surgery system or prove all proposed world interactions exist.

## Which related mechanics work now?

Temporary battle states provide several interpretations: Dermal Plating, Nanite Repair, Adrenal Surge, Signal Focus, Aim Assist, Reflex Cache, Countermeasure and Capacitor Reserve. Beneficial Parasites offers a strength/speed benefit with HP loss. They are timed combat states, not permanent installed modifications.

See [disease/status FAQ](FAQ_11_Disease_System.md) and the [current previews](../art/states-2/preview.html).

## What could a practical clinic add?

A small fixed catalog can exchange credits/components for explicit traits, a skill, or an equipped accessory. A companion removal procedure can undo exactly that change. A persistent variable or dedicated equipment slot could track the choice, but would require new implementation and save-compatibility testing. Existing implant quest items are the best starting point.

Use authored costs, an explicit effect/side effect, and a clear removal route. Keep body horror in the art/dialogue and supported mechanics. No arbitrary dynamic limb simulation is needed to make a clinic feel grotesque.

## Could modifications unlock exploration routes?

Yes, through explicit event checks at selected hazards, terminals or doors. A Third Eye reveal or toxin-filter shortcut is feasible. It should not accidentally bypass the Necklace, castle-entry requirements or confirmed finale.

## What has been removed from the FAQ?

Claims of procedurally changing every character's anatomy, automatic universal social reactions, perpetual maintenance simulation, unlimited simultaneous mods, and already-working clinic hotlines/achievements were removed. A finite sprite variant or a few scripted NPC reactions remains a viable smaller alternative.

Evidence: `data/Items.json` 133/134/153; `data/System.json` equipment types; `data/States.json` 52–75; `data/MapInfos.json`; `js/plugins.js`; [feasible additions](ADDITIONS_BACKLOG.md).
'''}
for name,body in pages.items():Path('GameFAQs',name).write_text(body,encoding='utf8')
# Disease guide is generated from current live data, not the historical catalog.
import json
states=json.loads(Path('data/States.json').read_text(encoding='utf8'))
body='''# MegaEarth 2049 — Diseases and states

## Which status additions are fully wired in?

The two recent batches add states 52–75, with application/removal skills, icons, native animations, selected ordinary-enemy uses and shop remedies. They last 2–3 turns and clear at battle end. These are fictional RPG effects, not medical descriptions or treatment advice.

| State | Current effect |
|---|---|
'''
for i in range(52,76):body+='|'+states[i]['name']+'|'+states[i]['note'].split(' Duration:')[0].split(' Temporary battle')[0]+'|\n'
body+='''
## How are they removed?

- **Clinical Flush / Pathogen Purge:** both batches of diseases, plus Parcel Fever and Recall Rash. This also removes Beneficial Parasites' bonuses.
- **Neural Reboot / Neural Reset Cartridge:** both batches of debuffs, plus Stapled, Glitterblind and Fine Print.
- **Revoke Benefits / Benefit Revocation / Deauthorize:** specified new buff states and ordinary stat buffs from an enemy.
- **Safe Mode:** specified new buff states from an ally.
- **Emergency Rollback:** all 24 new states, including beneficial ones.
- **Acme Footloose, Evict-A-Worm, Airplane Mode and Clean Slate:** narrower options described in their item text.

The new items are stocked at Newtown Reclamation Market's salvage dealer and pharmacy. These removers do not clear Knockout, Immortal or unrelated scripted states.

## Do all the older disease names have effects?

No. For example, legacy states27–31 (Herpes, Aids, Gonorrhea, Syphalis, The Clap) have no native traits in the current data. Their names alone do not implement the severe penalties or cures claimed in the imported FAQ. Several other legacy placeholders also need a dedicated pass. Preserve IDs when finishing them; the current new-state removers are not a universal cure for every legacy state.

Rabinex and Rabies exist. Do not assume that every named Acme cure from the older catalog is an available item. An STD expansion with balanced effects, transmissions, clear recovery routes and appropriate boss handling is a high-priority feasible addition.

## Do diseases spread, change dialogue or unlock achievements automatically?

No general contagion/social-reaction/achievement system was verified. A specific enemy skill or event can apply a state. A bounded hazardous room, optional diagnosis catalog or explicit NPC reaction is feasible future work. Random permanent skill loss, lighting-dependent disorders and player-specific diagnoses are not current mechanics.

## Can a disease be useful?

Yes. Beneficial Parasites raises ATK/AGI but drains HP; Wi-Fi Allergy trades HP loss for Thunder resistance; Digital Dementia lowers accuracy while increasing critical chance. These are explicit temporary tradeoffs adapted from the old designs, not hidden permanent character changes.

Evidence: `data/States.json`, `data/Skills.json`, `data/Items.json`, `data/Map105.json`; [first preview](../art/states/preview.html), [second preview](../art/states-2/preview.html), [audit](CURRENT_IMPLEMENTATION_AUDIT.md).
'''
Path('GameFAQs/FAQ_11_Disease_System.md').write_text(body,encoding='utf8')
print('Rewrote 11 remaining FAQs with current evidence and explicit future-content boundaries')
