
const { ipcMain } = require('electron');
const { getDatabase } = require('./database');
const { setupInvoiceHandlers } = require('./handlers/invoice-handlers');
const { setupProductHandlers } = require('./handlers/product-handlers');
const { setupSettingsHandlers } = require('./handlers/settings-handlers');
const { setupCategoryHandlers } = require('./handlers/category-handlers');
const { setupQueryHandler } = require('./handlers/query-handler');
const { setupLicenseHandlers } = require('./handlers/license-handlers');

// Set up all IPC handlers for database operations
function setupIpcHandlers(app) {
  const db = getDatabase();
  
  // Set up generic query handler
  setupQueryHandler(ipcMain, db);
  
  // Set up domain-specific handlers
  setupInvoiceHandlers(ipcMain, db);
  setupProductHandlers(ipcMain, db);
  setupSettingsHandlers(ipcMain, db);
  setupCategoryHandlers(ipcMain, db);
  
  // Set up license handlers
  setupLicenseHandlers(ipcMain, app);
}

module.exports = {
  setupIpcHandlers
};
