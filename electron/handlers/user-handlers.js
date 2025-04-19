
function setupUserHandlers(ipcMain, db) {
  // Get all users
  ipcMain.handle('users:getAll', async () => {
    try {
      const stmt = db.prepare('SELECT * FROM users');
      const users = stmt.all();
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  });

  // Save a new user
  ipcMain.handle('users:save', async (event, user) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO users (id, name, email, role, password, isActive)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        user.id,
        user.name,
        user.email,
        user.role,
        user.password,
        user.isActive ? 1 : 0
      );
      
      return result;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  });

  // Update an existing user
  ipcMain.handle('users:update', async (event, user) => {
    try {
      const stmt = db.prepare(`
        UPDATE users 
        SET name = ?, email = ?, role = ?, isActive = ?
        WHERE id = ?
      `);
      
      const result = stmt.run(
        user.name,
        user.email,
        user.role,
        user.isActive ? 1 : 0,
        user.id
      );
      
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  });

  // Delete a user
  ipcMain.handle('users:delete', async (event, userId) => {
    try {
      const stmt = db.prepare('DELETE FROM users WHERE id = ?');
      const result = stmt.run(userId);
      
      // Also delete permissions
      try {
        const permStmt = db.prepare('DELETE FROM user_permissions WHERE user_id = ?');
        permStmt.run(userId);
      } catch (permError) {
        console.error('Error deleting user permissions:', permError);
      }
      
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  });

  // Update user permissions
  ipcMain.handle('users:updatePermissions', async (event, { userId, permissions }) => {
    try {
      // Transaction to replace permissions
      const transaction = db.transaction(() => {
        // Delete existing permissions
        const deleteStmt = db.prepare('DELETE FROM user_permissions WHERE user_id = ?');
        deleteStmt.run(userId);
        
        // Insert new permissions
        const insertStmt = db.prepare(
          'INSERT INTO user_permissions (user_id, permission) VALUES (?, ?)'
        );
        
        for (const permission of permissions) {
          insertStmt.run(userId, permission);
        }
      });
      
      transaction();
      return { success: true };
    } catch (error) {
      console.error('Error updating user permissions:', error);
      throw error;
    }
  });

  // Update user password
  ipcMain.handle('users:updatePassword', async (event, { userId, hashedPassword }) => {
    try {
      const stmt = db.prepare('UPDATE users SET password = ? WHERE id = ?');
      const result = stmt.run(hashedPassword, userId);
      return result;
    } catch (error) {
      console.error('Error updating user password:', error);
      throw error;
    }
  });

  // Get user permissions
  ipcMain.handle('users:getPermissions', async (event, userId) => {
    try {
      const stmt = db.prepare('SELECT permission FROM user_permissions WHERE user_id = ?');
      const permissions = stmt.all(userId);
      return permissions.map(p => p.permission);
    } catch (error) {
      console.error('Error getting user permissions:', error);
      throw error;
    }
  });
}

module.exports = {
  setupUserHandlers
};
