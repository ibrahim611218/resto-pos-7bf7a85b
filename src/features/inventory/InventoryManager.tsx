
import React, { useState, useEffect } from "react";
import { InventoryItem, Language } from "@/types";
import InventoryList from "./components/InventoryList";
import InventoryForm from "./components/InventoryForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import productService from "@/services/products/ProductService";

interface InventoryManagerProps {
  language: Language;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ language }) => {
  const isArabic = language === "ar";
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load inventory items from localStorage or initialize from products
  useEffect(() => {
    const loadInventory = async () => {
      setIsLoading(true);
      try {
        // Try to load existing inventory from localStorage
        const storedInventory = localStorage.getItem('inventory-items');
        let items: InventoryItem[] = [];
        
        if (storedInventory) {
          items = JSON.parse(storedInventory);
        }
        
        // Get all products
        const products = await productService.getProducts();
        
        // Find products that don't have inventory items yet
        const productIds = new Set(items.map(item => item.productId));
        const missingProducts = products.filter(product => !productIds.has(product.id));
        
        // Create inventory items for new products
        const newItems = missingProducts.map(product => ({
          id: `inv-${product.id}`,
          productId: product.id,
          productName: product.name,
          productNameAr: product.nameAr,
          quantity: 0,
          lowStockThreshold: 5,
          lastUpdated: new Date(),
          categoryId: product.categoryId,
        }));
        
        // Combine existing and new items
        const combinedItems = [...items, ...newItems];
        
        // Save back to localStorage
        localStorage.setItem('inventory-items', JSON.stringify(combinedItems));
        
        setInventoryItems(combinedItems);
      } catch (error) {
        console.error('Error loading inventory:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInventory();
  }, []);

  const saveInventoryItems = (items: InventoryItem[]) => {
    try {
      localStorage.setItem('inventory-items', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving inventory items:', error);
    }
  };

  const handleAddItem = (newItem: InventoryItem) => {
    const updatedItems = [...inventoryItems, newItem];
    setInventoryItems(updatedItems);
    saveInventoryItems(updatedItems);
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleEditItem = (updatedItem: InventoryItem) => {
    const updatedItems = inventoryItems.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setInventoryItems(updatedItems);
    saveInventoryItems(updatedItems);
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = inventoryItems.filter((item) => item.id !== id);
    setInventoryItems(updatedItems);
    saveInventoryItems(updatedItems);
  };

  const openEditForm = (item: InventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.productNameAr && item.productNameAr.includes(searchTerm))
  );

  return (
    <div className="container mx-auto py-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isArabic ? "إدارة المخزون" : "Inventory Management"}
        </h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="ml-2" size={16} />
          {isArabic ? "إضافة منتج للمخزون" : "Add Item"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <InventoryList
          items={filteredItems}
          onEdit={openEditForm}
          onDelete={handleDeleteItem}
          language={language}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? isArabic
                  ? "تعديل منتج في المخزون"
                  : "Edit Inventory Item"
                : isArabic
                ? "إضافة منتج للمخزون"
                : "Add Inventory Item"}
            </DialogTitle>
          </DialogHeader>
          <InventoryForm
            existingItem={editingItem}
            onSubmit={editingItem ? handleEditItem : handleAddItem}
            onCancel={() => setIsFormOpen(false)}
            language={language}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManager;
