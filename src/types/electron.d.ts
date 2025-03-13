
// Type definitions for Electron integration
interface Window {
  db?: {
    query: (sql: string, params?: any) => Promise<any>;
    getInvoices: () => Promise<any[]>;
    saveInvoice: (invoice: any) => Promise<any>;
    updateInvoice: (invoice: any) => Promise<any>;
    getProducts: () => Promise<any[]>;
    getCategories: () => Promise<any[]>;
    addCategory: (category: any) => Promise<any>;
    updateCategory: (category: any) => Promise<any>;
    deleteCategory: (categoryId: string) => Promise<any>;
    getSettings: () => Promise<any>;
    saveSettings: (settings: any) => Promise<any>;
  };
}
