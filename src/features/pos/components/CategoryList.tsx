
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/types";

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
  // Enhanced handleClick with proper event handling
  const handleClick = (e: React.MouseEvent | React.TouchEvent, categoryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Category clicked:", categoryId);
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
  };

  return (
    <ScrollArea className="w-full" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex overflow-x-auto pb-2 space-x-2 rtl:space-x-reverse interactive-element">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            className="flex-shrink-0 interactive category-item"
            onClick={(e) => handleClick(e, category.id)}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => handleClick(e, category.id)}
            role="button"
            aria-pressed={activeCategory === category.id}
            tabIndex={0}
          >
            {isArabic && category.nameAr ? category.nameAr : category.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategoryList;
