
import React from "react";
import { Product } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogTitle 
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getSizeLabel } from "../../../utils/sizeLabels";

interface ProductSizeSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
  onConfirm: () => void;
  isArabic: boolean;
}

const ProductSizeSelectionDialog: React.FC<ProductSizeSelectionDialogProps> = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  onSizeChange,
  onConfirm,
  isArabic
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" dir={isArabic ? "rtl" : "ltr"}>
        <DialogTitle className="text-center">
          {isArabic ? "اختر الحجم" : "Select Size"}
        </DialogTitle>
        
        <RadioGroup
          value={selectedSize || ""}
          onValueChange={onSizeChange}
          className="grid gap-3 pt-3"
        >
          {product.variants.map((variant) => (
            <div 
              key={variant.id} 
              className="flex items-center justify-between border rounded-md p-3 cursor-pointer"
              onClick={() => onSizeChange(variant.size)}
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value={variant.size} id={`list-size-${variant.id}`} />
                <Label htmlFor={`list-size-${variant.id}`}>
                  {getSizeLabel(variant.size, isArabic)}
                </Label>
              </div>
              <div className="text-sm font-medium">
                {variant.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
              </div>
            </div>
          ))}
        </RadioGroup>
        
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={onConfirm}>
            {isArabic ? "إضافة" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSizeSelectionDialog;
