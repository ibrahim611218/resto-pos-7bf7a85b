
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { Tag } from "lucide-react";

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
        return "from-green-50 to-green-100 border-green-200";
      case "cat2": // Sides
        return "from-amber-50 to-amber-100 border-amber-200";
      case "cat3": // Drinks
        return "from-blue-50 to-blue-100 border-blue-200";
      case "cat4": // Desserts
        return "from-pink-50 to-pink-100 border-pink-200";
      case "cat5": // Combos
        return "from-purple-50 to-purple-100 border-purple-200";
      default:
        return "from-orange-50 to-orange-100 border-orange-200";
    }
  } else {
    // Dark theme colors
    switch (categoryId) {
      case "cat1": // Main dishes
        return "from-green-900/30 to-green-800/40 border-green-800/50";
      case "cat2": // Sides
        return "from-yellow-900/30 to-yellow-800/40 border-yellow-800/50";
      case "cat3": // Drinks
        return "from-blue-900/30 to-blue-800/40 border-blue-800/50";
      case "cat4": // Desserts
        return "from-pink-900/30 to-pink-800/40 border-pink-800/50";
      case "cat5": // Combos
        return "from-purple-900/30 to-purple-800/40 border-purple-800/50";
      default:
        return "from-orange-900/30 to-orange-800/40 border-orange-800/50";
    }
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isArabic, onAddToCart, getSizeLabel }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  
  const displayPrice = product.variants.length > 0 
    ? `${product.variants[0].price.toFixed(2)}+` 
    : "-";
  
  const bgGradientClass = getBackgroundColor(product.categoryId, isLightTheme);
  
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
        "cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden h-full border bg-gradient-to-br",
        bgGradientClass,
        "hover:scale-[1.02] transform"
      )} 
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={isArabic && product.nameAr ? product.nameAr : product.name}
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            {isArabic ? "لا توجد صورة" : "No image"}
          </div>
        )}
        {product.variants.length > 0 && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-medium py-1 px-2 rounded-full backdrop-blur-sm">
            {displayPrice} {isArabic ? "ر.س" : "SAR"}
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <div className="font-medium truncate text-foreground">
          {isArabic && product.nameAr ? product.nameAr : product.name}
        </div>
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            <span>{isArabic ? "خيارات متعددة" : "Multiple options"}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
