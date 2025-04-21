
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Category } from "@/types";

interface ProductSearchAndCategoriesProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (value: string) => void;
  categories: Category[];
  isArabic: boolean;
  viewMode?: React.ReactNode;
}

const ProductSearchAndCategories: React.FC<ProductSearchAndCategoriesProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onSelectCategory,
  categories,
  isArabic,
  viewMode,
}) => {
  return (
    <div className="space-y-4 h-full">
      <div className="flex flex-col md:flex-row gap-4 sticky top-0 bg-background z-10 pb-4 px-1">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-3 h-4 w-4 text-muted-foreground`} />
            <Input
              placeholder={isArabic ? "بحث عن منتج..." : "Search products..."}
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className={`pl-10 ${isArabic ? 'text-right pr-4' : ''}`}
              dir={isArabic ? "rtl" : "ltr"}
            />
          </div>
          {viewMode}
        </div>
      </div>

      <div className="overflow-x-auto pb-2 px-1">
        {categories.length > 0 ? (
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={onSelectCategory} className="w-full">
            <TabsList className="h-10 p-1 w-full inline-flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              <TabsTrigger value="all" className="px-4 whitespace-nowrap flex-shrink-0">
                {isArabic ? "جميع الأصناف" : "All Categories"}
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={`cat-${category.id}`} value={category.id} className="px-4 whitespace-nowrap flex-shrink-0">
                  {isArabic ? category.nameAr || category.name : category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <div className="text-center py-2 text-muted-foreground">
            {isArabic ? "لا توجد تصنيفات متاحة" : "No categories available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchAndCategories;
