/**
 * Find Ninja System Information
 * 
 * This script searches through the game files to find all information related to
 * the ninja system, including random encounters, ninja characters, and related mechanics.
 * It compiles this information into a comprehensive report.
 */

const fs = require('fs');
const path = require('path');

// Directories to search
const SEARCH_DIRS = [
    'data',
    'js',
    'AI_GENERATED_SCRIPTS',
    'GameFAQs'
];

// Keywords to search for
const NINJA_KEYWORDS = [
    'ninja',
    'shinobi',
    'ninjutsu',
    'shadow warrior',
    'shadow technique',
    'stealth attack',
    'smoke bomb',
    'shuriken',
    'kunai',
    'ninja star',
    'ninja clan',
    'ninja master',
    'ninja apprentice',
    'ninja recruit'
];

// File extensions to search
const FILE_EXTENSIONS = [
    '.json',
    '.js',
    '.md',
    '.txt'
];

// Results storage
const results = {
    ninjaCharacters: [],
    ninjaItems: [],
    ninjaEncounters: [],
    ninjaLocations: [],
    ninjaSkills: [],
    ninjaQuests: [],
    ninjaDialogue: [],
    otherReferences: []
};

/**
 * Recursively search directories for files matching the extensions
 * @param {string} dir - Directory to search
 * @param {Array<string>} extensions - File extensions to include
 * @returns {Array<string>} - Array of file paths
 */
function findFiles(dir, extensions) {
    let files = [];
    
    if (!fs.existsSync(dir)) {
        console.warn(`Directory not found: ${dir}`);
        return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
            files = files.concat(findFiles(itemPath, extensions));
        } else if (stats.isFile()) {
            const ext = path.extname(itemPath).toLowerCase();
            if (extensions.includes(ext)) {
                files.push(itemPath);
            }
        }
    }
    
    return files;
}

/**
 * Check if a file contains any of the keywords
 * @param {string} filePath - Path to the file
 * @param {Array<string>} keywords - Keywords to search for
 * @returns {boolean} - True if any keyword is found
 */
function fileContainsKeywords(filePath, keywords) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lowerContent = content.toLowerCase();
        
        return keywords.some(keyword => lowerContent.includes(keyword.toLowerCase()));
    } catch (error) {
        console.error(`Error reading file ${filePath}: ${error.message}`);
        return false;
    }
}

/**
 * Extract ninja-related information from a file
 * @param {string} filePath - Path to the file
 * @param {Array<string>} keywords - Keywords to search for
 */
function extractNinjaInfo(filePath, keywords) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        const fileExt = path.extname(filePath).toLowerCase();
        
        // Process based on file type
        if (fileExt === '.json') {
            processJsonFile(filePath, fileName, content);
        } else if (fileExt === '.js') {
            processJsFile(filePath, fileName, content, keywords);
        } else if (fileExt === '.md' || fileExt === '.txt') {
            processTextFile(filePath, fileName, content, keywords);
        }
    } catch (error) {
        console.error(`Error processing file ${filePath}: ${error.message}`);
    }
}

/**
 * Process a JSON file for ninja information
 * @param {string} filePath - Path to the file
 * @param {string} fileName - Name of the file
 * @param {string} content - File content
 */
function processJsonFile(filePath, fileName, content) {
    try {
        const data = JSON.parse(content);
        
        // Check for specific file types
        if (fileName === 'Troops.json') {
            processTroopsFile(data);
        } else if (fileName === 'Enemies.json') {
            processEnemiesFile(data);
        } else if (fileName === 'Items.json') {
            processItemsFile(data);
        } else if (fileName === 'Actors.json') {
            processActorsFile(data);
        } else if (fileName === 'Skills.json') {
            processSkillsFile(data);
        } else if (fileName.startsWith('Map') && fileName.endsWith('.json')) {
            processMapFile(data, fileName);
        } else {
            // Generic JSON processing
            processGenericJsonFile(data, fileName);
        }
    } catch (error) {
        console.error(`Error parsing JSON in ${filePath}: ${error.message}`);
    }
}

/**
 * Process the Troops.json file
 * @param {Array} data - Troops data
 */
