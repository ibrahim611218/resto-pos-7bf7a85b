
const { contextBridge, ipcRenderer } = require('electron');

// Expose database API to renderer process
contextBridge.exposeInMainWorld('db', {
  // Generic query method
  query: (sql, params) => ipcRenderer.invoke('db:query', sql, params),
  
  // Invoices
  getInvoices: () => ipcRenderer.invoke('db:getInvoices'),
  saveInvoice: (invoice) => ipcRenderer.invoke('db:saveInvoice', invoice),
  updateInvoice: (invoice) => ipcRenderer.invoke('db:updateInvoice', invoice),
  
  // Products
  getProducts: () => ipcRenderer.invoke('db:getProducts'),
  
  // Categories
  getCategories: () => ipcRenderer.invoke('db:getCategories'),
  addCategory: (category) => ipcRenderer.invoke('db:addCategory', category),
  updateCategory: (category) => ipcRenderer.invoke('db:updateCategory', category),
  deleteCategory: (categoryId) => ipcRenderer.invoke('db:deleteCategory', categoryId),
  
  // Settings
  getSettings: () => ipcRenderer.invoke('db:getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('db:saveSettings', settings),
});

// Expose electron API for license management
contextBridge.exposeInMainWorld('electron', {
  invoke: (channel, ...args) => {
    const validChannels = [
      'license:getActivated',
      'license:activate', 
      'license:generate',
      'license:getAll'
    ];
    
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, ...args);
    }
    
    throw new Error(`Unauthorized IPC channel: ${channel}`);
  }
});
