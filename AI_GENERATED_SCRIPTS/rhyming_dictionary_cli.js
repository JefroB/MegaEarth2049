#!/usr/bin/env node
/**
 * rhyming_dictionary_cli.js - Command-line interface for the MegaEarth 2049 Rhyming Dictionary
 * 
 * This script provides a command-line interface for generating verses and poems
 * using the MegaEarth 2049 Rhyming Dictionary.
 */

const RhymingVerseGenerator = require('./rhyming_verse_generator');
const path = require('path');
const fs = require('fs');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

/**
 * Print a styled header
 * @param {string} text - Header text
 */
function printHeader(text) {
  console.log(`\n${colors.bright}${colors.cyan}=== ${text} ===${colors.reset}\n`);
}

/**
 * Print a styled subheader
 * @param {string} text - Subheader text
 */
function printSubheader(text) {
  console.log(`\n${colors.bright}${colors.yellow}${text}${colors.reset}\n`);
}

/**
 * Print a styled error message
 * @param {string} text - Error message
 */
function printError(text) {
  console.error(`${colors.bright}${colors.red}ERROR: ${text}${colors.reset}`);
}

/**
 * Print a styled success message
 * @param {string} text - Success message
 */
function printSuccess(text) {
  console.log(`${colors.bright}${colors.green}${text}${colors.reset}`);
}

/**
 * Print a styled poem or verse
 * @param {string} text - Poem or verse text
 */
function printPoem(text) {
  console.log(`${colors.magenta}${text}${colors.reset}`);
}

/**
 * Print usage information
 */
function printUsage() {
  console.log(`
${colors.bright}${colors.cyan}MegaEarth 2049 Rhyming Dictionary CLI${colors.reset}

${colors.bright}Usage:${colors.reset}
  node rhyming_dictionary_cli.js <command> [options]

${colors.bright}Commands:${colors.reset}
  ${colors.green}list-patterns${colors.reset}             List all available rhyming patterns
  ${colors.green}list-forms${colors.reset}                List all available poetry forms
  ${colors.green}generate-verse <pattern>${colors.reset}  Generate a verse using the specified rhyming pattern
  ${colors.green}generate-poem <form>${colors.reset}      Generate a poem using the specified poetry form
  ${colors.green}random-verse${colors.reset}              Generate a verse using a random rhyming pattern
  ${colors.green}random-poem${colors.reset}               Generate a poem using a random poetry form
  ${colors.green}help${colors.reset}                      Show this help message

${colors.bright}Examples:${colors.reset}
  node rhyming_dictionary_cli.js list-patterns
  node rhyming_dictionary_cli.js generate-verse -ech
  node rhyming_dictionary_cli.js generate-poem "The Corporate Haiku"
  node rhyming_dictionary_cli.js random-verse
  node rhyming_dictionary_cli.js random-poem
  `);
}

/**
 * Main function to handle command-line arguments and execute commands
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    printUsage();
    return;
  }
  
  switch (command) {
    case 'list-patterns':
      listRhymingPatterns();
      break;
    
    case 'list-forms':
      listPoetryForms();
      break;
    
    case 'generate-verse':
      const pattern = args[1];
      if (!pattern) {
        printError('No rhyming pattern specified');
        console.log('Use "list-patterns" to see available patterns');
        return;
      }
      generateVerse(pattern);
      break;
    
    case 'generate-poem':
      const form = args.slice(1).join(' ');
      if (!form) {
        printError('No poetry form specified');
        console.log('Use "list-forms" to see available forms');
        return;
      }
      generatePoem(form);
      break;
    
    case 'random-verse':
      generateRandomVerse();
      break;
    
    case 'random-poem':
      generateRandomPoem();
      break;
    
    default:
      printError(`Unknown command: ${command}`);
      printUsage();
      break;
  }
}

/**
 * List all available rhyming patterns
 */
function listRhymingPatterns() {
  printHeader('Available Rhyming Patterns');
  
  const patterns = RhymingVerseGenerator.listRhymingPatterns();
  
  if (patterns.length === 0) {
    printError('No rhyming patterns found');
    return;
  }
  
  patterns.forEach(pattern => {
    console.log(`  ${colors.green}${pattern}${colors.reset}`);
  });
}

/**
 * List all available poetry forms
 */
function listPoetryForms() {
  printHeader('Available Poetry Forms');
  
  const forms = RhymingVerseGenerator.listPoetryForms();
  
  if (forms.length === 0) {
    printError('No poetry forms found');
    return;
  }
  
  forms.forEach(form => {
    console.log(`  ${colors.green}${form}${colors.reset}`);
  });
}

/**
 * Generate a verse using the specified rhyming pattern
 * @param {string} pattern - Rhyming pattern to use
 */
function generateVerse(pattern) {
  printHeader(`Generating Verse with Pattern "${pattern}"`);
  
  const verse = RhymingVerseGenerator.generateVerse(pattern);
  
  if (!verse) {
    printError(`Failed to generate verse with pattern "${pattern}"`);
    return;
  }
  
  printPoem(verse);
}

/**
 * Generate a poem using the specified poetry form
 * @param {string} form - Poetry form to use
 */
function generatePoem(form) {
  printHeader(`Generating Poem with Form "${form}"`);
  
  const poem = RhymingVerseGenerator.generatePoem(form);
  
  if (!poem) {
    printError(`Failed to generate poem with form "${form}"`);
    return;
  }
  
  printPoem(poem);
}

/**
 * Generate a verse using a random rhyming pattern
 */
function generateRandomVerse() {
  const patterns = RhymingVerseGenerator.listRhymingPatterns();
  
  if (patterns.length === 0) {
    printError('No rhyming patterns found');
    return;
  }
  
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  
  printHeader(`Generating Random Verse (Pattern: ${randomPattern})`);
  
  const verse = RhymingVerseGenerator.generateVerse(randomPattern);
  
  if (!verse) {
    printError(`Failed to generate verse with pattern "${randomPattern}"`);
    return;
  }
  
  printPoem(verse);
}

/**
 * Generate a poem using a random poetry form
 */
function generateRandomPoem() {
  const forms = RhymingVerseGenerator.listPoetryForms();
  
  if (forms.length === 0) {
    printError('No poetry forms found');
    return;
  }
  
  const randomForm = forms[Math.floor(Math.random() * forms.length)];
  
  printHeader(`Generating Random Poem (Form: ${randomForm})`);
  
  const poem = RhymingVerseGenerator.generatePoem(randomForm);
  
  if (!poem) {
    printError(`Failed to generate poem with form "${randomForm}"`);
    return;
  }
  
  printPoem(poem);
}

// Execute the main function
main();
