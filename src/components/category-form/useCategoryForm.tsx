
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { v4 as uuidv4 } from 'uuid';
import { sampleCategories } from "@/data/sampleData";

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
    image: "/placeholder.svg",
  };

  const [category, setCategory] = useState<Category>(emptyCategory);
  
  useEffect(() => {
    if (isEditing) {
      const loadCategory = async () => {
        try {
          // Check if window.db is available (electron environment)
          if (typeof window !== "undefined" && window.db) {
            const categories = await window.db.getCategories();
            const existingCategory = categories.find((c: Category) => c.id === id);
            if (existingCategory) {
              setCategory(existingCategory);
            } else {
              toast.error(isArabic ? "الفئة غير موجودة" : "Category not found");
              navigate("/categories");
            }
          } else {
            // In browser mode, load from mock data
            console.log("Running in browser mode - using sample data");
            const mockCategory = sampleCategories.find(c => c.id === id);
            if (mockCategory) {
              setCategory(mockCategory);
            } else {
              toast.error(isArabic ? "الفئة غير موجودة" : "Category not found");
              navigate("/categories");
            }
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
    setIsSubmitting(true);
    
    if (!category.name) {
      toast.error(isArabic ? "يرجى إدخال اسم الفئة" : "Please enter category name");
      setIsSubmitting(false);
      return;
    }

    const updatedCategory: Category = {
      ...category,
      id: isEditing ? category.id : `cat-${uuidv4()}`,
    };

    try {
      // Check if running in electron environment
      if (typeof window !== "undefined" && window.db) {
        console.log("Submitting to Electron DB");
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
      } else {
        console.log("Running in browser mode - simulating category save:", updatedCategory);
        
        // In browser mode, simulate success and update sample data
        if (!isEditing) {
          sampleCategories.push(updatedCategory);
        } else {
          const index = sampleCategories.findIndex(c => c.id === updatedCategory.id);
          if (index !== -1) {
            sampleCategories[index] = updatedCategory;
          }
        }
        
        toast.success(isArabic ? "تم حفظ الفئة بنجاح (وضع المحاكاة)" : "Category saved successfully (simulation mode)");
        
        // Give some time to show the toast before navigating
        setTimeout(() => {
          navigate("/categories");
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(isArabic ? "حدث خطأ أثناء حفظ الفئة" : "Error saving category");
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
