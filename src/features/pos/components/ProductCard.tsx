
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  isArabic: boolean;
  onAddToCart?: (product: Product, variantId: string) => void;
  getSizeLabel?: (size: string) => string;
}

// Function to get background color based on product category
const getBackgroundColor = (categoryId: string): string => {
  switch (categoryId) {
    case "cat1": // Main dishes
      return "bg-[#F2FCE2] hover:bg-[#E5F5D5]";
    case "cat2": // Sides
      return "bg-[#FEF7CD] hover:bg-[#FDF0A6]";
    case "cat3": // Drinks
      return "bg-[#D3E4FD] hover:bg-[#C0D6F7]";
    case "cat4": // Desserts
      return "bg-[#FFDEE2] hover:bg-[#FFC7CD]";
    case "cat5": // Combos
      return "bg-[#E5DEFF] hover:bg-[#D5CEFF]";
    default:
      return "bg-[#FDE1D3] hover:bg-[#FACEB8]";
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isArabic, onAddToCart, getSizeLabel }) => {
  const displayPrice = product.variants.length > 0 
    ? `${product.variants[0].price.toFixed(2)}+` 
    : "-";
  
  const bgColorClass = getBackgroundColor(product.categoryId);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onAddToCart && product.variants.length > 0) {
      onAddToCart(product, product.variants[0].id);
    }
  };
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border overflow-hidden h-full",
        bgColorClass
      )} 
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={isArabic && product.nameAr ? product.nameAr : product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            {isArabic ? "لا توجد صورة" : "No image"}
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <div className="font-medium truncate">
          {isArabic && product.nameAr ? product.nameAr : product.name}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {displayPrice} {isArabic ? "ر.س" : "SAR"}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
