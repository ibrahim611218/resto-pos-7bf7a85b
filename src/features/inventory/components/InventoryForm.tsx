
import React, { useState, useEffect } from "react";
import { InventoryItem, Language } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";

interface InventoryFormProps {
  existingItem: InventoryItem | null;
  onSubmit: (item: InventoryItem) => void;
  onCancel: () => void;
  language: Language;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  existingItem,
  onSubmit,
  onCancel,
  language,
}) => {
  const isArabic = language === "ar";
  const [formData, setFormData] = useState<Partial<InventoryItem>>(
    existingItem || {
      quantity: 0,
      lowStockThreshold: 5,
      unit: "piece",
      minLevel: 5,
      maxLevel: 50
    }
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load products and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        if (window.db) {
          const [productsData, categoriesData] = await Promise.all([
            window.db.getProducts(),
            window.db.getCategories()
          ]);
          setProducts(productsData);
          setCategories(categoriesData);
        } else {
          const productsData = productService.getProducts();
          const categoriesData = categoryService.getCategories();
          setProducts(productsData);
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error loading products/categories:', error);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (existingItem) {
      setFormData(existingItem);
    }
  }, [existingItem]);

  const handleProductChange = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setFormData({
        ...formData,
        productId,
        productName: product.name,
        productNameAr: product.nameAr,
        categoryId: product.categoryId,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "lowStockThreshold" || name === "minLevel" || name === "maxLevel" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId || formData.quantity === undefined || formData.lowStockThreshold === undefined) {
      return;
    }

    const newItem: InventoryItem = {
      id: existingItem?.id || `inv-${Date.now()}`,
      productId: formData.productId!,
      productName: formData.productName!,
      productNameAr: formData.productNameAr,
      quantity: formData.quantity,
      lowStockThreshold: formData.lowStockThreshold,
      lastUpdated: new Date().toISOString(),
      categoryId: formData.categoryId!,
      unit: formData.unit || "piece",
      minLevel: formData.minLevel || 5,
      maxLevel: formData.maxLevel || 50
    };

    onSubmit(newItem);
  };

  // Group products by category
  const productsByCategory: Record<string, typeof products> = {};
  products.forEach(product => {
    if (!productsByCategory[product.categoryId]) {
      productsByCategory[product.categoryId] = [];
    }
    productsByCategory[product.categoryId].push(product);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!existingItem && (
        <div className="space-y-2">
          <Label htmlFor="productId">{isArabic ? "المنتج" : "Product"}</Label>
          <Select
            value={formData.productId}
            onValueChange={handleProductChange}
            required
          >
            <SelectTrigger id="productId">
              <SelectValue placeholder={isArabic ? "اختر المنتج" : "Select product"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <React.Fragment key={category.id}>
                  <SelectItem value={category.id} disabled className="font-bold bg-muted">
                    {isArabic ? category.nameAr || category.name : category.name}
                  </SelectItem>
                  
                  {productsByCategory[category.id]?.map(product => (
                    <SelectItem key={product.id} value={product.id} className="pl-6">
                      {isArabic ? product.nameAr || product.name : product.name}
                    </SelectItem>
                  ))}
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="quantity">{isArabic ? "الكمية" : "Quantity"}</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="0"
          required
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lowStockThreshold">
          {isArabic ? "حد التنبيه بانخفاض المخزون" : "Low Stock Threshold"}
        </Label>
        <Input
          id="lowStockThreshold"
          name="lowStockThreshold"
          type="number"
          min="1"
          required
          value={formData.lowStockThreshold}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          {isArabic ? "إلغاء" : "Cancel"}
        </Button>
        <Button type="submit">
          {existingItem
            ? isArabic
              ? "تحديث"
              : "Update"
            : isArabic
            ? "إضافة"
            : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default InventoryForm;
