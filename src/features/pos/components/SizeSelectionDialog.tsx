
import React, { useEffect } from "react";
import { Product } from "@/types";
import { getSizeLabel } from "../utils/sizeLabels";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GlassCard from "@/components/ui-custom/GlassCard";

interface SizeSelectionDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variantId: string) => void;
  isArabic: boolean;
}

const SizeSelectionDialog: React.FC<SizeSelectionDialogProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isArabic,
}) => {
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>("");

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    } else {
      setSelectedVariantId("");
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedVariantId) {
      onAddToCart(product, selectedVariantId);
      onClose();
    }
  };

  // If product has no variants, show a message
  const hasNoVariants = product.variants.length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? product.nameAr : product.name}
          </DialogTitle>
          {hasNoVariants && (
            <DialogDescription className="text-center">
              {isArabic ? "منتج بدون مقاسات" : "Product without sizes"}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="p-4">
          {hasNoVariants ? (
            <div className="text-center">
              <div className="mb-4">
                <p className="font-bold text-lg">
                  {product.price} {isArabic ? "ر.س" : "SAR"}
                </p>
              </div>
              <Button onClick={() => onAddToCart(product, "simple")}>
                {isArabic ? "إضافة إلى السلة" : "Add to Cart"}
              </Button>
            </div>
          ) : (
            <>
              <h3 className="mb-3 font-semibold">
                {isArabic ? "اختر الحجم:" : "Select Size:"}
              </h3>
              
              <RadioGroup
                value={selectedVariantId}
                onValueChange={setSelectedVariantId}
                className="flex flex-wrap gap-2"
              >
                {product.variants.map((variant) => {
                  const sizeLabel = getSizeLabel(variant.size, isArabic ? "ar" : "en");
                  return (
                    <div key={variant.id} className="flex-1 min-w-[80px]">
                      <label
                        htmlFor={variant.id}
                        className="cursor-pointer w-full block"
                      >
                        <GlassCard 
                          className={`p-3 text-center ${selectedVariantId === variant.id ? 'ring-2 ring-primary' : ''}`}
                        >
                          <div className="flex items-center gap-2 justify-center">
                            <RadioGroupItem
                              value={variant.id}
                              id={variant.id}
                              className="sr-only"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{sizeLabel}</span>
                              <span className="font-bold">
                                {variant.price} {isArabic ? "ر.س" : "SAR"}
                              </span>
                            </div>
                          </div>
                        </GlassCard>
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  {isArabic ? "إلغاء" : "Cancel"}
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedVariantId}
                >
                  {isArabic ? "إضافة إلى السلة" : "Add to Cart"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeSelectionDialog;
