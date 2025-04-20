
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import categoryService from "@/services/categories/CategoryService";

export const useCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emptyCategory: Category = {
    id: "",
    name: "",
    nameAr: "",
    image: "/placeholder.svg"
  };

  const [category, setCategory] = useState<Category>(emptyCategory);

  useEffect(() => {
    if (isEditing && id) {
      const fetchCategory = async () => {
        try {
          const existingCategory = await categoryService.getCategoryById(id);
          
          if (existingCategory) {
            // Ensure nameAr is not undefined
            setCategory({
              ...existingCategory,
              nameAr: existingCategory.nameAr || ""
            });
          } else {
            toast.error(isArabic ? "التصنيف غير موجود" : "Category not found");
            navigate("/categories");
          }
        } catch (error) {
          console.error('Error fetching category:', error);
          toast.error(isArabic ? "حدث خطأ أثناء جلب التصنيف" : "Error fetching category");
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
    
    if (!category.name) {
      toast.error(isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updatedCategory: Category = {
        ...category,
        id: isEditing ? category.id : `cat-${Date.now()}`
      };

      // Save category using the service
      await categoryService.saveCategory(updatedCategory);
      
      const successMessage = isEditing 
        ? isArabic ? "تم تعديل التصنيف بنجاح" : "Category updated successfully" 
        : isArabic ? "تم إضافة التصنيف بنجاح" : "Category added successfully";
      
      toast.success(successMessage);
      navigate("/categories");
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(isArabic ? "حدث خطأ أثناء حفظ التصنيف" : "Error saving category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    category,
    isEditing,
    isArabic,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    navigate,
    isSubmitting
  };
};
