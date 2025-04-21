
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
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
import { getSizeLabel } from "../../utils/sizeLabels";

interface ProductListItemProps {
  product: Product;
  onEdit?: (id: string) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onEdit }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { addToCart } = useCart();
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    // Ensure product has variants before proceeding
    if (!product.variants || product.variants.length === 0) {
      console.error("Product has no variants:", product);
      return;
    }
    
    // If product has multiple sizes, show size selection dialog
    if (product.variants.length > 1) {
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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (onEdit) {
      onEdit(product.id);
    }
  };

  // Ensure product has variants before rendering
  if (!product.variants || product.variants.length === 0) {
    return null; // Or render a fallback UI for products with no variants
  }

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleAddToCart}
      >
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
            <div className="flex ml-2 gap-2">
              {onEdit && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="flex-shrink-0 bg-background/80 hover:bg-background text-foreground rounded-full h-8 w-8"
                  onClick={handleEditClick}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleAddToCart();
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
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
              <div 
                key={variant.id} 
                className="flex items-center justify-between border rounded-md p-3 cursor-pointer"
                onClick={() => setSelectedSize(variant.size)}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value={variant.size} id={`list-size-${variant.id}`} />
                  <Label htmlFor={`list-size-${variant.id}`}>
                    {getSizeLabel(variant.size, isArabic)}
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

export default ProductListItem;
