import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import productService from "@/services/products/ProductService";
import { toast } from "sonner";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  const handleAddProduct = () => {
    console.log("Navigating to /products/add");
    navigate("/products/add");
  };

  const handleEditProduct = (id: string) => {
    console.log(`Navigating to edit product with ID: ${id}`);
    navigate(`/products/edit/${id}`);
  };

  const handleDeleteProduct = async (id: string) => {
    const confirmMsg = isArabic ? "هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن الحذف." : "Are you sure you want to delete this product? This action cannot be undone.";
    if (window.confirm(confirmMsg)) {
      try {
        const result = await productService.deleteProduct(id);
        if (result) {
          toast(isArabic ? "تم حذف المنتج بنجاح" : "Product deleted successfully", {
            description: isArabic ? "تم حذف المنتج بنجاح" : "The product has been deleted successfully",
          });
        } else {
          toast(isArabic ? "تعذر حذف المنتج" : "Failed to delete product", {
            description: isArabic ? "حدث خطأ أثناء محاولة حذف المنتج" : "An error occurred while trying to delete the product",
          });
        }
        setRefreshTrigger(v => v + 1);
      } catch (e) {
        toast(isArabic ? "حدث خطأ أثناء حذف المنتج" : "Error deleting product", {
          description: isArabic ? "حدث خطأ غير متوقع أثناء محاولة حذف المنتج" : "An unexpected error occurred while trying to delete the product",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isArabic ? "المنتجات" : "Products"}</h1>
        <Button onClick={handleAddProduct}>
          <Plus className={isArabic ? "ml-2" : "mr-2"} size={16} />
          {isArabic ? "إضافة منتج" : "Add Product"}
        </Button>
      </div>
      <ProductsGrid 
        viewMode={viewMode} 
        onViewModeChange={setViewMode} 
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        key={`products-grid-${refreshTrigger}`}  
      />
    </div>
  );
};

export default Products;
