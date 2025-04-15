
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/types";

// Mock data - in a real app, this would come from a database or API
const mockProducts = [
  {
    id: "1",
    name: "Espresso",
    nameAr: "إسبريسو",
    description: "Strong coffee",
    descriptionAr: "قهوة قوية",
    price: 8,
    categoryId: "1",
    image: "/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png",
    variants: [
      { id: "1-1", size: "small", price: 8 },
      { id: "1-2", size: "medium", price: 12 },
      { id: "1-3", size: "large", price: 15 }
    ],
    taxable: true,
    type: "sized"
  },
  {
    id: "2",
    name: "Americano",
    nameAr: "أمريكانو",
    price: 10,
    categoryId: "1",
    variants: [
      { id: "2-1", size: "small", price: 10 },
      { id: "2-2", size: "medium", price: 14 },
      { id: "2-3", size: "large", price: 18 }
    ],
    taxable: true,
    type: "sized"
  },
  {
    id: "3",
    name: "Croissant",
    nameAr: "كرواسون",
    price: 7,
    categoryId: "2",
    variants: [{ id: "3-1", size: "regular", price: 7 }],
    taxable: true,
    type: "single"
  },
  {
    id: "4",
    name: "Cheesecake",
    nameAr: "تشيز كيك",
    price: 15,
    categoryId: "2",
    variants: [{ id: "4-1", size: "regular", price: 15 }],
    taxable: true,
    type: "single"
  }
];

interface ProductsGridProps {
  viewMode: "grid" | "list";
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ viewMode }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [products, setProducts] = useState<Product[]>([]);

  // In a real app, you would fetch products from an API or database
  useEffect(() => {
    setProducts(mockProducts as Product[]);
  }, []);

  return (
    <div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((product) => (
            <ProductListItem 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
