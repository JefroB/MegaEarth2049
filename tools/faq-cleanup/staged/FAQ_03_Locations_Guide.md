# MegaEarth 2049 — Locations

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
| Underwriter branch |238 Executive Liability,239 Claims Audit Archive|
| Underworks service annex |240, optional Third Eye/filter bypass|
| Clown Court |241–243, connected filing/evidence/hearing rooms|
| SLF break room |244, through Pip after machine diagnostics|
| Hidden Dojo |245–248, first Collective trial|
| Perfect Fit showroom |249–250, paired projection rooms|
| Iron Circuits |251, optional MAX-E-MUM recruitment gym|

These are map records, not a promise that every older story location or every passage has been fully playtested.

## Is there fast travel?

Use the Ship Transponder from the menu on the MegaEarth, Ork or Ting Ting world map to board the Marcus Garvey 2.0. Choose a destination at its navigation station. It cannot summon the ship from inside dungeons. No universal clinic hotline, VIP teleport or random body-swapping transport system is verified.

## Does Needsaname rearrange itself every day?

No. It has authored maps. The [Perfect Fit showroom](FAQ_06_Quests_and_Storylines.md#the-perfect-fit) in Timbuc2 now uses two fixed projection layouts for an optional puzzle. It does not regenerate Needsaname or any other campaign geography.

## Where is the finale?

The confirmed plan returns to **Map001**, enters and traverses the floating castle, then presents **two consecutive final bosses**. Their final identities and handoff still require implementation decisions. The new service vestibule is not a shortcut that replaces the castle or Necklace requirements.

## What about the Hidden Dojo, Clown Court and vending-machine headquarters?

Clown Court is now accessible through Bailiff Honk in Timbuc, west of the Burlap package/researcher area. Its filing hall, evidence discovery room and hearing chamber are separate connected maps. See [the court guide](FAQ_06_Quests_and_Storylines.md#clown-court). The Snack Liberation Front break room is now reached through Pip in Timbuc after inspecting machines in Timbuc, Timbuc2 and B.M.N.E.C. public frontage; see [the uprising guide](FAQ_06_Quests_and_Storylines.md#vending-machine-uprising). The [Hidden Dojo](FAQ_10_Ninja_System.md#hidden-dojo-first-trial) now opens through the Internet Cafe/Matrix Collective handshake after Pink Ninja joins.

Evidence: `data/MapInfos.json`, `data/CommonEvents.json` 1, `data/Items.json` 144, [confirmed progression](../docs/story/STORY_PROGRESSION.md).

## How does the Marcus Garvey2.0 work?

It is the party’s spaceship for travel between planets. Reusable Ship Transponder144 works from the menu on worlds001,028 and 039 when owned; it boards the existing bridge Map050 at(7,11). The navigation station retains its authored destinations and berth checks. It does not summon the ship inside a dungeon, grant ownership, bypass castle requirements or repurpose Beanstalk Access switch21. Jack’s bridge invitation does not award the ship. See [Jack’s chapter](FAQ_04_Characters_and_NPCs.md#jack-passengers-are-not-freight).


## Underworks service annex

- **Armatek Underworks (Map110), maintenance grievance panel:** the existing clue remains. Third Eye Mod134 reveals a safe service bypass without consuming the mod. The scratched filter instruction offers another entrance by consuming one Pathogen Purge157. Unsafe overrides refuse entry without damage or consumption. Both lead to new optional annex240. Its cabinet gives one Panacea, two Green Herbs and 90 Credits once; exit is unconditional. Registry, necklace, castle and other campaign flags are unchanged.