function processTroopsFile(data) {
    if (!Array.isArray(data)) return;
    
    data.forEach(troop => {
        if (!troop) return;
        
        const name = troop.name || '';
        const pages = troop.pages || [];
        
        if (containsNinjaKeyword(name)) {
            results.ninjaEncounters.push({
                id: troop.id,
                name: troop.name,
                members: troop.members || [],
                source: 'Troops.json'
            });
        }
        
        // Check for ninja-related battle events
        pages.forEach(page => {
            const list = page.list || [];
            list.forEach(event => {
                if (event.code === 401) { // Show Text
                    const text = event.parameters[0] || '';
                    if (containsNinjaKeyword(text)) {
                        results.ninjaDialogue.push({
                            troopId: troop.id,
                            troopName: troop.name,
                            text: text,
                            source: 'Troops.json'
                        });
                    }
                }
            });
        });
    });
}

/**
 * Process the Enemies.json file
 * @param {Array} data - Enemies data
 */
function processEnemiesFile(data) {
    if (!Array.isArray(data)) return;
    
    data.forEach(enemy => {
        if (!enemy) return;
        
        const name = enemy.name || '';
        const note = enemy.note || '';
        
        if (containsNinjaKeyword(name) || containsNinjaKeyword(note)) {
            results.ninjaCharacters.push({
                id: enemy.id,
                name: enemy.name,
                note: enemy.note,
                params: enemy.params,
                source: 'Enemies.json'
            });
        }
    });
}

/**
 * Process the Items.json file
 * @param {Array} data - Items data
 */
function processItemsFile(data) {
    if (!Array.isArray(data)) return;
    
    data.forEach(item => {
        if (!item) return;
        
        const name = item.name || '';
        const description = item.description || '';
        const note = item.note || '';
        
        if (containsNinjaKeyword(name) || containsNinjaKeyword(description) || containsNinjaKeyword(note)) {
            results.ninjaItems.push({
                id: item.id,
                name: item.name,
                description: item.description,
                note: item.note,
                source: 'Items.json'
            });
        }
    });
}

/**
 * Process the Actors.json file
 * @param {Array} data - Actors data
 */
function processActorsFile(data) {
    if (!Array.isArray(data)) return;
    
    data.forEach(actor => {
        if (!actor) return;
        
        const name = actor.name || '';
        const nickname = actor.nickname || '';
        const profile = actor.profile || '';
        const note = actor.note || '';
        
        if (containsNinjaKeyword(name) || containsNinjaKeyword(nickname) || 
            containsNinjaKeyword(profile) || containsNinjaKeyword(note)) {
            results.ninjaCharacters.push({
                id: actor.id,
                name: actor.name,
                nickname: actor.nickname,
                profile: actor.profile,
                note: actor.note,
                source: 'Actors.json'
            });
        }
    });
}

/**
 * Process the Skills.json file
 * @param {Array} data - Skills data
 */
function processSkillsFile(data) {
    if (!Array.isArray(data)) return;
    
    data.forEach(skill => {
        if (!skill) return;
        
        const name = skill.name || '';
        const description = skill.description || '';
        const note = skill.note || '';
        
        if (containsNinjaKeyword(name) || containsNinjaKeyword(description) || containsNinjaKeyword(note)) {
            results.ninjaSkills.push({
                id: skill.id,
                name: skill.name,
                description: skill.description,
                note: skill.note,
                source: 'Skills.json'
            });
        }
    });
}

/**
 * Process a Map file
 * @param {Object} data - Map data
 * @param {string} fileName - Name of the file
 */
function processMapFile(data, fileName) {
    const mapName = data.displayName || fileName;
    const events = data.events || [];
    let hasNinjaReference = false;
    
    // Check map name and note
    if (containsNinjaKeyword(mapName) || containsNinjaKeyword(data.note || '')) {
        hasNinjaReference = true;
        results.ninjaLocations.push({
            id: fileName.replace(/[^0-9]/g, ''),
            name: mapName,
            note: data.note,
            source: fileName
        });
    }
    
    // Check events
    events.forEach(event => {
        if (!event) return;
        
        const eventName = event.name || '';
        const eventNote = event.note || '';
        const pages = event.pages || [];
        
        if (containsNinjaKeyword(eventName) || containsNinjaKeyword(eventNote)) {
            hasNinjaReference = true;
            
            // Check if this is a quest event
            if (eventName.toLowerCase().includes('quest') || eventNote.toLowerCase().includes('quest')) {
                results.ninjaQuests.push({
                    mapId: fileName.replace(/[^0-9]/g, ''),
                    mapName: mapName,
                    eventId: event.id,
                    eventName: eventName,
                    eventNote: eventNote,
                    source: fileName
                });
            } else {
                results.ninjaCharacters.push({
                    mapId: fileName.replace(/[^0-9]/g, ''),
                    mapName: mapName,
                    eventId: event.id,
                    eventName: eventName,
                    eventNote: eventNote,
                    source: fileName
                });
            }
        }
        
        // Check event pages for dialogue
        pages.forEach(page => {
            const list = page.list || [];
            list.forEach(command => {
                if (command.code === 401) { // Show Text
                    const text = command.parameters[0] || '';
                    if (containsNinjaKeyword(text)) {
                        hasNinjaReference = true;
                        results.ninjaDialogue.push({
                            mapId: fileName.replace(/[^0-9]/g, ''),
                            mapName: mapName,
                            eventId: event.id,
                            eventName: eventName,
                            text: text,
                            source: fileName
                        });
                    }
                }
            });
        });
    });
    
    // If map has ninja references but wasn't already added as a location
    if (hasNinjaReference && !results.ninjaLocations.some(loc => loc.id === fileName.replace(/[^0-9]/g, ''))) {
        results.ninjaLocations.push({
            id: fileName.replace(/[^0-9]/g, ''),
            name: mapName,
            note: data.note,
            source: fileName
        });
    }
}

