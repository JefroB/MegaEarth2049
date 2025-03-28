/**
 * dictionary_test.js - Test script for dictionary utilities
 * 
 * This script demonstrates how to use the md_utils.js and dictionary_processor.js
 * utilities to work with the MegaEarth 2049 dictionary and thesaurus files.
 * 
 * Run this script with:
 *   node dictionary_test.js
 */

const MarkdownUtils = require('./md_utils');
const DictionaryProcessor = require('./dictionary_processor');
const path = require('path');

// Path to the dictionary directory
const DICTIONARY_DIR = path.join(__dirname, '..', 'DICTIONARY');
const DICTIONARY_PATH = path.join(DICTIONARY_DIR, 'DICTIONARY.md');
const THESAURUS_PATH = path.join(DICTIONARY_DIR, 'THESAURUS.md');

/**
 * Run tests for the md_utils.js utility
 */
function testMarkdownUtils() {
    console.log('=== Testing MarkdownUtils ===\n');
    
    // Test reading a Markdown file
    console.log('Reading dictionary file...');
    const dictionaryContent = MarkdownUtils.readMarkdownFile(DICTIONARY_PATH);
    console.log(`Dictionary file has ${dictionaryContent.length} characters\n`);
    
    // Test extracting headers
    console.log('Extracting headers from dictionary...');
    const headers = MarkdownUtils.extractHeaders(dictionaryContent);
    console.log(`Found ${headers.length} headers in dictionary`);
    console.log('First 5 headers:');
    headers.slice(0, 5).forEach(header => {
        console.log(`  Level ${header.level}: ${header.text}`);
    });
    console.log();
    
    // Test extracting sections
    console.log('Extracting sections from dictionary...');
    const sections = MarkdownUtils.extractSections(dictionaryContent);
    console.log(`Found ${sections.length} sections in dictionary`);
    console.log('First 3 sections:');
    sections.slice(0, 3).forEach(section => {
        console.log(`  ${section.title || 'Untitled'} (Level ${section.level}): ${section.content.substring(0, 50)}...`);
    });
    console.log();
    
    // Test extracting lists
    console.log('Extracting lists from dictionary...');
    const lists = MarkdownUtils.extractLists(dictionaryContent);
    console.log(`Found ${lists.length} lists in dictionary`);
    if (lists.length > 0) {
        console.log(`First list (${lists[0].type}) has ${lists[0].items.length} items`);
        console.log('First 3 items:');
        lists[0].items.slice(0, 3).forEach(item => {
            console.log(`  - ${item}`);
        });
    }
    console.log();
    
    // Test searching in Markdown
    const searchTerm = 'corporate';
    console.log(`Searching for "${searchTerm}" in dictionary...`);
    const searchResults = MarkdownUtils.searchInMarkdown(dictionaryContent, searchTerm);
    console.log(`Found ${searchResults.length} matches`);
    console.log('First 3 matches:');
    searchResults.slice(0, 3).forEach(match => {
        console.log(`  Line ${match.line}: ${match.text}`);
    });
    console.log();
    
    // Test generating table of contents
    console.log('Generating table of contents for dictionary...');
    const toc = MarkdownUtils.generateTableOfContents(dictionaryContent);
    console.log(`Generated table of contents with ${toc.split('\n').length} lines`);
    console.log('First 5 lines:');
    toc.split('\n').slice(0, 5).forEach(line => {
        console.log(`  ${line}`);
    });
    console.log();
}

/**
 * Run tests for the dictionary_processor.js utility
 */
function testDictionaryProcessor() {
    console.log('=== Testing DictionaryProcessor ===\n');
    
    // Test extracting dictionary terms
    console.log('Extracting terms from dictionary...');
    const terms = DictionaryProcessor.extractDictionaryTerms();
    console.log(`Found ${terms.length} terms in dictionary`);
    console.log('First 3 terms:');
    terms.slice(0, 3).forEach(term => {
        console.log(`  ${term.term}: ${term.definition.substring(0, 50)}...`);
    });
    console.log();
    
    // Test extracting thesaurus sections
    console.log('Extracting sections from thesaurus...');
    const sections = DictionaryProcessor.extractThesaurusSections();
    console.log(`Found ${sections.length} sections in thesaurus`);
    console.log('First 3 sections:');
    sections.slice(0, 3).forEach(section => {
        console.log(`  ${section.title || 'Untitled'} (Level ${section.level}): ${section.content.substring(0, 50)}...`);
    });
    console.log();
    
    // Test searching for a term
    const searchTerm = 'corporate';
    console.log(`Searching for "${searchTerm}" in both files...`);
    const searchResults = DictionaryProcessor.searchTerm(searchTerm);
    console.log(`Found ${searchResults.dictionary.length} matches in dictionary and ${searchResults.thesaurus.length} matches in thesaurus`);
    console.log('First 2 matches in dictionary:');
    searchResults.dictionary.slice(0, 2).forEach(match => {
        console.log(`  Line ${match.line}: ${match.text}`);
    });
    console.log('First 2 matches in thesaurus:');
    searchResults.thesaurus.slice(0, 2).forEach(match => {
        console.log(`  Line ${match.line}: ${match.text}`);
    });
    console.log();
    
    // Test extracting corporate entities
    console.log('Extracting corporate entities from thesaurus...');
    const corporateEntities = DictionaryProcessor.extractCorporateEntities();
    console.log(`Found ${corporateEntities.length} corporate entities`);
    console.log('Corporate entities:');
    corporateEntities.forEach(entity => {
        console.log(`  ${entity}`);
    });
    console.log();
    
    // Test generating dictionary TOC
    console.log('Generating table of contents for dictionary...');
    const toc = DictionaryProcessor.generateDictionaryTOC();
    console.log(`Generated table of contents with ${toc.split('\n').length} lines`);
    console.log('First 5 lines:');
    toc.split('\n').slice(0, 5).forEach(line => {
        console.log(`  ${line}`);
    });
    console.log();
    
    // Test extracting terms by category
    const category = 'A';
    console.log(`Extracting terms from category "${category}"...`);
    const categoryTerms = DictionaryProcessor.extractTermsByCategory(category);
    console.log(`Found ${categoryTerms.length} terms in category "${category}"`);
    console.log('Terms:');
    categoryTerms.forEach(term => {
        console.log(`  ${term.term}: ${term.definition.substring(0, 50)}...`);
    });
    console.log();
}

/**
 * Main function to run all tests
 */
function main() {
    console.log('=== MegaEarth 2049 Dictionary Utilities Test ===\n');
    
    // Test MarkdownUtils
    testMarkdownUtils();
    
    // Test DictionaryProcessor
    testDictionaryProcessor();
    
    console.log('=== All tests completed ===');
}

// Run the main function
main();
