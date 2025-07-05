
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import ProductListItemImage from "./ProductListItemImage";
import ProductListItemContent from "./ProductListItemContent";
import ProductListItemActions from "./ProductListItemActions";

interface ProductListItemCardProps {
  product: Product;
  isArabic: boolean;
  hasImage: boolean;
  isProductsPage: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick: (e: React.MouseEvent) => void;
}

const ProductListItemCard: React.FC<ProductListItemCardProps> = ({
  product,
  isArabic,
  hasImage,
  isProductsPage,
  onEdit,
  onDelete,
  onClick
}) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative group"
      onClick={onClick}
    >
      <CardContent className="p-2">
        <div className="flex items-center">
          <ProductListItemImage 
            product={product}
            isArabic={isArabic}
            hasImage={hasImage}
          />
          
          <ProductListItemContent 
            product={product}
            isArabic={isArabic}
          />
          
          <ProductListItemActions 
            isProductsPage={isProductsPage}
            onEdit={onEdit}
            onDelete={onDelete}
            productId={product.id}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductListItemCard;
