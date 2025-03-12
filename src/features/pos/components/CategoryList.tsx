
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryListProps {
  categories: { id: string; name: string; nameAr?: string }[];
  activeCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
  isArabic: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  isArabic,
}) => {
  return (
    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/10 scrollbar-track-transparent">
      <Button
        variant="outline"
        className={cn(
          "flex-shrink-0 whitespace-nowrap",
          "bg-gray-50 hover:bg-gray-100",
          !activeCategory && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        onClick={() => onCategoryClick("all")}
      >
        {isArabic ? "الكل" : "All"}
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          className={cn(
            "flex-shrink-0 whitespace-nowrap",
            "bg-gray-50 hover:bg-gray-100", 
            activeCategory === category.id && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => onCategoryClick(category.id)}
        >
          {isArabic && category.nameAr ? category.nameAr : category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryList;
