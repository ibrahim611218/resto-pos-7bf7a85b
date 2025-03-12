
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

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
    <div className="flex overflow-x-auto no-scrollbar py-2 gap-3 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/10 scrollbar-track-transparent">
      <Button
        variant="default"
        size="lg"
        className={cn(
          "flex-shrink-0 whitespace-nowrap rounded-full shadow-sm transition-all duration-200",
          !activeCategory 
            ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 transform" 
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
        onClick={() => handleCategoryClick("all")}
      >
        {isArabic ? "الكل" : "All"}
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="default"
          size="lg"
          className={cn(
            "flex-shrink-0 whitespace-nowrap rounded-full shadow-sm transition-all duration-200",
            activeCategory === category.id
              ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 transform" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
          onClick={() => handleCategoryClick(category.id)}
        >
          {isArabic && category.nameAr ? category.nameAr : category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryList;
