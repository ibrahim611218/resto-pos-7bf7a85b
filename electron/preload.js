
const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC functions to the renderer process
contextBridge.exposeInMainWorld('db', {
  query: (sql, params) => ipcRenderer.invoke('db-query', { sql, params }),
  
  // Invoices
  getInvoices: () => ipcRenderer.invoke('get-invoices'),
  saveInvoice: (invoice) => ipcRenderer.invoke('save-invoice', invoice),
  updateInvoice: (invoice) => ipcRenderer.invoke('update-invoice', invoice),
  
  // Products
  getProducts: () => ipcRenderer.invoke('get-products'),
  
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings)
});
