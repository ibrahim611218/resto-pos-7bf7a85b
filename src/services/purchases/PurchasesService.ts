
import { PurchaseInvoice, Supplier } from "@/types";
import { BaseService } from "../base/BaseService";
import { v4 as uuidv4 } from 'uuid';

export interface IPurchasesService {
  getPurchaseInvoices: () => Promise<PurchaseInvoice[]>;
  getPurchaseInvoiceById: (id: string) => Promise<PurchaseInvoice | null>;
  savePurchaseInvoice: (invoice: PurchaseInvoice) => Promise<boolean>;
  updatePurchaseInvoice: (invoice: PurchaseInvoice) => Promise<boolean>;
  deletePurchaseInvoice: (id: string) => Promise<boolean>;
  getSuppliers: () => Promise<Supplier[]>;
  saveSupplier: (supplier: Supplier) => Promise<boolean>;
  deleteSupplier: (id: string) => Promise<boolean>;
}

class BrowserPurchasesService extends BaseService implements IPurchasesService {
  private purchasesKey = 'stored-purchases';
  private suppliersKey = 'stored-suppliers';
  
  async getPurchaseInvoices(): Promise<PurchaseInvoice[]> {
    try {
      const storedPurchases = localStorage.getItem(this.purchasesKey);
      if (!storedPurchases) return [];
      
      const purchases: PurchaseInvoice[] = JSON.parse(storedPurchases);
      return purchases.map(purchase => ({
        ...purchase,
        date: new Date(purchase.date),
        createdAt: new Date(purchase.createdAt)
      }));
    } catch (error) {
      console.error('Error getting purchase invoices:', error);
      return [];
    }
  }
  
  async getPurchaseInvoiceById(id: string): Promise<PurchaseInvoice | null> {
    try {
      const purchases = await this.getPurchaseInvoices();
      const purchase = purchases.find(p => p.id === id);
      return purchase || null;
    } catch (error) {
      console.error('Error getting purchase invoice:', error);
      return null;
    }
  }
  
  async savePurchaseInvoice(invoice: PurchaseInvoice): Promise<boolean> {
    try {
      const purchases = await this.getPurchaseInvoices();
      
      // Generate ID and invoice number if it's a new purchase
      const isNew = !invoice.id;
      if (!invoice.id) {
        invoice.id = uuidv4();
        invoice.invoiceNumber = `P-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(purchases.length + 1).padStart(3, '0')}`;
        invoice.createdAt = new Date();
      }
      
      // Check if it already exists
      const existingIndex = purchases.findIndex(p => p.id === invoice.id);
      
      if (existingIndex >= 0) {
        purchases[existingIndex] = invoice;
      } else {
        purchases.push(invoice);
      }
      
      localStorage.setItem(this.purchasesKey, JSON.stringify(purchases));
      
      // Update inventory
      this.updateInventory(invoice);
      
      // Trigger reports update
      window.dispatchEvent(new CustomEvent(isNew ? 'purchase-created' : 'purchase-updated', { detail: invoice }));
      
      return true;
    } catch (error) {
      console.error('Error saving purchase invoice:', error);
      return false;
    }
  }
  
  async updatePurchaseInvoice(invoice: PurchaseInvoice): Promise<boolean> {
    return this.savePurchaseInvoice(invoice);
  }
  
  async deletePurchaseInvoice(id: string): Promise<boolean> {
    try {
      const purchases = await this.getPurchaseInvoices();
      const filteredPurchases = purchases.filter(p => p.id !== id);
      
      localStorage.setItem(this.purchasesKey, JSON.stringify(filteredPurchases));
      return true;
    } catch (error) {
      console.error('Error deleting purchase invoice:', error);
      return false;
    }
  }
  
  async getSuppliers(): Promise<Supplier[]> {
    try {
      const storedSuppliers = localStorage.getItem(this.suppliersKey);
      if (!storedSuppliers) return [];
      
      return JSON.parse(storedSuppliers);
    } catch (error) {
      console.error('Error getting suppliers:', error);
      return [];
    }
  }
  
  async saveSupplier(supplier: Supplier): Promise<boolean> {
    try {
      const suppliers = await this.getSuppliers();
      
      // Generate ID if it's a new supplier
      if (!supplier.id) {
        supplier.id = uuidv4();
      }
      
      // Check if it already exists
      const existingIndex = suppliers.findIndex(s => s.id === supplier.id);
      
      if (existingIndex >= 0) {
        suppliers[existingIndex] = supplier;
      } else {
        suppliers.push(supplier);
      }
      
      localStorage.setItem(this.suppliersKey, JSON.stringify(suppliers));
      return true;
    } catch (error) {
      console.error('Error saving supplier:', error);
      return false;
    }
  }
  
  async deleteSupplier(id: string): Promise<boolean> {
    try {
      const suppliers = await this.getSuppliers();
      const filteredSuppliers = suppliers.filter(s => s.id !== id);
      
      localStorage.setItem(this.suppliersKey, JSON.stringify(filteredSuppliers));
      return true;
    } catch (error) {
      console.error('Error deleting supplier:', error);
      return false;
    }
  }
  
  // Update inventory based on purchase invoice
  private async updateInventory(invoice: PurchaseInvoice): Promise<void> {
    try {
      const inventoryKey = 'stored-inventory';
      const storedInventory = localStorage.getItem(inventoryKey);
      const inventoryItems = storedInventory ? JSON.parse(storedInventory) : [];
      
      invoice.items.forEach(purchaseItem => {
        const existingItemIndex = inventoryItems.findIndex(
          (invItem: any) => invItem.productId === purchaseItem.productId
        );
        
        if (existingItemIndex >= 0) {
          // Update existing inventory item
          inventoryItems[existingItemIndex].quantity += purchaseItem.quantity;
          inventoryItems[existingItemIndex].lastUpdated = new Date().toISOString();
        } else {
          // Create new inventory item
          inventoryItems.push({
            id: uuidv4(),
            productId: purchaseItem.productId,
            productName: purchaseItem.productName,
            productNameAr: purchaseItem.productNameAr,
            quantity: purchaseItem.quantity,
            lowStockThreshold: 10, // Default value
            lastUpdated: new Date().toISOString(),
            categoryId: ''
          });
        }
      });
      
      localStorage.setItem(inventoryKey, JSON.stringify(inventoryItems));
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  }
}

const purchasesService = new BrowserPurchasesService();
export default purchasesService;
