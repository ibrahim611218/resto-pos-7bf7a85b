
import { Invoice } from "@/types";
import { BaseService, isElectron } from "../base/BaseService";

export interface IInvoiceService {
  getInvoices: () => Promise<Invoice[]>;
  saveInvoice: (invoice: Invoice) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateInvoice: (invoice: Invoice) => Promise<{ success: boolean; error?: string }>;
}

// Browser implementation for invoice operations
class BrowserInvoiceService extends BaseService implements IInvoiceService {
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
      
      // Trigger reports update
      window.dispatchEvent(new CustomEvent('invoice-created', { detail: invoice }));
      
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
      
      // Trigger reports update
      window.dispatchEvent(new CustomEvent('invoice-updated', { detail: invoice }));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating invoice in localStorage:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Electron implementation for invoice operations
class ElectronInvoiceService extends BaseService implements IInvoiceService {
  async getInvoices(): Promise<Invoice[]> {
    try {
      if (isElectron()) {
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
      if (isElectron()) {
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
      if (isElectron()) {
        // @ts-ignore - window.db is defined in Electron's preload script
        return await window.db.updateInvoice(invoice);
      }
      return { success: false, error: 'Electron not available' };
    } catch (error) {
      console.error('Error updating invoice in Electron:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Create and export the appropriate service based on environment
// Since we're removing desktop functionality, always use BrowserInvoiceService
const invoiceService = new BrowserInvoiceService();

export default invoiceService;
