// Script to add level 36-37 quest events to maps
const fs = require('fs');
const path = require('path');

// Map file paths
const map104Path = path.join(__dirname, 'data', 'Map104.json'); // Abandoned Space Station
const map106Path = path.join(__dirname, 'data', 'Map106.json'); // NeuraTech Facility
const map110Path = path.join(__dirname, 'data', 'Map110.json'); // Quantum Dynamics Facility

// Event file paths
const tempDir = path.join(__dirname, 'temp_events');
const malfunctioningEmployeePath = path.join(tempDir, 'malfunctioning_employee.json');
const memoryFragment1Path = path.join(tempDir, 'memory_fragment1.json');
const memoryFragment2Path = path.join(tempDir, 'memory_fragment2.json');
const memoryFragment3Path = path.join(tempDir, 'memory_fragment3.json');
const drLovelacePath = path.join(tempDir, 'dr_lovelace.json');
const suspiciousJanitorPath = path.join(tempDir, 'suspicious_janitor.json');
const maxEMumPath = path.join(tempDir, 'max_e_mum.json');
const sabotageTerminal1Path = path.join(tempDir, 'sabotage_terminal1.json');
const sabotageTerminal2Path = path.join(tempDir, 'sabotage_terminal2.json');
const sabotageTerminal3Path = path.join(tempDir, 'sabotage_terminal3.json');
const professorParadoxPath = path.join(tempDir, 'professor_paradox.json');

// Function to add an event to a map
function addEventToMap(mapPath, eventPath) {
    try {
        // Read the map file
        const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
        
        // Read the event file
        const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
        
        // Add the event to the map's events array
        if (!mapData.events) {
            mapData.events = [];
        }
        
        // Find the next available event ID
        let nextId = 1;
        while (mapData.events[nextId]) {
            nextId++;
        }
        
        // Add the event with the next available ID
        mapData.events[nextId] = eventData;
        
        // Write the updated map file
        fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2));
        
        console.log(`Added event ${path.basename(eventPath)} to ${path.basename(mapPath)} with ID ${nextId}`);
        return true;
    } catch (error) {
        console.error(`Error adding event ${path.basename(eventPath)} to ${path.basename(mapPath)}:`, error);
        return false;
    }
}

// Add events to Map104 (Abandoned Space Station)
console.log("Adding events to Map104 (Abandoned Space Station)...");
addEventToMap(map104Path, malfunctioningEmployeePath);
addEventToMap(map104Path, memoryFragment1Path);
addEventToMap(map104Path, memoryFragment2Path);
addEventToMap(map104Path, memoryFragment3Path);

// Add events to Map106 (NeuraTech Facility)
console.log("\nAdding events to Map106 (NeuraTech Facility)...");
addEventToMap(map106Path, drLovelacePath);

// Add events to Map110 (Quantum Dynamics Facility)
console.log("\nAdding events to Map110 (Quantum Dynamics Facility)...");
addEventToMap(map110Path, suspiciousJanitorPath);
addEventToMap(map110Path, maxEMumPath);
addEventToMap(map110Path, sabotageTerminal1Path);
addEventToMap(map110Path, sabotageTerminal2Path);
addEventToMap(map110Path, sabotageTerminal3Path);
addEventToMap(map110Path, professorParadoxPath);

console.log("\nAll events have been added to the maps!");
