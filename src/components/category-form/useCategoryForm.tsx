
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import categoryService from "@/services/categories/CategoryService";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";

const emptyCategory: Category = {
  id: "",
  name: "",
  nameAr: "",
  description: "",
  descriptionAr: "",
  image: "/placeholder.svg",
};

export const useCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [category, setCategory] = useState<Category>(emptyCategory);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const fetchCategory = async () => {
        try {
          const existingCategory = await categoryService.getCategoryById(id);
          if (existingCategory) {
            setCategory(existingCategory);
          } else {
            toast({
              title: isArabic ? "التصنيف غير موجود" : "Category not found",
              variant: "destructive"
            });
            navigate("/categories");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
          toast({
            title: isArabic ? "حدث خطأ أثناء جلب التصنيف" : "Error fetching category",
            variant: "destructive"
          });
        }
      };
      
      fetchCategory();
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
    
    if (!category.name.trim()) {
      toast({
        title: isArabic ? "يرجى إدخال اسم التصنيف" : "Please enter category name",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedCategory: Category = {
        ...category,
        id: isEditing ? category.id : `cat-${uuidv4()}`,
      };

      console.log('Saving category:', updatedCategory);
      const result = await categoryService.saveCategory(updatedCategory);
      
      if (result.success) {
        const successMessage = isEditing 
          ? isArabic ? "تم تعديل التصنيف بنجاح" : "Category updated successfully" 
          : isArabic ? "تم إضافة التصنيف بنجاح" : "Category added successfully";
        
        toast({
          title: successMessage,
          variant: "default"
        });
        
        window.dispatchEvent(new CustomEvent('category-updated'));
        window.dispatchEvent(new CustomEvent('data-updated'));
        
        setTimeout(() => {
          navigate("/categories");
        }, 1000);
      } else {
        throw new Error(result.error || "Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: isArabic ? "حدث خطأ أثناء حفظ التصنيف" : "Error saving category",
        variant: "destructive"
      });
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
