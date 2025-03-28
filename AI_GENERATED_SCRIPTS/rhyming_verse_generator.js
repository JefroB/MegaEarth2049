/**
 * rhyming_verse_generator.js - Utility for generating verses using the MegaEarth 2049 Rhyming Dictionary
 * 
 * This script demonstrates how to use the rhyming dictionary to generate random verses
 * in the style of wasteland poetry, using terms from the MegaEarth 2049 universe.
 */

const MarkdownUtils = require('./md_utils');
const path = require('path');
const fs = require('fs');

// Path to the rhyming dictionary
const RHYMING_DICT_PATH = path.join(__dirname, '..', 'DICTIONARY', 'RHYMING_DICTIONARY.md');

/**
 * Main class for rhyming verse generation
 */
class RhymingVerseGenerator {
    /**
     * Extract rhyming groups from the rhyming dictionary
     * @returns {Object} - Object containing rhyming groups organized by pattern
     */
    static extractRhymingGroups() {
        const content = MarkdownUtils.readMarkdownFile(RHYMING_DICT_PATH);
        if (!content) {
            console.error('Failed to read rhyming dictionary file');
            return {};
        }
        
        const sections = MarkdownUtils.extractSections(content);
        const rhymingGroups = {};
        
        for (const section of sections) {
            // Look for section headers that contain "Rhymes"
            if (section.title && section.title.includes('Rhymes')) {
                const pattern = section.title.split(' ')[0]; // Extract the rhyming pattern (e.g., "-ech")
                
                // Extract the terms from the section
                const termsMatch = section.content.match(/\*\*(.*?)\*\*/);
                if (termsMatch) {
                    const terms = termsMatch[1].split(', ');
                    rhymingGroups[pattern] = terms;
                }
            }
        }
        
        return rhymingGroups;
    }
    
    /**
     * Extract example verses from the rhyming dictionary
     * @returns {Object} - Object containing example verses organized by pattern
     */
    static extractExampleVerses() {
        const content = MarkdownUtils.readMarkdownFile(RHYMING_DICT_PATH);
        if (!content) {
            console.error('Failed to read rhyming dictionary file');
            return {};
        }
        
        const sections = MarkdownUtils.extractSections(content);
        const exampleVerses = {};
        
        for (const section of sections) {
            // Look for section headers that contain "Rhymes"
            if (section.title && section.title.includes('Rhymes')) {
                const pattern = section.title.split(' ')[0]; // Extract the rhyming pattern
                
                // Extract the example verse from the section
                const verseMatch = section.content.match(/\*Example Verse:\*\s*```\s*([\s\S]*?)```/);
                if (verseMatch) {
                    exampleVerses[pattern] = verseMatch[1].trim();
                }
            }
        }
        
        return exampleVerses;
    }
    
    /**
     * Extract poetry forms from the rhyming dictionary
     * @returns {Object} - Object containing poetry forms
     */
    static extractPoetryForms() {
        const content = MarkdownUtils.readMarkdownFile(RHYMING_DICT_PATH);
        if (!content) {
            console.error('Failed to read rhyming dictionary file');
            return {};
        }
        
        const sections = MarkdownUtils.extractSections(content);
        const poetryForms = {};
        
        // Find the "Wasteland Poetry Forms" section
        const poetryFormsSection = sections.find(section => section.title && section.title.includes('Wasteland Poetry Forms'));
        if (!poetryFormsSection) {
            return poetryForms;
        }
        
        // Add the poetry forms manually since the extraction is complex
        poetryForms['The Corporate Haiku'] = {
            description: 'A 5-7-5 syllable poem that captures the essence of corporate dystopia',
            example: 'OmniCorp watching\nBrain Stapler ready to fire\nThought Crime detected'
        };
        
        poetryForms['The Wasteland Sonnet'] = {
            description: 'A 14-line poem with a rhyme scheme that explores the beauty in devastation',
            example: 'Among the ruins of a world long dead,\nWhere Experimental Fluid pools like rain,\nA Trash Octopus makes its humble bed,\nFinding purpose in what others disdain.\n\nThe Corporate Zones loom tall against the sky,\nTheir gleaming walls a promise and a threat.\nOutside their bounds, the Waste Wizards get by,\nTransforming garbage into gold, and yet\n\nThe Glitch Witch works her technological spells,\nThe Gunk Punk creates art from toxic waste,\nThe Sewer Sommelier somehow excels\nAt finding food with surprisingly good taste.\n\nIn this broken world of corporate design,\nThe human spirit somehow still shines fine.'
        };
        
        poetryForms['The Apocalypse Rap Battle'] = {
            description: 'A form where two wasteland characters trade increasingly devastating rhymes',
            example: 'CORPORATE DRONE:\nI got the Corporate Access Card, level nine,\nClean water, filtered air, everything\'s fine.\nYou\'re just a Gunk Punk living in waste,\nWhile I got Liquid Courage to help me save face.\n\nWASTE WIZARD:\nYour Chemical Leash keeps you locked in place,\nThat Corporate Drone life is a total disgrace.\nI transform trash into tools with my hands,\nWhile you\'re just a puppet to corporate demands.'
        };
        
        return poetryForms;
    }
    
