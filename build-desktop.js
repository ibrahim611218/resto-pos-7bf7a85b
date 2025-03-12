
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the app
console.log('Building the React app...');
execSync('npm run build', { stdio: 'inherit' });

// Create electron/dist directory if it doesn't exist
const electronDist = path.join(__dirname, 'electron', 'dist');
if (!fs.existsSync(electronDist)) {
  fs.mkdirSync(electronDist, { recursive: true });
}

// Copy the build to electron/dist
console.log('Copying build to electron/dist...');
execSync('cp -r dist/* electron/dist/', { stdio: 'inherit' });

// Install electron dependencies
console.log('Installing electron dependencies...');
execSync('cd electron && npm install', { stdio: 'inherit' });

// Package the app
console.log('Packaging the electron app...');
execSync('cd electron && npm run package', { stdio: 'inherit' });

// Make the app (create installers)
console.log('Creating installers...');
execSync('cd electron && npm run make', { stdio: 'inherit' });

console.log('Build complete!');
