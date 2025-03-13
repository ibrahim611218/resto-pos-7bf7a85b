
function setupLicenseHandlers(ipcMain, db) {
  // Activate license
  ipcMain.handle('activate-license', async (event, licenseKey) => {
    try {
      if (!licenseKey || licenseKey.length < 16) {
        return { success: false, error: "Invalid license key" };
      }
      
      const parts = licenseKey.split('-');
      if (parts.length !== 4) {
        return { success: false, error: "Invalid license key format" };
      }
      
      const typeCode = parts[0].charAt(0);
      let licenseType = "trial";
      
      if (typeCode === "M") {
        licenseType = "monthly";
      } else if (typeCode === "Y") {
        licenseType = "yearly";
      } else if (typeCode !== "T") {
        return { success: false, error: "Invalid license type" };
      }
      
      // Calculate expiration based on current date and license type
      const now = new Date();
      let expiresAt = new Date(now);
      
      if (licenseType === "trial") {
        expiresAt.setDate(now.getDate() + 14); // 14 days trial
      } else if (licenseType === "monthly") {
        expiresAt.setMonth(now.getMonth() + 1); // 1 month subscription
      } else if (licenseType === "yearly") {
        expiresAt.setFullYear(now.getFullYear() + 1); // 1 year subscription
      }
      
      // Check if license table exists
      db.prepare(`
        CREATE TABLE IF NOT EXISTS license (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT NOT NULL UNIQUE,
          type TEXT NOT NULL,
          expiresAt TEXT NOT NULL,
          isActive INTEGER NOT NULL,
          activatedAt TEXT NOT NULL,
          data TEXT NOT NULL
        );
      `).run();
      
      // Delete any existing license
      db.prepare('DELETE FROM license').run();
      
      // Insert the new license
      const licenseData = {
        key: licenseKey,
        type: licenseType,
        expiresAt: expiresAt.toISOString(),
        isActive: 1,
        activatedAt: now.toISOString(),
        data: JSON.stringify({})
      };
      
      db.prepare(`
        INSERT INTO license (key, type, expiresAt, isActive, activatedAt, data)
        VALUES (@key, @type, @expiresAt, @isActive, @activatedAt, @data)
      `).run(licenseData);
      
      return { success: true };
    } catch (error) {
      console.error('Error activating license:', error);
      return { success: false, error: error.message || "Unknown error" };
    }
  });

  // Get license state
  ipcMain.handle('get-license-state', async (event) => {
    try {
      // Check if license table exists
      db.prepare(`
        CREATE TABLE IF NOT EXISTS license (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT NOT NULL UNIQUE,
          type TEXT NOT NULL,
          expiresAt TEXT NOT NULL,
          isActive INTEGER NOT NULL,
          activatedAt TEXT NOT NULL,
          data TEXT NOT NULL
        );
      `).run();
      
      // Get the license
      const license = db.prepare('SELECT * FROM license LIMIT 1').get();
      
      if (!license) {
        return { isLicensed: false };
      }
      
      const now = new Date();
      const expiresAt = new Date(license.expiresAt);
      const isExpired = now > expiresAt;
      
      // Calculate days remaining
      const diffTime = Math.abs(expiresAt.getTime() - now.getTime());
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        isLicensed: license.isActive === 1 && !isExpired,
        licenseType: license.type,
        expiresAt: license.expiresAt,
        daysRemaining: isExpired ? 0 : daysRemaining,
        isExpired,
        isTrial: license.type === 'trial'
      };
    } catch (error) {
      console.error('Error getting license state:', error);
      return { isLicensed: false };
    }
  });

  // Deactivate license
  ipcMain.handle('deactivate-license', async (event) => {
    try {
      // Delete the license
      db.prepare('DELETE FROM license').run();
      
      return { success: true };
    } catch (error) {
      console.error('Error deactivating license:', error);
      return { success: false, error: error.message || "Unknown error" };
    }
  });
}

module.exports = {
  setupLicenseHandlers
};
