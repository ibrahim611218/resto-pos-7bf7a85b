
import React from "react";
import { Product } from "@/types";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { useLanguage } from "@/context/LanguageContext";

interface ProductInfoProps {
  product: Product;
  viewMode: ViewMode;
  isArabic: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ 
  product, 
  viewMode, 
  isArabic 
}) => {
  const getCardSizes = () => {
    if (viewMode === "grid-large") {
      return {
        padding: "p-4",
        titleSize: "text-base font-medium",
        priceSize: "text-sm"
      };
    } else {
      return {
        padding: "p-2",
        titleSize: "text-sm font-medium",
        priceSize: "text-xs"
      };
    }
  };

  const sizes = getCardSizes();

  return (
    <div className={`${sizes.padding} text-right`}>
      <h3 className={`${sizes.titleSize} text-foreground`}>
        {isArabic ? product.nameAr || product.name : product.name}
      </h3>
      {product.variablePrice ? (
        <p className={`${sizes.priceSize} text-primary font-medium`}>
          {isArabic ? "سعر متغير" : "Variable Price"}
        </p>
      ) : product.variants.length > 1 ? (
        <p className={`${sizes.priceSize} text-muted-foreground`}>
          {product.variants[0]?.price.toFixed(2)} - {product.variants[product.variants.length - 1]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
        </p>
      ) : (
        <p className={`${sizes.priceSize} text-muted-foreground`}>
          {product.variants[0]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
        </p>
      )}
    </div>
  );
};

export default ProductInfo;
