
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import categoryService from "@/services/categories/CategoryService";
import { v4 as uuidv4 } from "uuid";

export const useCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emptyCategoryTemplate: Category = {
    id: "",
    name: "",
    nameAr: "",
    image: "/placeholder.svg",
    isDeleted: false
  };

  const [category, setCategory] = useState<Category>(emptyCategoryTemplate);

  useEffect(() => {
    if (isEditing && id) {
      const fetchCategory = async () => {
        try {
          const fetchedCategory = await categoryService.getCategoryById(id);
          if (fetchedCategory) {
            // Ensure we're not editing a deleted category
            if (fetchedCategory.isDeleted) {
              toast.error(isArabic ? "هذا التصنيف محذوف" : "This category is deleted");
              navigate("/categories");
              return;
            }
            
            setCategory(fetchedCategory);
          } else {
            toast.error(isArabic ? "لم يتم العثور على الفئة" : "Category not found");
            navigate("/categories");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
          toast.error(isArabic ? "خطأ في جلب بيانات الفئة" : "Error fetching category");
          navigate("/categories");
        }
      };

      fetchCategory();
    }
  }, [id, isEditing, navigate, isArabic]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setCategory(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validation
      if (!category.name.trim()) {
        toast.error(isArabic ? "اسم الفئة مطلوب" : "Category name is required");
        setIsSubmitting(false);
        return;
      }
      
      // Set ID if new category
      const categoryToSave: Category = {
        ...category,
        id: category.id || `cat-${uuidv4()}`,
        isDeleted: false  // Always ensure isDeleted is explicitly set to false
      };
      
      // Save the category
      const success = await categoryService.saveCategory(categoryToSave);
      
      if (success) {
        toast.success(
          isEditing
            ? (isArabic ? "تم تحديث الفئة بنجاح" : "Category updated successfully")
            : (isArabic ? "تم إضافة الفئة بنجاح" : "Category added successfully")
        );
        
        // Force a refresh of category data
        window.dispatchEvent(new CustomEvent('category-updated'));
        
        // Navigate back to categories page
        setTimeout(() => {
          navigate("/categories");
        }, 500);
      } else {
        throw new Error("Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(isArabic ? "حدث خطأ أثناء حفظ الفئة" : "Error saving category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    category,
    isEditing,
    isArabic,
    isSubmitting,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    navigate
  };
};
