
import { Invoice } from "@/types";
import { BaseService, isElectron, isCapacitor } from "../base/BaseService";

export interface IInvoiceService {
  getInvoices: () => Promise<Invoice[]>;
  saveInvoice: (invoice: Invoice) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateInvoice: (invoice: Invoice) => Promise<{ success: boolean; error?: string }>;
}

// Browser implementation for invoice operations
class BrowserInvoiceService extends BaseService implements IInvoiceService {
  private readonly STORAGE_KEY = 'invoices';
  
  async getInvoices(): Promise<Invoice[]> {
    try {
      const storedInvoices = localStorage.getItem(this.STORAGE_KEY);
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
      const storedInvoices = localStorage.getItem(this.STORAGE_KEY);
      let invoices = storedInvoices ? JSON.parse(storedInvoices) : [];
      invoices = [invoice, ...invoices];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(invoices));
      
      // Dispatch update event for real-time updates
      window.dispatchEvent(new CustomEvent('invoice-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      
      return { success: true, id: invoice.id };
    } catch (error) {
      console.error('Error saving invoice to localStorage:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async updateInvoice(invoice: Invoice): Promise<{ success: boolean; error?: string }> {
    try {
      const storedInvoices = localStorage.getItem(this.STORAGE_KEY);
      if (!storedInvoices) {
        return { success: false, error: 'No invoices found' };
      }
      
      let invoices = JSON.parse(storedInvoices);
      const index = invoices.findIndex((inv: Invoice) => inv.id === invoice.id);
      
      if (index === -1) {
        return { success: false, error: 'Invoice not found' };
      }
      
      invoices[index] = invoice;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(invoices));
      
      // Dispatch update event for real-time updates
      window.dispatchEvent(new CustomEvent('invoice-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating invoice in localStorage:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

// Mobile Native implementation (same as browser in this case, but could be extended)
class MobileInvoiceService extends BrowserInvoiceService {
  // For now we'll use the browser implementation with localStorage
  // This could be extended to use native storage APIs if needed
}

// Create and export the appropriate service based on environment
const invoiceService = isCapacitor() 
  ? new MobileInvoiceService() 
  : new BrowserInvoiceService();

export default invoiceService;
