
// Settings-specific handlers
function setupSettingsHandlers(ipcMain, db) {
  // Get settings
  ipcMain.handle('get-settings', async () => {
    try {
      const settings = db.prepare('SELECT * FROM settings LIMIT 1').get();
      if (settings) {
        return JSON.parse(settings.data);
      } else {
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
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  });
  
  // Save settings
  ipcMain.handle('save-settings', async (event, settings) => {
    try {
      // First check if settings exist
      const existingSettings = db.prepare('SELECT * FROM settings LIMIT 1').get();
      
      if (existingSettings) {
        // Update existing settings
        const stmt = db.prepare(`
          UPDATE settings SET
            name = ?,
            nameAr = ?,
            taxNumber = ?,
            address = ?,
            addressAr = ?,
            phone = ?,
            email = ?,
            taxRate = ?,
            taxIncluded = ?,
            invoiceNotesAr = ?,
            data = ?
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
          JSON.stringify(settings),
          existingSettings.id
        );
      } else {
        // Insert new settings
        const stmt = db.prepare(`
          INSERT INTO settings (id, name, nameAr, taxNumber, address, addressAr, phone, email, taxRate, taxIncluded, invoiceNotesAr, data)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run(
          'settings-1',
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
          JSON.stringify(settings)
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
