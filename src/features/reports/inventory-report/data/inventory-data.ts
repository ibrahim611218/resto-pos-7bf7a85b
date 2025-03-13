
import { InventoryItem } from "../types";

// Initial inventory data
export const initialInventoryData: InventoryItem[] = [
  { id: "1", name: "دجاج", quantity: 25, unit: "كيلو", reorderLevel: 10, lastUpdated: "2023-08-10" },
  { id: "2", name: "لحم بقري", quantity: 15, unit: "كيلو", reorderLevel: 5, lastUpdated: "2023-08-12" },
  { id: "3", name: "أرز", quantity: 50, unit: "كيلو", reorderLevel: 15, lastUpdated: "2023-08-05" },
  { id: "4", name: "زيت", quantity: 30, unit: "لتر", reorderLevel: 10, lastUpdated: "2023-08-07" },
  { id: "5", name: "طماطم", quantity: 20, unit: "كيلو", reorderLevel: 8, lastUpdated: "2023-08-11" },
];

// Map connecting product IDs to ingredients
export const productIngredients: Record<string, { ingredientId: string, amount: number }[]> = {
  "product1": [
    { ingredientId: "1", amount: 0.5 }, // دجاج
    { ingredientId: "3", amount: 0.25 } // أرز
  ],
  "product2": [
    { ingredientId: "2", amount: 0.3 }, // لحم بقري
    { ingredientId: "5", amount: 0.2 }  // طماطم
  ],
  "product3": [
    { ingredientId: "4", amount: 0.1 }, // زيت
    { ingredientId: "5", amount: 0.15 } // طماطم
  ]
};
