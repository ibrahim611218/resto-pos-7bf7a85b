
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useTheme } from "@/context/ThemeContext";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  isArabic: boolean;
  onAddToCart?: (product: Product, variantId: string) => void;
  getSizeLabel?: (size: string) => string;
}

// Function to get background color based on product category
const getBackgroundColor = (categoryId: string, isLightTheme: boolean): string => {
  if (isLightTheme) {
    switch (categoryId) {
      case "cat1": // Main dishes
        return "bg-[#F2FCE2] hover:bg-[#E5F5D5] border-green-200";
      case "cat2": // Sides
        return "bg-[#FEF7CD] hover:bg-[#FDF0A6] border-yellow-200";
      case "cat3": // Drinks
        return "bg-[#D3E4FD] hover:bg-[#C0D6F7] border-blue-200";
      case "cat4": // Desserts
        return "bg-[#FFDEE2] hover:bg-[#FFC7CD] border-pink-200";
      case "cat5": // Combos
        return "bg-[#E5DEFF] hover:bg-[#D5CEFF] border-purple-200";
      default:
        return "bg-[#FDE1D3] hover:bg-[#FACEB8] border-orange-200";
    }
  } else {
    // Dark theme colors
    return "bg-secondary/30 hover:bg-secondary/50";
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isArabic, onAddToCart, getSizeLabel }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  
  const displayPrice = product.variants.length > 0 
    ? `${product.variants[0].price}` 
    : "-";
  
  const bgColorClass = getBackgroundColor(product.categoryId, isLightTheme);
  
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
        "cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden h-full border",
        bgColorClass
      )} 
      onClick={handleClick}
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
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
      <CardContent className="p-2">
        <div className={`font-medium truncate text-sm ${isLightTheme ? 'text-gray-800' : 'text-gray-100'}`}>
          {isArabic && product.nameAr ? product.nameAr : product.name}
        </div>
        <div className="text-sm mt-1 text-white font-semibold bg-black/60 rounded-full px-2 py-0.5 inline-block">
          {displayPrice} {isArabic ? "ر.س" : "SAR"}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
