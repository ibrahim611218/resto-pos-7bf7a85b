
import { InventoryItem } from "@/types";
import { sampleProducts } from "@/data/sampleData";

export const mockInventoryItems: InventoryItem[] = sampleProducts.slice(0, 8).map(product => ({
  id: `inv-${product.id}`,
  productId: product.id,
  productName: product.name,
  productNameAr: product.nameAr,
  quantity: Math.floor(Math.random() * 50),
  lowStockThreshold: 10,
  lastUpdated: new Date().toISOString(),
  categoryId: product.categoryId,
  unit: "piece",
  minLevel: 5,
  maxLevel: 50
}));

// Add some low stock items for demo
mockInventoryItems[0].quantity = 3;
mockInventoryItems[0].lowStockThreshold = 5;

mockInventoryItems[2].quantity = 0;
mockInventoryItems[2].lowStockThreshold = 5;
