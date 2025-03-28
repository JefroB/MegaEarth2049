/**
 * MegaEarth2049 Map Utilities
 * Common functions for working with game map files
 */

const fs = require('fs');
const path = require('path');
const jsonUtils = require('../core/json-utils');

// Default paths
const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const MAP_INFOS_PATH = path.join(DATA_DIR, 'MapInfos.json');

/**
 * Get map info for all maps
 * @returns {Object|null} - Map info object or null if error
 */
function getMapInfos() {
  return jsonUtils.safeReadJSON(MAP_INFOS_PATH);
}

/**
 * Get map info for a specific map
 * @param {number} mapId - Map ID
 * @returns {Object|null} - Map info object or null if not found or error
 */
function getMapInfo(mapId) {
  const mapInfos = getMapInfos();
  if (!mapInfos || !mapInfos[mapId]) {
    console.error(`Map info not found for map ID ${mapId}`);
    return null;
  }
  
  return mapInfos[mapId];
}

/**
 * Get map path for a specific map ID
 * @param {number} mapId - Map ID
 * @returns {string} - Path to the map file
 */
function getMapPath(mapId) {
  return path.join(DATA_DIR, `Map${String(mapId).padStart(3, '0')}.json`);
}

/**
 * Load a map by ID
 * @param {number} mapId - Map ID
 * @returns {Object|null} - Map data or null if error
 */
function loadMap(mapId) {
  const mapPath = getMapPath(mapId);
  return jsonUtils.safeReadJSON(mapPath);
}

/**
 * Save a map
 * @param {number} mapId - Map ID
 * @param {Object} mapData - Map data to save
 * @returns {boolean} - Success or failure
 */
function saveMap(mapId, mapData) {
  const mapPath = getMapPath(mapId);
  return jsonUtils.safeWriteJSON(mapPath, mapData);
}

/**
 * Find maps by name (partial match)
 * @param {string} namePattern - Name pattern to search for
 * @returns {Array} - Array of matching map objects with ID and name
 */
function findMapsByName(namePattern) {
  const mapInfos = getMapInfos();
  if (!mapInfos) {
    return [];
  }
  
  const pattern = new RegExp(namePattern, 'i');
  const matches = [];
  
  for (const mapId in mapInfos) {
    if (mapInfos[mapId] && pattern.test(mapInfos[mapId].name)) {
      matches.push({
        id: parseInt(mapId),
        name: mapInfos[mapId].name
      });
    }
  }
  
  return matches;
}

/**
 * Add an event to a map
 * @param {number} mapId - Map ID
 * @param {Object} eventData - Event data to add
 * @returns {number|null} - ID of the added event or null if failed
 */
function addEventToMap(mapId, eventData) {
  // Load the map
  const mapData = loadMap(mapId);
  if (!mapData) {
    return null;
  }
  
  // Find the highest event ID
  let maxId = 0;
  for (const eventId in mapData.events) {
    if (eventId && !isNaN(parseInt(eventId))) {
      maxId = Math.max(maxId, parseInt(eventId));
    }
  }
  
  // Set the new event ID
  const newId = maxId + 1;
  eventData.id = newId;
  
  // Add the event to the map
  if (!mapData.events) {
    mapData.events = [];
  }
  mapData.events[newId] = eventData;
  
  // Save the map
  if (saveMap(mapId, mapData)) {
    console.log(`Added event ${eventData.name || 'Unnamed'} to Map${mapId} with ID ${newId}`);
    return newId;
  }
  
  return null;
}

/**
 * Update an existing event on a map
 * @param {number} mapId - Map ID
 * @param {number} eventId - Event ID
 * @param {Object} eventData - New event data
 * @returns {boolean} - Success or failure
 */
function updateMapEvent(mapId, eventId, eventData) {
  // Load the map
  const mapData = loadMap(mapId);
  if (!mapData || !mapData.events || !mapData.events[eventId]) {
    console.error(`Event ${eventId} not found on Map${mapId}`);
    return false;
  }
  
  // Preserve the event ID
  eventData.id = eventId;
  
  // Update the event
  mapData.events[eventId] = eventData;
  
  // Save the map
  if (saveMap(mapId, mapData)) {
    console.log(`Updated event ${eventId} on Map${mapId}`);
    return true;
  }
  
  return false;
}

/**
 * Delete an event from a map
 * @param {number} mapId - Map ID
 * @param {number} eventId - Event ID
 * @returns {boolean} - Success or failure
 */
function deleteMapEvent(mapId, eventId) {
  // Load the map
  const mapData = loadMap(mapId);
  if (!mapData || !mapData.events || !mapData.events[eventId]) {
    console.error(`Event ${eventId} not found on Map${mapId}`);
    return false;
  }
  
  // Delete the event
  delete mapData.events[eventId];
  
  // Save the map
  if (saveMap(mapId, mapData)) {
    console.log(`Deleted event ${eventId} from Map${mapId}`);
    return true;
  }
  
  return false;
}

/**
 * Find events on a map by name or type
 * @param {number} mapId - Map ID
 * @param {Object} options - Search options
 * @param {string} options.name - Event name pattern
 * @param {string} options.note - Event note pattern
 * @param {Function} options.filter - Custom filter function
 * @returns {Array} - Array of matching events with ID and data
 */
