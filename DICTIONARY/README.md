# MegaEarth 2049 Dictionary and Thesaurus

This folder contains the official dictionary and thesaurus for the MegaEarth 2049 game, along with utilities for managing and processing these files.

## Contents

- **DICTIONARY.md** - The main dictionary file containing official game terms and urban slang with definitions and usage examples.
- **THESAURUS.md** - A thematic organization of terms and concepts in the MegaEarth 2049 universe.
- **RHYMING_DICTIONARY.md** - A collection of terms organized by rhyming patterns, with example verses and poetry forms for wasteland bards.

## Utilities

Several JavaScript utilities have been created to help manage and process the dictionary, thesaurus, and rhyming dictionary files. These utilities are located in the `AI_GENERATED_SCRIPTS` folder:

### md_utils.js

A general-purpose Markdown file processing utility that provides functions for:

- Reading Markdown files
- Extracting headers, sections, lists, and other Markdown elements
- Searching for content within Markdown files
- Generating tables of contents
- Converting Markdown to HTML
- Combining multiple Markdown files

### dictionary_processor.js

A specialized utility for working with the MegaEarth 2049 dictionary and thesaurus files. It provides functions for:

- Extracting terms and definitions from the dictionary
- Extracting sections from the thesaurus
- Searching for terms in both files
- Extracting corporate entities and other specialized content
- Generating a combined glossary
- Adding new terms to the dictionary
- Generating a table of contents for the dictionary

### dictionary_cli.js

A command-line interface for working with the dictionary and thesaurus files. It provides commands for:

- Searching for terms
- Extracting terms and definitions
- Extracting corporate entities
- Generating a table of contents
- Adding new terms
- Generating a combined glossary
- Extracting terms from specific categories

### rhyming_verse_generator.js

A utility for generating verses and poems using the MegaEarth 2049 Rhyming Dictionary. It provides functions for:

- Extracting rhyming groups from the rhyming dictionary
- Extracting example verses from the rhyming dictionary
- Extracting poetry forms from the rhyming dictionary
- Generating verses using specific rhyming patterns
- Generating poems using specific poetry forms

### rhyming_dictionary_cli.js

A command-line interface for generating verses and poems using the MegaEarth 2049 Rhyming Dictionary. It provides commands for:

- Listing available rhyming patterns
- Listing available poetry forms
- Generating verses using specific rhyming patterns
- Generating poems using specific poetry forms
- Generating random verses and poems

## Usage Examples

### Using the Dictionary Command-Line Interface

```bash
# Search for a term in both dictionary and thesaurus
node AI_GENERATED_SCRIPTS/dictionary_cli.js search "corporate"

# Extract all terms from the dictionary
node AI_GENERATED_SCRIPTS/dictionary_cli.js extract-terms

# Extract all corporate entities from the thesaurus
node AI_GENERATED_SCRIPTS/dictionary_cli.js extract-corporate

# Generate a table of contents for the dictionary
node AI_GENERATED_SCRIPTS/dictionary_cli.js generate-toc

# Add a new term to the dictionary
node AI_GENERATED_SCRIPTS/dictionary_cli.js add-term "New Term" "Definition of the new term" "Example usage of the new term"

# Generate a combined glossary
node AI_GENERATED_SCRIPTS/dictionary_cli.js combine

# Extract terms from a specific category
node AI_GENERATED_SCRIPTS/dictionary_cli.js extract-category "A"
```

### Using the Rhyming Dictionary Command-Line Interface

```bash
# List all available rhyming patterns
node AI_GENERATED_SCRIPTS/rhyming_dictionary_cli.js list-patterns

# List all available poetry forms
node AI_GENERATED_SCRIPTS/rhyming_dictionary_cli.js list-forms

# Generate a verse using a specific rhyming pattern
node AI_GENERATED_SCRIPTS/rhyming_dictionary_cli.js generate-verse -ech

# Generate a poem using a specific poetry form
node AI_GENERATED_SCRIPTS/rhyming_dictionary_cli.js generate-poem "The Corporate Haiku"

# Generate a verse using a random rhyming pattern
node AI_GENERATED_SCRIPTS/rhyming_dictionary_cli.js random-verse

# Generate a poem using a random poetry form
node AI_GENERATED_SCRIPTS/rhyming_dictionary_cli.js random-poem
```

### Using the Dictionary Processor in JavaScript

```javascript
const DictionaryProcessor = require('../AI_GENERATED_SCRIPTS/dictionary_processor');

// Extract all terms from the dictionary
const terms = DictionaryProcessor.extractDictionaryTerms();
console.log(`Found ${terms.length} terms in the dictionary`);

// Search for a term
const searchResults = DictionaryProcessor.searchTerm('corporate');
console.log(`Found ${searchResults.dictionary.length} matches in dictionary and ${searchResults.thesaurus.length} matches in thesaurus`);

// Add a new term
const success = DictionaryProcessor.addTermToDictionary(
    'Example Term',
    'This is an example term added by the dictionary processor.',
    'The dictionary processor added an Example Term to demonstrate its functionality.'
);
console.log(`Term added successfully: ${success}`);
```

### Using the Rhyming Verse Generator in JavaScript

```javascript
const RhymingVerseGenerator = require('../AI_GENERATED_SCRIPTS/rhyming_verse_generator');

// List all available rhyming patterns
const patterns = RhymingVerseGenerator.listRhymingPatterns();
console.log(`Found ${patterns.length} rhyming patterns`);

// Generate a verse using a specific rhyming pattern
const verse = RhymingVerseGenerator.generateVerse('-ech');
console.log(`Generated verse:\n${verse}`);

// List all available poetry forms
const forms = RhymingVerseGenerator.listPoetryForms();
console.log(`Found ${forms.length} poetry forms`);

// Generate a poem using a specific poetry form
const poem = RhymingVerseGenerator.generatePoem('The Corporate Haiku');
console.log(`Generated poem:\n${poem}`);
```

## Contributing

When adding new terms to the dictionary, please follow these guidelines:

1. Ensure the term is relevant to the MegaEarth 2049 universe.
2. Place the term in the correct alphabetical section.
3. Include both a definition and an example usage.
4. Maintain the existing formatting style.

You can use the provided utilities to help with adding new terms and maintaining the dictionary.

## Maintenance

The dictionary and thesaurus files should be periodically reviewed and updated to ensure they remain comprehensive and accurate. The utilities provided can help with this maintenance process by:

- Identifying missing terms
- Ensuring consistent formatting
- Generating updated tables of contents
- Creating combined glossaries for reference

## License

All content in this folder is part of the MegaEarth 2049 project and is subject to the same licensing terms as the main project.
