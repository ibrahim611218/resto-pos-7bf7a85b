
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InventoryItem, Language } from "@/types";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";
import { v4 as uuidv4 } from "uuid";

interface InventoryFormProps {
  existingItem?: InventoryItem | null;
  onSubmit: (item: InventoryItem) => void;
  onCancel: () => void;
  language: Language;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  existingItem,
  onSubmit,
  onCancel,
  language
}) => {
  const isArabic = language === "ar";
  
  const [inventoryItem, setInventoryItem] = useState<InventoryItem>({
    id: existingItem?.id || uuidv4(),
    productId: existingItem?.productId || "",
    productName: existingItem?.productName || "",
    productNameAr: existingItem?.productNameAr || "",
    quantity: existingItem?.quantity || 0,
    unit: existingItem?.unit || "piece",
    minLevel: existingItem?.minLevel || 5,
    maxLevel: existingItem?.maxLevel || 50,
    lowStockThreshold: existingItem?.lowStockThreshold || 5,
    lastUpdated: existingItem?.lastUpdated || new Date().toISOString(),
    categoryId: existingItem?.categoryId || "",
  });

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getCategories();
        setAllCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInventoryItem(prev => ({
      ...prev,
      [name]: name.includes('quantity') || name.includes('Level') || name.includes('Threshold') 
        ? Number(value) 
        : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setInventoryItem(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "productId") {
      const selectedProduct = allProducts.find(product => product.id === value);
      if (selectedProduct) {
        setInventoryItem(prev => ({
          ...prev,
          productName: selectedProduct.name,
          productNameAr: selectedProduct.nameAr || "",
          categoryId: selectedProduct.categoryId
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inventoryItem);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="productId">{isArabic ? "المنتج" : "Product"}</Label>
            <Select 
              onValueChange={(value) => handleSelectChange("productId", value)}
              value={inventoryItem.productId} 
              disabled={!!existingItem}
            >
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? "اختر منتج" : "Select a product"} />
              </SelectTrigger>
              <SelectContent>
                {allProducts.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {isArabic ? product.nameAr || product.name : product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">{isArabic ? "الكمية" : "Quantity"}</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={inventoryItem.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="unit">{isArabic ? "الوحدة" : "Unit"}</Label>
            <Input
              type="text"
              id="unit"
              name="unit"
              value={inventoryItem.unit}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="minLevel">{isArabic ? "الحد الأدنى" : "Min. Level"}</Label>
            <Input
              type="number"
              id="minLevel"
              name="minLevel"
              value={inventoryItem.minLevel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="maxLevel">{isArabic ? "الحد الأقصى" : "Max. Level"}</Label>
            <Input
              type="number"
              id="maxLevel"
              name="maxLevel"
              value={inventoryItem.maxLevel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="lowStockThreshold">{isArabic ? "تنبيه المخزون المنخفض" : "Low Stock Threshold"}</Label>
            <Input
              type="number"
              id="lowStockThreshold"
              name="lowStockThreshold"
              value={inventoryItem.lowStockThreshold}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button type="submit">
            {isArabic ? "حفظ" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
