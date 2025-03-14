
const { 
  getActivatedLicenseHandler, 
  activateLicenseHandler, 
  generateLicenseHandler, 
  getAllLicensesHandler 
} = require('./license/license-operations');

// Setup IPC handlers for license operations
function setupLicenseHandlers(ipcMain, app) {
  // Get activated license
  ipcMain.handle('license:getActivated', async () => {
    return await getActivatedLicenseHandler(app);
  });
  
  // Activate a license
  ipcMain.handle('license:activate', async (event, licenseKey) => {
    return await activateLicenseHandler(app, licenseKey);
  });
  
  // Generate a new license
  ipcMain.handle('license:generate', async (event, type, durationDays) => {
    return await generateLicenseHandler(app, type, durationDays);
  });
  
  // Get all licenses
  ipcMain.handle('license:getAll', async () => {
    return await getAllLicensesHandler(app);
  });
}

module.exports = {
  setupLicenseHandlers
};
