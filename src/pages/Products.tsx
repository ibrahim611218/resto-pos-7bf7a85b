
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import ProductForm from "@/components/ProductForm";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import productService from "@/services/products/ProductService";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    const handleUpdate = () => {
      console.log("Products page detected update, refreshing...");
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('product-updated', handleUpdate);
    window.addEventListener('category-updated', handleUpdate);
    window.addEventListener('data-updated', handleUpdate);

    return () => {
      window.removeEventListener('product-updated', handleUpdate);
      window.removeEventListener('category-updated', handleUpdate);
      window.removeEventListener('data-updated', handleUpdate);
    };
  }, []);

  const handleEditProduct = (id: string) => {
    console.log(`Editing product with ID: ${id}`);
    navigate(`/products/edit/${id}`);
  };

  const handleDeleteProduct = async (id: string) => {
    const confirmMsg = isArabic
      ? "هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن الحذف."
      : "Are you sure you want to delete this product? This action cannot be undone.";
    if (window.confirm(confirmMsg)) {
      try {
        const result = await productService.deleteProduct(id);
        if (result) {
          toast({ 
            title: isArabic ? "تم حذف المنتج بنجاح" : "Product deleted successfully",
            variant: "default"
          });
        } else {
          toast({ 
            title: isArabic ? "تعذر حذف المنتج" : "Failed to delete product",
            variant: "destructive"
          });
        }
        setRefreshTrigger(v => v + 1);
      } catch (e) {
        toast({ 
          title: isArabic ? "حدث خطأ أثناء حذف المنتج" : "Error deleting product",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{isArabic ? "المنتجات" : "Products"}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">
            {isArabic ? "قائمة المنتجات" : "Products List"}
          </TabsTrigger>
          <TabsTrigger value="add">
            {isArabic ? "إضافة منتج" : "Add Product"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <ProductsGrid 
            viewMode={viewMode} 
            onViewModeChange={setViewMode} 
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            key={`products-grid-${refreshTrigger}`}  
          />
        </TabsContent>

        <TabsContent value="add">
          <ProductForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
