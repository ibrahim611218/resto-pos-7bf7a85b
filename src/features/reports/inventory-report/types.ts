
/**
 * Represents an inventory item
 */
export interface InventoryItem {
  id: string;
  name: string; 
  productName?: string; // Added for compatibility
  productNameAr?: string; // Added for Arabic name
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
  originalQuantity?: number; // The original quantity before sales
}
