import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Button } from "@/components/ui/button";
import { Plus, FolderInput } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import productService from "@/services/products/ProductService";
import { toast } from "@/hooks/use-toast";
import BulkCategoryTransfer from "@/features/products/components/BulkCategoryTransfer";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showBulkTransfer, setShowBulkTransfer] = useState(false);

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
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <div className="flex-shrink-0 p-3 sm:p-4 border-b bg-background">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold">{isArabic ? "المنتجات" : "Products"}</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none min-h-[44px]" onClick={() => setShowBulkTransfer(true)}>
              <FolderInput className={isArabic ? "ml-1" : "mr-1"} size={16} />
              <span className="text-xs sm:text-sm">{isArabic ? "نقل" : "Transfer"}</span>
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none min-h-[44px]" onClick={handleAddProduct}>
              <Plus className={isArabic ? "ml-1" : "mr-1"} size={16} />
              <span className="text-xs sm:text-sm">{isArabic ? "إضافة منتج" : "Add"}</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ProductsGrid 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          key={`products-grid-${refreshTrigger}`}  
        />
      </div>

      <BulkCategoryTransfer
        open={showBulkTransfer}
        onOpenChange={setShowBulkTransfer}
        onComplete={() => setRefreshTrigger(v => v + 1)}
      />
    </div>
  );
};

export default Products;
