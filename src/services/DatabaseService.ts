
import { Invoice, Product, Category, BusinessSettings } from "@/types";

// Define a type for our database service
export interface IDatabaseService {
  // Invoices
  getInvoices: () => Promise<Invoice[]>;
  saveInvoice: (invoice: Invoice) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateInvoice: (invoice: Invoice) => Promise<{ success: boolean; error?: string }>;
  
  // Settings
  getSettings: () => Promise<BusinessSettings>;
  saveSettings: (settings: BusinessSettings) => Promise<{ success: boolean; error?: string }>;
}

class BrowserDatabaseService implements IDatabaseService {
  async getInvoices(): Promise<Invoice[]> {
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        return JSON.parse(storedInvoices);
      }
      return [];
    } catch (error) {
      console.error('Error getting invoices from localStorage:', error);
      return [];
    }
  }

  async saveInvoice(invoice: Invoice): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const storedInvoices = localStorage.getItem('invoices');
      let invoices = storedInvoices ? JSON.parse(storedInvoices) : [];
      invoices = [invoice, ...invoices];
      localStorage.setItem('invoices', JSON.stringify(invoices));
      return { success: true, id: invoice.id };
    } catch (error) {
      console.error('Error saving invoice to localStorage:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async updateInvoice(invoice: Invoice): Promise<{ success: boolean; error?: string }> {
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (!storedInvoices) {
        return { success: false, error: 'No invoices found' };
      }
      
      let invoices = JSON.parse(storedInvoices);
      const index = invoices.findIndex((inv: Invoice) => inv.id === invoice.id);
      
      if (index === -1) {
        return { success: false, error: 'Invoice not found' };
      }
      
      invoices[index] = invoice;
      localStorage.setItem('invoices', JSON.stringify(invoices));
      return { success: true };
    } catch (error) {
      console.error('Error updating invoice in localStorage:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async getSettings(): Promise<BusinessSettings> {
    try {
      const storedSettings = localStorage.getItem('businessSettings');
      if (storedSettings) {
        return JSON.parse(storedSettings);
      }
      
      // Return default settings
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
    } catch (error) {
      console.error('Error getting settings from localStorage:', error);
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
  }

  async saveSettings(settings: BusinessSettings): Promise<{ success: boolean; error?: string }> {
    try {
      localStorage.setItem('businessSettings', JSON.stringify(settings));
      return { success: true };
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

class ElectronDatabaseService implements IDatabaseService {
  private isElectron(): boolean {
    // @ts-ignore - window.db is defined in Electron's preload script
    return !!window.db;
  }

  async getInvoices(): Promise<Invoice[]> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.getInvoices();
      }
      return [];
    } catch (error) {
      console.error('Error getting invoices from Electron:', error);
      return [];
    }
  }

  async saveInvoice(invoice: Invoice): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.saveInvoice(invoice);
      }
      return { success: false, error: 'Electron not available' };
    } catch (error) {
      console.error('Error saving invoice in Electron:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async updateInvoice(invoice: Invoice): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.updateInvoice(invoice);
      }
      return { success: false, error: 'Electron not available' };
    } catch (error) {
      console.error('Error updating invoice in Electron:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async getSettings(): Promise<BusinessSettings> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.getSettings();
      }
      
      // Return default if Electron is not available
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
    } catch (error) {
      console.error('Error getting settings from Electron:', error);
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
  }

  async saveSettings(settings: BusinessSettings): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.saveSettings(settings);
      }
      return { success: false, error: 'Electron not available' };
    } catch (error) {
      console.error('Error saving settings in Electron:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Function to determine if we're running in Electron
const isElectron = (): boolean => {
  // @ts-ignore - window.db is defined in Electron's preload script
  return !!window.db;
};

// Create and export the appropriate service based on environment
let databaseService: IDatabaseService;

if (isElectron()) {
  databaseService = new ElectronDatabaseService();
} else {
  databaseService = new BrowserDatabaseService();
}

export default databaseService;
