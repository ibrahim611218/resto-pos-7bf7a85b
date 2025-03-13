
// Product-specific handlers
function setupProductHandlers(ipcMain, db) {
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
}

module.exports = {
  setupProductHandlers
};
