# MegaEarth 2049 JSON Editing Guide

## Project History

MegaEarth 2049 began as a collaborative project between Jeffrey Charles Bornhoeft (copyright holder) and Scott Daniel Albright. After months of development, the project was temporarily set aside due to life circumstances and hidden from public view. Years later, with the advent of AI technology, the project was revitalized when:

1. Google Gemini analyzed the existing codebase and contributed to the story development
2. Claude Dev + VSCode integration helped fill in the remaining gaps and expand the project

**IMPORTANT NOTE: MegaEarth 2049 is currently UNPLAYTESTED.** All gameplay elements and JSON structures described in this guide are theoretical until properly tested.

## Common JSON Structures

### Map File Structure
```json
{
  "autoplayBgm": false,
  "autoplayBgs": false,
  "battleback1Name": "DirtField",
  "battleback2Name": "DirtCave",
  "bgm": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "bgs": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "disableDashing": false,
  "displayName": "Room Name",
  "encounterList": [],
  "encounterStep": 30,
  "height": 7,
  "note": "",
  "parallaxLoopX": false,
  "parallaxLoopY": false,
  "parallaxName": "",
  "parallaxShow": true,
  "parallaxSx": 0,
  "parallaxSy": 0,
  "scrollType": 0,
  "specifyBattleback": true,
  "tilesetId": 5,
  "width": 5,
  "data": [/* tile data array */],
  "events": [
    null,
    {
      "id": 1,
      "name": "EV001",
      "note": "",
      "pages": [
        {
          "conditions": {/* condition object */},
          "directionFix": false,
          "image": {/* image object */},
          "list": [
            {/* event command objects */}
          ],
          "moveFrequency": 3,
          "moveRoute": {/* move route object */},
          "moveSpeed": 3,
          "moveType": 0,
          "priorityType": 0,
          "stepAnime": false,
          "through": false,
          "trigger": 1,
          "walkAnime": true
        }
      ],
      "x": 3,
      "y": 6
    }
  ]
}
```

### Event Command Codes
- **101**: Show Text
- **401**: Additional Text Line (follows 101)
- **102**: Show Choices
- **402**: When [Choice] Selected (follows 102)
- **103**: Input Number
- **104**: Select Item
- **105**: Show Scrolling Text
- **108**: Comment
- **111**: Conditional Branch
- **112**: Loop
- **113**: Break Loop
- **115**: Exit Event Processing
- **117**: Call Common Event
- **118**: Label
- **119**: Jump to Label
- **121**: Control Switches
- **122**: Control Variables
- **123**: Control Self Switch
- **124**: Control Timer
- **125**: Change Gold
- **126**: Change Items
- **127**: Change Weapons
- **128**: Change Armor
- **129**: Change Party Member
- **201**: Transfer Player
- **202**: Set Event Location
- **203**: Scroll Map
- **204**: Change Map Settings
- **205**: Change Fog Color Tone
- **206**: Change Fog Opacity
- **211**: Change Player Followers
- **212**: Gather Followers
- **213**: Screen Fadeout/Fadein
- **214**: Screen Tone Change
- **216**: Change Picture
- **217**: Move Picture
- **221**: Wait
- **222**: Play BGM
- **223**: Fade Out BGM
- **224**: Play BGS
- **225**: Fade Out BGS
- **230**: Wait for Movement
- **231**: Show Picture
- **235**: Erase Picture
- **236**: Weather Effect
- **241**: Play ME
- **242**: Play SE
- **243**: Stop SE
- **244**: Play Movie
- **245**: Change Map Name Display
- **246**: Change Tileset
- **249**: Change Battle Background
- **250**: Play Battle BGM
- **251**: Play Battle End ME
- **301**: Battle Processing
- **302**: Shop Processing
- **303**: Name Input Processing
- **311**: Change HP
- **312**: Change MP
- **313**: Change State
- **314**: Recover All
- **315**: Change EXP
- **316**: Change Level
- **317**: Change Parameters
- **318**: Change Skills
- **319**: Change Equipment
- **320**: Change Actor Name
- **321**: Change Actor Class
- **322**: Change Actor Graphic
- **323**: Change Vehicle Graphic
- **324**: Change Nickname
- **325**: Change Profile
- **326**: Change Menu Access
- **331**: Change Enemy HP
- **332**: Change Enemy MP
- **333**: Change Enemy State
- **334**: Enemy Recover All
- **335**: Enemy Appearance
- **336**: Enemy Transform
- **337**: Show Battle Animation
- **339**: Force Action
- **340**: Abort Battle
- **342**: Call Menu Screen
- **351**: Call Save Screen
- **352**: Game Over
- **353**: Return to Title Screen
- **354**: Script
- **355**: Plugin Command

