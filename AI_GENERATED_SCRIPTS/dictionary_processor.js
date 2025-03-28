/**
 * dictionary_processor.js - Utility for processing MegaEarth2049 dictionary files
 * 
 * This script demonstrates how to use the md_utils.js utility to work with
 * the DICTIONARY and THESAURUS files. It provides examples of extracting terms,
 * definitions, and other content from these files.
 */

const MarkdownUtils = require('./md_utils');
const path = require('path');
const fs = require('fs');

// Path to the dictionary directory
const DICTIONARY_DIR = path.join(__dirname, '..', 'DICTIONARY');
const DICTIONARY_PATH = path.join(DICTIONARY_DIR, 'DICTIONARY.md');
const THESAURUS_PATH = path.join(DICTIONARY_DIR, 'THESAURUS.md');

/**
 * Main class for dictionary processing
 */
class DictionaryProcessor {
    /**
     * Extract all terms from the dictionary
     * @returns {Array<{term: string, definition: string}>} - Array of terms and definitions
     */
    static extractDictionaryTerms() {
        const content = MarkdownUtils.readMarkdownFile(DICTIONARY_PATH);
        if (!content) {
            console.error('Failed to read dictionary file');
            return [];
        }
        
        return MarkdownUtils.extractDefinitions(content);
    }
    
    /**
     * Extract all sections from the thesaurus
     * @returns {Array<{title: string, level: number, content: string}>} - Array of sections
     */
    static extractThesaurusSections() {
        const content = MarkdownUtils.readMarkdownFile(THESAURUS_PATH);
        if (!content) {
            console.error('Failed to read thesaurus file');
            return [];
        }
        
        return MarkdownUtils.extractSections(content);
    }
    
    /**
     * Search for a term in both dictionary and thesaurus
     * @param {string} term - Term to search for
     * @returns {Object} - Search results from both files
     */
    static searchTerm(term) {
        const dictionaryContent = MarkdownUtils.readMarkdownFile(DICTIONARY_PATH);
        const thesaurusContent = MarkdownUtils.readMarkdownFile(THESAURUS_PATH);
        
        const results = {
            dictionary: dictionaryContent ? MarkdownUtils.searchInMarkdown(dictionaryContent, term) : [],
            thesaurus: thesaurusContent ? MarkdownUtils.searchInMarkdown(thesaurusContent, term) : []
        };
        
        return results;
    }
    
    /**
     * Extract all corporate entities from the thesaurus
     * @returns {Array<string>} - Array of corporate entity names
     */
    static extractCorporateEntities() {
        const content = MarkdownUtils.readMarkdownFile(THESAURUS_PATH);
        if (!content) {
            console.error('Failed to read thesaurus file');
            return [];
        }
        
        const sections = MarkdownUtils.extractSections(content);
        const corporateEntities = [];
        
        for (const section of sections) {
            // Look for corporate entity headers (they're usually in bold)
            const corporateRegex = /\*\*(.*?)\s*\(.*?\)\*\*/g;
            let match;
            
            while ((match = corporateRegex.exec(section.content)) !== null) {
                corporateEntities.push(match[1].trim());
            }
        }
        
        return corporateEntities;
    }
    
