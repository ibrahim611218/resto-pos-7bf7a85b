
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/types";
import { sampleCategories } from "@/data/sampleData";
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
      const existingCategory = sampleCategories.find(c => c.id === id);
      if (existingCategory) {
        setCategory(existingCategory);
      } else {
        toast.error(isArabic ? "الفئة غير موجودة" : "Category not found");
        navigate("/categories");
      }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category.name) {
      toast.error(isArabic ? "يرجى إدخال اسم الفئة" : "Please enter category name");
      return;
    }

    const updatedCategory: Category = {
      ...category,
      id: isEditing ? category.id : `cat-${Date.now()}`,
    };

    // هنا نقوم بحفظ الفئة في قائمة الفئات
    if (isEditing) {
      // تحديث الفئة الموجودة
      const categoryIndex = sampleCategories.findIndex(c => c.id === updatedCategory.id);
      if (categoryIndex !== -1) {
        sampleCategories[categoryIndex] = updatedCategory;
      }
    } else {
      // إضافة فئة جديدة
      sampleCategories.push(updatedCategory);
    }

    console.log("Category saved:", updatedCategory);
    console.log("Updated categories list:", sampleCategories);

    const successMessage = isEditing 
      ? isArabic ? "تم تعديل الفئة بنجاح" : "Category updated successfully" 
      : isArabic ? "تم إضافة الفئة بنجاح" : "Category added successfully";
    
    toast.success(successMessage);
    navigate("/categories");
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
