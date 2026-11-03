# MegaEarth 2049 — Secrets and jokes

## Which older secret instructions can I rely on?

The imported document invented precise encounter rates, passwords, collectible counts and endings. Those unlock instructions have been removed. Existing Smelly Key doors and authored exploration rewards are real material; further secrets should be documented only after their trigger and reward are verified.

## Is the Rubber Chicken real?

Yes: Executive Rubber Chicken is weapon66, a deliberately weak weapon with a TP effect. The workshop now offers a fixed Union Rubber Chicken exchange; see [the implemented upgrades](FAQ_05_Equipment_and_Items.md#fixed-weapon-exchanges-and-remedies). A hidden upgrade tree and legendary Squawk form are not implemented.

## Is the poo boss a 1-in-1000 secret encounter?

The existing Poopoo Caca and Crap enemy records are 115/116 and have updated artwork. That does not establish the imported legendary-poop family encounter rates or named secret accessories. Those claims were removed.

## Is there a Developer Room password or title-screen Konami minigame?

Neither unlock was verified in live events. An old debug-room skill even refers to Map103, which is now the Workers' Salvage Yard; it must not be followed by overwriting that map. Debug tools are not player rewards. F8/F9 behavior depends on desktop test mode and is not a secret ending system.

## Which bounded secrets and collections are playable?

The [off-clock collection](FAQ_07_Secrets_and_Easter_Eggs.md#off-clock-collections-and-salvage) now includes three joke cards, a workers cookbook and a machine love letter. [Rivet sorting practice and the archive terminal](FAQ_06_Quests_and_Storylines.md#rivet-local-projects) now provide bounded rewards with safe retries. The [Hidden Dojo first trial](FAQ_10_Ninja_System.md#hidden-dojo-first-trial) is playable after Pink recruitment. [The Perfect Fit](FAQ_06_Quests_and_Storylines.md#the-perfect-fit) now adds a paired showroom illusion puzzle after the SEAM hand-in, and [all nine original companions](FAQ_04_Characters_and_NPCs.md#companion-chapters) have one bounded chapter. Further character arcs and a ninja cookbook are not claimed as implemented.

No automatic toilet/cow dimensions, real-world system changes, arbitrary developer-console powers, or unreconciled alternate finale are promised. See [the additions backlog](ROADMAP.md) for retained ideas.

Evidence: `data/Weapons.json` 66; `data/Enemies.json` 115/116; `data/MapInfos.json` 103; current event search and `js/plugins.js`.


## Off-clock collections and salvage

| Activity | Where to find it | Behavior and reward |
|---|---|---|
| A13: disease hazards | Warning caches in Armatek Underworks110, Condensation Catacombs112 and The Unpaid Shift114 | Explicit interaction only. Leave safely, consume one Pathogen Purge to sterilize, or accept a resistance-aware 50% base exposure check for Chrome Rot, Scabies or Influenza respectively. Immunity applies. Each cache clears once; a full pack causes no cost or exposure. |
| A16: six-part recycling | Three loose parts in Rivet Commons103, Newtown Market105 and Shared Workshop108; the other three in the warning caches | Bring one of each named part to Beryl in Rivet Commons. One exchange pays250 Credits and 1 Panacea. Full reward inventory or postponement preserves the parts. Consumed caches cannot respawn. |
| A19: off-clock collection | Joke cards from the Rivet welder, canteen pension auditor and Mox in the SLF break room244 | Three unique cards earn the Off-Clock Cookbook and 100 Credits from the canteen steward. Cards remain readable; reward is once per save. |
| A19: machine letter | Print at the SLF fridge manifesto board after either vending-uprising resolution | Deliver to the canteen steward for 1 Energy Drink. The letter is consumed; delivered letters cannot be reprinted. |
| A19: scrapbook | Granted by the new sources, collection counters and clothing vendor | Reusable menu Key Item190 tracks actual counts, source clues, earned recipes, letter progress and outfit clues through common event9. No crafting system is implied by the cookbook. |

The three warning caches have explicit refusal/sterilization choices; no automatic contagion is implied. The cookbook is a readable reward, not an implemented crafting system. Read cards, recipes, letter progress and outfit clues through the reusable Off-Clock Scrapbook190. See [Rivet local projects](FAQ_06_Quests_and_Storylines.md#rivet-local-projects) for sorting and the archive.
