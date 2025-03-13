
function setupProductHandlers(ipcMain, db) {
  // Get all products
  ipcMain.handle('db:getProducts', async () => {
    try {
      const stmt = db.prepare(`SELECT * FROM products`);
      const products = stmt.all();
      
      // Parse the data JSON field for each product
      return products.map(product => {
        try {
          return {
            ...product,
            data: JSON.parse(product.data)
          };
        } catch (e) {
          console.error('Error parsing product data:', e);
          return product;
        }
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
