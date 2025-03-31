/**
 * Update Dictionary with Body Modification Terms
 * 
 * This script adds body modification terminology to the game's dictionary,
 * thesaurus, and rhyming dictionary systems.
 */

const fs = require('fs');
const path = require('path');

// Define the new body modification-related terms
const BODY_MOD_TERMS = [
    {
        term: "Body Modification",
        definition: "In MegaEarth 2049, the practice of altering one's body through cybernetic, biological, aesthetic, or experimental means. Unlike the clean corporate modifications of the elite, wasteland mods are characterized by their jury-rigged nature, unpredictable side effects, and the distinct possibility of malfunction.",
        synonyms: ["Bodmods", "Augmentation", "Enhancement", "Cybernetic Surgery", "Flesh Crafting"],
        rhymes: ["Odd Notification", "Squad Vocation", "RodPlication", "Mod Dedication"]
    },
    {
        term: "The Squeaky Clean",
        definition: "Zed's ironically-named body modification clinic in Timbuc. A paradoxical mix of cutting-edge technology and absolute squalor, where operating tables sit next to piles of salvaged parts and experimental serums bubble in beakers next to open cans of beer.",
        synonyms: ["Zed's Clinic", "The Chop Shop", "Meat Garage", "Mod Parlor", "The Butcher's Block"],
        rhymes: ["Freaky Scene", "Leaky Spleen", "Geeky Queen", "Sneaky Mean"]
    },
    {
        term: "Zed",
        definition: "MegaEarth's most notorious mod doctor, operating out of 'The Squeaky Clean' in Timbuc. A former Vitalix biotech researcher fired for 'excessive creativity' (corporate speak for 'horrifically unethical experimentation'), Zed now offers his services to anyone with enough credits or interesting trade goods.",
        synonyms: ["The Mod Doctor", "The Butcher", "The Flesh Artist", "The Augmentor", "Dr. Frankenstein"],
        rhymes: ["Dead", "Head", "Dread", "Instead"]
    },
    {
        term: "Cybernetic Modification",
        definition: "Mechanical enhancements that replace or augment body parts with technological components. Includes limb replacements, ocular implants, neural processors, subdermal armor, and weapon integrations.",
        synonyms: ["Cyberware", "Chrome", "Metal Mods", "Tech Implants", "Mechanical Augmentation"],
        rhymes: ["Synthetic Verification", "Kinetic Purification", "Magnetic Amplification", "Prophetic Identification"]
    },
    {
        term: "Biological Modification",
        definition: "Organic enhancements that alter the body's natural functions through genetic manipulation, grafting, or chemical treatments. Includes muscle grafts, organ upgrades, symbiotic organisms, genetic splicing, and chemical glands.",
        synonyms: ["Bioware", "Organic Mods", "Flesh Crafting", "Gene Mods", "Wetware"],
        rhymes: ["Logical Codification", "Ecological Ramification", "Psychological Gratification", "Methodological Simplification"]
    },
    {
        term: "Aesthetic Modification",
        definition: "Appearance-altering modifications that may also provide minor functional benefits. Includes dermal pigmentation, bioluminescence, structural alterations, decorative implants, and scarification.",
        synonyms: ["Cosmetic Mods", "Beauty Mods", "Vanity Augments", "Appearance Enhancements", "Surface Mods"],
        rhymes: ["Pathetic Mystification", "Prophetic Signification", "Sympathetic Versification", "Energetic Diversification"]
    },
    {
        term: "Experimental Modification",
        definition: "Highly unstable, unpredictable modifications with potentially powerful effects. Includes reality anchors, quantum uncertainties, dimensional pockets, temporal disruptors, and consciousness expanders.",
        synonyms: ["Prototype Mods", "Bleeding Edge Augments", "Mad Science Implants", "Unstable Enhancements", "Fringe Mods"],
        rhymes: ["Detrimental Edification", "Incremental Specification", "Fundamental Clarification", "Regimental Fortification"]
    },
    {
        term: "Mantis Blades",
        definition: "Popular cybernetic modification consisting of retractable blades installed in the forearms, allowing for devastating close-quarters combat capabilities.",
        synonyms: ["Forearm Blades", "Wrist Razors", "Retractable Claws", "Arm Swords", "Slash Augments"],
        rhymes: ["Mantis Raids", "Mantis Glades", "Mantis Shades", "Mantis Grades"]
    },
    {
        term: "Targeting Optics",
        definition: "Cybernetic eye replacements that increase ranged accuracy through enhanced zoom, trajectory calculation, and environmental factor analysis.",
        synonyms: ["Smart Eyes", "Sniper Optics", "Precision Visuals", "Aim Enhancers", "Tracking Eyes"],
        rhymes: ["Marketing Topics", "Sparking Tropics", "Barking Chronics", "Marking Comics"]
    },
    {
        term: "Neural Processor",
        definition: "Brain implant that enhances cognitive functions, provides HUD displays, and allows for direct interface with compatible technology.",
        synonyms: ["Brain Chip", "Cranial Computer", "Mind Enhancer", "Thought Accelerator", "Neuro-Interface"],
        rhymes: ["Plural Confessor", "Rural Aggressor", "Mural Successor", "Neural Assessor"]
    },
    {
        term: "Toxin Filters",
        definition: "Biological modification of the liver and kidneys that neutralizes poisons and environmental toxins, providing resistance to chemical attacks and contaminated consumables.",
        synonyms: ["Poison Scrubbers", "Detox Organs", "Chemical Neutralizers", "Purification System", "Cleansing Implants"],
        rhymes: ["Boxin' Sifters", "Foxin' Drifters", "Rockin' Lifters", "Stockin' Shifters"]
    },
    {
        term: "Dermal Hardening",
        definition: "Biological modification that toughens skin to provide natural armor, reducing damage from physical attacks and environmental hazards.",
        synonyms: ["Skin Plating", "Flesh Armor", "Epidermis Reinforcement", "Hide Toughening", "Dermal Shielding"],
        rhymes: ["Thermal Pardoning", "Vernal Gardening", "Eternal Hardening", "Internal Bargaining"]
    },
    {
        term: "Circuit Patterns",
        definition: "Aesthetic modification featuring glowing circuit-like patterns embedded under the skin, often connected to neural systems to display mood or system status.",
        synonyms: ["Tech Tattoos", "Glow Lines", "Neural Tracers", "Data Veins", "Light Paths"],
        rhymes: ["Flirt Patterns", "Alert Patterns", "Desert Patterns", "Convert Patterns"]
    },
    {
        term: "Probability Manipulator",
        definition: "Experimental modification that slightly increases luck at the cost of occasional reality glitches, altering probability fields around the user.",
        synonyms: ["Luck Engine", "Chance Shifter", "Fortune Tweaker", "Quantum Dice", "Reality Bender"],
        rhymes: ["Ability Manufacturer", "Stability Conjurer", "Agility Amateur", "Facility Challenger"]
    },
    {
        term: "The Prometheus Hand",
        definition: "Legendary cybernetic hand that can generate and control fire, originally designed for Armatek's elite demolition teams. Occasionally ignites objects the user touches when they're emotional.",
        synonyms: ["Fire Fist", "Flame Palm", "Ignition Appendage", "Pyro Hand", "Blaze Digits"],
        rhymes: ["Hippopotamus Stand", "Anonymous Brand", "Autonomous Land", "Synonymous Grand"]
    },
    {
        term: "Chameleon Skin",
        definition: "Legendary biological modification that allows near-perfect camouflage, developed by OmniCorp for covert operations. Sometimes activates involuntarily during moments of stress or fear.",
        synonyms: ["Adaptive Epidermis", "Camo Flesh", "Blending Dermis", "Stealth Skin", "Shifter Hide"],
        rhymes: ["Fameleon Win", "Gameleon Bin", "Nameleon Kin", "Frameleon Spin"]
    },
    {
        term: "Rejection",
        definition: "A common complication where the body rejects a modification, causing it to malfunction or require removal. More common with biological modifications than cybernetic ones.",
        synonyms: ["Mod Failure", "Implant Rejection", "Augment Incompatibility", "Body Revolt", "Enhancement Refusal"],
        rhymes: ["Dejection", "Objection", "Subjection", "Projection"]
    },
    {
        term: "Malfunction",
        definition: "When a body modification glitches, short-circuits, or otherwise fails at an inopportune moment. Can range from minor inconvenience to life-threatening failure.",
        synonyms: ["Mod Glitch", "System Failure", "Enhancement Error", "Augment Breakdown", "Implant Crash"],
        rhymes: ["Tall Function", "Wall Junction", "Small Suction", "Call Destruction"]
    },
    {
        term: "Mod Doctor",
        definition: "A specialist who installs, removes, and maintains body modifications. Ranges from corporate-trained professionals to self-taught wasteland surgeons with questionable methods.",
        synonyms: ["Augmentation Surgeon", "Chrome Jockey", "Flesh Engineer", "Enhancement Specialist", "Body Technician"],
        rhymes: ["Odd Proctor", "Rod Concocter", "Squad Doctor", "Fraud Locker"]
    },
    {
        term: "Mod Doctor Hotline",
        definition: "A special item that allows the user to call one of Zed's assistants for transportation to The Squeaky Clean from almost anywhere in MegaEarth.",
        synonyms: ["Zed's Beacon", "Clinic Caller", "Mod Taxi Service", "Emergency Extraction Device", "Augmentation Summoner"],
        rhymes: ["Odd Doctor Plotline", "Rod Proctor Dotline", "Squad Locker Hot Time", "Fraud Shocker Outline"]
    }
];