/**
 * Process a generic JSON file
 * @param {Object|Array} data - JSON data
 * @param {string} fileName - Name of the file
 */
function processGenericJsonFile(data, fileName) {
    const jsonString = JSON.stringify(data);
    
    if (containsNinjaKeyword(jsonString)) {
        results.otherReferences.push({
            file: fileName,
            type: 'JSON',
            note: 'Contains ninja-related data'
        });
    }
}

/**
 * Process a JavaScript file
 * @param {string} filePath - Path to the file
 * @param {string} fileName - Name of the file
 * @param {string} content - File content
 * @param {Array<string>} keywords - Keywords to search for
 */
function processJsFile(filePath, fileName, content, keywords) {
    // Check for ninja-related functions or variables
    const ninjaFunctions = [];
    const ninjaVariables = [];
    const ninjaComments = [];
    
    // Look for function definitions
    const functionRegex = /function\s+(\w+)\s*\([^)]*\)/g;
    let match;
    
    while ((match = functionRegex.exec(content)) !== null) {
        const functionName = match[1];
        if (containsNinjaKeyword(functionName)) {
            ninjaFunctions.push(functionName);
        }
    }
    
    // Look for variable declarations
    const variableRegex = /(?:var|let|const)\s+(\w+)\s*=/g;
    
    while ((match = variableRegex.exec(content)) !== null) {
        const variableName = match[1];
        if (containsNinjaKeyword(variableName)) {
            ninjaVariables.push(variableName);
        }
    }
    
    // Look for comments
    const commentRegex = /\/\/.*|\/\*[\s\S]*?\*\//g;
    
    while ((match = commentRegex.exec(content)) !== null) {
        const comment = match[0];
        if (keywords.some(keyword => comment.toLowerCase().includes(keyword.toLowerCase()))) {
            ninjaComments.push(comment.trim());
        }
    }
    
    // If we found any ninja-related code
    if (ninjaFunctions.length > 0 || ninjaVariables.length > 0 || ninjaComments.length > 0 || 
        keywords.some(keyword => content.toLowerCase().includes(keyword.toLowerCase()))) {
        results.otherReferences.push({
            file: filePath,
            type: 'JavaScript',
            functions: ninjaFunctions,
            variables: ninjaVariables,
            comments: ninjaComments
        });
    }
}

/**
 * Process a text or markdown file
 * @param {string} filePath - Path to the file
 * @param {string} fileName - Name of the file
 * @param {string} content - File content
 * @param {Array<string>} keywords - Keywords to search for
 */
