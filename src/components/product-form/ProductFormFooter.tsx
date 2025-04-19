
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProductFormFooterProps {
  isEditing: boolean;
  isArabic: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
}

const ProductFormFooter: React.FC<ProductFormFooterProps> = ({
  isEditing,
  isArabic,
  isSubmitting = false,
  onCancel,
}) => {
  return (
    <CardFooter className="flex justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
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
        ) : isEditing ? (
          isArabic ? "حفظ التغييرات" : "Save Changes"
        ) : (
          isArabic ? "إضافة المنتج" : "Add Product"
        )}
      </Button>
    </CardFooter>
  );
};

export default ProductFormFooter;
