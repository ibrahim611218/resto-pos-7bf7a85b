
function setupQueryHandler(ipcMain, db) {
  // Generic query handler for custom SQL queries
  ipcMain.handle('db:query', async (event, sql, params = []) => {
    try {
      console.log('Executing query:', sql);
      console.log('With params:', params);
      
      // Determine if this is a select query or a modification query
      const isSelectQuery = sql.trim().toLowerCase().startsWith('select');
      
      if (isSelectQuery) {
        const stmt = db.prepare(sql);
        if (params && params.length > 0) {
          return stmt.all(...params);
        } else {
          return stmt.all();
        }
      } else {
        const stmt = db.prepare(sql);
        if (params && params.length > 0) {
          return stmt.run(...params);
        } else {
          return stmt.run();
        }
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  });
}

module.exports = {
  setupQueryHandler
};
