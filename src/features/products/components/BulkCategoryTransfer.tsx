import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Product, Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface BulkCategoryTransferProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const BulkCategoryTransfer: React.FC<BulkCategoryTransferProps> = ({ open, onOpenChange, onComplete }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [targetCategoryId, setTargetCategoryId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories()
      ]);
      setProducts(fetchedProducts);
      setCategories(fetchedCategories.filter(c => !c.isDeleted));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: isArabic ? "خطأ في تحميل البيانات" : "Error loading data",
        variant: "destructive"
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleToggleProduct = (productId: string) => {
    const newSet = new Set(selectedProducts);
    if (newSet.has(productId)) {
      newSet.delete(productId);
    } else {
      newSet.add(productId);
    }
    setSelectedProducts(newSet);
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
    }
  };

  const handleTransfer = async () => {
    if (!targetCategoryId || selectedProducts.size === 0) {
      toast({
        title: isArabic ? "الرجاء اختيار التصنيف والمنتجات" : "Please select category and products",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatePromises = Array.from(selectedProducts).map((productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
          return productService.saveProduct({
            ...product,
            categoryId: targetCategoryId
          });
        }
        return Promise.resolve();
      });

      await Promise.all(updatePromises);

      toast({
        title: isArabic 
          ? `تم نقل ${selectedProducts.size} منتج بنجاح` 
          : `Successfully transferred ${selectedProducts.size} products`,
      });

      setSelectedProducts(new Set());
      setTargetCategoryId("");
      onComplete();
      onOpenChange(false);
    } catch (error) {
      console.error("Error transferring products:", error);
      toast({
        title: isArabic ? "حدث خطأ أثناء نقل المنتجات" : "Error transferring products",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "نقل المنتجات إلى تصنيف آخر" : "Transfer Products to Another Category"}
          </DialogTitle>
          <DialogDescription>
            {isArabic 
              ? "اختر المنتجات التي تريد نقلها والتصنيف المستهدف" 
              : "Select the products you want to transfer and the target category"}
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="space-y-4 flex-1 overflow-auto">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isArabic ? "التصنيف المستهدف" : "Target Category"}
                </label>
                <Select value={targetCategoryId} onValueChange={setTargetCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder={isArabic ? "اختر التصنيف" : "Select Category"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {isArabic && category.nameAr ? category.nameAr : category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">
                    {isArabic ? "المنتجات" : "Products"} ({selectedProducts.size}/{products.length})
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    {selectedProducts.size === products.length 
                      ? (isArabic ? "إلغاء الكل" : "Deselect All")
                      : (isArabic ? "تحديد الكل" : "Select All")}
                  </Button>
                </div>

                <div className="border rounded-md max-h-[300px] overflow-y-auto">
                  {products.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      {isArabic ? "لا توجد منتجات" : "No products available"}
                    </div>
                  ) : (
                    products.map(product => {
                      const category = categories.find(c => c.id === product.categoryId);
                      return (
                        <div
                          key={product.id}
                          className="flex items-center space-x-2 space-x-reverse p-3 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer"
                          onClick={() => handleToggleProduct(product.id)}
                        >
                          <Checkbox
                            checked={selectedProducts.has(product.id)}
                            onCheckedChange={() => handleToggleProduct(product.id)}
                          />
                          <div className="flex-1">
                            <div className="font-medium">
                              {isArabic && product.nameAr ? product.nameAr : product.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {isArabic ? "التصنيف: " : "Category: "}
                              {category 
                                ? (isArabic && category.nameAr ? category.nameAr : category.name)
                                : (isArabic ? "غير محدد" : "Not specified")}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {isArabic ? "إلغاء" : "Cancel"}
              </Button>
              <Button
                type="button"
                onClick={handleTransfer}
                disabled={isLoading || selectedProducts.size === 0 || !targetCategoryId}
              >
                {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                {isArabic ? "نقل المنتجات" : "Transfer Products"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkCategoryTransfer;
