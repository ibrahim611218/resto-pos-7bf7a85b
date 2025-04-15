
import React from "react";
import { Button } from "@/components/ui/button";
import { Size } from "@/types";

interface SizeFiltersProps {
  selectedSize: Size | null;
  setSelectedSize: (size: Size | null) => void;
  isMobile: boolean;
  isArabic: boolean;
}

const SizeFilters: React.FC<SizeFiltersProps> = ({
  selectedSize,
  setSelectedSize,
  isMobile,
  isArabic,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={() => setSelectedSize(null)} 
        variant={selectedSize === null ? "default" : "outline"}
        size={isMobile ? "sm" : "default"}
      >
        {isArabic ? "الكل" : "All"}
      </Button>
      <Button 
        onClick={() => setSelectedSize("small")} 
        variant={selectedSize === "small" ? "default" : "outline"}
        size={isMobile ? "sm" : "default"}
      >
        {isArabic ? "صغير" : "Small"}
      </Button>
      <Button 
        onClick={() => setSelectedSize("medium")} 
        variant={selectedSize === "medium" ? "default" : "outline"}
        size={isMobile ? "sm" : "default"}
      >
        {isArabic ? "وسط" : "Medium"}
      </Button>
      <Button 
        onClick={() => setSelectedSize("large")} 
        variant={selectedSize === "large" ? "default" : "outline"}
        size={isMobile ? "sm" : "default"}
      >
        {isArabic ? "كبير" : "Large"}
      </Button>
    </div>
  );
};

export default SizeFilters;
