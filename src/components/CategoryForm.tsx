
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useCategoryForm } from "./category-form/useCategoryForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/ui-custom/ImageUploader";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { CardHeader, CardTitle } from "@/components/ui/card";

const CategoryForm = () => {
  const {
    category,
    isEditing,
    isArabic,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    navigate,
    isSubmitting
  } = useCategoryForm();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>
              {isEditing 
                ? (isArabic ? "تعديل فئة" : "Edit Category") 
                : (isArabic ? "إضافة فئة جديدة" : "Add New Category")}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{isArabic ? "اسم الفئة" : "Category Name"}</Label>
                <Input 
                  id="name"
                  name="name"
                  value={category.name}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل اسم الفئة" : "Enter category name"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nameAr">{isArabic ? "اسم الفئة (عربي)" : "Category Name (Arabic)"}</Label>
                <Input 
                  id="nameAr"
                  name="nameAr"
                  value={category.nameAr || ""}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "أدخل اسم الفئة بالعربية" : "Enter category name in Arabic"}
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{isArabic ? "صورة الفئة" : "Category Image"}</Label>
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
            >
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? 
                (isArabic ? "حفظ التغييرات" : "Save Changes") : 
                (isArabic ? "إضافة الفئة" : "Add Category")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CategoryForm;
