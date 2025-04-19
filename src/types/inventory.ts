
export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productNameAr?: string;
  quantity: number;
  unit?: string;
  minLevel?: number;
  maxLevel?: number;
  lowStockThreshold: number;
  lastUpdated: string;
  categoryId: string;
}
