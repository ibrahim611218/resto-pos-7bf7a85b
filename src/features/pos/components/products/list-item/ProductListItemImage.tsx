
import React from "react";
import { Product } from "@/types";

interface ProductListItemImageProps {
  product: Product;
  isArabic: boolean;
  hasImage: boolean;
}

const ProductListItemImage: React.FC<ProductListItemImageProps> = ({
  product,
  isArabic,
  hasImage
}) => {
  if (hasImage) {
    return (
      <div className="h-12 w-12 bg-gray-100 rounded-md mr-3 flex-shrink-0">
        <img 
          src={product.image} 
          alt={isArabic ? product.nameAr || product.name : product.name}
          className="w-full h-full object-cover rounded-md" 
        />
      </div>
    );
  }

  return (
    <div className="h-12 w-16 bg-gray-100 dark:bg-gray-800 rounded-md mr-3 flex-shrink-0 flex items-center justify-center">
      <div className="text-xs font-medium text-center px-1 text-foreground">
        {(isArabic ? product.nameAr || product.name : product.name).substring(0, 8)}
      </div>
    </div>
  );
};

export default ProductListItemImage;
