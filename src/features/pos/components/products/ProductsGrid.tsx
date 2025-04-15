import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface ProductsGridProps {
  viewMode: "grid" | "list";
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ viewMode }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        if (window.db) {
          const [categoriesResult, productsResult] = await Promise.all([
            window.db.getCategories(),
            window.db.getProducts()
          ]);
          setCategories(categoriesResult);
          setProducts(productsResult);
        } else {
          console.log('Using mock data for POS preview');
          const { mockProducts, mockCategories } = await import('../../data/mockData');
          setCategories(mockCategories);
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error(isArabic ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [isArabic]);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        (product.nameAr && product.nameAr.toLowerCase().includes(term))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(product => product.categoryId === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 h-full">
      <div className="flex flex-col md:flex-row gap-4 sticky top-0 bg-background z-10 pb-4 px-1">
        <div className="relative flex-1">
          <Search className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-3 h-4 w-4 text-muted-foreground`} />
          <Input
            placeholder={isArabic ? "بحث عن منتج..." : "Search products..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${isArabic ? 'text-right pr-4' : ''}`}
            dir={isArabic ? "rtl" : "ltr"}
          />
        </div>
      </div>

      <div className="overflow-x-auto pb-2 px-1">
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="h-10 p-1 w-full inline-flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <TabsTrigger value="all" className="px-4 whitespace-nowrap flex-shrink-0">
              {isArabic ? "جميع الأصناف" : "All Categories"}
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-4 whitespace-nowrap flex-shrink-0">
                {isArabic ? category.nameAr || category.name : category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          {isArabic ? "لا توجد منتجات متطابقة مع البحث" : "No products found"}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 px-1">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-2 px-1">
          {filteredProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
