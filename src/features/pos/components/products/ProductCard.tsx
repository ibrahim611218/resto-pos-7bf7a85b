
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import { Size, Product } from "@/types";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { useLocation } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductActionButtons from "./ProductActionButtons";
import ProductSizeDialog from "./ProductSizeDialog";
import VariablePriceDialog from "./VariablePriceDialog";

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
  const [showVariablePriceDialog, setShowVariablePriceDialog] = useState(false);
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
    
    // إذا كان المنتج بسعر متغير، فتح حوار إدخال السعر
    if (product.variablePrice) {
      if (product.variants.length > 1) {
        setSelectedSize(product.variants[0].size);
        setShowSizeDialog(true);
      } else {
        setSelectedSize(product.variants[0].size);
        setShowVariablePriceDialog(true);
      }
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
    
    // إذا كان المنتج بسعر متغير، فتح حوار إدخال السعر بعد اختيار المقاس
    if (product.variablePrice) {
      setShowSizeDialog(false);
      setShowVariablePriceDialog(true);
      return;
    }
    
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

  const handleVariablePriceConfirm = (price: number) => {
    const variant = product.variants.find(v => v.size === selectedSize) || product.variants[0];
    
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      nameAr: product.nameAr,
      price: price, // استخدام السعر المدخل من المستخدم
      quantity: 1,
      image: product.image,
      size: variant.size as Size | "regular",
      categoryId: product.categoryId,
      variantId: variant.id,
      taxable: product.taxable !== undefined ? product.taxable : true
    });
    
    setShowVariablePriceDialog(false);
    setSelectedSize(null);
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
        <ProductActionButtons 
          onEdit={onEdit}
          onDelete={onDelete}
          productId={product.id}
          isProductsPage={isProductsPage}
        />

        <CardContent className="p-0">
          <ProductImage 
            product={product}
            viewMode={viewMode}
            isArabic={isArabic}
            hasImage={hasImage}
          />
          {hasImage && (
            <ProductInfo 
              product={product}
              viewMode={viewMode}
              isArabic={isArabic}
            />
          )}
        </CardContent>
      </Card>
      
      <ProductSizeDialog
        product={product}
        isOpen={showSizeDialog}
        onClose={() => setShowSizeDialog(false)}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        onSizeSelected={handleSizeSelected}
        isArabic={isArabic}
      />
      
      <VariablePriceDialog
        product={product}
        selectedSize={selectedSize}
        isOpen={showVariablePriceDialog}
        onClose={() => {
          setShowVariablePriceDialog(false);
          setSelectedSize(null);
        }}
        onPriceConfirm={handleVariablePriceConfirm}
      />
    </>
  );
};

export default ProductCard;
