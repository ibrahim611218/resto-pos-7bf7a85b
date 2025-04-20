
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import ImageUploader from "@/components/ui-custom/ImageUploader";
import categoryService from "@/services/categories/CategoryService";
import { Loader2 } from "lucide-react";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState({
    id: "",
    name: "",
    nameAr: "",
    image: "/placeholder.svg"
  });

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      
      try {
        const categoryData = await categoryService.getCategoryById(id);
        if (categoryData) {
          setCategory(categoryData);
        } else {
          toast.error(isArabic ? "التصنيف غير موجود" : "Category not found");
          navigate("/categories");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error(isArabic ? "حدث خطأ أثناء تحميل التصنيف" : "Error loading category");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id, isArabic, navigate]);

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
      toast.error(isArabic ? "يرجى إدخال اسم التصنيف" : "Please enter category name");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await categoryService.saveCategory(category);
      toast.success(isArabic ? "تم تحديث التصنيف بنجاح" : "Category updated successfully");
      navigate("/categories");
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(isArabic ? "حدث خطأ أثناء تحديث التصنيف" : "Error updating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>
              {isArabic ? "تعديل التصنيف" : "Edit Category"}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {isArabic ? "اسم التصنيف" : "Category Name"}
                </Label>
                <Input 
                  id="name"
                  name="name"
                  value={category.name}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل اسم التصنيف" : "Enter category name"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nameAr">
                  {isArabic ? "اسم التصنيف (عربي)" : "Category Name (Arabic)"}
                </Label>
                <Input 
                  id="nameAr"
                  name="nameAr"
                  value={category.nameAr}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل اسم التصنيف بالعربية" : "Enter category name in Arabic"}
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{isArabic ? "صورة التصنيف" : "Category Image"}</Label>
              <ImageUploader 
                initialImage={category.image} 
                onImageChange={handleImageChange}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/categories")}
              disabled={isSubmitting}
            >
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isArabic ? "جاري الحفظ..." : "Saving..."}
                </>
              ) : (
                isArabic ? "حفظ التغييرات" : "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CategoryEdit;
