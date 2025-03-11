
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface ProductFormFooterProps {
  isEditing: boolean;
  isArabic: boolean;
  onCancel: () => void;
}

const ProductFormFooter: React.FC<ProductFormFooterProps> = ({
  isEditing,
  isArabic,
  onCancel,
}) => {
  return (
    <CardFooter className="flex justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        {isArabic ? "إلغاء" : "Cancel"}
      </Button>
      <Button type="submit">
        {isEditing ? 
          (isArabic ? "حفظ التغييرات" : "Save Changes") : 
          (isArabic ? "إضافة المنتج" : "Add Product")}
      </Button>
    </CardFooter>
  );
};

export default ProductFormFooter;
