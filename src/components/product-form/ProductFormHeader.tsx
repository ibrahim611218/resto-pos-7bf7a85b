
import React from "react";
import { Package } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Language } from "@/types";

interface ProductFormHeaderProps {
  isEditing: boolean;
  isArabic: boolean;
}

const ProductFormHeader: React.FC<ProductFormHeaderProps> = ({ isEditing, isArabic }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center">
        <Package className="ml-2" size={18} />
        {isEditing ? 
          (isArabic ? "تعديل المنتج" : "Edit Product") : 
          (isArabic ? "إضافة منتج جديد" : "Add New Product")}
      </CardTitle>
    </CardHeader>
  );
};

export default ProductFormHeader;
