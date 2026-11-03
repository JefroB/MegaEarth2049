---
name: debug-room
description: Build isolated, evidence-backed playtest fixtures without overwriting campaign maps or inventing progression.
---

# Developer Debug Room

Inspect data/MapInfos.json and every existing MapNNN.json before allocating a new map ID. There is currently no verified developer room. Map103 is Workers Salvage Yard, Map105 is the market, and Map112 is a dungeon; never repurpose them.

Use a separate disposable test save. Start fixtures with DataManager.setupNewGame(), using System.json for the starting party and spawn. Never reset story switches or party membership in a player's save. Pink Ninja joins through troop15 and is not a starting actor.

For each checkpoint, trace actual transfer events, item grants, switches and actor recruitment in live data. Record the source map/event/page, prerequisites, destination and expected outcome. Set only verified prerequisites. Do not guess chapter numbers, actors, completion flags or item IDs. Avoid broad all-switches or all-items presets. Verify destination passability and a way back.

Consult docs/story/STORY_PROGRESSION.md and the theme-and-story skill. The finale returns to the first world map, enters and traverses the floating castle, then has two consecutive final bosses. Regional bosses do not replace that route. Do not invent a NeuraTech Core endpoint or mark unresolved necklace/castle gates complete.

Keep debug access behind Utils.isOptionValid('test'); do not add an ordinary campaign entrance. Prefer temporary automated fixtures when a permanent map is unnecessary. Recovery uses event314; shops use302 with605 continuations (these are not plugin commands). Plugin commands use356. Test fixture changes must be reversible, and never be represented as campaign completion evidence.
