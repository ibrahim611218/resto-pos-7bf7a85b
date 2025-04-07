
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import { Size } from "@/types";

interface ProductCardProps {
  product: any; // Using any for now, would be better to define a Product type
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      nameAr: product.nameAr,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: (product.defaultSize || "regular") as Size | "regular",
      categoryId: product.categoryId,
      variantId: product.variantId || product.id,
      taxable: product.taxable !== undefined ? product.taxable : true
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-100 relative">
          {product.image ? (
            <img 
              src={product.image} 
              alt={isArabic ? product.nameAr || product.name : product.name}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full h-8 w-8"
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-3 text-right">
          <h3 className="font-medium">
            {isArabic ? product.nameAr || product.name : product.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {product.price} {isArabic ? "ر.س" : "SAR"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
