# Maze expeditions

Six additional optional dungeons, twelve floors (116–127), 108 named rooms, and 186 new native events. Each level has a distinct deterministic nine-map graph with one loop, branching corridors, side rooms, clues, and salvage. No bosses, minibosses, random encounters, or battle events.

| Quest / dungeon | Start | Maps | Reward |
|---|---|---|---|
| Your Name Is On Backorder / Pronoun Reclamation Vault | Clerk Alias, Naming Office (107) | 116–117 | 320 credits |
| The Right to Repair Yourself / Warranty Intestine | Mechanic Socket, Workshop (108) | 118–119 | 350 credits |
| Dead Letter, Live Kidney / Misdelivery Repository | Dispatcher Brine, Salvage Office (109) | 120–121 | 380 credits |
| The Tide Is a Subscription / Tidal Invoice Works | Pump keeper Silt, waterfront market (105) | 122–123 | 410 credits |
| Eight Hours, Subject to Approval / Overtime Dream Exchange | Night steward Yawn, Rivet Commons (103) | 124–125 | 440 credits |
| Heat Death of the Help Desk / Thermal Complaint Complex | Boiler tender Cinder, Thaw House (104) | 126–127 | 470 credits |

Each quest requires two first-floor records, unlocking the second floor, interpreting the evidence at its recovery console, choosing public disclosure or copies for affected residents, and returning to the giver. Wrong answers can be retried; rewards and caches cannot be farmed. Return passages are unconditional. These are optional underground facilities attached to existing hubs; the waterfront galleries are dry rooms behind the seawall, and the frozen annex is beneath the thaw house.

Every room is a separate Map JSON. Action-button doors on opposing room edges transfer to the adjacent map; both directions are always available. The maze is the network of maps, not a large single floor with room-shaped areas.

Room markers list room names, numbers, and connected rooms. Each floor enters at Room 7; first-floor evidence is in Rooms 1 and 9, and Room 3 holds the descent or final console. This shared signage convention makes the different maze routes navigable. Branches contain salvage, memoranda, and a second-floor reminder of the evidence.

Accept any job to receive **Expedition Notes**, reusable Key Item 152. Use Key Items, confirm the party, and choose a category and case. This supplements the existing Dungeon Field Notes without replacing it. Native Common Event 6; switches 131–166. Tileset 19 reuses industrial and medical assets with their existing passage flags. No engine or plugin changes.

## Build and verification

- `build_mazes.py` stages from `before-mazes.zip`, a snapshot of the completed earlier dungeon expansion.
- `node tools/mazes/test_mazes.js` (or `--live`) checks all six questlines, both disclosure choices, early access, wrong answers, one-time payments, room graphs, event access, and transfer landings through native engine conditions/passability.
- `node tools/mazes/smoke_mazes.js` loads all 108 room maps in Chrome with installed plugins, checks landing reachability, completes the identity quest, round-trips native save contents, uses Expedition Notes through the actual item scene, and walks to a room door before activating its real map-interpreter transfer. It does not test disk save-slot UI or manually walk every corridor.
- `publish_mazes.py` requires both reports to pass and refuses to overwrite intervening edits.
- See `validation.json`, `browser-validation.json`, `manifest.json`, and `previews/contact.png`.

Do not republish older world/dungeon snapshots over these changes. Reconcile subsequent edits before rebuilding from any baseline. The contact sheet shows representative separate maps. `connections.png` shows all six map networks. Runtime screenshot: `previews/in-game-archive.png`.
