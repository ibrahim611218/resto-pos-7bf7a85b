
// Invoice-specific handlers
function setupInvoiceHandlers(ipcMain, db) {
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
        paymentMethod, cashierId, cashierName, status, orderType, tableNumber, paidAmount, remainingAmount, data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        invoice.paidAmount || invoice.total,
        invoice.remainingAmount || 0,
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
          paidAmount = ?,
          remainingAmount = ?,
          data = ?
        WHERE id = ?
      `);
      
      stmt.run(
        invoice.status,
        invoice.paidAmount || invoice.total,
        invoice.remainingAmount || 0,
        JSON.stringify(invoice),
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
