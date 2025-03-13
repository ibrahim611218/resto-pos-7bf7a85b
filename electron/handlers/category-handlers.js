
// Category-specific handlers
function setupCategoryHandlers(ipcMain, db) {
  // Get all categories
  ipcMain.handle('get-categories', async () => {
    try {
      const categories = db.prepare('SELECT * FROM categories').all();
      return categories.map(category => {
        const fullData = JSON.parse(category.data);
        return { ...fullData, id: category.id };
      });
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  });
  
  // Add a new category
  ipcMain.handle('add-category', async (event, category) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO categories (id, name, nameAr, image, data)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        category.id,
        category.name,
        category.nameAr || '',
        category.image || '',
        JSON.stringify(category)
      );
      
      return { success: true, id: category.id };
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Update existing category
  ipcMain.handle('update-category', async (event, category) => {
    try {
      const stmt = db.prepare(`
        UPDATE categories SET
          name = ?,
          nameAr = ?,
          image = ?,
          data = ?
        WHERE id = ?
      `);
      
      stmt.run(
        category.name,
        category.nameAr || '',
        category.image || '',
        JSON.stringify(category),
        category.id
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error updating category:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Delete category
  ipcMain.handle('delete-category', async (event, categoryId) => {
    try {
      // First, check if there are any products using this category
      const products = db.prepare('SELECT * FROM products WHERE category = ?').all(categoryId);
      
      if (products.length > 0) {
        return { 
          success: false, 
          error: 'Cannot delete category: it is being used by products', 
          productsCount: products.length 
        };
      }
      
      // If no products are using it, delete the category
      const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
      const result = stmt.run(categoryId);
      
      return { 
        success: result.changes > 0, 
        deleted: result.changes > 0 
      };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = {
  setupCategoryHandlers
};
