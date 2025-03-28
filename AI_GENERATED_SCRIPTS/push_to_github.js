// Script to push all changes to GitHub
const { execSync } = require('child_process');

// Function to execute a command and log the output
function runCommand(command) {
  console.log(`Executing: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    throw error;
  }
}

// Main function to push changes to GitHub
function pushToGitHub() {
  try {
    // Check if we're in a git repository
    runCommand('git status');
    
    // Add all files
    runCommand('git add .');
    
    // Commit changes
    const commitMessage = `Add new quest lines batch 5 with 11 new quest lines`;
    runCommand(`git commit -m "${commitMessage}"`);
    
    // Push to GitHub
    runCommand('git push');
    
    console.log('Successfully pushed changes to GitHub!');
  } catch (error) {
    console.error('Failed to push changes to GitHub.');
  }
}

// Run the main function
pushToGitHub();