function processTextFile(filePath, fileName, content, keywords) {
    // Extract sections that mention ninjas
    const lines = content.split('\n');
    const ninjaSections = [];
    let currentSection = null;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if this line contains a ninja keyword
        if (keywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()))) {
            // If we're not already in a section, start one
            if (currentSection === null) {
                currentSection = {
                    startLine: i,
                    content: [line]
                };
            } else {
                // Add to existing section
                currentSection.content.push(line);
            }
        } else if (currentSection !== null) {
            // If this line doesn't contain a keyword but we're in a section
            
            // Add one more line for context
            if (i - currentSection.startLine <= 10) {
                currentSection.content.push(line);
            } else {
                // End the section if we've gone more than 10 lines without a keyword
                currentSection.endLine = i - 1;
                ninjaSections.push(currentSection);
                currentSection = null;
            }
        }
    }
    
    // Add the last section if there is one
    if (currentSection !== null) {
        currentSection.endLine = lines.length - 1;
        ninjaSections.push(currentSection);
    }
    
    // If we found any ninja-related sections
    if (ninjaSections.length > 0) {
        // Check if this is a FAQ or documentation file
        if (fileName.toLowerCase().includes('faq') || 
            fileName.toLowerCase().includes('readme') || 
            fileName.toLowerCase().includes('guide')) {
            results.otherReferences.push({
                file: filePath,
                type: 'Documentation',
                sections: ninjaSections.map(section => section.content.join('\n'))
            });
        } else {
            results.otherReferences.push({
                file: filePath,
                type: 'Text',
                sections: ninjaSections.map(section => section.content.join('\n'))
            });
        }
    }
}

/**
 * Check if a string contains any ninja-related keyword
 * @param {string} text - Text to check
 * @returns {boolean} - True if a keyword is found
 */
