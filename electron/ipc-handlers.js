
const { ipcMain } = require('electron');
const { getDatabase } = require('./database');
const { setupInvoiceHandlers } = require('./handlers/invoice-handlers');
const { setupProductHandlers } = require('./handlers/product-handlers');
const { setupSettingsHandlers } = require('./handlers/settings-handlers');
const { setupCategoryHandlers } = require('./handlers/category-handlers');
const { setupLicenseHandlers } = require('./handlers/license-handlers');
const { setupQueryHandler } = require('./handlers/query-handler');

// Set up all IPC handlers for database operations
function setupIpcHandlers() {
  const db = getDatabase();
  
  // Set up generic query handler
  setupQueryHandler(ipcMain, db);
  
  // Set up domain-specific handlers
  setupInvoiceHandlers(ipcMain, db);
  setupProductHandlers(ipcMain, db);
  setupSettingsHandlers(ipcMain, db);
  setupCategoryHandlers(ipcMain, db);
  setupLicenseHandlers(ipcMain, db);
}

module.exports = {
  setupIpcHandlers
};