/**
 * Updates the dictionary file with new body modification terms
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
        BODY_MOD_TERMS.forEach(term => {
            dictionary[term.term] = term.definition;
        });

        // Write updated dictionary
        fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary, null, 2), 'utf8');
        console.log(`Dictionary updated with ${BODY_MOD_TERMS.length} body modification terms.`);
        return true;
    } catch (error) {
        console.error(`Error updating dictionary: ${error.message}`);
        return false;
    }
}

/**
 * Updates the thesaurus file with new body modification terms
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
        BODY_MOD_TERMS.forEach(term => {
            thesaurus[term.term] = term.synonyms;
        });

        // Write updated thesaurus
        fs.writeFileSync(thesaurusPath, JSON.stringify(thesaurus, null, 2), 'utf8');
        console.log(`Thesaurus updated with ${BODY_MOD_TERMS.length} body modification terms.`);
        return true;
    } catch (error) {
        console.error(`Error updating thesaurus: ${error.message}`);
        return false;
    }
}

/**
 * Updates the rhyming dictionary file with new body modification terms
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
        BODY_MOD_TERMS.forEach(term => {
            rhymingDictionary[term.term] = term.rhymes;
        });

        // Write updated rhyming dictionary
        fs.writeFileSync(rhymingDictionaryPath, JSON.stringify(rhymingDictionary, null, 2), 'utf8');
        console.log(`Rhyming dictionary updated with ${BODY_MOD_TERMS.length} body modification terms.`);
        return true;
    } catch (error) {
        console.error(`Error updating rhyming dictionary: ${error.message}`);
        return false;
    }
}

/**
 * Updates all dictionary files with body modification terms
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
        console.log('All dictionaries successfully updated with body modification terms!');
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
    BODY_MOD_TERMS
};

// Run the update if this script is executed directly
if (require.main === module) {
    updateAllDictionaries();
}
