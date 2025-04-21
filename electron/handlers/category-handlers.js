
function setupCategoryHandlers(ipcMain, db) {
  // Get all categories
  ipcMain.handle('db:getCategories', async () => {
    try {
      const stmt = db.prepare(`SELECT * FROM categories`);
      const categories = stmt.all();
      
      // Parse the data JSON field for each category
      return categories.map(category => {
        try {
          return {
            ...category,
            data: JSON.parse(category.data)
          };
        } catch (e) {
          console.error('Error parsing category data:', e);
          return category;
        }
      });
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  });
  
  // Add a new category
  ipcMain.handle('db:addCategory', async (event, category) => {
    try {
      // Convert complex objects to JSON strings
      const categoryData = JSON.stringify(category);
      
      const stmt = db.prepare(`
        INSERT INTO categories (id, name, nameAr, image, data) 
        VALUES (?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        category.id,
        category.name,
        category.nameAr,
        category.image || null,
        categoryData
      );
      
      return { success: true, id: category.id };
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Update an existing category
  ipcMain.handle('db:updateCategory', async (event, category) => {
    try {
      // Convert complex objects to JSON strings
      const categoryData = JSON.stringify(category);
      
      const stmt = db.prepare(`
        UPDATE categories SET
        name = ?, nameAr = ?, image = ?, data = ?
        WHERE id = ?
      `);
      
      stmt.run(
        category.name,
        category.nameAr,
        category.image || null,
        categoryData,
        category.id
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error updating category:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Delete a category
  ipcMain.handle('db:deleteCategory', async (event, categoryId) => {
    try {
      console.log(`Deleting category with ID: ${categoryId}`);
      const stmt = db.prepare(`DELETE FROM categories WHERE id = ?`);
      const result = stmt.run(categoryId);
      
      console.log(`Category deletion result:`, result);
      return { success: true, changes: result.changes };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Delete all categories
  ipcMain.handle('db:deleteAllCategories', async () => {
    try {
      console.log(`Deleting all categories from database`);
      const stmt = db.prepare(`DELETE FROM categories`);
      const result = stmt.run();
      
      console.log(`All categories deletion result:`, result);
      return { success: true, changes: result.changes };
    } catch (error) {
      console.error('Error deleting all categories:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = {
  setupCategoryHandlers
};
