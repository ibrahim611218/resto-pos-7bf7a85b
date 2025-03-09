
import React from "react";
import { Product } from "@/types";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: Product[];
  onAddToCart: (product: Product, variantId: string) => void;
  isArabic: boolean;
  getSizeLabel: (size: string) => string;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onAddToCart,
  isArabic,
  getSizeLabel
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <AnimatedTransition
          key={product.id}
          animation="fade"
          delay={index * 50}
        >
          <ProductCard 
            product={product} 
            onAddToCart={onAddToCart} 
            isArabic={isArabic}
            getSizeLabel={getSizeLabel}
          />
        </AnimatedTransition>
      ))}
    </div>
  );
};

export default ProductsList;