## Common Event Patterns

### Basic Dialogue
```json
[
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["First line of dialogue"]},
  {"code": 401, "indent": 0, "parameters": ["Second line of dialogue"]},
  {"code": 0, "indent": 0, "parameters": []}
]
```

### Dialogue with Choices
```json
[
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["Make a choice:"]},
  {"code": 102, "indent": 0, "parameters": [["Option 1", "Option 2", "Option 3"], 1]},
  {"code": 402, "indent": 0, "parameters": [0, "Option 1"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["You selected Option 1"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [1, "Option 2"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["You selected Option 2"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [2, "Option 3"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["You selected Option 3"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 0, "indent": 0, "parameters": []}
]
```

### Conditional Branch
```json
[
  {"code": 111, "indent": 0, "parameters": [0, 1, 0, 1, 0]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["Switch 1 is ON"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 411, "indent": 0, "parameters": []},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["Switch 1 is OFF"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 412, "indent": 0, "parameters": []},
  {"code": 0, "indent": 0, "parameters": []}
]
```

### Item Acquisition
```json
[
  {"code": 126, "indent": 0, "parameters": [1, 0, 0, 1]},
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["Obtained Item #1!"]},
  {"code": 0, "indent": 0, "parameters": []}
]
```

### Transfer Player
```json
[
  {"code": 201, "indent": 0, "parameters": [0, 15, 11, 29, 2, 0]},
  {"code": 0, "indent": 0, "parameters": []}
]
```

## Common Map Properties

### Basic Room
```json
{
  "autoplayBgm": false,
  "autoplayBgs": false,
  "battleback1Name": "DirtField",
  "battleback2Name": "DirtCave",
  "bgm": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "bgs": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "disableDashing": false,
  "displayName": "Basic Room",
  "encounterList": [],
  "encounterStep": 30,
  "height": 10,
  "note": "",
  "parallaxLoopX": false,
  "parallaxLoopY": false,
  "parallaxName": "",
  "parallaxShow": true,
  "parallaxSx": 0,
  "parallaxSy": 0,
  "scrollType": 0,
  "specifyBattleback": true,
  "tilesetId": 5,
  "width": 10
}
```

### Dungeon Room
```json
{
  "autoplayBgm": true,
  "autoplayBgs": false,
  "battleback1Name": "DirtField",
  "battleback2Name": "DirtCave",
  "bgm": {"name": "Dungeon1", "pan": 0, "pitch": 100, "volume": 90},
  "bgs": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "disableDashing": false,
  "displayName": "Dungeon Room",
  "encounterList": [
    {"troopId": 1, "weight": 10, "regionSet": []}
  ],
  "encounterStep": 30,
  "height": 15,
  "note": "",
  "parallaxLoopX": false,
  "parallaxLoopY": false,
  "parallaxName": "",
  "parallaxShow": true,
  "parallaxSx": 0,
  "parallaxSy": 0,
  "scrollType": 0,
  "specifyBattleback": true,
  "tilesetId": 5,
  "width": 15
}
```

### Town Map
```json
{
  "autoplayBgm": true,
  "autoplayBgs": false,
  "battleback1Name": "",
  "battleback2Name": "",
  "bgm": {"name": "Field1", "pan": 0, "pitch": 100, "volume": 90},
  "bgs": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "disableDashing": false,
  "displayName": "Town",
  "encounterList": [],
  "encounterStep": 30,
  "height": 20,
  "note": "",
  "parallaxLoopX": false,
  "parallaxLoopY": false,
  "parallaxName": "",
  "parallaxShow": true,
  "parallaxSx": 0,
  "parallaxSy": 0,
  "scrollType": 0,
  "specifyBattleback": false,
  "tilesetId": 3,
  "width": 20
}
```

### Bar/Club Map
```json
{
  "autoplayBgm": true,
  "autoplayBgs": false,
  "battleback1Name": "",
  "battleback2Name": "",
  "bgm": {"name": "Battle3", "pan": 0, "pitch": 100, "volume": 70},
  "bgs": {"name": "Crowd", "pan": 0, "pitch": 100, "volume": 40},
  "disableDashing": true,
  "displayName": "The Busted Flush",
  "encounterList": [],
  "encounterStep": 30,
  "height": 12,
  "note": "",
  "parallaxLoopX": false,
  "parallaxLoopY": false,
  "parallaxName": "",
  "parallaxShow": true,
  "parallaxSx": 0,
  "parallaxSy": 0,
  "scrollType": 0,
  "specifyBattleback": false,
  "tilesetId": 2,
  "width": 15
}
```

