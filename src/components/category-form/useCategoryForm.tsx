
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export const useCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const emptyCategory: Category = {
    id: "",
    name: "",
    nameAr: "",
    image: "/placeholder.svg",
  };

  const [category, setCategory] = useState<Category>(emptyCategory);
  
  useEffect(() => {
    if (isEditing) {
      const loadCategory = async () => {
        try {
          const categories = await window.db.getCategories();
          const existingCategory = categories.find(c => c.id === id);
          if (existingCategory) {
            setCategory(existingCategory);
          } else {
            toast.error(isArabic ? "الفئة غير موجودة" : "Category not found");
            navigate("/categories");
          }
        } catch (error) {
          console.error('Error loading category:', error);
          toast.error(isArabic ? "حدث خطأ أثناء تحميل الفئة" : "Error loading category");
        }
      };
      
      loadCategory();
    }
  }, [id, isEditing, navigate, isArabic]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      toast.error(isArabic ? "يرجى إدخال اسم الفئة" : "Please enter category name");
      return;
    }

    const updatedCategory: Category = {
      ...category,
      id: isEditing ? category.id : `cat-${Date.now()}`,
    };

    try {
      if (isEditing) {
        const result = await window.db.updateCategory(updatedCategory);
        if (result.success) {
          toast.success(isArabic ? "تم تعديل الفئة بنجاح" : "Category updated successfully");
          navigate("/categories");
        } else {
          toast.error(isArabic ? "حدث خطأ أثناء تعديل الفئة" : "Error updating category");
        }
      } else {
        const result = await window.db.addCategory(updatedCategory);
        if (result.success) {
          toast.success(isArabic ? "تم إضافة الفئة بنجاح" : "Category added successfully");
          navigate("/categories");
        } else {
          toast.error(isArabic ? "حدث خطأ أثناء إضافة الفئة" : "Error adding category");
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(isArabic ? "حدث خطأ أثناء حفظ الفئة" : "Error saving category");
    }
  };

  return {
    category,
    isEditing,
    isArabic,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    navigate
  };
};
