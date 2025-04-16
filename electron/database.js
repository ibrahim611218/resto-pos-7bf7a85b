
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

let db;

// Initialize the database
function initDatabase(app) {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'resto-pos.db');
  
  console.log('Database path:', dbPath);
  
  try {
    // Check if directory exists, if not create it
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    // Initialize the database
    db = new Database(dbPath);
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        date TEXT NOT NULL,
        subtotal REAL NOT NULL,
        taxAmount REAL NOT NULL,
        total REAL NOT NULL,
        discount REAL NOT NULL,
        discountType TEXT NOT NULL,
        paymentMethod TEXT NOT NULL,
        cashierId TEXT NOT NULL,
        cashierName TEXT NOT NULL,
        status TEXT NOT NULL,
        orderType TEXT NOT NULL,
        tableNumber TEXT,
        data TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS kitchen_orders (
        id TEXT PRIMARY KEY,
        invoiceId TEXT NOT NULL,
        status TEXT NOT NULL,
        items TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        completedAt TEXT,
        cashierName TEXT,
        notes TEXT
      );
      
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        nameAr TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT,
        image TEXT,
        taxable INTEGER NOT NULL,
        data TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        nameAr TEXT NOT NULL,
        image TEXT,
        data TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS settings (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        nameAr TEXT NOT NULL,
        taxNumber TEXT,
        address TEXT,
        addressAr TEXT,
        phone TEXT,
        email TEXT,
        taxRate REAL NOT NULL,
        taxIncluded INTEGER NOT NULL,
        invoiceNotesAr TEXT,
        data TEXT NOT NULL
      );
    `);
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

function getDatabase() {
  return db;
}

module.exports = {
  initDatabase,
  getDatabase
};