function containsNinjaKeyword(text) {
    if (!text) return false;
    
    const lowerText = text.toLowerCase();
    return NINJA_KEYWORDS.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

/**
 * Generate a report of the findings
 * @returns {string} - Markdown report
 */
function generateReport() {
    let report = '# Ninja System Analysis Report\n\n';
    
    // Add a summary
    report += '## Summary\n\n';
    report += `- Ninja Characters: ${results.ninjaCharacters.length}\n`;
    report += `- Ninja Items: ${results.ninjaItems.length}\n`;
    report += `- Ninja Encounters: ${results.ninjaEncounters.length}\n`;
    report += `- Ninja Locations: ${results.ninjaLocations.length}\n`;
    report += `- Ninja Skills: ${results.ninjaSkills.length}\n`;
    report += `- Ninja Quests: ${results.ninjaQuests.length}\n`;
    report += `- Ninja Dialogue: ${results.ninjaDialogue.length}\n`;
    report += `- Other References: ${results.otherReferences.length}\n\n`;
    
    // Add details for each category
    if (results.ninjaCharacters.length > 0) {
        report += '## Ninja Characters\n\n';
        results.ninjaCharacters.forEach(character => {
            report += `### ${character.name || 'Unnamed'} (ID: ${character.id || 'N/A'})\n\n`;
            if (character.nickname) report += `- Nickname: ${character.nickname}\n`;
            if (character.profile) report += `- Profile: ${character.profile}\n`;
            if (character.note) report += `- Note: ${character.note}\n`;
            if (character.params) report += `- Parameters: ${JSON.stringify(character.params)}\n`;
            if (character.eventId) report += `- Event ID: ${character.eventId}\n`;
            if (character.mapName) report += `- Location: ${character.mapName} (Map ${character.mapId})\n`;
            report += `- Source: ${character.source}\n\n`;
        });
    }
    
    if (results.ninjaItems.length > 0) {
        report += '## Ninja Items\n\n';
        results.ninjaItems.forEach(item => {
            report += `### ${item.name || 'Unnamed'} (ID: ${item.id || 'N/A'})\n\n`;
            if (item.description) report += `- Description: ${item.description}\n`;
            if (item.note) report += `- Note: ${item.note}\n`;
            report += `- Source: ${item.source}\n\n`;
        });
    }
    
    if (results.ninjaEncounters.length > 0) {
        report += '## Ninja Encounters\n\n';
        results.ninjaEncounters.forEach(encounter => {
            report += `### ${encounter.name || 'Unnamed'} (ID: ${encounter.id || 'N/A'})\n\n`;
            if (encounter.members && encounter.members.length > 0) {
                report += '- Members:\n';
                encounter.members.forEach(member => {
                    report += `  - Enemy ID: ${member.enemyId}, Position: (${member.x}, ${member.y})\n`;
                });
            }
            report += `- Source: ${encounter.source}\n\n`;
        });
    }
    
    if (results.ninjaLocations.length > 0) {
        report += '## Ninja Locations\n\n';
        results.ninjaLocations.forEach(location => {
            report += `### ${location.name || 'Unnamed'} (Map ${location.id || 'N/A'})\n\n`;
            if (location.note) report += `- Note: ${location.note}\n`;
            report += `- Source: ${location.source}\n\n`;
        });
    }
    
    if (results.ninjaSkills.length > 0) {
        report += '## Ninja Skills\n\n';
        results.ninjaSkills.forEach(skill => {
            report += `### ${skill.name || 'Unnamed'} (ID: ${skill.id || 'N/A'})\n\n`;
            if (skill.description) report += `- Description: ${skill.description}\n`;
            if (skill.note) report += `- Note: ${skill.note}\n`;
            report += `- Source: ${skill.source}\n\n`;
        });
    }
    
    if (results.ninjaQuests.length > 0) {
        report += '## Ninja Quests\n\n';
        results.ninjaQuests.forEach(quest => {
            report += `### ${quest.eventName || 'Unnamed'} (Event ${quest.eventId || 'N/A'})\n\n`;
            if (quest.eventNote) report += `- Note: ${quest.eventNote}\n`;
            if (quest.mapName) report += `- Location: ${quest.mapName} (Map ${quest.mapId})\n`;
            report += `- Source: ${quest.source}\n\n`;
        });
    }
    
    if (results.ninjaDialogue.length > 0) {
        report += '## Ninja Dialogue\n\n';
        results.ninjaDialogue.forEach(dialogue => {
            const source = dialogue.troopName ? 
                `Troop: ${dialogue.troopName} (ID: ${dialogue.troopId})` : 
                `Event: ${dialogue.eventName || 'Unnamed'} in ${dialogue.mapName} (Map ${dialogue.mapId})`;
            
            report += `### ${source}\n\n`;
            report += `"${dialogue.text}"\n\n`;
            report += `- Source: ${dialogue.source}\n\n`;
        });
    }
    
    if (results.otherReferences.length > 0) {
        report += '## Other References\n\n';
        results.otherReferences.forEach(ref => {
            report += `### ${ref.file}\n\n`;
            report += `- Type: ${ref.type}\n`;
            
            if (ref.functions && ref.functions.length > 0) {
                report += '- Functions:\n';
                ref.functions.forEach(func => {
                    report += `  - ${func}\n`;
                });
            }
            
            if (ref.variables && ref.variables.length > 0) {
                report += '- Variables:\n';
                ref.variables.forEach(variable => {
                    report += `  - ${variable}\n`;
                });
            }
            
            if (ref.comments && ref.comments.length > 0) {
                report += '- Comments:\n';
                ref.comments.forEach(comment => {
                    report += `  - ${comment}\n`;
                });
            }
            
            if (ref.sections && ref.sections.length > 0) {
                report += '- Sections:\n';
                ref.sections.forEach(section => {
                    report += '```\n' + section + '\n```\n\n';
                });
            }
            
            report += '\n';
        });
    }
    
    return report;
}

/**
 * Main function to run the analysis
 */
function main() {
    console.log('Starting ninja system analysis...');
    
    // Find all files to search
    let allFiles = [];
    for (const dir of SEARCH_DIRS) {
        console.log(`Searching directory: ${dir}`);
        allFiles = allFiles.concat(findFiles(dir, FILE_EXTENSIONS));
    }
    
    console.log(`Found ${allFiles.length} files to analyze`);
    
    // Filter files that contain ninja keywords
    const ninjaFiles = allFiles.filter(file => fileContainsKeywords(file, NINJA_KEYWORDS));
    
    console.log(`Found ${ninjaFiles.length} files with ninja references`);
    
    // Extract information from each file
    ninjaFiles.forEach(file => {
        console.log(`Processing: ${file}`);
        extractNinjaInfo(file, NINJA_KEYWORDS);
    });
    
    // Generate and save the report
    const report = generateReport();
    const reportPath = path.join('AI_GUIDELINES', 'NINJA_SYSTEM_ANALYSIS.md');
    
    fs.writeFileSync(reportPath, report, 'utf8');
    
    console.log(`Analysis complete! Report saved to: ${reportPath}`);
    console.log('Summary:');
    console.log(`- Ninja Characters: ${results.ninjaCharacters.length}`);
    console.log(`- Ninja Items: ${results.ninjaItems.length}`);
    console.log(`- Ninja Encounters: ${results.ninjaEncounters.length}`);
    console.log(`- Ninja Locations: ${results.ninjaLocations.length}`);
    console.log(`- Ninja Skills: ${results.ninjaSkills.length}`);
    console.log(`- Ninja Quests: ${results.ninjaQuests.length}`);
    console.log(`- Ninja Dialogue: ${results.ninjaDialogue.length}`);
    console.log(`- Other References: ${results.otherReferences.length}`);
}

// Run the analysis
main();
