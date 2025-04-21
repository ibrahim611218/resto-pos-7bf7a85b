
function setupCategoryHandlers(ipcMain, db) {
  // Get all categories
  ipcMain.handle('db:getCategories', async () => {
    try {
      const stmt = db.prepare(`SELECT * FROM categories`);
      const categories = stmt.all();
      
      // Parse the data JSON field for each category
      return categories.map(category => {
        try {
          const parsedData = JSON.parse(category.data || '{}');
          return {
            ...category,
            data: parsedData,
            isDeleted: parsedData.isDeleted || false
          };
        } catch (e) {
          console.error('Error parsing category data:', e);
          return {
            ...category,
            isDeleted: false
          };
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
      // Ensure isDeleted is false for new categories
      const categoryWithData = {
        ...category,
        isDeleted: false
      };
      
      // Convert complex objects to JSON strings
      const categoryData = JSON.stringify(categoryWithData);
      
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
  
  // Delete a category (soft delete by updating the isDeleted flag)
  ipcMain.handle('db:deleteCategory', async (event, categoryId) => {
    try {
      console.log(`Soft deleting category with ID: ${categoryId}`);
      
      // First get the current category
      const getStmt = db.prepare(`SELECT * FROM categories WHERE id = ?`);
      const category = getStmt.get(categoryId);
      
      if (!category) {
        return { success: false, error: "Category not found" };
      }
      
      // Parse the data, update the isDeleted flag
      let categoryData = {};
      try {
        categoryData = JSON.parse(category.data || '{}');
      } catch (e) {
        console.error('Error parsing category data:', e);
      }
      
      categoryData.isDeleted = true;
      
      // Update the category with the isDeleted flag
      const updateStmt = db.prepare(`
        UPDATE categories SET
        data = ?
        WHERE id = ?
      `);
      
      updateStmt.run(JSON.stringify(categoryData), categoryId);
      
      console.log(`Category ${categoryId} soft deleted`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Delete all categories (soft delete by updating the isDeleted flag)
  ipcMain.handle('db:deleteAllCategories', async () => {
    try {
      console.log(`Soft deleting all categories from database`);
      
      // Get all categories
      const getAllStmt = db.prepare(`SELECT * FROM categories`);
      const categories = getAllStmt.all();
      
      // Update each category with isDeleted flag
      const updateStmt = db.prepare(`
        UPDATE categories SET
        data = ?
        WHERE id = ?
      `);
      
      const updated = [];
      for (const category of categories) {
        let categoryData = {};
        try {
          categoryData = JSON.parse(category.data || '{}');
        } catch (e) {
          console.error('Error parsing category data:', e);
        }
        
        categoryData.isDeleted = true;
        
        updateStmt.run(JSON.stringify(categoryData), category.id);
        updated.push(category.id);
      }
      
      console.log(`All categories soft deleted: ${updated.length} categories`);
      return { success: true, changes: updated.length };
    } catch (error) {
      console.error('Error deleting all categories:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = {
  setupCategoryHandlers
};
