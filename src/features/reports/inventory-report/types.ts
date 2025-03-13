
/**
 * Represents an inventory item
 */
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
  originalQuantity?: number; // The original quantity before sales
}
