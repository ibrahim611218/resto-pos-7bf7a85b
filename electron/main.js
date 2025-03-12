
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const Database = require('better-sqlite3');

let mainWindow;
let db;

// Initialize the database
function initDatabase() {
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

// IPC handlers for database operations
function setupIpcHandlers() {
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
  
  // Get all invoices
  ipcMain.handle('get-invoices', async () => {
    try {
      const invoices = db.prepare('SELECT * FROM invoices ORDER BY date DESC').all();
      return invoices.map(invoice => {
        const fullData = JSON.parse(invoice.data);
        return { ...fullData, id: invoice.id, number: invoice.number };
      });
    } catch (error) {
      console.error('Error getting invoices:', error);
      return [];
    }
  });
  
  // Save invoice
  ipcMain.handle('save-invoice', async (event, invoice) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO invoices (id, number, date, subtotal, taxAmount, total, discount, discountType, 
        paymentMethod, cashierId, cashierName, status, orderType, tableNumber, data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        invoice.id,
        invoice.number,
        invoice.date.toString(),
        invoice.subtotal,
        invoice.taxAmount,
        invoice.total,
        invoice.discount,
        invoice.discountType,
        invoice.paymentMethod,
        invoice.cashierId,
        invoice.cashierName,
        invoice.status,
        invoice.orderType,
        invoice.tableNumber || null,
        JSON.stringify(invoice)
      );
      
      return { success: true, id: invoice.id };
    } catch (error) {
      console.error('Error saving invoice:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Update invoice (for refunds, etc.)
  ipcMain.handle('update-invoice', async (event, invoice) => {
    try {
      const stmt = db.prepare(`
        UPDATE invoices SET 
          status = ?,
          data = ?
        WHERE id = ?
      `);
      
      stmt.run(
        invoice.status,
        JSON.stringify(invoice),
        invoice.id
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error updating invoice:', error);
      return { success: false, error: error.message };
    }
  });

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

  // Get settings
  ipcMain.handle('get-settings', async () => {
    try {
      const settings = db.prepare('SELECT * FROM settings LIMIT 1').get();
      if (settings) {
        return JSON.parse(settings.data);
      } else {
        // Return default settings if none exist
        return {
          name: "مطعم الذواق",
          nameAr: "مطعم الذواق",
          taxNumber: "300000000000003",
          address: "الرياض، المملكة العربية السعودية",
          addressAr: "الرياض، المملكة العربية السعودية",
          phone: "966500000000",
          email: "info@example.com",
          taxRate: 15,
          taxIncluded: false,
          invoiceNotesAr: "شكراً لزيارتكم"
        };
      }
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  });
  
  // Save settings
  ipcMain.handle('save-settings', async (event, settings) => {
    try {
      // First check if settings exist
      const existingSettings = db.prepare('SELECT * FROM settings LIMIT 1').get();
      
      if (existingSettings) {
        // Update existing settings
        const stmt = db.prepare(`
          UPDATE settings SET
            name = ?,
            nameAr = ?,
            taxNumber = ?,
            address = ?,
            addressAr = ?,
            phone = ?,
            email = ?,
            taxRate = ?,
            taxIncluded = ?,
            invoiceNotesAr = ?,
            data = ?
          WHERE id = ?
        `);
        
        stmt.run(
          settings.name,
          settings.nameAr,
          settings.taxNumber,
          settings.address,
          settings.addressAr,
          settings.phone,
          settings.email,
          settings.taxRate,
          settings.taxIncluded ? 1 : 0,
          settings.invoiceNotesAr,
          JSON.stringify(settings),
          existingSettings.id
        );
      } else {
        // Insert new settings
        const stmt = db.prepare(`
          INSERT INTO settings (id, name, nameAr, taxNumber, address, addressAr, phone, email, taxRate, taxIncluded, invoiceNotesAr, data)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run(
          'settings-1',
          settings.name,
          settings.nameAr,
          settings.taxNumber,
          settings.address,
          settings.addressAr,
          settings.phone,
          settings.email,
          settings.taxRate,
          settings.taxIncluded ? 1 : 0,
          settings.invoiceNotesAr,
          JSON.stringify(settings)
        );
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error saving settings:', error);
      return { success: false, error: error.message };
    }
  });
}

function createWindow() {
  // Initialize database first
  const dbInitialized = initDatabase();
  if (!dbInitialized) {
    console.error('Failed to initialize database, exiting');
    app.quit();
    return;
  }
  
  // Set up IPC handlers for database communication
  setupIpcHandlers();
  
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  // Load the app
  const startUrl = isDev
    ? 'http://localhost:8080' // Development URL
    : `file://${path.join(__dirname, '../dist/index.html')}`; // Production URL
  
  mainWindow.loadURL(startUrl);
  
  // Open DevTools in development mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
