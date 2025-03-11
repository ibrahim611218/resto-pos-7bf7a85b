
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductVariant } from "@/types";
import { Plus, X } from "lucide-react";

interface ProductVariantsManagerProps {
  variants: ProductVariant[];
  addVariant: () => void;
  updateVariant: (id: string, field: keyof ProductVariant, value: any) => void;
  removeVariant: (id: string) => void;
  isArabic: boolean;
}

const ProductVariantsManager: React.FC<ProductVariantsManagerProps> = ({
  variants,
  addVariant,
  updateVariant,
  removeVariant,
  isArabic,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>المقاسات والأسعار</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addVariant}
        >
          <Plus size={16} className="ml-2" />
          إضافة مقاس
        </Button>
      </div>
      {variants.length === 0 ? (
        <div className="text-center p-4 border rounded-md text-muted-foreground">
          لا توجد مقاسات. أضف مقاس باستخدام الزر أعلاه.
        </div>
      ) : (
        <div className="space-y-2">
          {variants.map(variant => (
            <div key={variant.id} className="flex items-center space-x-2 space-x-reverse border p-2 rounded-md">
              <Select 
                value={variant.size} 
                onValueChange={(value) => updateVariant(variant.id, 'size', value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">صغير</SelectItem>
                  <SelectItem value="medium">وسط</SelectItem>
                  <SelectItem value="large">كبير</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center flex-1">
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  value={variant.price}
                  onChange={(e) => updateVariant(variant.id, 'price', parseFloat(e.target.value) || 0)}
                  placeholder="السعر"
                  className="w-24"
                />
                <span className="mr-2">ريال</span>
              </div>
              
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeVariant(variant.id)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductVariantsManager;