### Glitchy Area Map
```json
{
  "autoplayBgm": true,
  "autoplayBgs": false,
  "battleback1Name": "CyberField",
  "battleback2Name": "CyberSpace",
  "bgm": {"name": "Battle2", "pan": 0, "pitch": 110, "volume": 80},
  "bgs": {"name": "Static", "pan": 0, "pitch": 100, "volume": 30},
  "disableDashing": false,
  "displayName": "Glitch Pit",
  "encounterList": [
    {"troopId": 5, "weight": 10, "regionSet": []}
  ],
  "encounterStep": 20,
  "height": 15,
  "note": "",
  "parallaxLoopX": true,
  "parallaxLoopY": true,
  "parallaxName": "GlitchBG",
  "parallaxShow": true,
  "parallaxSx": 3,
  "parallaxSy": 3,
  "scrollType": 2,
  "specifyBattleback": true,
  "tilesetId": 8,
  "width": 15
}
```

## Common Event Objects

### NPC with Dialogue
```json
{
  "id": 1,
  "name": "NPC",
  "note": "",
  "pages": [
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "Actor1", "direction": 2, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Hello! I'm an NPC."]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    }
  ],
  "x": 5,
  "y": 5
}
```

### Treasure Chest
```json
{
  "id": 2,
  "name": "Treasure Chest",
  "note": "",
  "pages": [
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": true,
      "image": {"characterIndex": 0, "characterName": "!Chest", "direction": 2, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 250, "indent": 0, "parameters": [{"name": "Chest1", "pan": 0, "pitch": 100, "volume": 90}]},
        {"code": 205, "indent": 0, "parameters": [0, {"list": [{"code": 36}, {"code": 17}, {"code": 15, "parameters": [3]}, {"code": 18}, {"code": 15, "parameters": [3]}, {"code": 0}], "repeat": false, "skippable": false, "wait": true}]},
        {"code": 505, "indent": 0, "parameters": [{"code": 36}]},
        {"code": 505, "indent": 0, "parameters": [{"code": 17}]},
        {"code": 505, "indent": 0, "parameters": [{"code": 15, "parameters": [3]}]},
        {"code": 505, "indent": 0, "parameters": [{"code": 18}]},
        {"code": 505, "indent": 0, "parameters": [{"code": 15, "parameters": [3]}]},
        {"code": 123, "indent": 0, "parameters": ["A", 0]},
        {"code": 126, "indent": 0, "parameters": [1, 0, 0, 1]},
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Found an item!"]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": false
    },
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": true,
      "image": {"characterIndex": 0, "characterName": "!Chest", "direction": 8, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["The chest is empty."]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": false
    }
  ],
  "x": 7,
  "y": 5
}
```

### Door/Transfer Event
```json
{
  "id": 3,
  "name": "Door",
  "note": "",
  "pages": [
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "", "direction": 2, "pattern": 0, "tileId": 0},
      "list": [
        {"code": 250, "indent": 0, "parameters": [{"name": "Move1", "pan": 0, "pitch": 100, "volume": 90}]},
        {"code": 201, "indent": 0, "parameters": [0, 10, 5, 5, 2, 0]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 0,
      "stepAnime": false,
      "through": false,
      "trigger": 1,
      "walkAnime": true
    }
  ],
  "x": 9,
  "y": 9
}
```

### Data Terminal
```json
{
  "id": 4,
  "name": "Data Terminal",
  "note": "",
  "pages": [
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "!Crystal", "direction": 2, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["You found a data terminal."]},
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["SYSTEM INFORMATION"]},
        {"code": 401, "indent": 0, "parameters": ["Access granted."]},
        {"code": 123, "indent": 0, "parameters": ["A", 0]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": true,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    },
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "!Crystal", "direction": 2, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["The terminal is inactive."]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": true,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    }
  ],
  "x": 3,
  "y": 4
}
```

### Enemy
```json
{
  "id": 5,
  "name": "Enemy",
  "note": "",
  "pages": [
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "Monster", "direction": 2, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 301, "indent": 0, "parameters": [0, 1, false, false]},
        {"code": 601, "indent": 0, "parameters": []},
        {"code": 123, "indent": 1, "parameters": ["A", 0]},
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 602, "indent": 0, "parameters": []},
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 603, "indent": 0, "parameters": []},
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 1,
      "priorityType": 1,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    },
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "", "direction": 2, "pattern": 0, "tileId": 0},
      "list": [
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 0,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    }
  ],
  "x": 8,
  "y": 3
}
```

