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
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { Edit2, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  viewMode?: ViewMode;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEdit,
  onDelete,
  viewMode = "grid-small"
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { addToCart } = useCart();
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const location = useLocation();
  
  // تحديد ما إذا كنا في صفحة المنتجات أم نقاط البيع
  const isProductsPage = location.pathname === "/products";

  // تحديد أحجام العناصر بناءً على نوع العرض
  const getCardSizes = () => {
    if (viewMode === "grid-large") {
      return {
        imageHeight: "aspect-square",
        padding: "p-4",
        titleSize: "text-base font-medium",
        priceSize: "text-sm"
      };
    } else {
      return {
        imageHeight: "aspect-square",
        padding: "p-2",
        titleSize: "text-sm font-medium",
        priceSize: "text-xs"
      };
    }
  };

  const sizes = getCardSizes();

  // Log debug to console always
  console.log("[ProductCard] rendering product:", product);

  // بدلاً من منع عرض الكرت (return)، سنعرض دوماً كرت بنطاق أحمر إذا المنتج فيه مشكلة
  const isInvalid =
    !product ||
    !product.name && !product.nameAr ||
    (product.type === "sized" && (!product.variants || product.variants.length === 0));

  const handleAddToCart = (e: React.MouseEvent) => {
    // منع إضافة المنتج للسلة إذا تم الضغط على أزرار التعديل أو الحذف
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
        variantId: variant.id,
        categoryId: product.categoryId,
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

  return (
    <>
      <Card 
        className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative group ${isInvalid ? "border-2 border-red-600" : ""}`}
        onClick={handleAddToCart}
      >
        {/* إذا المنتج فيه مشكلة، اظهر ملاحظة حمراء أعلاه */}
        {isInvalid && (
          <div className="bg-red-100 text-red-700 text-xs p-2 text-center rounded mb-2">
            ⚠️ مشكلة في هذا المنتج: 
            {(!product.name && !product.nameAr) && " (لا يوجد اسم)"}
            {(product.type === "sized" && (!product.variants || product.variants.length === 0)) && " (منتج مقاسات بلا أي variant)"}
          </div>
        )}

        {/* أزرار التعديل والحذف - تظهر فقط في صفحة المنتجات */}
        {isProductsPage && (onEdit || onDelete) && (
          <div className="action-buttons absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-10">
            {onEdit && (
              <Button
                variant="secondary"
                size="xs"
                onClick={handleEdit}
                className="h-6 w-6 p-0 bg-white/90 hover:bg-white shadow-sm"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="xs"
                onClick={handleDelete}
                className="h-6 w-6 p-0 bg-red-500/90 hover:bg-red-600 text-white shadow-sm"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}

        <CardContent className="p-0">
          <div className={`${sizes.imageHeight} bg-gray-100 relative`}>
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
          </div>
          <div className={`${sizes.padding} text-right`}>
            <h3 className={sizes.titleSize}>
              {isArabic ? product.nameAr || product.name : product.name}
            </h3>
            {/* show prices or warning */}
            {product.variants && product.variants.length > 0 ? (
              product.variants.length > 1 ? (
                <p className={`${sizes.priceSize} text-muted-foreground`}>
                  {getSizeLabel(product.variants[0]?.size, isArabic)}: {product.variants[0]?.price.toFixed(2)}
                  {" - "}
                  {getSizeLabel(product.variants[product.variants.length - 1]?.size, isArabic)}: {product.variants[product.variants.length - 1]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
                </p>
              ) : (
                <p className={`${sizes.priceSize} text-muted-foreground`}>
                  {getSizeLabel(product.variants[0]?.size, isArabic)}: {product.variants[0]?.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
                </p>
              )
            ) : (
              <span className="text-xs text-red-500">{isArabic ? "لم يتم تحديد سعر أو مقاس لهذا المنتج" : "No size/price set"}</span>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* مربع حوار الأحجام يبقى كما هو */}
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
                  <RadioGroupItem value={variant.size} id={`size-${variant.id}`} />
                  <Label htmlFor={`size-${variant.id}`}>
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

export default ProductCard;
