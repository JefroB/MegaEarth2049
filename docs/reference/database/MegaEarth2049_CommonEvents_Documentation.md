> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Common Events Documentation

This document provides detailed information about the common events system in MegaEarth2049, focusing on the `CommonEvents.json` file structure, how common events implement reusable game mechanics, and how they integrate with the game's quests and systems.

## 1. CommonEvents.json Structure

The `CommonEvents.json` file contains definitions for reusable event sequences that can be triggered from multiple locations throughout the game. Each common event entry contains:

```json
{
  "id": 1,
  "name": "Ship Transponder",
  "trigger": 0,
  "switchId": 1,
  "list": [
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["Where would you like to travel?"]},
    {"code": 102, "indent": 0, "parameters": [["Planet Ork", "Planet Ting Ting", "Planet Needsaname", "Cancel"], 3]},
    {"code": 402, "indent": 0, "parameters": [0, "Planet Ork"]},
    {"code": 201, "indent": 1, "parameters": [0, 28, 8, 12, 0, 0]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Planet Ting Ting"]},
    {"code": 201, "indent": 1, "parameters": [0, 39, 15, 10, 0, 0]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [2, "Planet Needsaname"]},
    {"code": 201, "indent": 1, "parameters": [0, 102, 20, 15, 0, 0]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [3, "Cancel"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 404, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
  ]
}
```

Where:
- **id**: Unique identifier for the common event
- **name**: Display name shown in the editor
- **trigger**: How the event is triggered (0 = none/call, 1 = autorun, 2 = parallel)
- **switchId**: Associated switch ID if applicable (for trigger types 1 and 2)
- **list**: Array of event commands that define the event's behavior

## 2. Common Event Types in MegaEarth2049

MegaEarth2049 uses several types of common events to implement reusable game mechanics:

### 2.1 Transportation Systems

#### Ship Transponder (ID 1)
The Ship Transponder common event enables interplanetary travel between different locations:
- Provides a menu of destination planets
- Handles the teleportation to the selected location
- May include additional checks for quest progress or item requirements

This common event is typically called from map events like space ports, ship consoles, or transportation terminals.

### 2.2 Resource Gathering

#### Mining Event (ID 2)
The Mining Event common event implements the resource gathering system:
- Handles the mining process with randomized results
- Determines success/failure based on player stats or equipment
- Distributes appropriate resources to the player's inventory

This event is called from mining spots throughout the game, particularly on Planet Ork.

### 2.3 Status Effect Management

#### Disease Application (ID 3)
This common event handles the application of diseases and status effects:
- Determines which disease to apply based on parameters
- Applies appropriate state changes to the character
- Shows relevant messages and visual effects
- May trigger follow-up events based on the disease severity

### 2.4 Battle Enhancement

#### Enemy Encounter Setup (ID 4)
This common event prepares special battle encounters:
- Sets up specific enemy formations
- Applies pre-battle conditions or effects
- Handles any special battle rules or mechanics

### 2.5 Quest Management

#### Quest Progress Update (ID 5)
This common event handles standardized quest progression:
- Updates relevant switches and variables
- Provides consistent messaging for quest updates
- Handles reward distribution
- May trigger follow-up events based on quest state

## 3. Common Event Implementation Details

### 3.1 Event Commands

Common events use various command codes to implement their functionality:

- **101-105**: Message-related commands
- **111-119**: Flow control (conditional branches, loops)
- **121-124**: Switch/variable operations
- **201-205**: Transfer/movement commands
- **301-302**: Battle-related commands
- **311-326**: Party/actor commands
- **401-405**: Message content commands

For example, the Ship Transponder common event uses:
- Code 101/401: Display a message asking for destination
- Code 102: Show choices (planet options)
- Code 402: Handle each choice selection
- Code 201: Transfer player to the selected map

### 3.2 Parameters

Event command parameters vary based on the command type:

```json
{"code": 201, "indent": 1, "parameters": [0, 28, 8, 12, 0, 0]}
```

For a transfer command (201), the parameters are:
- Type (0 = same map, 1 = different map, 2 = vehicle)
- Map ID (28 = Planet Ork)
- X coordinate (8)
- Y coordinate (12)
- Direction (0 = retain current)
- Fade type (0 = black fade)

### 3.3 Indentation and Flow Control

The `indent` property creates a hierarchical structure for conditional logic:
- Indent 0: Main event sequence
- Indent 1: Inside a conditional branch or choice
- Indent 2: Nested condition within another condition

This structure allows for complex decision trees and branching paths within a single common event.

## 4. Calling Common Events

Common events can be called in several ways:

### 4.1 From Map Events

Map events can call common events using the "Call Common Event" command (code 117):

```json
{"code": 117, "indent": 0, "parameters": [1]}
```

This calls the common event with ID 1 (Ship Transponder).

### 4.2 From Other Common Events

Common events can call other common events, creating modular, reusable components:

```json
{"code": 117, "indent": 0, "parameters": [2]}
```

This allows for hierarchical organization of game mechanics.

### 4.3 From Plugin Commands