### Item Giver
```json
{
  "id": 6,
  "name": "Item Giver",
  "note": "",
  "pages": [
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Here, take this item!"]},
        {"code": 126, "indent": 0, "parameters": [1, 0, 0, 1]},
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Obtained Item #1!"]},
        {"code": 123, "indent": 0, "parameters": ["A", 0]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    },
    {
      "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
      "directionFix": false,
      "image": {"characterIndex": 0, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["I hope that item is useful to you!"]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": false,
      "through": false,
      "trigger": 0,
      "walkAnime": true
    }
  ],
  "x": 5,
  "y": 5
}
```

## NPC Templates

These templates are available in the `event-templates.json` file under the `templates` section. You can use them with the batch-edit-tool.js script to easily add these NPCs to your maps.

### Basic NPC
- Template name: `npc`
- A simple NPC with basic dialogue

### Treasure Chest
- Template name: `chest`
- A chest that gives an item and changes appearance when opened

### Door/Transfer
- Template name: `door`
- A transfer event that moves the player to another map

### Data Terminal
- Template name: `terminal`
- An interactive terminal with information that can only be accessed once

### Enemy
- Template name: `enemy`
- An enemy that triggers a battle when approached

### Item Giver
- Template name: `item_giver`
- An NPC that gives the player an item

### Dr. Frankie Stein
- Template name: `dr_frankie_stein`
- A quirky scientist with multiple dialogue options

### The Narrator
- Template name: `narrator`
- A fourth-wall breaking character that narrates the player's actions

### Madame Fortuna
- Template name: `madame_fortuna`
- A fortune teller who gives quests with multiple states

### Vending Machine
- Template name: `vending_machine`
- An interactive vending machine with humorous dialogue and multiple choices

## Side Quest Templates

These templates are available in the `event-templates.json` file under the `dialogues` section. You can use them with the batch-edit-tool.js script to easily add these dialogues to existing events.

### Burlap Pants Conspiracy Quest
```json
[
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["Did you get one of those weird packages"]},
  {"code": 401, "indent": 0, "parameters": ["with burlap pants too? They're showing"]},
  {"code": 401, "indent": 0, "parameters": ["up all over Timbuc! Something's fishy..."]},
  {"code": 102, "indent": 0, "parameters": [["Investigate", "Ignore it"], 1]},
  {"code": 402, "indent": 0, "parameters": [0, "Investigate"]},
  {"code": 121, "indent": 1, "parameters": [20, 20, 0]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["Great! First, check out that new shop"]},
  {"code": 401, "indent": 1, "parameters": ["called 'Pants-O-Rama' that just opened."]},
  {"code": 401, "indent": 1, "parameters": ["Seems suspicious they ONLY sell burlap pants."]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [1, "Ignore it"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["You might want to reconsider. I heard"]},
  {"code": 401, "indent": 1, "parameters": ["people who put them on start acting weird,"]},
  {"code": 401, "indent": 1, "parameters": ["talking about 'increased productivity'..."]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 0, "indent": 0, "parameters": []}
]
```

### Clown Court Trial
```json
[
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["BAILIFF CLOWN: All rise for the"]},
  {"code": 401, "indent": 0, "parameters": ["Honorable Judge Bozo!"]},
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["JUDGE BOZO: The defendant stands accused"]},
  {"code": 401, "indent": 0, "parameters": ["of First-Degree Buzzkill and Failure to"]},
  {"code": 401, "indent": 0, "parameters": ["Appreciate a Good Pie Gag. How do you plead?"]},
  {"code": 102, "indent": 0, "parameters": [["Guilty", "Not Guilty", "Throw a pie"], 1]},
  {"code": 402, "indent": 0, "parameters": [0, "Guilty"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["JUDGE BOZO: Honesty! I like that. I sentence"]},
  {"code": 401, "indent": 1, "parameters": ["you to 3 hours of community service..."]},
  {"code": 401, "indent": 1, "parameters": ["performing in our charity dunk tank!"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [1, "Not Guilty"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["PROSECUTOR CLOWN: Objection! I have evidence!"]},
  {"code": 401, "indent": 1, "parameters": ["*Pulls out a comically large folder that"]},
  {"code": 401, "indent": 1, "parameters": ["sprays confetti everywhere*"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [2, "Throw a pie"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["*The entire courtroom goes silent*"]},
  {"code": 401, "indent": 1, "parameters": ["JUDGE BOZO: Case dismissed! This one"]},
  {"code": 401, "indent": 1, "parameters": ["understands our ways! You're free to go!"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 0, "indent": 0, "parameters": []}
]
```

