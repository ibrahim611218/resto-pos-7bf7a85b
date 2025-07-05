
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import { Size, Product } from "@/types";
import { useLocation } from "react-router-dom";
import ProductListItemCard from "./list-item/ProductListItemCard";
import ProductSizeSelectionDialog from "./list-item/ProductSizeSelectionDialog";

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

  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  return (
    <>
      <ProductListItemCard
        product={product}
        isArabic={isArabic}
        hasImage={hasImage}
        isProductsPage={isProductsPage}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={handleAddToCart}
      />
      
      <ProductSizeSelectionDialog
        isOpen={showSizeDialog}
        onClose={() => setShowSizeDialog(false)}
        product={product}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        onConfirm={handleSizeSelected}
        isArabic={isArabic}
      />
    </>
  );
};

export default ProductListItem;
