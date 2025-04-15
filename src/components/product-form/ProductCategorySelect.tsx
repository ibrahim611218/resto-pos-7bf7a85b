
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";

interface ProductCategorySelectProps {
  categoryId: string;
  handleCategoryChange: (value: string) => void;
  categories: Category[];
  isArabic: boolean;
}

const ProductCategorySelect: React.FC<ProductCategorySelectProps> = ({
  categoryId,
  handleCategoryChange,
  categories,
  isArabic,
}) => {
  return (
    <div className="space-y-2 relative z-10">
      <Label htmlFor="category">{isArabic ? "التصنيف" : "Category"}</Label>
      <Select 
        value={categoryId} 
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger id="category" className="bg-background">
          <SelectValue placeholder={isArabic ? "اختر التصنيف" : "Select category"} />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="z-[9999] bg-background" 
          sideOffset={4}
          align="start"
          avoidCollisions={true}
        >
          {categories.map(category => (
            <SelectItem key={category.id} value={category.id} className="cursor-pointer">
              {isArabic ? (category.nameAr || category.name) : category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductCategorySelect;
