
import React from "react";
import { useNavigate } from "react-router-dom";
import { sampleCategories } from "@/data/sampleData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Plus, Pencil } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Categories = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isArabic ? "التصنيفات" : "Categories"}</h1>
        <Button onClick={() => navigate("/categories/add")}>
          <Plus className={isArabic ? "ml-2" : "mr-2"} size={16} /> 
          {isArabic ? "إضافة تصنيف" : "Add Category"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Tag className={isArabic ? "ml-2" : "mr-2"} size={18} />
                {isArabic ? (category.nameAr || category.name) : category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <img
                src={category.image || "/placeholder.svg"}
                alt={isArabic ? (category.nameAr || category.name) : category.name}
                className="w-full h-40 object-cover"
              />
            </CardContent>
            <CardFooter className="pt-4 flex justify-between">
              <Button 
                variant="outline"
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                {isArabic ? "تصفح المنتجات" : "Browse Products"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/categories/edit/${category.id}`)}
              >
                <Pencil size={16} className={isArabic ? "ml-2" : "mr-2"} />
                {isArabic ? "تعديل" : "Edit"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