    /**
     * Generate a random verse using a specific rhyming pattern
     * @param {string} pattern - Rhyming pattern to use (e.g., "-ech", "-orp")
     * @returns {string} - Generated verse
     */
    static generateVerse(pattern) {
        const rhymingGroups = this.extractRhymingGroups();
        const exampleVerses = this.extractExampleVerses();
        
        if (!rhymingGroups[pattern]) {
            console.error(`Unknown rhyming pattern: ${pattern}`);
            return '';
        }
        
        // Get the example verse structure
        const exampleVerse = exampleVerses[pattern];
        if (!exampleVerse) {
            console.error(`No example verse found for pattern: ${pattern}`);
            return '';
        }
        
        // Count the number of lines in the example verse
        const lineCount = exampleVerse.split('\n').length;
        
        // Generate a new verse with the same structure but random terms
        let newVerse = '';
        const terms = rhymingGroups[pattern];
        
        // Create a simple verse with random terms from the rhyming group
        for (let i = 0; i < lineCount; i++) {
            // Randomly select a term from the rhyming group
            const term = terms[Math.floor(Math.random() * terms.length)];
            
            // Create a line using the term
            const templates = [
                `The ${term} looms over the wasteland horizon`,
                `I encountered a ${term} in the ruins`,
                `Beware the ${term} lurking in shadows`,
                `My life was changed by the ${term}`,
                `They say the ${term} holds ancient secrets`,
                `Don't trust anyone with a ${term}`,
                `Trading scrap metal for a ${term}`,
                `The ${term} offers salvation at a price`,
                `Rumors speak of a legendary ${term}`,
                `In Timbuc, the ${term} rules supreme`
            ];
            
            const line = templates[Math.floor(Math.random() * templates.length)];
            newVerse += line + '\n';
        }
        
        return newVerse.trim();
    }
    
    /**
     * Generate a random poem using a specific poetry form
     * @param {string} formName - Name of the poetry form to use
     * @returns {string} - Generated poem
     */
    static generatePoem(formName) {
        const poetryForms = this.extractPoetryForms();
        
        if (!poetryForms[formName]) {
            console.error(`Unknown poetry form: ${formName}`);
            return '';
        }
        
        const form = poetryForms[formName];
        
        // For now, just return a modified version of the example
        // In a more advanced implementation, this would generate a completely new poem
        // following the rules of the specific form
        
        if (formName === 'The Corporate Haiku') {
            // Generate a 5-7-5 haiku
            const corporations = ['OmniCorp', 'NeuraTech', 'Vitalix', 'Armatek', 'Quantum Dynamics'];
            const threats = ['Brain Stapler', 'Chemical Leash', 'Neural Puppets', 'Thought Crime', 'Reality Rewrite'];
            const consequences = ['freedom lost', 'mind controlled', 'soul corrupted', 'will subverted', 'identity erased'];
            
            const corp = corporations[Math.floor(Math.random() * corporations.length)];
            const threat = threats[Math.floor(Math.random() * threats.length)];
            const consequence = consequences[Math.floor(Math.random() * consequences.length)];
            
            return `${corp} watching\n${threat} ready to strike\n${consequence}`;
        } else if (formName === 'The Apocalypse Rap Battle') {
            // Generate a simple rap battle
            const characters = [
                { name: 'Corporate Drone', lines: [
                    'I got the access and the power, you\'re just waste',
                    'Living in luxury while you scavenge and scrape',
                    'My corporate masters keep me safe and well-fed',
                    'While you\'re out there barely keeping yourself from dead'
                ]},
                { name: 'Waste Wizard', lines: [
                    'Your so-called freedom is a corporate lie',
                    'You\'re just a puppet with invisible strings, don\'t deny',
                    'I make treasures from trash with my own two hands',
                    'While you\'re a slave to your masters\' demands'
                ]}
            ];
            
            let battle = '';
            for (const character of characters) {
                battle += `${character.name.toUpperCase()}:\n`;
                battle += character.lines[Math.floor(Math.random() * character.lines.length)] + '\n';
                battle += character.lines[Math.floor(Math.random() * character.lines.length)] + '\n\n';
            }
            
            return battle.trim();
        } else {
            // For other forms, return a message
            return `Generation of ${formName} is not yet implemented.\n\nExample:\n${form.example}`;
        }
    }
    
    /**
     * List all available rhyming patterns
     * @returns {Array<string>} - Array of rhyming patterns
     */
    static listRhymingPatterns() {
        return Object.keys(this.extractRhymingGroups());
    }
    
    /**
     * List all available poetry forms
     * @returns {Array<string>} - Array of poetry form names
     */
    static listPoetryForms() {
        return Object.keys(this.extractPoetryForms());
    }
}

// Example usage
if (require.main === module) {
    console.log('=== MegaEarth 2049 Rhyming Verse Generator ===\n');
    
    // List available rhyming patterns
    const patterns = RhymingVerseGenerator.listRhymingPatterns();
    console.log('Available rhyming patterns:');
    patterns.forEach(pattern => console.log(`  ${pattern}`));
    console.log();
    
    // Generate a verse using a random pattern
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    console.log(`Generating verse with pattern ${randomPattern}:\n`);
    const verse = RhymingVerseGenerator.generateVerse(randomPattern);
    console.log(verse);
    console.log();
    
    // List available poetry forms
    const forms = RhymingVerseGenerator.listPoetryForms();
    console.log('Available poetry forms:');
    forms.forEach(form => console.log(`  ${form}`));
    console.log();
    
    // Generate a poem using a random form
    const randomForm = forms[Math.floor(Math.random() * forms.length)];
    console.log(`Generating poem with form "${randomForm}":\n`);
    const poem = RhymingVerseGenerator.generatePoem(randomForm);
    console.log(poem);
}

module.exports = RhymingVerseGenerator;
