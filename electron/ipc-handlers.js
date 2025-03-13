
const { ipcMain } = require('electron');
const { getDatabase } = require('./database');

// Set up all IPC handlers for database operations
function setupIpcHandlers() {
  const db = getDatabase();
  
  // General query handler
  ipcMain.handle('db-query', async (event, { sql, params }) => {
    try {
      const stmt = db.prepare(sql);
      if (sql.trim().toLowerCase().startsWith('select')) {
        return stmt.all(params);
      } else {
        return stmt.run(params);
      }
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  });
  
  // Get all invoices
  ipcMain.handle('get-invoices', async () => {
    try {
      const invoices = db.prepare('SELECT * FROM invoices ORDER BY date DESC').all();
      return invoices.map(invoice => {
        const fullData = JSON.parse(invoice.data);
        return { ...fullData, id: invoice.id, number: invoice.number };
      });
    } catch (error) {
      console.error('Error getting invoices:', error);
      return [];
    }
  });
  
  // Save invoice
  ipcMain.handle('save-invoice', async (event, invoice) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO invoices (id, number, date, subtotal, taxAmount, total, discount, discountType, 
        paymentMethod, cashierId, cashierName, status, orderType, tableNumber, data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        invoice.id,
        invoice.number,
        invoice.date.toString(),
        invoice.subtotal,
        invoice.taxAmount,
        invoice.total,
        invoice.discount,
        invoice.discountType,
        invoice.paymentMethod,
        invoice.cashierId,
        invoice.cashierName,
        invoice.status,
        invoice.orderType,
        invoice.tableNumber || null,
        JSON.stringify(invoice)
      );
      
      return { success: true, id: invoice.id };
    } catch (error) {
      console.error('Error saving invoice:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Update invoice (for refunds, etc.)
  ipcMain.handle('update-invoice', async (event, invoice) => {
    try {
      const stmt = db.prepare(`
        UPDATE invoices SET 
          status = ?,
          data = ?
        WHERE id = ?
      `);
      
      stmt.run(
        invoice.status,
        JSON.stringify(invoice),
        invoice.id
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error updating invoice:', error);
      return { success: false, error: error.message };
    }
  });

  // Get products
  ipcMain.handle('get-products', async () => {
    try {
      const products = db.prepare('SELECT * FROM products').all();
      return products.map(product => {
        const fullData = JSON.parse(product.data);
        return { ...fullData };
      });
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  });

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
  setupIpcHandlers
};