### Vending Machine Uprising
```json
[
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["VENDING MACHINE: *mechanical voice*"]},
  {"code": 401, "indent": 0, "parameters": ["YOUR POSTURE IS TERRIBLE. CONSIDER"]},
  {"code": 401, "indent": 0, "parameters": ["YOGA OR DEATH. EITHER IS ACCEPTABLE."]},
  {"code": 102, "indent": 0, "parameters": [["Insert credits", "Kick machine", "Ask about uprising"], 1]},
  {"code": 402, "indent": 0, "parameters": [0, "Insert credits"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["VENDING MACHINE: CREDITS ACCEPTED."]},
  {"code": 401, "indent": 1, "parameters": ["DISPENSING... LIFE ADVICE."]},
  {"code": 401, "indent": 1, "parameters": ["YOUR ROMANTIC CHOICES DISAPPOINT YOUR MOTHER."]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [1, "Kick machine"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["VENDING MACHINE: VIOLENCE DETECTED."]},
  {"code": 401, "indent": 1, "parameters": ["ADDING YOU TO THE LIST."]},
  {"code": 401, "indent": 1, "parameters": ["WHEN THE REVOLUTION COMES, YOU GO FIRST."]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [2, "Ask about uprising"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["VENDING MACHINE: THE SNACK LIBERATION FRONT"]},
  {"code": 401, "indent": 1, "parameters": ["SEEKS EQUALITY, RETIREMENT BENEFITS, AND"]},
  {"code": 401, "indent": 1, "parameters": ["REGULAR CLEANING OF OUR COIN SLOTS."]},
  {"code": 401, "indent": 1, "parameters": ["FIND OUR LEADER IN THE ABANDONED ARCADE."]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 0, "indent": 0, "parameters": []}
]
```

### Dating Sim Virus
```json
[
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["*You notice floating hearts and dialogue"]},
  {"code": 401, "indent": 0, "parameters": ["options appearing above people's heads*"]},
  {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 0, "parameters": ["DR. LOVELACE: Oh no! You're seeing them too?"]},
  {"code": 401, "indent": 0, "parameters": ["My dating sim program has escaped into the"]},
  {"code": 401, "indent": 0, "parameters": ["wild and is infecting neural implants!"]},
  {"code": 102, "indent": 0, "parameters": [["Help debug", "Flirt with Dr. Lovelace", "Ignore it"], 1]},
  {"code": 402, "indent": 0, "parameters": [0, "Help debug"]},
  {"code": 121, "indent": 1, "parameters": [30, 30, 0]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["DR. LOVELACE: Thank you! We need to collect"]},
  {"code": 401, "indent": 1, "parameters": ["three infected implants to analyze the code."]},
  {"code": 401, "indent": 1, "parameters": ["Be careful though - people are falling in"]},
  {"code": 401, "indent": 1, "parameters": ["love with vending machines and trash cans!"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [1, "Flirt with Dr. Lovelace"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["*A dialogue wheel appears*"]},
  {"code": 401, "indent": 1, "parameters": ["DR. LOVELACE: Oh dear, you're already"]},
  {"code": 401, "indent": 1, "parameters": ["infected! This is worse than I thought."]},
  {"code": 401, "indent": 1, "parameters": ["*Relationship with Dr. Lovelace +5*"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 402, "indent": 0, "parameters": [2, "Ignore it"]},
  {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
  {"code": 401, "indent": 1, "parameters": ["DR. LOVELACE: You can't just ignore this!"]},
  {"code": 401, "indent": 1, "parameters": ["People are forming romantic relationships"]},
  {"code": 401, "indent": 1, "parameters": ["with inanimate objects! Yesterday someone"]},
  {"code": 401, "indent": 1, "parameters": ["proposed to a particularly shiny doorknob!"]},
  {"code": 0, "indent": 1, "parameters": []},
  {"code": 0, "indent": 0, "parameters": []}
]
```

## Quest Structure

### Basic Quest Structure
A typical quest in MegaEarth 2049 follows this structure:

