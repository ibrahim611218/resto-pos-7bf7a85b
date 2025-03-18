
import React from "react";
import { Category } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface CategoryListProps {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
  isArabic: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  isArabic,
}) => {
  const { isMobile } = useWindowDimensions();

  // No categories
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-2 text-muted-foreground">
        {isArabic ? "لا توجد فئات" : "No categories found"}
      </div>
    );
  }

  const handleCategoryClick = (categoryId: string) => {
    // Toggle category if clicking on the active one
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  return (
    <div className="category-nav mb-2 pb-1 border-b border-border/30">
      <ScrollArea 
        className="w-full whitespace-nowrap pb-2" 
        type="always" 
        orientation="horizontal"
      >
        <div className="flex space-x-1 rtl:space-x-reverse px-1 py-1">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:bg-muted/80 px-3 py-1.5 text-sm",
                activeCategory === category.id ? "bg-primary text-primary-foreground" : "",
                isMobile ? "text-xs py-1" : ""
              )}
              onClick={() => handleCategoryClick(category.id)}
            >
              {isArabic ? category.nameAr || category.name : category.name}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryList;
