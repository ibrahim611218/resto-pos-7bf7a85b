
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import productService from "@/services/products/ProductService";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");

  // إضافة متغيّر عدد المنتجات (سيتم استخراجها من ProductsGrid مستقبلا لو أردت)
  // سنتركها مؤقتًا، كمرجع لما يحدث في المكون.

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
          // ProductsGrid will refresh itself upon receiving the 'product-updated' event.
        } else {
          toast({ 
            title: isArabic ? "تعذر حذف المنتج" : "Failed to delete product",
            variant: "destructive"
          });
        }
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
      <div className="flex-shrink-0 p-4 border-b bg-background">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            {isArabic ? "المنتجات" : "Products"}
            {/* رقم مؤقت بعد العنوان (يُفضل ربطه بحقلي المنتجات الحقيقيين لاحقًا) */}
            {/* <span className="ml-2 text-base text-red-500">(عدد المنتجات: )</span> */}
          </h1>
          <Button onClick={handleAddProduct}>
            <Plus className={isArabic ? "ml-2" : "mr-2"} size={16} />
            {isArabic ? "إضافة منتج" : "Add Product"}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ProductsGrid 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default Products;

