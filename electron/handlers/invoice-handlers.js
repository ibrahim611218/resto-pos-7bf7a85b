
function setupInvoiceHandlers(ipcMain, db) {
  // Get all invoices
  ipcMain.handle('db:getInvoices', async () => {
    try {
      const stmt = db.prepare(`SELECT * FROM invoices ORDER BY date DESC`);
      const invoices = stmt.all();
      
      // Parse the data JSON field for each invoice
      return invoices.map(invoice => {
        try {
          return {
            ...invoice,
            data: JSON.parse(invoice.data)
          };
        } catch (e) {
          console.error('Error parsing invoice data:', e);
          return invoice;
        }
      });
    } catch (error) {
      console.error('Error getting invoices:', error);
      return [];
    }
  });

  // Save a new invoice
  ipcMain.handle('db:saveInvoice', async (event, invoice) => {
    try {
      // Convert complex objects to JSON strings
      const invoiceData = JSON.stringify(invoice);
      
      const stmt = db.prepare(`
        INSERT INTO invoices 
        (id, number, date, subtotal, taxAmount, total, discount, discountType, 
         paymentMethod, cashierId, cashierName, status, orderType, tableNumber, data) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        invoice.id,
        invoice.number,
        invoice.date,
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
        invoiceData
      );
      
      return { success: true, id: invoice.id };
    } catch (error) {
      console.error('Error saving invoice:', error);
      return { success: false, error: error.message };
    }
  });

  // Update an existing invoice
  ipcMain.handle('db:updateInvoice', async (event, invoice) => {
    try {
      // Convert complex objects to JSON strings
      const invoiceData = JSON.stringify(invoice);
      
      const stmt = db.prepare(`
        UPDATE invoices SET
        number = ?, date = ?, subtotal = ?, taxAmount = ?, total = ?, 
        discount = ?, discountType = ?, paymentMethod = ?, cashierId = ?,
        cashierName = ?, status = ?, orderType = ?, tableNumber = ?, data = ?
        WHERE id = ?
      `);
      
      stmt.run(
        invoice.number,
        invoice.date,
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
        invoiceData,
        invoice.id
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error updating invoice:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = {
  setupInvoiceHandlers
};
