
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/types";

// Extended mock data - in a real app, this would come from a database or API
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
  },
  {
    id: "5",
    name: "Latte",
    nameAr: "لاتيه",
    price: 12,
    categoryId: "1",
    variants: [
      { id: "5-1", size: "small", price: 12 },
      { id: "5-2", size: "medium", price: 16 },
      { id: "5-3", size: "large", price: 20 }
    ],
    taxable: true,
    type: "sized"
  },
  {
    id: "6",
    name: "Cappuccino",
    nameAr: "كابتشينو",
    price: 13,
    categoryId: "1",
    variants: [
      { id: "6-1", size: "small", price: 13 },
      { id: "6-2", size: "medium", price: 17 },
      { id: "6-3", size: "large", price: 21 }
    ],
    taxable: true,
    type: "sized"
  },
  {
    id: "7",
    name: "Chocolate Cake",
    nameAr: "كيك الشوكولاتة",
    price: 14,
    categoryId: "2",
    variants: [{ id: "7-1", size: "regular", price: 14 }],
    taxable: true,
    type: "single"
  },
  {
    id: "8",
    name: "Apple Pie",
    nameAr: "فطيرة التفاح",
    price: 12,
    categoryId: "2",
    variants: [{ id: "8-1", size: "regular", price: 12 }],
    taxable: true,
    type: "single"
  },
  {
    id: "9",
    name: "Tea",
    nameAr: "شاي",
    price: 6,
    categoryId: "1",
    variants: [
      { id: "9-1", size: "small", price: 6 },
      { id: "9-2", size: "medium", price: 9 },
      { id: "9-3", size: "large", price: 12 }
    ],
    taxable: true,
    type: "sized"
  },
  {
    id: "10",
    name: "Muffin",
    nameAr: "مافن",
    price: 8,
    categoryId: "2",
    variants: [{ id: "10-1", size: "regular", price: 8 }],
    taxable: true,
    type: "single"
  }
];

// In a real application, you would fetch data from the electron handlers or use React Query
// For example:
// import { useQuery } from '@tanstack/react-query';
// const { data: products, isLoading } = useQuery({
//   queryKey: ['products'],
//   queryFn: async () => {
//     const products = await window.electron.invoke('db:getProducts');
//     return products;
//   }
// });

interface ProductsGridProps {
  viewMode: "grid" | "list";
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ viewMode }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [products, setProducts] = useState<Product[]>([]);

  // In a real app, you would fetch products from an API or database
  useEffect(() => {
    // Simulate loading all products
    const loadProducts = async () => {
      try {
        // In a real app, use the Electron API or React Query to load products
        // const loadedProducts = await window.electron.invoke('db:getProducts');
        // setProducts(loadedProducts);
        
        // For now, use the extended mock data
        setProducts(mockProducts as Product[]);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    
    loadProducts();
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
