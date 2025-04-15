
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

  // Add a new product
  ipcMain.handle('db:addProduct', async (event, product) => {
    try {
      // Convert complex objects to JSON strings
      const productData = JSON.stringify(product);
      
      const stmt = db.prepare(`
        INSERT INTO products (id, name, nameAr, price, category, image, taxable, data) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        product.id,
        product.name,
        product.nameAr,
        product.price || 0,
        product.categoryId,
        product.image || null,
        product.taxable ? 1 : 0,
        productData
      );
      
      return { success: true, id: product.id };
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false, error: error.message };
    }
  });

  // Update an existing product
  ipcMain.handle('db:updateProduct', async (event, product) => {
    try {
      // Convert complex objects to JSON strings
      const productData = JSON.stringify(product);
      
      const stmt = db.prepare(`
        UPDATE products SET
        name = ?, nameAr = ?, price = ?, category = ?, image = ?, taxable = ?, data = ?
        WHERE id = ?
      `);
      
      stmt.run(
        product.name,
        product.nameAr,
        product.price || 0,
        product.categoryId,
        product.image || null,
        product.taxable ? 1 : 0,
        productData,
        product.id
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = {
  setupProductHandlers
};
