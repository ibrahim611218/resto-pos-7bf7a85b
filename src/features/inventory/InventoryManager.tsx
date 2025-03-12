import React, { useState, useEffect } from "react";
import { InventoryItem, Language, Product } from "@/types";
import InventoryList from "./components/InventoryList";
import InventoryForm from "./components/InventoryForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockInventoryItems } from "./data/mockInventory";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { sampleProducts } from "@/data/sampleData";

interface InventoryManagerProps {
  language: Language;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ language }) => {
  const isArabic = language === "ar";
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(() => {
    const existingItems = mockInventoryItems;
    
    const productIds = new Set(existingItems.map(item => item.productId));
    const missingProducts = sampleProducts.filter(product => !productIds.has(product.id));
    
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
    
    return [...existingItems, ...newItems];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = (newItem: InventoryItem) => {
    setInventoryItems([...inventoryItems, newItem]);
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleEditItem = (updatedItem: InventoryItem) => {
    setInventoryItems(
      inventoryItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
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

      <InventoryList
        items={filteredItems}
        onEdit={openEditForm}
        onDelete={handleDeleteItem}
        language={language}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

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
