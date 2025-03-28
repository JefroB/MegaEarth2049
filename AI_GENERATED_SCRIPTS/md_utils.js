/**
 * md_utils.js - Markdown File Reading and Processing Utility
 * 
 * This utility provides functions for reading, parsing, and manipulating Markdown files
 * in the MegaEarth2049 project. It can extract headers, sections, lists, and other
 * Markdown elements, making it easier to work with documentation files.
 */

const fs = require('fs');
const path = require('path');

/**
 * Main class for Markdown utilities
 */
class MarkdownUtils {
    /**
     * Read a Markdown file and return its content
     * @param {string} filePath - Path to the Markdown file
     * @returns {string} - Content of the file
     */
    static readMarkdownFile(filePath) {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            console.error(`Error reading Markdown file ${filePath}:`, error);
            return null;
        }
    }

    /**
     * Extract all headers from Markdown content
     * @param {string} content - Markdown content
     * @returns {Array<{level: number, text: string, position: number}>} - Array of headers with their level and position
     */
    static extractHeaders(content) {
        if (!content) return [];
        
        const headerRegex = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/gm;
        const headers = [];
        let match;
        
        while ((match = headerRegex.exec(content)) !== null) {
            headers.push({
                level: match[1].length,
                text: match[2].trim(),
                position: match.index
            });
        }
        
        return headers;
    }

    /**
     * Extract sections from Markdown content based on headers
     * @param {string} content - Markdown content
     * @returns {Array<{title: string, level: number, content: string}>} - Array of sections
     */
    static extractSections(content) {
        if (!content) return [];
        
        const headers = this.extractHeaders(content);
        if (headers.length === 0) {
            return [{
                title: null,
                level: 0,
                content: content
            }];
        }
        
        const sections = [];
        
        // Add content before the first header if it exists
        if (headers[0].position > 0) {
            sections.push({
                title: null,
                level: 0,
                content: content.substring(0, headers[0].position).trim()
            });
        }
        
        // Process each header and its content
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const nextHeader = headers[i + 1];
            const sectionStart = header.position + header.text.length + header.level + 1; // +1 for the newline
            const sectionEnd = nextHeader ? nextHeader.position : content.length;
            
            sections.push({
                title: header.text,
                level: header.level,
                content: content.substring(sectionStart, sectionEnd).trim()
            });
        }
        
        return sections;
    }

    /**
     * Extract all lists from Markdown content
     * @param {string} content - Markdown content
     * @returns {Array<{type: string, items: Array<string>}>} - Array of lists with their type and items
     */
    static extractLists(content) {
        if (!content) return [];
        
        const lists = [];
        const unorderedListRegex = /^[ \t]*[-*+][ \t]+(.*?)$/gm;
        const orderedListRegex = /^[ \t]*\d+\.[ \t]+(.*?)$/gm;
        
        // Extract unordered lists
        let unorderedItems = [];
        let match;
        
        while ((match = unorderedListRegex.exec(content)) !== null) {
            unorderedItems.push(match[1].trim());
        }
        
        if (unorderedItems.length > 0) {
            lists.push({
                type: 'unordered',
                items: unorderedItems
            });
        }
        
        // Extract ordered lists
        let orderedItems = [];
        
        while ((match = orderedListRegex.exec(content)) !== null) {
            orderedItems.push(match[1].trim());
        }
        
        if (orderedItems.length > 0) {
            lists.push({
                type: 'ordered',
                items: orderedItems
            });
        }
        
        return lists;
    }

    /**
     * Extract all code blocks from Markdown content
     * @param {string} content - Markdown content
     * @returns {Array<{language: string, code: string}>} - Array of code blocks
     */
    static extractCodeBlocks(content) {
        if (!content) return [];
        
        const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
        const codeBlocks = [];
        let match;
        
        while ((match = codeBlockRegex.exec(content)) !== null) {
            codeBlocks.push({
                language: match[1] || 'text',
                code: match[2].trim()
            });
        }
        
        return codeBlocks;
    }

    /**
     * Extract all links from Markdown content
     * @param {string} content - Markdown content
     * @returns {Array<{text: string, url: string}>} - Array of links
     */
    static extractLinks(content) {
        if (!content) return [];
        
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
            links.push({
                text: match[1].trim(),
                url: match[2].trim()
            });
        }
        
        return links;
    }

    /**
     * Extract all tables from Markdown content
     * @param {string} content - Markdown content
     * @returns {Array<{headers: Array<string>, rows: Array<Array<string>>}>} - Array of tables
     */
    static extractTables(content) {
        if (!content) return [];
        
        // Find table blocks in the content
        const tableBlockRegex = /^\|(.+)\|\s*\n\|(?:[-:]+\|)+\s*\n((?:\|.+\|\s*\n)+)/gm;
        const tables = [];
        let tableMatch;
        
        while ((tableMatch = tableBlockRegex.exec(content)) !== null) {
            const headerRow = tableMatch[1];
            const dataRows = tableMatch[2];
            
            // Parse headers
            const headers = headerRow.split('|')
                .map(cell => cell.trim())
                .filter(cell => cell.length > 0);
            
            // Parse data rows
            const rows = [];
            const rowRegex = /^\|(.+)\|$/gm;
            let rowMatch;
            
            let rowsContent = dataRows;
            while ((rowMatch = rowRegex.exec(rowsContent)) !== null) {
                const cells = rowMatch[1].split('|')
                    .map(cell => cell.trim());
                
                rows.push(cells);
            }
            
            tables.push({
                headers,
                rows
            });
        }
        
        return tables;
    }

    /**
     * Extract all definitions from a Markdown dictionary
     * @param {string} content - Markdown content
     * @returns {Array<{term: string, definition: string}>} - Array of definitions
     */
    static extractDefinitions(content) {
        if (!content) return [];
        
        // This regex looks for patterns like "**Term**\n- *Definition*: Definition text"
        const definitionRegex = /\*\*(.*?)\*\*\s*\n\s*-\s*\*Definition\*\s*:\s*(.*?)(?=\n\s*\n|\n\s*\*\*|\n\s*$)/gs;
        const definitions = [];
        let match;
        
        while ((match = definitionRegex.exec(content)) !== null) {
            definitions.push({
                term: match[1].trim(),
                definition: match[2].trim()
            });
        }
        
        return definitions;
    }

    /**
     * Search for terms in a Markdown file
     * @param {string} content - Markdown content
     * @param {string} searchTerm - Term to search for
     * @returns {Array<{line: number, text: string}>} - Array of matches with line numbers
     */
    static searchInMarkdown(content, searchTerm) {
        if (!content || !searchTerm) return [];
        
        const lines = content.split('\n');
        const results = [];
        const regex = new RegExp(searchTerm, 'i');
        
        for (let i = 0; i < lines.length; i++) {
            if (regex.test(lines[i])) {
                results.push({
                    line: i + 1,
                    text: lines[i].trim()
                });
            }
        }
        
        return results;
    }

    /**
     * Combine multiple Markdown files into one
     * @param {Array<string>} filePaths - Array of file paths
     * @param {string} outputPath - Path for the combined file
     * @returns {boolean} - Success status
     */
    static combineMarkdownFiles(filePaths, outputPath) {
        try {
            let combinedContent = '';
            
            for (const filePath of filePaths) {
                const content = this.readMarkdownFile(filePath);
                if (content) {
                    // Add file name as a header
                    const fileName = path.basename(filePath, path.extname(filePath));
                    combinedContent += `\n\n## ${fileName}\n\n${content}\n\n---\n\n`;
                }
            }
            
            fs.writeFileSync(outputPath, combinedContent.trim(), 'utf8');
            return true;
        } catch (error) {
            console.error('Error combining Markdown files:', error);
            return false;
        }
    }

    /**
     * Convert a Markdown file to HTML
     * @param {string} content - Markdown content
     * @returns {string} - HTML content
     */
    static markdownToHTML(content) {
        if (!content) return '';
        
        // This is a simple implementation. For a full-featured converter,
        // you would want to use a library like marked or showdown.
        let html = content;
        
        // Convert headers
        html = html.replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>');
        html = html.replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>');
        html = html.replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>');
        html = html.replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>');
        
        // Convert bold and italic
        html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        // Convert links
        html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
        
        // Convert unordered lists
        html = html.replace(/^[ \t]*[-*+][ \t]+(.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*?<\/li>\n)+/g, '<ul>$&</ul>');
        
        // Convert ordered lists
        html = html.replace(/^[ \t]*\d+\.[ \t]+(.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*?<\/li>\n)+/g, '<ol>$&</ol>');
        
        // Convert paragraphs
        html = html.replace(/^(?!<[a-z]).+$/gm, '<p>$&</p>');
        
        return html;
    }

    /**
     * Generate a table of contents from Markdown content
     * @param {string} content - Markdown content
     * @returns {string} - Markdown table of contents
     */
    static generateTableOfContents(content) {
        if (!content) return '';
        
        const headers = this.extractHeaders(content);
        if (headers.length === 0) return '';
        
        let toc = '# Table of Contents\n\n';
        
        for (const header of headers) {
            // Skip the title (level 1) if it's the first header
            if (header === headers[0] && header.level === 1) continue;
            
            const indent = '  '.repeat(header.level - 1);
            const link = header.text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            toc += `${indent}- [${header.text}](#${link})\n`;
        }
        
        return toc;
    }

    /**
     * Process all Markdown files in a directory
     * @param {string} directoryPath - Path to the directory
     * @param {Function} processor - Function to process each file
     * @returns {Array<any>} - Array of processor results
     */
    static processMarkdownDirectory(directoryPath, processor) {
        try {
            const files = fs.readdirSync(directoryPath);
            const results = [];
            
            for (const file of files) {
                if (path.extname(file).toLowerCase() === '.md') {
                    const filePath = path.join(directoryPath, file);
                    const content = this.readMarkdownFile(filePath);
                    
                    if (content) {
                        results.push(processor(content, filePath));
                    }
                }
            }
            
            return results;
        } catch (error) {
            console.error('Error processing Markdown directory:', error);
            return [];
        }
    }
}

module.exports = MarkdownUtils;

// Example usage:
/*
const mdUtils = require('./md_utils');

// Read a Markdown file
const content = mdUtils.readMarkdownFile('path/to/file.md');

// Extract headers
const headers = mdUtils.extractHeaders(content);
console.log('Headers:', headers);

// Extract sections
const sections = mdUtils.extractSections(content);
console.log('Sections:', sections);

// Extract definitions from a dictionary
const definitions = mdUtils.extractDefinitions(content);
console.log('Definitions:', definitions);

// Search for terms
const searchResults = mdUtils.searchInMarkdown(content, 'search term');
console.log('Search results:', searchResults);

// Generate table of contents
const toc = mdUtils.generateTableOfContents(content);
console.log('Table of Contents:', toc);
*/