Yanfly plugins often provide commands to call common events with parameters:

```
YEP_CommonEventMenu Planet Ork, Planet Ting Ting, Planet Needsaname
```

This might create a menu that calls different common events based on selection.

## 5. Common Event Integration with Game Systems

### 5.1 Quest System Integration

Common events are integral to the quest system in MegaEarth2049:

- **Quest Initialization**: Common events set up quest variables and switches
- **Quest Progress**: Common events track and update progress consistently
- **Quest Completion**: Common events handle rewards and follow-up quests

For example, the Engine Quest uses common events to track collected components and handle the final assembly process.

### 5.2 Disease System Integration

The disease system relies heavily on common events:

- **Disease Application**: Common events apply disease states
- **Disease Progression**: Common events handle symptoms and effects over time
- **Disease Curing**: Common events implement treatment mechanics

This creates a consistent experience regardless of where or how a disease is contracted.

### 5.3 Travel System Integration

The Ship Transponder common event integrates with the game's travel system:

- **Destination Unlocking**: Shows only accessible destinations
- **Travel Requirements**: Checks for necessary items or quest progress
- **Travel Effects**: Handles any events that occur during travel

## 6. Creating New Common Events

When creating new common events for MegaEarth2049, follow these guidelines to ensure compatibility and consistency:

### 6.1 Technical Implementation

1. Add a new entry to CommonEvents.json with a unique ID
2. Define a descriptive name that indicates the event's purpose
3. Set the appropriate trigger type (0 for called events, 1 for autorun, 2 for parallel)
4. Create the event command list with proper indentation and flow control
5. Test the common event in various contexts to ensure it works as expected

### 6.2 Design Considerations

New common events should:
- Implement truly reusable functionality (if used only once, a map event may be more appropriate)
- Follow established patterns for similar mechanics
- Use consistent messaging and UI elements
- Handle edge cases and error conditions gracefully
- Provide appropriate feedback to the player

### 6.3 Example: Creating a New Status Effect Common Event

For a new status effect application common event:

```json
{
  "id": 6,
  "name": "Apply Digital Glitch",
  "trigger": 0,
  "switchId": 1,
  "list": [
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["Digital corruption detected!"]},
    {"code": 111, "indent": 0, "parameters": [11, "\"\\\\v[22]\\\\v[23]\"", 0]},
    {"code": 122, "indent": 1, "parameters": [23, 23, 0, 0, 1]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Corruption level increased!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []},
    {"code": 122, "indent": 1, "parameters": [22, 22, 0, 0, 1]},
    {"code": 122, "indent": 1, "parameters": [23, 23, 0, 0, 1]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["New digital corruption applied!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 111, "indent": 0, "parameters": [1, 23, 1, 5, 0]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Critical corruption level reached!"]},
    {"code": 311, "indent": 1, "parameters": [0, 1, 0, 0, 30]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
  ]
}
```

This creates a common event that:
- Applies a "Digital Glitch" status effect
- Tracks corruption level using variables
- Provides appropriate messaging
- Causes damage when corruption reaches critical levels

## 7. Common Event Patterns and Best Practices

### 7.1 Modular Design

Effective common events follow modular design principles:
- **Single Responsibility**: Each common event should do one thing well
- **Parameterization**: Use variables to make events flexible
- **Reusability**: Design for multiple contexts and scenarios

### 7.2 Error Handling

Robust common events include error handling:
- Check for required items or conditions before proceeding
- Provide fallback options when requirements aren't met
- Give clear feedback about why an action can't be completed

### 7.3 Performance Considerations

For optimal performance:
- Avoid excessive message displays or animations
- Use efficient conditional checks
- Be cautious with parallel-processing common events (trigger type 2)
- Consider the frequency of calls for frequently used events

### 7.4 Documentation

Document common events within the game:
- Use clear, descriptive names
- Add comments using message commands that are conditionally hidden
- Maintain a separate document describing complex common events

## 8. Extending Existing Common Events

When modifying existing common events:

### 8.1 Backward Compatibility

Ensure modifications maintain compatibility:
- Preserve existing variable and switch usage
- Don't change the fundamental behavior expected by calling events
- Test thoroughly in all contexts where the common event is used

### 8.2 Expansion Techniques

To extend functionality:
- Add new conditional branches for new features
- Use additional variables to track new states
- Insert new commands at appropriate points in the event flow

### 8.3 Example: Extending the Ship Transponder

To add a new destination to the Ship Transponder:

1. Locate the choice command (code 102)
2. Add the new destination to the choices array
3. Add a new conditional branch (code 402) for the new choice
4. Implement the transfer command for the new destination
5. Update any related checks or requirements

## 9. Conclusion

Common events are a powerful tool for implementing reusable game mechanics in MegaEarth2049. By understanding their structure, implementation details, and integration with other game systems, AI assistants can create and modify common events that enhance the game's functionality while maintaining consistency with the existing design.

When working with common events, always consider their role in the broader game context, their relationship to other systems, and how they contribute to the player experience. Well-designed common events can significantly improve code organization, reduce redundancy, and create a more cohesive gameplay experience.
