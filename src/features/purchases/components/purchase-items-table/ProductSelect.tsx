
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types';

interface ProductSelectProps {
  productId: string;
  products: Product[];
  isArabic: boolean;
  onValueChange: (value: string) => void;
}

const ProductSelect: React.FC<ProductSelectProps> = ({
  productId,
  products,
  isArabic,
  onValueChange
}) => {
  return (
    <Select value={productId} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {products.map(product => (
          <SelectItem key={product.id} value={product.id}>
            {isArabic && product.nameAr ? product.nameAr : product.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductSelect;
