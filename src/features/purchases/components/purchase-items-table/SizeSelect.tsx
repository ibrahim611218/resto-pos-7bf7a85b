
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types';

interface SizeSelectProps {
  productId: string;
  size: string;
  products: Product[];
  isArabic: boolean;
  onValueChange: (value: string) => void;
}

const SizeSelect: React.FC<SizeSelectProps> = ({
  productId,
  size,
  products,
  isArabic,
  onValueChange
}) => {
  const product = products.find(p => p.id === productId);
  const isSizedProduct = product?.type === 'sized';

  if (!isSizedProduct) {
    return <span className="text-gray-500">-</span>;
  }

  return (
    <Select value={size || ''} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {product?.variants.map(variant => (
          <SelectItem key={variant.id} value={variant.size}>
            {isArabic 
              ? (variant.size === 'small' ? 'صغير' 
                : variant.size === 'medium' ? 'وسط' 
                : variant.size === 'large' ? 'كبير'
                : variant.size === 'xlarge' ? 'كبير جداً'
                : variant.size)
              : variant.size
            }
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SizeSelect;
