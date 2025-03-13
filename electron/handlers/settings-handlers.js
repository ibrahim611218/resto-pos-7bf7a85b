
function setupSettingsHandlers(ipcMain, db) {
  // Get business settings
  ipcMain.handle('db:getSettings', async () => {
    try {
      const stmt = db.prepare(`SELECT * FROM settings LIMIT 1`);
      const settings = stmt.get();
      
      if (!settings) {
        // Return default settings if none exist
        return {
          name: "مطعم الذواق",
          nameAr: "مطعم الذواق",
          taxNumber: "300000000000003",
          address: "الرياض، المملكة العربية السعودية",
          addressAr: "الرياض، المملكة العربية السعودية", 
          phone: "966500000000",
          email: "info@example.com",
          taxRate: 15,
          taxIncluded: false,
          invoiceNotesAr: "شكراً لزيارتكم"
        };
      }
      
      // Parse the data JSON field
      try {
        return {
          ...settings,
          data: JSON.parse(settings.data)
        };
      } catch (e) {
        console.error('Error parsing settings data:', e);
        return settings;
      }
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  });
  
  // Save business settings
  ipcMain.handle('db:saveSettings', async (event, settings) => {
    try {
      // Check if settings already exist
      const existingStmt = db.prepare(`SELECT id FROM settings LIMIT 1`);
      const existing = existingStmt.get();
      
      // Convert complex objects to JSON strings
      const settingsData = JSON.stringify(settings);
      
      if (existing) {
        // Update existing settings
        const stmt = db.prepare(`
          UPDATE settings SET
          name = ?, nameAr = ?, taxNumber = ?, address = ?, addressAr = ?,
          phone = ?, email = ?, taxRate = ?, taxIncluded = ?, invoiceNotesAr = ?, data = ?
          WHERE id = ?
        `);
        
        stmt.run(
          settings.name,
          settings.nameAr,
          settings.taxNumber,
          settings.address,
          settings.addressAr,
          settings.phone,
          settings.email,
          settings.taxRate,
          settings.taxIncluded ? 1 : 0,
          settings.invoiceNotesAr,
          settingsData,
          existing.id
        );
      } else {
        // Insert new settings with a default ID
        const stmt = db.prepare(`
          INSERT INTO settings
          (id, name, nameAr, taxNumber, address, addressAr, phone, email, taxRate, taxIncluded, invoiceNotesAr, data)
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run(
          'default',
          settings.name,
          settings.nameAr,
          settings.taxNumber,
          settings.address,
          settings.addressAr,
          settings.phone,
          settings.email,
          settings.taxRate,
          settings.taxIncluded ? 1 : 0,
          settings.invoiceNotesAr,
          settingsData
        );
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error saving settings:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = {
  setupSettingsHandlers
};
