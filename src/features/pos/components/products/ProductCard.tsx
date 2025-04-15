
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import { Size, Product } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogTitle 
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { addToCart } = useCart();
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    // If product has multiple sizes, show size selection dialog
    if (product.type === "sized" && product.variants.length > 1) {
      setSelectedSize(product.variants[0].size);
      setShowSizeDialog(true);
    } else {
      // For single-size products, add directly to cart
      const variant = product.variants[0];
      addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: variant.price,
        quantity: 1,
        image: product.image,
        size: variant.size as Size | "regular",
        categoryId: product.categoryId,
        variantId: variant.id,
        taxable: product.taxable !== undefined ? product.taxable : true
      });
    }
  };

  const handleSizeSelected = () => {
    if (!selectedSize) return;
    
    const variant = product.variants.find(v => v.size === selectedSize);
    if (variant) {
      addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: variant.price,
        quantity: 1,
        image: product.image,
        size: variant.size as Size | "regular",
        categoryId: product.categoryId,
        variantId: variant.id,
        taxable: product.taxable !== undefined ? product.taxable : true
      });
    }
    
    setShowSizeDialog(false);
  };

  // Get size label in Arabic or English
  const getSizeLabel = (size: string) => {
    switch(size) {
      case 'small': return isArabic ? 'صغير' : 'Small';
      case 'medium': return isArabic ? 'وسط' : 'Medium';
      case 'large': return isArabic ? 'كبير' : 'Large';
      default: return isArabic ? 'عادي' : 'Regular';
    }
  };

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleAddToCart}
      >
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
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleAddToCart();
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-3 text-right">
            <h3 className="font-medium">
              {isArabic ? product.nameAr || product.name : product.name}
            </h3>
            {product.type === "sized" && product.variants.length > 1 ? (
              <p className="text-sm text-muted-foreground">
                {product.variants[0].price.toFixed(2)} - {product.variants[product.variants.length - 1].price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {product.variants[0].price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
        <DialogContent className="sm:max-w-[425px]" dir={isArabic ? "rtl" : "ltr"}>
          <DialogTitle className="text-center">
            {isArabic ? "اختر الحجم" : "Select Size"}
          </DialogTitle>
          
          <RadioGroup
            value={selectedSize || ""}
            onValueChange={setSelectedSize}
            className="grid gap-3 pt-3"
          >
            {product.variants.map((variant) => (
              <div key={variant.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value={variant.size} id={`size-${variant.id}`} />
                  <Label htmlFor={`size-${variant.id}`}>
                    {getSizeLabel(variant.size)}
                  </Label>
                </div>
                <div className="text-sm font-medium">
                  {variant.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
                </div>
              </div>
            ))}
          </RadioGroup>
          
          <DialogFooter>
            <Button onClick={() => setShowSizeDialog(false)} variant="outline">
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleSizeSelected}>
              {isArabic ? "إضافة" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
