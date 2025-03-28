/**
 * apply_enhanced_dialogue.js
 * 
 * This script applies the enhanced NPC dialogue from enhanced_quest_helper_npcs.js
 * to the game by replacing the original quest_helper_npcs.js file.
 * 
 * It also provides functions to enhance other NPC dialogue using terms from
 * the MegaEarth2049 dictionary, thesaurus, and rhyming dictionary.
 */

const fs = require('fs');
const path = require('path');

// Paths
const ENHANCED_DIALOGUE_PATH = path.join(__dirname, 'enhanced_quest_helper_npcs.js');
const QUEST_HELPER_NPCS_PATH = path.join(__dirname, '..', 'quest_helper_npcs.js');
const DICTIONARY_PATH = path.join(__dirname, '..', 'DICTIONARY', 'DICTIONARY.md');
const THESAURUS_PATH = path.join(__dirname, '..', 'DICTIONARY', 'THESAURUS.md');
const RHYMING_DICTIONARY_PATH = path.join(__dirname, '..', 'DICTIONARY', 'RHYMING_DICTIONARY.md');

/**
 * Apply enhanced dialogue to quest helper NPCs
 */
function applyEnhancedQuestHelperDialogue() {
    try {
        // Check if enhanced dialogue file exists
        if (!fs.existsSync(ENHANCED_DIALOGUE_PATH)) {
            console.error('Enhanced dialogue file not found:', ENHANCED_DIALOGUE_PATH);
            return false;
        }

        // Read enhanced dialogue
        const enhancedDialogue = fs.readFileSync(ENHANCED_DIALOGUE_PATH, 'utf8');

        // Create backup of original file if it exists
        if (fs.existsSync(QUEST_HELPER_NPCS_PATH)) {
            const backupPath = `${QUEST_HELPER_NPCS_PATH}.bak`;
            fs.copyFileSync(QUEST_HELPER_NPCS_PATH, backupPath);
            console.log('Created backup of original file:', backupPath);
        }

        // Write enhanced dialogue to quest helper NPCs file
        fs.writeFileSync(QUEST_HELPER_NPCS_PATH, enhancedDialogue);
        console.log('Successfully applied enhanced dialogue to quest helper NPCs');
        return true;
    } catch (error) {
        console.error('Error applying enhanced dialogue:', error);
        return false;
    }
}

/**
 * Load dictionary terms from DICTIONARY.md
 * @returns {Object} Dictionary terms with definitions and usage examples
 */
function loadDictionaryTerms() {
    try {
        if (!fs.existsSync(DICTIONARY_PATH)) {
            console.error('Dictionary file not found:', DICTIONARY_PATH);
            return {};
        }

        const dictionaryContent = fs.readFileSync(DICTIONARY_PATH, 'utf8');
        const terms = {};

        // Extract terms, definitions, and usage examples using regex
        const termRegex = /\*\*(.*?)\*\*\s*\n\s*-\s*\*Definition\*\s*:\s*(.*?)\s*\n\s*-\s*\*Usage\*\s*:\s*"(.*?)"/g;
        let match;

        while ((match = termRegex.exec(dictionaryContent)) !== null) {
            const term = match[1].trim();
            const definition = match[2].trim();
            const usage = match[3].trim();

            terms[term] = {
                definition,
                usage
            };
        }

        console.log(`Loaded ${Object.keys(terms).length} dictionary terms`);
        return terms;
    } catch (error) {
        console.error('Error loading dictionary terms:', error);
        return {};
    }
}

/**
 * Load rhyming patterns from RHYMING_DICTIONARY.md
 * @returns {Object} Rhyming patterns with example verses
 */
function loadRhymingPatterns() {
    try {
        if (!fs.existsSync(RHYMING_DICTIONARY_PATH)) {
            console.error('Rhyming dictionary file not found:', RHYMING_DICTIONARY_PATH);
            return {};
        }

        const rhymingContent = fs.readFileSync(RHYMING_DICTIONARY_PATH, 'utf8');
        const patterns = {};

        // Extract rhyming patterns and example verses using regex
        const patternRegex = /### -(.*?) Rhymes\s*\n\s*\*\*(.*?)\*\*\s*\n\s*\*Example Verse:\*\s*\n```\s*([\s\S]*?)```/g;
        let match;

        while ((match = patternRegex.exec(rhymingContent)) !== null) {
            const pattern = match[1].trim();
            const terms = match[2].trim().split(', ');
            const exampleVerse = match[3].trim();

            patterns[pattern] = {
                terms,
                exampleVerse
            };
        }

        console.log(`Loaded ${Object.keys(patterns).length} rhyming patterns`);
        return patterns;
    } catch (error) {
        console.error('Error loading rhyming patterns:', error);
        return {};
    }
}

/**
 * Enhance dialogue using dictionary terms and rhyming patterns
 * @param {string} originalDialogue - Original dialogue to enhance
 * @param {Object} dictionaryTerms - Dictionary terms with definitions and usage examples
 * @param {Object} rhymingPatterns - Rhyming patterns with example verses
 * @returns {string} Enhanced dialogue
 */
