
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";
import categoryService from "@/services/categories/CategoryService";

interface ProductCategorySelectProps {
  categoryId: string;
  handleCategoryChange: (value: string) => void;
  isArabic: boolean;
}

const ProductCategorySelect: React.FC<ProductCategorySelectProps> = ({
  categoryId,
  handleCategoryChange,
  isArabic,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categoryService.getCategories();
        setCategories(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="category">{isArabic ? "التصنيف" : "Category"}</Label>
      <Select 
        value={categoryId} 
        onValueChange={handleCategoryChange}
        disabled={isLoading}
      >
        <SelectTrigger id="category" className="relative z-10">
          <SelectValue placeholder={isArabic ? "اختر التصنيف" : "Select category"} />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="z-[9999] bg-background" 
          sideOffset={4}
          align="start"
        >
          {categories.map(category => (
            <SelectItem key={category.id} value={category.id}>
              {isArabic ? (category.nameAr || category.name) : category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductCategorySelect;
