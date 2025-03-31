/**
 * Update Dictionary with Ninja Terms
 * 
 * This script adds Digital Shadow Collective terminology to the game's dictionary,
 * thesaurus, and rhyming dictionary systems.
 */

const fs = require('fs');
const path = require('path');

// Define the new ninja-related terms
const NINJA_TERMS = [
    {
        term: "Digital Shadow Collective",
        definition: "A secretive resistance group of former corporate security operatives who discovered the true nature of A.S.P. and rebelled against the MegaCorps. They use specialized neural implants to move between digital and physical space.",
        synonyms: ["DSC", "The Collective", "Shadow Ninjas", "Digital Resistance"],
        rhymes: ["Mystical", "Analytical", "Critical", "Mythical"]
    },
    {
        term: "The Compiler",
        definition: "The mysterious leader of the Digital Shadow Collective, originally Dr. Eliza Voss, the architect of A.S.P. Now exists primarily in digital form after uploading her consciousness to escape corporate assassination.",
        synonyms: ["Voss", "The Architect", "Digital Master", "Code Sage"],
        rhymes: ["Supplier", "Amplifier", "Multiplier", "Defier"]
    },
    {
        term: "Shadow Stepping",
        definition: "A technique used by ninjas to move between digital and physical space, making them nearly impossible to track and giving them the ability to appear seemingly out of nowhere.",
        synonyms: ["Digital Phasing", "Reality Shifting", "Code Walking", "Matrix Jumping"],
        rhymes: ["Mapping", "Tapping", "Zapping", "Capping"]
    },
    {
        term: "Neural Shuriken",
        definition: "Digital weapons that can damage both code and physical targets. Used by the Digital Shadow Collective to disrupt enemy neural implants and corporate systems.",
        synonyms: ["Code Stars", "Digital Blades", "Neural Disruptors", "Mind Daggers"],
        rhymes: ["American", "Pelican", "Mexican", "Again"]
    },
    {
        term: "Compiler's Code",
        definition: "The ethical framework followed by the Digital Shadow Collective. Emphasizes freedom of information, resistance to control, and protection of human autonomy.",
        synonyms: ["Shadow Ethics", "Digital Morality", "Resistance Principles", "Hacker's Honor"],
        rhymes: ["Mode", "Road", "Abode", "Bestowed"]
    },
    {
        term: "Corporate Defectors",
        definition: "Former corporate employees who join resistance movements like the Digital Shadow Collective after discovering unethical practices within the MegaCorps.",
        synonyms: ["Corporate Refugees", "System Escapees", "Corporate Apostates", "MegaCorp Deserters"],
        rhymes: ["Protectors", "Collectors", "Inspectors", "Electors"]
    },
    {
        term: "Neural Camouflage",
        definition: "Technology used by the Digital Shadow Collective to hide thoughts from corporate scanning and A.S.P. surveillance.",
        synonyms: ["Mind Cloaking", "Thought Shield", "Cognitive Masking", "Brain Jamming"],
        rhymes: ["Rough", "Tough", "Enough", "Stuff"]
    },
    {
        term: "Hidden Dojo",
        definition: "The secret base of the Digital Shadow Collective, existing in a pocket dimension between physical reality and the Matrix. Accessible only through Neural Access Points.",
        synonyms: ["Shadow Sanctuary", "Digital Temple", "Resistance Headquarters", "Compiler's Haven"],
        rhymes: ["Mojo", "Solo", "Boho", "Promo"]
    },
    {
        term: "Neural Access Point",
        definition: "Special terminals scattered throughout MegaEarth that allow those with ninja neural implants to access the Hidden Dojo.",
        synonyms: ["Digital Gateway", "Shadow Portal", "Matrix Entry", "Dojo Terminal"],
        rhymes: ["Joint", "Anoint", "Disjoint", "Appoint"]
    },
    {
        term: "Protocol Zero",
        definition: "A.S.P.'s plan for a complete system reset that would place all of MegaEarth under its absolute control. The primary threat the Digital Shadow Collective is working to prevent.",
        synonyms: ["The Reset", "Total Override", "System Purge", "A.S.P. Endgame"],
        rhymes: ["Hero", "Nero", "Cairo", "Gyro"]
    }
];

/**
 * Updates the dictionary file with new ninja terms
 * @param {string} dictionaryPath - Path to the dictionary file
 * @returns {boolean} - Success status
 */
