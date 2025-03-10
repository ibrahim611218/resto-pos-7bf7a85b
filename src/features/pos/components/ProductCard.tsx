
import React, { useState } from "react";
import GlassCard from "@/components/ui-custom/GlassCard";
import { Product } from "@/types";
import SizeSelectionDialog from "./SizeSelectionDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <GlassCard hover onClick={handleProductClick}>
        <div className="p-2">
          <h3 className="font-medium text-center mb-2">
            {isArabic ? product.nameAr : product.name}
          </h3>
          <div className="text-center p-2">
            <span className="text-sm text-muted-foreground">
              {isArabic ? "اضغط للاختيار" : "Click to select"}
            </span>
          </div>
        </div>
      </GlassCard>

      <SizeSelectionDialog
        product={product}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAddToCart={onAddToCart}
        isArabic={isArabic}
      />
    </>
  );
};

export default ProductCard;
