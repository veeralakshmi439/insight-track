const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'pre-commit');
const destDir = path.join(__dirname, '..','.git', 'hooks');
const destFile = path.join(destDir, 'pre-commit');

// Ensure the .git/hooks directory exists
if (!fs.existsSync(destDir)){
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy the pre-commit file
fs.copyFileSync(srcFile, destFile);

// Make the file executable
fs.chmodSync(destFile, '755');

console.log('Pre-commit hook installed successfully.');
