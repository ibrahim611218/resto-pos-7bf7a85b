
import React from "react";
import { Category } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";

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
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {categories.map((category, index) => (
        <GlassCard
          key={category.id}
          className={`cursor-pointer transition-colors ${
            activeCategory === category.id
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
          animation="fade"
          delay={index * 50}
          onClick={() =>
            setActiveCategory(
              activeCategory === category.id ? null : category.id
            )
          }
        >
          <div className="text-center py-2">
            {isArabic ? category.nameAr : category.name}
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default CategoryList;
