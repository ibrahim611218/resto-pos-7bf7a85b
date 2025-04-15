
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface ProductsHeaderProps {
  categoryId: string | null;
  getCategoryName: (categoryId: string) => string;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ categoryId, getCategoryName }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
      <div>
        <h1 className="text-2xl font-bold">{isArabic ? "الأصناف" : "Products"}</h1>
        {categoryId && (
          <p className="text-muted-foreground">
            {isArabic ? "تصنيف: " : "Category: "}{getCategoryName(categoryId)}
          </p>
        )}
      </div>
      <Button onClick={() => navigate("/products/add")}>
        <Plus className={isArabic ? "ml-2" : "mr-2"} size={16} />
        {isArabic ? "إضافة صنف" : "Add Product"}
      </Button>
    </div>
  );
};

export default ProductsHeader;
