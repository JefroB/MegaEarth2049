/**
 * MegaEarth 2049 Batch Editing Tool
 * 
 * This script helps automate common editing tasks across multiple JSON files
 * to reduce the number of Cline API requests needed.
 * 
 * Usage: node batch-edit-tool.js [command] [options]
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DATA_DIR = path.join(__dirname, 'data');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Helper function to read a JSON file
 */
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Helper function to write a JSON file
 */
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * List all map files
 */
function listMapFiles() {
  try {
    const files = fs.readdirSync(DATA_DIR)
      .filter(file => file.startsWith('Map') && file.endsWith('.json') && !file.includes('MapInfos'));
    
    console.log(`Found ${files.length} map files:`);
    files.forEach(file => console.log(`- ${file}`));
    return files;
  } catch (error) {
    console.error('Error listing map files:', error.message);
    return [];
  }
}

/**
 * Update map properties across multiple files
 */
function updateMapProperties(mapFiles, propertyUpdates) {
  let updatedCount = 0;
  
  mapFiles.forEach(mapFile => {
    const filePath = path.join(DATA_DIR, mapFile);
    const mapData = readJsonFile(filePath);
    
    if (!mapData) return;
    
    let updated = false;
    
    // Apply property updates
    Object.entries(propertyUpdates).forEach(([key, value]) => {
      if (mapData[key] !== undefined) {
        mapData[key] = value;
        updated = true;
      }
    });
    
    if (updated) {
      if (writeJsonFile(filePath, mapData)) {
        console.log(`Updated properties in ${mapFile}`);
        updatedCount++;
      }
    }
  });
  
  console.log(`Successfully updated ${updatedCount} map files.`);
}

/**
 * Find and replace text in event dialogue
 */
function findReplaceDialogue(mapFiles, findText, replaceText) {
  let totalReplacements = 0;
  let filesModified = 0;
  
  mapFiles.forEach(mapFile => {
    const filePath = path.join(DATA_DIR, mapFile);
    const mapData = readJsonFile(filePath);
    
    if (!mapData || !mapData.events) return;
    
    let fileModified = false;
    
    // Process each event
    mapData.events.forEach((event, eventIndex) => {
      if (!event) return; // Skip null events
      
      // Process each page in the event
      event.pages.forEach((page, pageIndex) => {
        if (!page || !page.list) return;
        
        // Process each command in the page
        page.list.forEach((cmd, cmdIndex) => {
          // Check for dialogue commands (code 401 is additional text line)
          if (cmd.code === 401 && cmd.parameters && cmd.parameters[0]) {
            const originalText = cmd.parameters[0];
            if (originalText.includes(findText)) {
              const newText = originalText.replace(new RegExp(findText, 'g'), replaceText);
              mapData.events[eventIndex].pages[pageIndex].list[cmdIndex].parameters[0] = newText;
              totalReplacements++;
              fileModified = true;
            }
          }
        });
      });
    });
    
    if (fileModified) {
      if (writeJsonFile(filePath, mapData)) {
        console.log(`Updated dialogue in ${mapFile}`);
        filesModified++;
      }
    }
  });
  
  console.log(`Made ${totalReplacements} text replacements across ${filesModified} files.`);
}

/**
 * Add a new event to multiple maps
 */
function addEventToMaps(mapFiles, eventTemplate, positionStrategy) {
  let addedCount = 0;
  
  mapFiles.forEach(mapFile => {
    const filePath = path.join(DATA_DIR, mapFile);
    const mapData = readJsonFile(filePath);
    
    if (!mapData || !mapData.events) return;
    
    // Find the next available event ID
    let nextId = 1;
    while (mapData.events[nextId]) {
      nextId++;
    }
    
    // Create a copy of the event template
    const newEvent = JSON.parse(JSON.stringify(eventTemplate));
    newEvent.id = nextId;
    
    // Set position based on strategy
    if (positionStrategy === 'center') {
      newEvent.x = Math.floor(mapData.width / 2);
      newEvent.y = Math.floor(mapData.height / 2);
    } else if (positionStrategy === 'corner') {
      newEvent.x = 1;
      newEvent.y = 1;
    } else if (Array.isArray(positionStrategy) && positionStrategy.length === 2) {
      newEvent.x = positionStrategy[0];
      newEvent.y = positionStrategy[1];
    }
    
    // Add the event to the map
    mapData.events[nextId] = newEvent;
    
    if (writeJsonFile(filePath, mapData)) {
      console.log(`Added event to ${mapFile} at position (${newEvent.x}, ${newEvent.y})`);
      addedCount++;
    }
  });
  
  console.log(`Successfully added events to ${addedCount} map files.`);
}

/**
 * Update item properties across multiple items
 */