function findMapEvents(mapId, options = {}) {
  const { name, note, filter } = options;
  
  // Load the map
  const mapData = loadMap(mapId);
  if (!mapData || !mapData.events) {
    return [];
  }
  
  const namePattern = name ? new RegExp(name, 'i') : null;
  const notePattern = note ? new RegExp(note, 'i') : null;
  const matches = [];
  
  for (const eventId in mapData.events) {
    if (!mapData.events[eventId]) continue;
    
    const event = mapData.events[eventId];
    let match = true;
    
    // Check name pattern
    if (namePattern && !namePattern.test(event.name)) {
      match = false;
    }
    
    // Check note pattern
    if (notePattern && !notePattern.test(event.note)) {
      match = false;
    }
    
    // Apply custom filter
    if (filter && !filter(event)) {
      match = false;
    }
    
    if (match) {
      matches.push({
        id: parseInt(eventId),
        data: event
      });
    }
  }
  
  return matches;
}

/**
 * Create a basic event object
 * @param {Object} options - Event options
 * @param {string} options.name - Event name
 * @param {number} options.x - X position
 * @param {number} options.y - Y position
 * @param {string} options.characterName - Character sprite name
 * @param {number} options.characterIndex - Character sprite index
 * @param {Array} options.pages - Event pages (default: empty page)
 * @returns {Object} - Event object
 */
function createBasicEvent(options = {}) {
  const {
    name = 'New Event',
    x = 0,
    y = 0,
    characterName = '',
    characterIndex = 0,
    pages = []
  } = options;
  
  // Create default page if none provided
  const defaultPages = pages.length > 0 ? pages : [{
    conditions: {
      actorId: 1,
      actorValid: false,
      itemId: 1,
      itemValid: false,
      selfSwitchCh: 'A',
      selfSwitchValid: false,
      switch1Id: 1,
      switch1Valid: false,
      switch2Id: 1,
      switch2Valid: false,
      variableId: 1,
      variableValid: false,
      variableValue: 0
    },
    directionFix: false,
    image: {
      characterIndex: characterIndex,
      characterName: characterName,
      direction: 2,
      pattern: 1,
      tileId: 0
    },
    list: [
      { code: 0, indent: 0, parameters: [] }
    ],
    moveFrequency: 3,
    moveRoute: {
      list: [{ code: 0, parameters: [] }],
      repeat: true,
      skippable: false,
      wait: false
    },
    moveSpeed: 3,
    moveType: 0,
    priorityType: 1,
    stepAnime: false,
    through: false,
    trigger: 0,
    walkAnime: true
  }];
  
  return {
    id: 0, // Will be set when added to map
    name: name,
    note: '',
    pages: defaultPages,
    x: x,
    y: y
  };
}

/**
 * Create a message event
 * @param {Object} options - Event options
 * @param {string} options.name - Event name
 * @param {number} options.x - X position
 * @param {number} options.y - Y position
 * @param {string} options.characterName - Character sprite name
 * @param {number} options.characterIndex - Character sprite index
 * @param {Array} options.messages - Array of message strings
 * @returns {Object} - Event object
 */
function createMessageEvent(options = {}) {
  const {
    name = 'Message Event',
    x = 0,
    y = 0,
    characterName = '',
    characterIndex = 0,
    messages = ['Hello, world!']
  } = options;
  
  // Create event list with messages
  const list = [];
  
  // Add character appearance
  list.push({ code: 101, indent: 0, parameters: [characterName, characterIndex, 0, 2] });
  
  // Add message lines
  for (const message of messages) {
    list.push({ code: 401, indent: 0, parameters: [message] });
  }
  
  // Add end command
  list.push({ code: 0, indent: 0, parameters: [] });
  
  // Create the event
  return createBasicEvent({
    name,
    x,
    y,
    characterName,
    characterIndex,
    pages: [{
      conditions: {
        actorId: 1,
        actorValid: false,
        itemId: 1,
        itemValid: false,
        selfSwitchCh: 'A',
        selfSwitchValid: false,
        switch1Id: 1,
        switch1Valid: false,
        switch2Id: 1,
        switch2Valid: false,
        variableId: 1,
        variableValid: false,
        variableValue: 0
      },
      directionFix: false,
      image: {
        characterIndex: characterIndex,
        characterName: characterName,
        direction: 2,
        pattern: 1,
        tileId: 0
      },
      list: list,
      moveFrequency: 3,
      moveRoute: {
        list: [{ code: 0, parameters: [] }],
        repeat: true,
        skippable: false,
        wait: false
      },
      moveSpeed: 3,
      moveType: 0,
      priorityType: 1,
      stepAnime: false,
      through: false,
      trigger: 0,
      walkAnime: true
    }]
  });
}

module.exports = {
  DATA_DIR,
  MAP_INFOS_PATH,
  getMapInfos,
  getMapInfo,
  getMapPath,
  loadMap,
  saveMap,
  findMapsByName,
  addEventToMap,
  updateMapEvent,
  deleteMapEvent,
  findMapEvents,
  createBasicEvent,
  createMessageEvent
};