    /**
     * Generate a combined glossary from both dictionary and thesaurus
     * @param {string} outputPath - Path to save the combined glossary
     * @returns {boolean} - Success status
     */
    static generateCombinedGlossary(outputPath) {
        const dictionaryContent = MarkdownUtils.readMarkdownFile(DICTIONARY_PATH);
        const thesaurusContent = MarkdownUtils.readMarkdownFile(THESAURUS_PATH);
        
        if (!dictionaryContent || !thesaurusContent) {
            console.error('Failed to read dictionary or thesaurus file');
            return false;
        }
        
        // Extract terms from dictionary
        const dictionaryTerms = MarkdownUtils.extractDefinitions(dictionaryContent);
        
        // Extract corporate entities and other terms from thesaurus
        const thesaurusSections = MarkdownUtils.extractSections(thesaurusContent);
        const thesaurusTerms = [];
        
        for (const section of thesaurusSections) {
            // Look for term headers (they're usually in bold)
            const termRegex = /\*\*(.*?)\*\*/g;
            let match;
            
            while ((match = termRegex.exec(section.content)) !== null) {
                const term = match[1].trim();
                // Skip if it's a section header or already in dictionary
                if (term.includes('(') && term.includes(')') && 
                    !dictionaryTerms.some(item => item.term === term)) {
                    thesaurusTerms.push({
                        term,
                        source: 'Thesaurus',
                        section: section.title || 'Unknown Section'
                    });
                }
            }
        }
        
        // Generate combined glossary content
        let glossaryContent = '# MegaEarth 2049 A.E. - Combined Glossary\n\n';
        glossaryContent += 'This glossary combines terms from both the Dictionary and Thesaurus.\n\n';
        
        // Add dictionary terms
        glossaryContent += '## Dictionary Terms\n\n';
        for (const term of dictionaryTerms) {
            glossaryContent += `### ${term.term}\n\n`;
            glossaryContent += `${term.definition}\n\n`;
        }
        
        // Add thesaurus terms
        glossaryContent += '## Thesaurus Terms\n\n';
        for (const term of thesaurusTerms) {
            glossaryContent += `### ${term.term}\n\n`;
            glossaryContent += `Found in section: ${term.section}\n\n`;
        }
        
        // Write to file
        try {
            fs.writeFileSync(outputPath, glossaryContent, 'utf8');
            return true;
        } catch (error) {
            console.error('Error writing combined glossary:', error);
            return false;
        }
    }
    
    /**
     * Add a new term to the dictionary
     * @param {string} term - Term to add
     * @param {string} definition - Definition of the term
     * @param {string} usage - Example usage of the term
     * @returns {boolean} - Success status
     */
    static addTermToDictionary(term, definition, usage) {
        const content = MarkdownUtils.readMarkdownFile(DICTIONARY_PATH);
        if (!content) {
            console.error('Failed to read dictionary file');
            return false;
        }
        
        // Check if term already exists
        const existingTerms = MarkdownUtils.extractDefinitions(content);
        if (existingTerms.some(item => item.term.toLowerCase() === term.toLowerCase())) {
            console.error(`Term "${term}" already exists in the dictionary`);
            return false;
        }
        
        // Determine the first letter of the term for alphabetical placement
        const firstLetter = term.charAt(0).toUpperCase();
        
        // Find the section for this letter
        const sections = MarkdownUtils.extractSections(content);
        let targetSection = null;
        let insertPosition = content.length; // Default to end of file
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section.title === firstLetter) {
                targetSection = section;
                // If there's a next section, insert before it
                if (i < sections.length - 1) {
                    insertPosition = sections[i + 1].position;
                }
                break;
            }
        }
        
        // Create new term entry
        const newEntry = `\n**${term}**\n- *Definition*: ${definition}\n- *Usage*: "${usage}"\n`;
        
        // If section exists, append to it; otherwise, create new section
        let updatedContent;
        if (targetSection) {
            // Insert at the end of the target section
            const sectionEnd = insertPosition;
            updatedContent = content.substring(0, sectionEnd) + newEntry + content.substring(sectionEnd);
        } else {
            // Create new section for this letter
            const newSection = `\n### ${firstLetter}\n${newEntry}\n`;
            
            // Find where to insert the new section alphabetically
            let inserted = false;
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                if (section.title && section.title.length === 1 && section.title > firstLetter) {
                    insertPosition = section.position;
                    updatedContent = content.substring(0, insertPosition) + newSection + content.substring(insertPosition);
                    inserted = true;
                    break;
                }
            }
            
            // If not inserted, add to the end
            if (!inserted) {
                updatedContent = content + newSection;
            }
        }
        
        // Write updated content back to file
        try {
            fs.writeFileSync(DICTIONARY_PATH, updatedContent, 'utf8');
            return true;
        } catch (error) {
            console.error('Error writing to dictionary file:', error);
            return false;
        }
    }
    
    /**
     * Generate a table of contents for the dictionary
     * @returns {string} - Markdown table of contents
     */
    static generateDictionaryTOC() {
        const content = MarkdownUtils.readMarkdownFile(DICTIONARY_PATH);
        if (!content) {
            console.error('Failed to read dictionary file');
            return '';
        }
        
        return MarkdownUtils.generateTableOfContents(content);
    }
    
    /**
     * Extract all terms from a specific category in the dictionary
     * @param {string} category - Category to extract terms from (e.g., "A", "B", etc.)
     * @returns {Array<{term: string, definition: string}>} - Array of terms and definitions
     */
    static extractTermsByCategory(category) {
        const content = MarkdownUtils.readMarkdownFile(DICTIONARY_PATH);
        if (!content) {
            console.error('Failed to read dictionary file');
            return [];
        }
        
        const sections = MarkdownUtils.extractSections(content);
        const categorySection = sections.find(section => section.title === category);
        
        if (!categorySection) {
            console.error(`Category "${category}" not found in dictionary`);
            return [];
        }
        
        // Extract terms from the category section
        const termRegex = /\*\*(.*?)\*\*\s*\n\s*-\s*\*Definition\*\s*:\s*(.*?)(?=\n\s*\n|\n\s*\*\*|\n\s*$)/gs;
        const terms = [];
        let match;
        
        while ((match = termRegex.exec(categorySection.content)) !== null) {
            terms.push({
                term: match[1].trim(),
                definition: match[2].trim()
            });
        }
        
        return terms;
    }
}