function updateItems(itemIds, propertyUpdates) {
  const filePath = path.join(DATA_DIR, 'Items.json');
  const itemsData = readJsonFile(filePath);
  
  if (!itemsData) return;
  
  let updatedCount = 0;
  
  itemIds.forEach(id => {
    if (!itemsData[id]) {
      console.log(`Item ID ${id} not found.`);
      return;
    }
    
    // Apply property updates
    Object.entries(propertyUpdates).forEach(([key, value]) => {
      if (itemsData[id][key] !== undefined) {
        itemsData[id][key] = value;
        updatedCount++;
      }
    });
  });
  
  if (updatedCount > 0) {
    if (writeJsonFile(filePath, itemsData)) {
      console.log(`Updated ${updatedCount} properties across ${itemIds.length} items.`);
    }
  } else {
    console.log('No items were updated.');
  }
}

/**
 * Load event templates from event-templates.json
 */
function loadEventTemplates() {
  try {
    const templatesPath = path.join(__dirname, 'event-templates.json');
    const templatesData = fs.readFileSync(templatesPath, 'utf8');
    return JSON.parse(templatesData);
  } catch (error) {
    console.error('Error loading event templates:', error.message);
    return { templates: {}, dialogues: {} };
  }
}

/**
 * Add a template NPC to multiple maps
 */
function addTemplateNPC(mapFiles, templateName, positionStrategy) {
  const templates = loadEventTemplates();
  
  if (!templates.templates || !templates.templates[templateName]) {
    console.error(`Template "${templateName}" not found in event-templates.json`);
    return;
  }
  
  const eventTemplate = templates.templates[templateName];
  addEventToMaps(mapFiles, eventTemplate, positionStrategy);
}

/**
 * Add a template dialogue to an existing event
 */
function addTemplateDialogue(mapFiles, eventIds, dialogueTemplateName) {
  const templates = loadEventTemplates();
  
  if (!templates.dialogues || !templates.dialogues[dialogueTemplateName]) {
    console.error(`Dialogue template "${dialogueTemplateName}" not found in event-templates.json`);
    return;
  }
  
  const dialogueTemplate = templates.dialogues[dialogueTemplateName];
  let updatedCount = 0;
  
  mapFiles.forEach(mapFile => {
    const filePath = path.join(DATA_DIR, mapFile);
    const mapData = readJsonFile(filePath);
    
    if (!mapData || !mapData.events) return;
    
    let fileModified = false;
    
    eventIds.forEach(eventId => {
      if (!mapData.events[eventId]) {
        console.log(`Event ID ${eventId} not found in ${mapFile}.`);
        return;
      }
      
      // Get the first page of the event
      const page = mapData.events[eventId].pages[0];
      if (!page || !page.list) return;
      
      // Replace the event commands with the template dialogue
      // Keep the last command (usually code 0) if it exists
      const lastCommand = page.list.length > 0 ? page.list[page.list.length - 1] : null;
      
      page.list = JSON.parse(JSON.stringify(dialogueTemplate));
      
      // If the last command was an end command, make sure we keep it
      if (lastCommand && lastCommand.code === 0) {
        // Check if the template already ends with code 0
        if (page.list[page.list.length - 1].code !== 0) {
          page.list.push(lastCommand);
        }
      }
      
      fileModified = true;
      updatedCount++;
    });
    
    if (fileModified) {
      if (writeJsonFile(filePath, mapData)) {
        console.log(`Updated events in ${mapFile}`);
      }
    }
  });
  
  console.log(`Successfully updated ${updatedCount} events with template dialogue.`);
}

/**
 * List available templates
 */
function listTemplates() {
  const templates = loadEventTemplates();
  
  console.log('\nAvailable NPC Templates:');
  Object.keys(templates.templates || {}).forEach(name => {
    console.log(`- ${name}`);
  });
  
  console.log('\nAvailable Dialogue Templates:');
  Object.keys(templates.dialogues || {}).forEach(name => {
    console.log(`- ${name}`);
  });
}

/**
 * Interactive menu for batch operations
 */
