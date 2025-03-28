#!/usr/bin/env node
/**
 * dictionary_cli.js - Command-line interface for dictionary operations
 * 
 * This script provides a command-line interface for working with the
 * MegaEarth2049 dictionary and thesaurus files using the dictionary_processor.js utility.
 * 
 * Usage:
 *   node dictionary_cli.js <command> [options]
 * 
 * Commands:
 *   search <term>                - Search for a term in both dictionary and thesaurus
 *   extract-terms                - Extract all terms from the dictionary
 *   extract-corporate            - Extract all corporate entities from the thesaurus
 *   generate-toc                 - Generate a table of contents for the dictionary
 *   add-term <term> <def> <use>  - Add a new term to the dictionary
 *   combine                      - Generate a combined glossary
 *   extract-category <category>  - Extract terms from a specific category
 */

const DictionaryProcessor = require('./dictionary_processor');
const path = require('path');

// Parse command-line arguments
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
    printUsage();
    process.exit(1);
}

// Process commands
switch (command) {
    case 'search':
        if (!args[1]) {
            console.error('Error: No search term provided');
            printUsage();
            process.exit(1);
        }
        searchTerm(args[1]);
        break;
        
    case 'extract-terms':
        extractTerms();
        break;
        
    case 'extract-corporate':
        extractCorporateEntities();
        break;
        
    case 'generate-toc':
        generateTableOfContents();
        break;
        
    case 'add-term':
        if (args.length < 4) {
            console.error('Error: Missing arguments for add-term command');
            printUsage();
            process.exit(1);
        }
        addTerm(args[1], args[2], args[3]);
        break;
        
    case 'combine':
        generateCombinedGlossary();
        break;
        
    case 'extract-category':
        if (!args[1]) {
            console.error('Error: No category provided');
            printUsage();
            process.exit(1);
        }
        extractCategory(args[1]);
        break;
        
    default:
        console.error(`Error: Unknown command '${command}'`);
        printUsage();
        process.exit(1);
}

/**
 * Print usage information
 */
function printUsage() {
    console.log(`
Dictionary CLI - Command-line interface for MegaEarth2049 dictionary operations

Usage:
  node dictionary_cli.js <command> [options]

Commands:
  search <term>                - Search for a term in both dictionary and thesaurus
  extract-terms                - Extract all terms from the dictionary
  extract-corporate            - Extract all corporate entities from the thesaurus
  generate-toc                 - Generate a table of contents for the dictionary
  add-term <term> <def> <use>  - Add a new term to the dictionary
  combine                      - Generate a combined glossary
  extract-category <category>  - Extract terms from a specific category (e.g., "A", "B", etc.)

Examples:
  node dictionary_cli.js search "corporate"
  node dictionary_cli.js extract-terms
  node dictionary_cli.js add-term "New Term" "Definition of the new term" "Example usage of the new term"
  node dictionary_cli.js extract-category "A"
`);
}

/**
 * Search for a term in both dictionary and thesaurus
 * @param {string} term - Term to search for
 */
function searchTerm(term) {
    console.log(`Searching for "${term}" in dictionary and thesaurus...`);
    
    const results = DictionaryProcessor.searchTerm(term);
    
    console.log(`\nFound ${results.dictionary.length} matches in dictionary:`);
    results.dictionary.forEach(match => {
        console.log(`  Line ${match.line}: ${match.text}`);
    });
    
    console.log(`\nFound ${results.thesaurus.length} matches in thesaurus:`);
    results.thesaurus.forEach(match => {
        console.log(`  Line ${match.line}: ${match.text}`);
    });
}

/**
 * Extract all terms from the dictionary
 */
function extractTerms() {
    console.log('Extracting terms from dictionary...');
    
    const terms = DictionaryProcessor.extractDictionaryTerms();
    
    console.log(`\nFound ${terms.length} terms:`);
    terms.forEach(term => {
        console.log(`  ${term.term}: ${term.definition.substring(0, 60)}${term.definition.length > 60 ? '...' : ''}`);
    });
}

/**
 * Extract all corporate entities from the thesaurus
 */
function extractCorporateEntities() {
    console.log('Extracting corporate entities from thesaurus...');
    
    const entities = DictionaryProcessor.extractCorporateEntities();
    
    console.log(`\nFound ${entities.length} corporate entities:`);
    entities.forEach(entity => {
        console.log(`  ${entity}`);
    });
}

/**
 * Generate a table of contents for the dictionary
 */
function generateTableOfContents() {
    console.log('Generating table of contents for dictionary...');
    
    const toc = DictionaryProcessor.generateDictionaryTOC();
    
    console.log('\nTable of Contents:');
    console.log(toc);
}

/**
 * Add a new term to the dictionary
 * @param {string} term - Term to add
 * @param {string} definition - Definition of the term
 * @param {string} usage - Example usage of the term
 */
function addTerm(term, definition, usage) {
    console.log(`Adding new term "${term}" to dictionary...`);
    
    const success = DictionaryProcessor.addTermToDictionary(term, definition, usage);
    
    if (success) {
        console.log(`\nTerm "${term}" added successfully!`);
    } else {
        console.error(`\nFailed to add term "${term}"`);
    }
}

/**
 * Generate a combined glossary from dictionary and thesaurus
 */
function generateCombinedGlossary() {
    console.log('Generating combined glossary...');
    
    const outputPath = path.join(__dirname, '..', 'DICTIONARY', 'COMBINED_GLOSSARY.md');
    const success = DictionaryProcessor.generateCombinedGlossary(outputPath);
    
    if (success) {
        console.log(`\nCombined glossary generated successfully at ${outputPath}`);
    } else {
        console.error('\nFailed to generate combined glossary');
    }
}

/**
 * Extract terms from a specific category
 * @param {string} category - Category to extract terms from
 */
function extractCategory(category) {
    console.log(`Extracting terms from category "${category}"...`);
    
    const terms = DictionaryProcessor.extractTermsByCategory(category);
    
    console.log(`\nFound ${terms.length} terms in category "${category}":`);
    terms.forEach(term => {
        console.log(`  ${term.term}: ${term.definition.substring(0, 60)}${term.definition.length > 60 ? '...' : ''}`);
    });
}
