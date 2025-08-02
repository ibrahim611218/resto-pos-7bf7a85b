import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, Size } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface VariablePriceDialogProps {
  product: Product;
  selectedSize?: string;
  isOpen: boolean;
  onClose: () => void;
  onPriceConfirm: (price: number) => void;
}

const VariablePriceDialog: React.FC<VariablePriceDialogProps> = ({
  product,
  selectedSize,
  isOpen,
  onClose,
  onPriceConfirm
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [price, setPrice] = useState<string>("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // السماح بالأرقام والنقطة العشرية فقط
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleConfirm = () => {
    const numericPrice = parseFloat(price);
    if (numericPrice > 0) {
      onPriceConfirm(numericPrice);
      setPrice("");
      onClose();
    }
  };

  const handleCancel = () => {
    setPrice("");
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

  const productName = isArabic ? (product.nameAr || product.name) : product.name;
  const sizeDisplay = selectedSize ? ` - ${getSizeLabel(selectedSize)}` : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "إدخال السعر" : "Enter Price"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {isArabic ? "المنتج: " : "Product: "}
            <span className="font-medium">{productName}{sizeDisplay}</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="variable-price">
              {isArabic ? "السعر" : "Price"}
            </Label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Input
                id="variable-price"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder={isArabic ? "أدخل السعر" : "Enter price"}
                className="flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleConfirm();
                  } else if (e.key === 'Escape') {
                    handleCancel();
                  }
                }}
              />
              <span className="text-sm text-muted-foreground">
                {isArabic ? "ر.س" : "SAR"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!price || parseFloat(price) <= 0}
          >
            {isArabic ? "إضافة إلى السلة" : "Add to Cart"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VariablePriceDialog;