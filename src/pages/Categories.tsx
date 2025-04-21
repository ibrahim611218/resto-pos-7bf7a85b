
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Plus, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import { Category } from "@/types";
import ViewToggle, { ViewMode } from "@/components/ui-custom/ViewToggle";
import categoryService from "@/services/categories/CategoryService";

const Categories = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Check if running in electron environment
        if (typeof window !== "undefined" && window.db) {
          const result = await window.db.getCategories();
          // Filter out deleted categories
          const activeCategories = result.filter((cat: Category) => !cat.isDeleted);
          setCategories(activeCategories || []);
        } else {
          // In browser mode, use sample data but filter out deleted ones
          console.log("Running in browser mode - using sample data");
          const categoriesData = await categoryService.getCategories();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error(isArabic ? "حدث خطأ أثناء تحميل التصنيفات" : "Error loading categories");
        
        // Fallback to sample data
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    // Add event listener to handle category updates
    const handleCategoryUpdated = () => {
      fetchCategories();
    };

    window.addEventListener('category-updated', handleCategoryUpdated);
    window.addEventListener('data-updated', handleCategoryUpdated);

    return () => {
      window.removeEventListener('category-updated', handleCategoryUpdated);
      window.removeEventListener('data-updated', handleCategoryUpdated);
    };
  }, [isArabic]);

  const handleDelete = async (categoryId: string) => {
    try {
      if (typeof window !== "undefined" && window.db) {
        const result = await window.db.deleteCategory(categoryId);
        if (result.success) {
          toast.success(isArabic ? "تم حذف التصنيف بنجاح" : "Category deleted successfully");
          setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
        } else {
          toast.error(isArabic ? "حدث خطأ أثناء حذف التصنيف" : "Error deleting category");
        }
      } else {
        // In browser mode, simulate success
        await categoryService.deleteCategory(categoryId);
        setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
        toast.success(isArabic ? "تم حذف التصنيف بنجاح (وضع المحاكاة)" : "Category deleted successfully (simulation mode)");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(isArabic ? "حدث خطأ أثناء حذف التصنيف" : "Error deleting category");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center">
        <div className="text-lg">{isArabic ? "جاري التحميل..." : "Loading..."}</div>
      </div>
    );
  }

  // Only show non-deleted categories
  const visibleCategories = categories.filter(category => !category.isDeleted);

  const getGridClass = () => {
    switch (viewMode) {
      case "list":
        return "flex flex-col gap-4";
      case "grid-small":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      case "grid-large":
        return "grid grid-cols-1 md:grid-cols-2 gap-6";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className="container mx-auto p-4 scrollable-content">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{isArabic ? "التصنيفات" : "Categories"}</h1>
          <ViewToggle value={viewMode} onValueChange={setViewMode} />
        </div>
        <Button onClick={() => navigate("/categories/add")}>
          <Plus className={isArabic ? "ml-2" : "mr-2"} size={16} /> 
          {isArabic ? "إضافة تصنيف" : "Add Category"}
        </Button>
      </div>

      <div className={getGridClass()}>
        {visibleCategories.map((category) => (
          <Card key={category.id} className={`overflow-hidden ${viewMode === "list" ? "flex" : ""}`}>
            <div className={viewMode === "list" ? "w-40 h-full" : ""}>
              <img
                src={category.image || "/placeholder.svg"}
                alt={isArabic ? (category.nameAr || category.name) : category.name}
                className={`${viewMode === "list" ? "h-full w-full" : "w-full h-40"} object-cover`}
              />
            </div>
            <div className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Tag className={isArabic ? "ml-2" : "mr-2"} size={18} />
                  {isArabic ? (category.nameAr || category.name) : category.name}
                </CardTitle>
              </CardHeader>
              <CardFooter className="pt-4 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/products?category=${category.id}`)}
                >
                  {isArabic ? "تصفح المنتجات" : "Browse Products"}
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/categories/edit/${category.id}`)}
                  >
                    <Pencil size={16} className={isArabic ? "ml-2" : "mr-2"} />
                    {isArabic ? "تعديل" : "Edit"}
                  </Button>
                  <Button 
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      
      {visibleCategories.length === 0 && (
        <div className="text-center p-8">
          <p className="text-muted-foreground text-lg">
            {isArabic ? "لا توجد تصنيفات. أضف تصنيفًا جديدًا للبدء." : "No categories found. Add a new category to get started."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Categories;