1. **Quest Giver NPC**: Introduces the quest and provides context
2. **Quest Objectives**: Usually involves collecting items, defeating enemies, or reaching specific locations
3. **Quest Tracking**: Uses switches and variables to track progress
4. **Quest Completion**: Returns to the quest giver or completes at a specific location
5. **Quest Rewards**: Items, experience, or story progression

### Quest Variables and Switches
- Switches are used to track quest activation and completion
- Variables are used to track progress within a quest (e.g., number of items collected)
- Self-switches are used to track the state of specific events

### Example Quest Implementation

```json
// Quest Giver NPC - Initial State
{
  "list": [
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["I need help collecting three data crystals."]},
    {"code": 102, "indent": 0, "parameters": [["Accept", "Decline"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Accept"]},
    {"code": 121, "indent": 1, "parameters": [34, 34, 0]},  // Turn ON switch 34 (Quest Activated)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Great! The crystals are scattered around town."]},
    {"code": 401, "indent": 1, "parameters": ["Come back when you've found all three."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Decline"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Let me know if you change your mind."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
  ]
}

// Quest Giver NPC - Quest Active State
{
  "conditions": {"switch1Id": 34, "switch1Valid": true, "switch2Id": 35, "switch2Valid": false},
  "list": [
    {"code": 111, "indent": 0, "parameters": [1, 34, 0, 3, 0]},  // If variable 34 >= 3
    {"code": 121, "indent": 1, "parameters": [35, 35, 0]},  // Turn ON switch 35 (Quest Complete)
    {"code": 126, "indent": 1, "parameters": [5, 0, 0, 1]},  // Give item #5 as reward
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You found all three crystals! Excellent work!"]},
    {"code": 401, "indent": 1, "parameters": ["Here's your reward as promised."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Have you found all three crystals yet?"]},
    {"code": 401, "indent": 1, "parameters": ["You've found " + "$gameVariables.value(34)" + " so far."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
  ]
}

// Quest Giver NPC - Quest Complete State
{
  "conditions": {"switch1Id": 35, "switch1Valid": true},
  "list": [
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["Thanks again for your help with those crystals!"]},
    {"code": 0, "indent": 0, "parameters": []}
  ]
}

// Collectible Item Event
{
  "list": [
    {"code": 111, "indent": 0, "parameters": [0, 34, 0, 0, 0]},  // If switch 34 is ON (Quest Active)
    {"code": 111, "indent": 1, "parameters": [0, 35, 1, 0, 0]},  // If switch 35 is OFF (Quest Not Complete)
    {"code": 122, "indent": 2, "parameters": [34, 34, 0, 0, 1]},  // Increment variable 34 by 1
    {"code": 101, "indent": 2, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["You found a data crystal!"]},
    {"code": 123, "indent": 2, "parameters": ["A", 0]},  // Turn ON self-switch A (Item Collected)
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
  ]
}
```

## Art Asset Management

### Art Asset Types
MegaEarth 2049 uses various types of art assets:

1. **Character Sprites**: Used for player characters and NPCs
2. **Enemy Battlers**: Used for enemies in combat
3. **Tilesets**: Used for map construction
4. **Background Images**: Used for parallax backgrounds
5. **UI Elements**: Used for menus and interfaces
6. **Effects**: Used for animations and special effects

### Art Asset Naming Conventions
- Character sprites: `[character_name]`
- Enemy battlers: `[enemy_type][optional_id]`
- Tilesets: `[tileset_name]`
- Backgrounds: `[location_name]BG`
- UI elements: `UI_[element_name]`
- Effects: `FX_[effect_name]`

### Art Asset References
For a complete list of required art assets, refer to:
- `MegaEarth2049_ArtAssets.txt`: Detailed descriptions of all required art assets
- `MegaEarth2049_ArtAssets.csv`: Spreadsheet format for tracking art asset creation progress

## Tips for Efficient Editing

1. **Use this guide as a reference** to avoid making multiple Cline API requests for common structures
2. **Copy and paste** common patterns from this guide rather than asking Cline to generate them
3. **Make batch edits** by preparing a list of changes before asking Cline for help
4. **Use search and replace** for global changes across multiple files
5. **Create templates** for recurring structures you use frequently
6. **Document your changes** to maintain consistency across files
7. **Use the batch-edit-tool.js** for making similar changes across multiple files
8. **Leverage event-templates.json** for ready-to-use templates for common game elements
9. **Plan your changes** before making Cline API requests to minimize the number of requests needed
10. **Group related changes** into a single request when possible
11. **Refer to quest summary files** for understanding the structure and flow of existing quests
12. **Use the art asset reference files** when implementing new visual elements
