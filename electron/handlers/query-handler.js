
// Generic query handler
function setupQueryHandler(ipcMain, db) {
  // General query handler
  ipcMain.handle('db-query', async (event, { sql, params }) => {
    try {
      const stmt = db.prepare(sql);
      if (sql.trim().toLowerCase().startsWith('select')) {
        return stmt.all(params);
      } else {
        return stmt.run(params);
      }
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  });
}

module.exports = {
  setupQueryHandler
};
