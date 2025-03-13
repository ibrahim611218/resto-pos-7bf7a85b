
import { useState, useEffect } from "react";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { InventoryItem } from "../types";
import { productIngredients, initialInventoryData } from "../data/inventory-data";

export const useInventoryData = () => {
  const { invoices } = useInvoices();
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  
  // Update inventory based on invoices
  useEffect(() => {
    // Start with a copy of the initial data
    const updatedInventory = initialInventoryData.map(item => ({
      ...item,
      originalQuantity: item.quantity // Save the original quantity
    }));
    
    // Update inventory based on sold products
    if (invoices && invoices.length > 0) {
      invoices.forEach(invoice => {
        // Determine the multiplier based on invoice status (refunded or not)
        const multiplier = invoice.status === "refunded" ? 1 : -1; // Add to inventory when refunded, subtract when sold
        
        invoice.items.forEach(item => {
          // Look up product ingredients
          const ingredients = productIngredients[item.productId];
          if (ingredients) {
            ingredients.forEach(ingredient => {
              // Find the ingredient in inventory
              const inventoryIndex = updatedInventory.findIndex(inv => inv.id === ingredient.ingredientId);
              if (inventoryIndex !== -1) {
                // Update the quantity in inventory
                updatedInventory[inventoryIndex].quantity += multiplier * ingredient.amount * item.quantity;
                updatedInventory[inventoryIndex].lastUpdated = new Date().toISOString().split('T')[0];
              }
            });
          }
        });
      });
    }
    
    // Update inventory state
    setInventoryData(updatedInventory);
  }, [invoices]);
  
  return {
    inventoryData
  };
};
