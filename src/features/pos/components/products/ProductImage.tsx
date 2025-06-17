
import React from "react";
import { Product } from "@/types";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Package } from "lucide-react";

interface ProductImageProps {
  product: Product;
  viewMode: ViewMode;
  isArabic: boolean;
  hasImage: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ 
  product, 
  viewMode, 
  isArabic, 
  hasImage 
}) => {
  const getCardSizes = () => {
    if (viewMode === "grid-large") {
      return {
        imageHeight: "aspect-square",
        titleSize: "text-lg",
        priceSize: "text-sm",
        iconSize: "h-12 w-12"
      };
    } else {
      return {
        imageHeight: "aspect-square",
        titleSize: "text-base",
        priceSize: "text-xs",
        iconSize: "h-8 w-8"
      };
    }
  };

  const sizes = getCardSizes();

  if (hasImage) {
    return (
      <div className={`${sizes.imageHeight} bg-gray-100 relative`}>
        <img 
          src={product.image} 
          alt={isArabic ? product.nameAr || product.name : product.name}
          className="w-full h-full object-cover" 
        />
      </div>
    );
  }

  return (
    <div className={`${sizes.imageHeight} bg-[#004d40] dark:bg-[#00695c] relative flex flex-col items-center justify-center p-4`}>
      <Package className={`${sizes.iconSize} text-white mb-2`} />
      <div className="text-center">
        <h3 className={`${sizes.titleSize} font-bold mb-2 text-white`}>
          {isArabic ? product.nameAr || product.name : product.name}
        </h3>
        {product.variants.length > 1 ? (
          <p className={`${sizes.priceSize} text-white/80`}>
            {product.variants[0]?.price.toFixed(2)} - {product.variants[product.variants.length - 1]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </p>
        ) : (
          <p className={`${sizes.priceSize} text-white/80`}>
            {product.variants[0]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
