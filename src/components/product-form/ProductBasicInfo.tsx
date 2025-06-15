
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types";
import ImageUploader from "@/components/ui-custom/ImageUploader";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductBasicInfoProps {
  product: Product;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageChange: (imageUrl: string) => void;
  isArabic: boolean;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  product,
  handleInputChange,
  handleImageChange,
  isArabic,
}) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{isArabic ? "اسم المنتج" : "Product Name"}</Label>
          <Input 
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder={isArabic ? "أدخل اسم المنتج" : "Enter product name"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nameAr">{isArabic ? "اسم المنتج (عربي)" : "Product Name (Arabic)"}</Label>
          <Input 
            id="nameAr"
            name="nameAr"
            value={product.nameAr || ""}
            onChange={handleInputChange}
            placeholder={isArabic ? "أدخل اسم المنتج بالعربية" : "Enter product name in Arabic"}
            dir="rtl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{isArabic ? "صورة المنتج" : "Product Image"}</Label>
        <ImageUploader 
          initialImage={product.image} 
          onImageChange={handleImageChange}
        />
      </div>

      <Collapsible open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
              {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span>{isArabic ? "إضافة وصف (اختياري)" : "Add description (optional)"}</span>
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4 animate-accordion-down">
          <div className="space-y-2">
            <Label htmlFor="description">{isArabic ? "وصف المنتج" : "Product Description"}</Label>
            <Textarea 
              id="description"
              name="description"
              value={product.description || ""}
              onChange={handleInputChange}
              placeholder={isArabic ? "أدخل وصف المنتج" : "Enter product description"}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionAr">{isArabic ? "وصف المنتج (عربي)" : "Product Description (Arabic)"}</Label>
            <Textarea 
              id="descriptionAr"
              name="descriptionAr"
              value={product.descriptionAr || ""}
              onChange={handleInputChange}
              placeholder={isArabic ? "أدخل وصف المنتج بالعربية" : "Enter product description in Arabic"}
              rows={3}
              dir="rtl"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ProductBasicInfo;
