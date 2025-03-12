
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
    <div className="flex overflow-x-auto pb-2 gap-2 pl-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/10 scrollbar-track-transparent">
      <Button
        variant={isLightTheme ? "outline" : "secondary"}
        className={cn(
          "flex-shrink-0 whitespace-nowrap",
          isLightTheme 
            ? (!activeCategory 
                ? "bg-[#004d40] text-white hover:bg-[#00352c] border-[#004d40]" 
                : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200")
            : (!activeCategory 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "")
        )}
        onClick={() => handleCategoryClick("all")}
      >
        {isArabic ? "الكل" : "All"}
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={isLightTheme ? "outline" : "secondary"}
          className={cn(
            "flex-shrink-0 whitespace-nowrap",
            isLightTheme 
              ? (activeCategory === category.id
                  ? "bg-[#004d40] text-white hover:bg-[#00352c] border-[#004d40]" 
                  : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200")
              : (activeCategory === category.id 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "")
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