function enhanceDialogue(originalDialogue, dictionaryTerms, rhymingPatterns) {
    // Get dictionary terms as an array
    const terms = Object.keys(dictionaryTerms);
    
    // Get all rhyming terms
    const rhymingTerms = [];
    for (const pattern in rhymingPatterns) {
        rhymingTerms.push(...rhymingPatterns[pattern].terms);
    }
    
    // Common wasteland slang phrases
    const slangPhrases = [
        "you poor salty bastard",
        "faster than a Glitch Witch can hack a corporate database",
        "more irradiated than a Vitalix test subject",
        "like a Trash Octopus with a new fixation",
        "more heavily guarded than a Quantum Jumper's timeline paradox",
        "more reliable than Friendbook Dynamics' privacy policy",
        "more secret passages than a Junk Monk has philosophical contradictions"
    ];
    
    // Corporate jargon phrases
    const corporateJargon = [
        "Synergy Initiative Paradigm Shift",
        "rigorous quality assurance protocols",
        "optimizing stakeholder value",
        "leveraging core competencies",
        "strategic resource allocation"
    ];
    
    // Replace simple terms with more colorful wasteland terminology
    let enhancedDialogue = originalDialogue;
    
    // Add dictionary terms (randomly select 2-3 terms to incorporate)
    const numTermsToAdd = Math.floor(Math.random() * 2) + 2; // 2-3 terms
    const selectedTerms = [];
    
    for (let i = 0; i < numTermsToAdd; i++) {
        const randomIndex = Math.floor(Math.random() * terms.length);
        const term = terms[randomIndex];
        
        if (!selectedTerms.includes(term)) {
            selectedTerms.push(term);
        }
    }
    
    // Add slang phrases (randomly select 1-2 phrases)
    const numSlangToAdd = Math.floor(Math.random() * 2) + 1; // 1-2 phrases
    const selectedSlang = [];
    
    for (let i = 0; i < numSlangToAdd; i++) {
        const randomIndex = Math.floor(Math.random() * slangPhrases.length);
        const slang = slangPhrases[randomIndex];
        
        if (!selectedSlang.includes(slang)) {
            selectedSlang.push(slang);
        }
    }
    
    // Add corporate jargon (randomly select 0-1 phrases)
    const numJargonToAdd = Math.floor(Math.random() * 2); // 0-1 phrases
    const selectedJargon = [];
    
    for (let i = 0; i < numJargonToAdd; i++) {
        const randomIndex = Math.floor(Math.random() * corporateJargon.length);
        const jargon = corporateJargon[randomIndex];
        
        if (!selectedJargon.includes(jargon)) {
            selectedJargon.push(jargon);
        }
    }
    
    // Combine all selected terms and phrases
    const allSelected = [...selectedTerms, ...selectedSlang, ...selectedJargon];
    
    // Generate enhanced dialogue by incorporating selected terms and phrases
    // This is a simplified approach - a more sophisticated implementation would
    // analyze the original dialogue and make contextually appropriate replacements
    let enhancedLines = originalDialogue.split('\n');
    
    for (let i = 0; i < enhancedLines.length; i++) {
        if (allSelected.length > 0 && enhancedLines[i].trim().length > 0) {
            const randomIndex = Math.floor(Math.random() * allSelected.length);
            const termToAdd = allSelected[randomIndex];
            
            // Remove the used term/phrase
            allSelected.splice(randomIndex, 1);
            
            // Add the term/phrase to the dialogue line
            if (corporateJargon.includes(termToAdd)) {
                // For corporate jargon, add it as a quoted phrase
                enhancedLines[i] = enhancedLines[i].replace(/\.$/, ` with their "${termToAdd}".`);
            } else if (slangPhrases.includes(termToAdd)) {
                // For slang phrases, add them with appropriate connecting words
                enhancedLines[i] = enhancedLines[i].replace(/\.$/, `, ${termToAdd}.`);
            } else {
                // For dictionary terms, try to incorporate them naturally
                if (enhancedLines[i].includes('?')) {
                    // If the line is a question, add the term after the question
                    enhancedLines[i] = enhancedLines[i].replace(/\?/, `? Ever heard of ${termToAdd}?`);
                } else {
                    // Otherwise, try to add it as a reference
                    enhancedLines[i] = enhancedLines[i].replace(/\.$/, `. It's like ${termToAdd} all over again.`);
                }
            }
        }
    }
    
    return enhancedLines.join('\n');
}

/**
 * Main function to apply enhanced dialogue
 */
function main() {
    console.log('Applying enhanced dialogue to quest helper NPCs...');
    const success = applyEnhancedQuestHelperDialogue();
    
    if (success) {
        console.log('Enhanced dialogue applied successfully!');
        console.log('');
        console.log('To enhance other NPC dialogue, you can use the following functions:');
        console.log('- loadDictionaryTerms(): Load dictionary terms from DICTIONARY.md');
        console.log('- loadRhymingPatterns(): Load rhyming patterns from RHYMING_DICTIONARY.md');
        console.log('- enhanceDialogue(originalDialogue, dictionaryTerms, rhymingPatterns): Enhance dialogue using dictionary terms and rhyming patterns');
        console.log('');
        console.log('Example usage:');
        console.log('const dictionaryTerms = loadDictionaryTerms();');
        console.log('const rhymingPatterns = loadRhymingPatterns();');
        console.log('const originalDialogue = "Hello, traveler. I have some items for sale.";');
        console.log('const enhancedDialogue = enhanceDialogue(originalDialogue, dictionaryTerms, rhymingPatterns);');
        console.log('console.log(enhancedDialogue);');
    } else {
        console.error('Failed to apply enhanced dialogue');
    }
}

// Run the main function if this script is executed directly
if (require.main === module) {
    main();
}

// Export functions for use in other scripts
module.exports = {
    applyEnhancedQuestHelperDialogue,
    loadDictionaryTerms,
    loadRhymingPatterns,
    enhanceDialogue
};
