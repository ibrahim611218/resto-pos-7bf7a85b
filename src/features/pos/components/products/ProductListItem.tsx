
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";

interface ProductListItemProps {
  product: any; // Using any for now, would be better to define a Product type
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: product.defaultSize || "regular",
      categoryId: product.categoryId
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-2">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-gray-100 rounded-md mr-3 flex-shrink-0">
            {product.image ? (
              <img 
                src={product.image} 
                alt={isArabic ? product.nameAr || product.name : product.name}
                className="w-full h-full object-cover rounded-md" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 text-right">
            <h3 className="font-medium">
              {isArabic ? product.nameAr || product.name : product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.price} {isArabic ? "ر.س" : "SAR"}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 flex-shrink-0 bg-primary text-primary-foreground rounded-full h-8 w-8"
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductListItem;