function showMenu() {
  console.log('\nMegaEarth 2049 Batch Editing Tool');
  console.log('================================');
  console.log('1. List all map files');
  console.log('2. Update map properties');
  console.log('3. Find and replace dialogue text');
  console.log('4. Add event to multiple maps');
  console.log('5. Update item properties');
  console.log('6. List available templates');
  console.log('7. Add template NPC to maps');
  console.log('8. Add template dialogue to events');
  console.log('9. Exit');
  
  rl.question('\nSelect an option: ', (answer) => {
    switch (answer) {
      case '1':
        listMapFiles();
        showMenu();
        break;
        
      case '2':
        rl.question('Enter map file pattern (e.g., Map01, or "all" for all maps): ', (pattern) => {
          const mapFiles = pattern.toLowerCase() === 'all' 
            ? listMapFiles()
            : listMapFiles().filter(file => file.includes(pattern));
          
          if (mapFiles.length === 0) {
            console.log('No matching map files found.');
            showMenu();
            return;
          }
          
          console.log(`Will update ${mapFiles.length} map files.`);
          
          rl.question('Enter property updates as JSON (e.g., {"displayName": "New Name", "encounterStep": 30}): ', (updatesStr) => {
            try {
              const updates = JSON.parse(updatesStr);
              updateMapProperties(mapFiles, updates);
            } catch (error) {
              console.error('Invalid JSON format:', error.message);
            }
            showMenu();
          });
        });
        break;
        
      case '3':
        rl.question('Enter map file pattern (e.g., Map01, or "all" for all maps): ', (pattern) => {
          const mapFiles = pattern.toLowerCase() === 'all' 
            ? listMapFiles()
            : listMapFiles().filter(file => file.includes(pattern));
          
          if (mapFiles.length === 0) {
            console.log('No matching map files found.');
            showMenu();
            return;
          }
          
          console.log(`Will search ${mapFiles.length} map files.`);
          
          rl.question('Enter text to find: ', (findText) => {
            rl.question('Enter replacement text: ', (replaceText) => {
              findReplaceDialogue(mapFiles, findText, replaceText);
              showMenu();
            });
          });
        });
        break;
        
      case '4':
        rl.question('Enter map file pattern (e.g., Map01, or "all" for all maps): ', (pattern) => {
          const mapFiles = pattern.toLowerCase() === 'all' 
            ? listMapFiles()
            : listMapFiles().filter(file => file.includes(pattern));
          
          if (mapFiles.length === 0) {
            console.log('No matching map files found.');
            showMenu();
            return;
          }
          
          console.log(`Will add event to ${mapFiles.length} map files.`);
          
          rl.question('Enter event template as JSON (see MegaEarth2049_EditingGuide.md for examples): ', (templateStr) => {
            try {
              const template = JSON.parse(templateStr);
              
              rl.question('Position strategy (center, corner, or x,y coordinates): ', (posStrategy) => {
                let strategy;
                if (posStrategy === 'center' || posStrategy === 'corner') {
                  strategy = posStrategy;
                } else {
                  const coords = posStrategy.split(',').map(n => parseInt(n.trim(), 10));
                  if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                    strategy = coords;
                  } else {
                    console.error('Invalid position strategy. Using center as default.');
                    strategy = 'center';
                  }
                }
                
                addEventToMaps(mapFiles, template, strategy);
                showMenu();
              });
            } catch (error) {
              console.error('Invalid JSON format:', error.message);
              showMenu();
            }
          });
        });
        break;
        
      case '5':
        rl.question('Enter item IDs (comma-separated): ', (idsStr) => {
          const itemIds = idsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
          
          if (itemIds.length === 0) {
            console.log('No valid item IDs provided.');
            showMenu();
            return;
          }
          
          rl.question('Enter property updates as JSON (e.g., {"price": 200, "description": "New description"}): ', (updatesStr) => {
            try {
              const updates = JSON.parse(updatesStr);
              updateItems(itemIds, updates);
            } catch (error) {
              console.error('Invalid JSON format:', error.message);
            }
            showMenu();
          });
        });
        break;
        
      case '6':
        listTemplates();
        showMenu();
        break;
        
      case '7':
        rl.question('Enter map file pattern (e.g., Map01, or "all" for all maps): ', (pattern) => {
          const mapFiles = pattern.toLowerCase() === 'all' 
            ? listMapFiles()
            : listMapFiles().filter(file => file.includes(pattern));
          
          if (mapFiles.length === 0) {
            console.log('No matching map files found.');
            showMenu();
            return;
          }
          
          console.log(`Will add NPC to ${mapFiles.length} map files.`);
          
          // First list available templates
          listTemplates();
          
          rl.question('Enter template name: ', (templateName) => {
            rl.question('Position strategy (center, corner, or x,y coordinates): ', (posStrategy) => {
              let strategy;
              if (posStrategy === 'center' || posStrategy === 'corner') {
                strategy = posStrategy;
              } else {
                const coords = posStrategy.split(',').map(n => parseInt(n.trim(), 10));
                if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                  strategy = coords;
                } else {
                  console.error('Invalid position strategy. Using center as default.');
                  strategy = 'center';
                }
              }
              
              addTemplateNPC(mapFiles, templateName, strategy);
              showMenu();
            });
          });
        });
        break;
        
      case '8':
        rl.question('Enter map file pattern (e.g., Map01, or "all" for all maps): ', (pattern) => {
          const mapFiles = pattern.toLowerCase() === 'all' 
            ? listMapFiles()
            : listMapFiles().filter(file => file.includes(pattern));
          
          if (mapFiles.length === 0) {
            console.log('No matching map files found.');
            showMenu();
            return;
          }
          
          rl.question('Enter event IDs (comma-separated): ', (idsStr) => {
            const eventIds = idsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
            
            if (eventIds.length === 0) {
              console.log('No valid event IDs provided.');
              showMenu();
              return;
            }
            
            // List available dialogue templates
            listTemplates();
            
            rl.question('Enter dialogue template name: ', (templateName) => {
              addTemplateDialogue(mapFiles, eventIds, templateName);
              showMenu();
            });
          });
        });
        break;
        
      case '9':
        console.log('Exiting...');
        rl.close();
        break;
        
      default:
        console.log('Invalid option. Please try again.');
        showMenu();
        break;
    }
  });
}

// Start the interactive menu
showMenu();
