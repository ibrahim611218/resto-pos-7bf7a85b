import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, ProductVariant } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ProductPriceEditDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onPriceUpdate: (updatedProduct: Product) => void;
}

const ProductPriceEditDialog: React.FC<ProductPriceEditDialogProps> = ({
  product,
  isOpen,
  onClose,
  onPriceUpdate
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    if (product && product.variants) {
      setVariants([...product.variants]);
    }
  }, [product]);

  const handlePriceChange = (variantId: string, newPrice: number) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId 
          ? { ...variant, price: newPrice }
          : variant
      )
    );
  };

  const handleSave = () => {
    const updatedProduct: Product = {
      ...product,
      variants: variants
    };
    onPriceUpdate(updatedProduct);
    onClose();
  };

  const getSizeLabel = (size: string) => {
    const sizeLabels: { [key: string]: string } = {
      small: "صغير",
      medium: "وسط", 
      large: "كبير",
      xlarge: "كبير جداً",
      regular: "عادي"
    };
    return isArabic ? sizeLabels[size] || size : size;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "تعديل أسعار المنتج" : "Edit Product Prices"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {isArabic 
              ? `تعديل أسعار: ${product.nameAr || product.name}`
              : `Edit prices for: ${product.name}`
            }
          </div>
          
          {variants.map((variant) => (
            <div key={variant.id} className="space-y-2">
              <Label>
                {isArabic ? "السعر" : "Price"} - {getSizeLabel(variant.size)}
              </Label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={variant.price}
                  onChange={(e) => handlePriceChange(variant.id, parseFloat(e.target.value) || 0)}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">
                  {isArabic ? "ر.س" : "SAR"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleSave}>
            {isArabic ? "حفظ" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPriceEditDialog;