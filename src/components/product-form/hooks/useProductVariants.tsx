
import { useState } from "react";
import { ProductVariant } from "@/types";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export const useProductVariants = (initialVariants: ProductVariant[] = []) => {
  const [variants, setVariants] = useState<ProductVariant[]>(initialVariants);

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `var-${uuidv4()}`,
      size: "regular" as any,
      price: 0
    };

    setVariants(prev => [...prev, newVariant]);
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const removeVariant = (id: string) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  const reorderVariant = (index: number, direction: 'up' | 'down') => {
    setVariants(prev => {
      const newVariants = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newVariants.length) {
        return newVariants;
      }

      const [movedItem] = newVariants.splice(index, 1);
      newVariants.splice(targetIndex, 0, movedItem);
      
      return newVariants;
    });
  };

  return {
    variants,
    setVariants,
    addVariant,
    updateVariant,
    removeVariant,
    reorderVariant
  };
};
