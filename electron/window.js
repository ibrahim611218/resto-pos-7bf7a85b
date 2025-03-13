
const { BrowserWindow, screen } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow = null;

function createWindow() {
  // Get the screen dimensions
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // Create the browser window with proper dimensions
  mainWindow = new BrowserWindow({
    width: Math.min(1280, width),
    height: Math.min(800, height),
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, '../public/assets/restopos-logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false // Required for better-sqlite3
    }
  });
  
  // Load the correct URL depending on environment
  if (isDev) {
    // In development, we load from the dev server
    console.log('Loading from dev server in development mode');
    mainWindow.loadURL('http://localhost:8080');
    
    // Open DevTools
    mainWindow.webContents.openDevTools();
  } else {
    // In production, we load from the built files
    console.log('Loading from built files in production mode');
    mainWindow.loadURL(`file://${path.join(__dirname, 'dist/index.html')}`);
  }
  
  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  return mainWindow;
}

function getMainWindow() {
  return mainWindow;
}

module.exports = {
  createWindow,
  getMainWindow
};
