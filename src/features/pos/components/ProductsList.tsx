
import React from "react";
import { Product, Size } from "@/types";
import ProductCard from "./ProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductsListProps {
  products: Product[];
  searchResults?: Product[];
  searchTerm?: string;
  onAddToCart: (product: Product, variantId: string) => void;
  isArabic: boolean;
  getSizeLabel: (size: string) => string;
}

const ProductsList: React.FC<ProductsListProps> = ({ 
  products, 
  searchResults, 
  searchTerm,
  onAddToCart,
  isArabic,
  getSizeLabel
}) => {
  const displayProducts = searchTerm ? searchResults : products;

  return (
    <ScrollArea className="w-full h-full pb-20">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-24 px-2">
        {displayProducts && displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isArabic={isArabic}
              onAddToCart={onAddToCart}
              getSizeLabel={getSizeLabel}
            />
          ))
        ) : (
          <div className="col-span-full text-center p-6 border rounded-lg border-dashed text-muted-foreground">
            {isArabic ? "لا توجد منتجات" : "No products found"}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ProductsList;
