
const { app } = require('electron');
const { initDatabase } = require('./database');
const { setupIpcHandlers } = require('./ipc-handlers');
const { createWindow, getMainWindow } = require('./window');

function startApp() {
  // Initialize database first
  const dbInitialized = initDatabase(app);
  if (!dbInitialized) {
    console.error('Failed to initialize database, exiting');
    app.quit();
    return;
  }
  
  // Set up IPC handlers for database communication
  setupIpcHandlers();
  
  // Create the browser window
  createWindow();
}

app.on('ready', startApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (getMainWindow() === null) {
    startApp();
  }
});