// Example usage
if (require.main === module) {
    // Extract all terms from the dictionary
    console.log('Extracting dictionary terms...');
    const terms = DictionaryProcessor.extractDictionaryTerms();
    console.log(`Found ${terms.length} terms in the dictionary`);
    
    // Extract corporate entities from the thesaurus
    console.log('\nExtracting corporate entities from the thesaurus...');
    const corporateEntities = DictionaryProcessor.extractCorporateEntities();
    console.log(`Found ${corporateEntities.length} corporate entities in the thesaurus`);
    console.log('Corporate entities:', corporateEntities);
    
    // Search for a term
    const searchTerm = 'corporate';
    console.log(`\nSearching for "${searchTerm}" in both files...`);
    const searchResults = DictionaryProcessor.searchTerm(searchTerm);
    console.log(`Found ${searchResults.dictionary.length} matches in dictionary and ${searchResults.thesaurus.length} matches in thesaurus`);
    
    // Generate table of contents
    console.log('\nGenerating table of contents for the dictionary...');
    const toc = DictionaryProcessor.generateDictionaryTOC();
    console.log(toc);
    
    // Example of adding a new term (commented out to prevent actual modification)
    /*
    console.log('\nAdding a new term to the dictionary...');
    const success = DictionaryProcessor.addTermToDictionary(
        'Example Term',
        'This is an example term added by the dictionary processor.',
        'The dictionary processor added an Example Term to demonstrate its functionality.'
    );
    console.log(`Term added successfully: ${success}`);
    */
    
    // Generate combined glossary (commented out to prevent actual file creation)
    /*
    console.log('\nGenerating combined glossary...');
    const glossaryPath = path.join(__dirname, '..', 'DICTIONARY', 'COMBINED_GLOSSARY.md');
    const glossarySuccess = DictionaryProcessor.generateCombinedGlossary(glossaryPath);
    console.log(`Combined glossary generated successfully: ${glossarySuccess}`);
    */
}

module.exports = DictionaryProcessor;
