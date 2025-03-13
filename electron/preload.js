
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
  
  // License
  activateLicense: (licenseKey) => ipcRenderer.invoke('activate-license', licenseKey),
  getLicenseState: () => ipcRenderer.invoke('get-license-state'),
  deactivateLicense: () => ipcRenderer.invoke('deactivate-license'),
});