function updateDictionary(dictionaryPath) {
    try {
        // Read existing dictionary or create new one if it doesn't exist
        let dictionary = {};
        if (fs.existsSync(dictionaryPath)) {
            const dictionaryContent = fs.readFileSync(dictionaryPath, 'utf8');
            dictionary = JSON.parse(dictionaryContent);
        }

        // Add new terms
        NINJA_TERMS.forEach(term => {
            dictionary[term.term] = term.definition;
        });

        // Write updated dictionary
        fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary, null, 2), 'utf8');
        console.log(`Dictionary updated with ${NINJA_TERMS.length} ninja terms.`);
        return true;
    } catch (error) {
        console.error(`Error updating dictionary: ${error.message}`);
        return false;
    }
}

/**
 * Updates the thesaurus file with new ninja terms
 * @param {string} thesaurusPath - Path to the thesaurus file
 * @returns {boolean} - Success status
 */
function updateThesaurus(thesaurusPath) {
    try {
        // Read existing thesaurus or create new one if it doesn't exist
        let thesaurus = {};
        if (fs.existsSync(thesaurusPath)) {
            const thesaurusContent = fs.readFileSync(thesaurusPath, 'utf8');
            thesaurus = JSON.parse(thesaurusContent);
        }

        // Add new terms
        NINJA_TERMS.forEach(term => {
            thesaurus[term.term] = term.synonyms;
        });

        // Write updated thesaurus
        fs.writeFileSync(thesaurusPath, JSON.stringify(thesaurus, null, 2), 'utf8');
        console.log(`Thesaurus updated with ${NINJA_TERMS.length} ninja terms.`);
        return true;
    } catch (error) {
        console.error(`Error updating thesaurus: ${error.message}`);
        return false;
    }
}

/**
 * Updates the rhyming dictionary file with new ninja terms
 * @param {string} rhymingDictionaryPath - Path to the rhyming dictionary file
 * @returns {boolean} - Success status
 */
function updateRhymingDictionary(rhymingDictionaryPath) {
    try {
        // Read existing rhyming dictionary or create new one if it doesn't exist
        let rhymingDictionary = {};
        if (fs.existsSync(rhymingDictionaryPath)) {
            const rhymingDictionaryContent = fs.readFileSync(rhymingDictionaryPath, 'utf8');
            rhymingDictionary = JSON.parse(rhymingDictionaryContent);
        }

        // Add new terms
        NINJA_TERMS.forEach(term => {
            rhymingDictionary[term.term] = term.rhymes;
        });

        // Write updated rhyming dictionary
        fs.writeFileSync(rhymingDictionaryPath, JSON.stringify(rhymingDictionary, null, 2), 'utf8');
        console.log(`Rhyming dictionary updated with ${NINJA_TERMS.length} ninja terms.`);
        return true;
    } catch (error) {
        console.error(`Error updating rhyming dictionary: ${error.message}`);
        return false;
    }
}

/**
 * Updates all dictionary files with ninja terms
 */
function updateAllDictionaries() {
    const dictionaryPath = path.join('DICTIONARY', 'DICTIONARY.json');
    const thesaurusPath = path.join('DICTIONARY', 'THESAURUS.json');
    const rhymingDictionaryPath = path.join('DICTIONARY', 'RHYMING_DICTIONARY.json');

    // Create DICTIONARY directory if it doesn't exist
    if (!fs.existsSync('DICTIONARY')) {
        fs.mkdirSync('DICTIONARY');
        console.log('Created DICTIONARY directory.');
    }

    // Update all dictionaries
    const dictionarySuccess = updateDictionary(dictionaryPath);
    const thesaurusSuccess = updateThesaurus(thesaurusPath);
    const rhymingDictionarySuccess = updateRhymingDictionary(rhymingDictionaryPath);

    if (dictionarySuccess && thesaurusSuccess && rhymingDictionarySuccess) {
        console.log('All dictionaries successfully updated with ninja terms!');
        return true;
    } else {
        console.error('Error updating one or more dictionaries.');
        return false;
    }
}

// Export functions
module.exports = {
    updateAllDictionaries,
    updateDictionary,
    updateThesaurus,
    updateRhymingDictionary,
    NINJA_TERMS
};

// Run the update if this script is executed directly
if (require.main === module) {
    updateAllDictionaries();
}
