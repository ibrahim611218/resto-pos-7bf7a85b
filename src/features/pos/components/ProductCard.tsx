
import React from "react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui-custom/GlassCard";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variantId: string) => void;
  isArabic: boolean;
  getSizeLabel: (size: string) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isArabic,
  getSizeLabel
}) => {
  return (
    <GlassCard hover>
      <div className="p-2">
        <h3 className="font-medium text-center mb-2">
          {isArabic ? product.nameAr : product.name}
        </h3>
        <div className="grid grid-cols-3 gap-1 mt-2">
          {product.variants.map((variant) => (
            <Button
              key={variant.id}
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onAddToCart(product, variant.id)}
            >
              <div className="flex flex-col">
                <span className="text-xs">
                  {getSizeLabel(variant.size)}
                </span>
                <span>
                  {variant.price} {isArabic ? "ر.س" : "SAR"}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProductCard;
