
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { Tag } from "lucide-react";

interface CategoryListProps {
  categories: { id: string; name: string; nameAr?: string }[];
  activeCategory: string | null;
  onCategoryClick?: (categoryId: string) => void;
  isArabic: boolean;
  setActiveCategory?: (id: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  isArabic,
  setActiveCategory,
}) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  const handleCategoryClick = (categoryId: string) => {
    if (setActiveCategory) {
      setActiveCategory(categoryId === "all" ? null : categoryId);
    } else if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <div className="flex overflow-x-auto no-scrollbar py-3 gap-3 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/10 scrollbar-track-transparent justify-center mx-auto">
      <Button
        variant={!activeCategory ? "default" : "outline"}
        size="sm"
        className={cn(
          "flex-shrink-0 whitespace-nowrap rounded-full shadow-sm transition-all duration-200 gap-1",
          !activeCategory 
            ? `${isLightTheme ? 'bg-gradient-to-r from-primary to-primary/90' : 'bg-primary'} text-white hover:bg-primary/90 hover:scale-105 transform` 
            : `${isLightTheme ? 'bg-white' : 'bg-secondary'} hover:bg-secondary/80 border border-border/50`
        )}
        onClick={() => handleCategoryClick("all")}
      >
        <Tag className="h-4 w-4" />
        {isArabic ? "الكل" : "All"}
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          className={cn(
            "flex-shrink-0 whitespace-nowrap rounded-full shadow-sm transition-all duration-200 gap-1",
            activeCategory === category.id
              ? `${isLightTheme ? 'bg-gradient-to-r from-primary to-primary/90' : 'bg-primary'} text-white hover:bg-primary/90 hover:scale-105 transform` 
              : `${isLightTheme ? 'bg-white' : 'bg-secondary'} hover:bg-secondary/80 border border-border/50`
          )}
          onClick={() => handleCategoryClick(category.id)}
        >
          <Tag className="h-4 w-4" />
          {isArabic && category.nameAr ? category.nameAr : category.name}
        </Button>
      ))}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(CategoryList);
