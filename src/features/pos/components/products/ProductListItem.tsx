
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Edit2, Trash2, Package } from "lucide-react";
import { useLocation } from "react-router-dom";

interface ProductListItemProps {
  product: Product;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onEdit, onDelete }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { addToCart } = useCart();
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const location = useLocation();
  
  const isProductsPage = location.pathname === "/products";
  const hasImage = product.image && product.image !== "/placeholder.svg";

  const handleAddToCart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-buttons')) {
      return;
    }

    if (!product.variants || product.variants.length === 0) {
      console.error("Product has no variants:", product);
      return;
    }
    
    if (product.variants.length > 1) {
      setSelectedSize(product.variants[0].size);
      setShowSizeDialog(true);
    } else {
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

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(product.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(product.id);
    }
  };

  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative group"
        onClick={handleAddToCart}
      >
        <CardContent className="p-2">
          <div className="flex items-center">
            {hasImage ? (
              <div className="h-12 w-12 bg-gray-100 rounded-md mr-3 flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={isArabic ? product.nameAr || product.name : product.name}
                  className="w-full h-full object-cover rounded-md" 
                />
              </div>
            ) : (
              <div className="h-12 w-16 bg-gradient-to-br from-restopos-primary to-restopos-secondary dark:from-orange-600 dark:to-orange-700 rounded-md mr-3 flex-shrink-0 flex items-center justify-center">
                <Package size={16} className="text-white" />
              </div>
            )}
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
            
            {isProductsPage && (onEdit || onDelete) && (
              <div className="action-buttons flex gap-1 ml-2">
                {onEdit && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={handleEdit}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="xs"
                    onClick={handleDelete}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
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
