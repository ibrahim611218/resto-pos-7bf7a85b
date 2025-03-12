
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
    // Dark theme colors - تغيير الألوان للوضع الداكن إلى برتقالي
    switch (categoryId) {
      case "cat1": // Main dishes
        return "bg-green-900/40 hover:bg-green-900/60 border-orange-500";
      case "cat2": // Sides
        return "bg-yellow-900/40 hover:bg-yellow-900/60 border-orange-500";
      case "cat3": // Drinks
        return "bg-blue-900/40 hover:bg-blue-900/60 border-orange-500";
      case "cat4": // Desserts
        return "bg-pink-900/40 hover:bg-pink-900/60 border-orange-500";
      case "cat5": // Combos
        return "bg-purple-900/40 hover:bg-purple-900/60 border-orange-500";
      default:
        return "bg-orange-900/40 hover:bg-orange-900/60 border-orange-500";
    }
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isArabic, onAddToCart, getSizeLabel }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  
  const displayPrice = product.variants.length > 0 
    ? `${product.variants[0].price.toFixed(2)}+` 
    : "-";
  
  const bgColorClass = getBackgroundColor(product.categoryId, isLightTheme);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onAddToCart && product.variants.length > 0) {
      onAddToCart(product, product.variants[0].id);
    }
  };
  
  // تغيير لون السعر للون الأبيض في الوضع الفاتح
  const priceClassName = isLightTheme 
    ? "text-sm mt-1 text-white font-semibold bg-black/50 rounded-full px-2 py-0.5 inline-block"
    : "text-sm mt-1 text-white font-semibold bg-orange-600/90 rounded-full px-2 py-0.5 inline-block";
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden h-full",
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
        <div className={`font-medium truncate ${isLightTheme ? 'text-gray-800' : 'text-gray-100'}`}>
          {isArabic && product.nameAr ? product.nameAr : product.name}
        </div>
        <div className={priceClassName}>
          {displayPrice} {isArabic ? "ر.س" : "SAR"}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
