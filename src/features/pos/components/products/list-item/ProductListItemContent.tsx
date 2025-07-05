
import React from "react";
import { Product } from "@/types";

interface ProductListItemContentProps {
  product: Product;
  isArabic: boolean;
}

const ProductListItemContent: React.FC<ProductListItemContentProps> = ({
  product,
  isArabic
}) => {
  return (
    <div className="flex-1 text-right">
      <h3 className="font-medium text-foreground">
        {isArabic ? product.nameAr || product.name : product.name}
      </h3>
      {product.variants.length > 1 ? (
        <p className="text-sm text-muted-foreground">
          {product.variants[0]?.price.toFixed(2)} - {product.variants[product.variants.length - 1]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          {product.variants[0]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
        </p>
      )}
    </div>
  );
};

export default ProductListItemContent;
