
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import GlassCard from "@/components/ui-custom/GlassCard";

interface CategoryListProps {
  categories: { id: string; name: string; nameAr?: string; image?: string }[];
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
      <GlassCard
        animation="fade"
        delay={0}
        className={`cursor-pointer hover:shadow-md transition-all duration-200 h-full
          ${!activeCategory ? "bg-[#F97316]/20 border border-[#F97316]/50" : "bg-secondary/30"}`}
        onClick={() => handleCategoryClick("all")}
      >
        <div className="text-center py-2 px-1">
          <p className="font-medium truncate">
            {isArabic ? "الكل" : "All"}
          </p>
        </div>
      </GlassCard>
      
      {categories.map((category, index) => (
        <GlassCard
          key={category.id}
          animation="fade"
          delay={(index + 1) * 50}
          className={`cursor-pointer hover:shadow-md transition-all duration-200 h-full
            ${activeCategory === category.id ? "bg-[#F97316]/20 border border-[#F97316]/50" : "bg-secondary/30"}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.image && (
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img 
                src={category.image}
                alt={isArabic ? category.nameAr : category.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="text-center py-2 px-1">
            <p className="font-medium truncate">
              {isArabic && category.nameAr ? category.nameAr : category.name}
            </p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default CategoryList;
