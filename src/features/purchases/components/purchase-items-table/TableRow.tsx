
import React from 'react';
import { TableCell, TableRow as UITableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { PurchaseItem, Product } from '@/types';
import ProductSelect from './ProductSelect';
import SizeSelect from './SizeSelect';

interface TableRowProps {
  item: PurchaseItem;
  products: Product[];
  isArabic: boolean;
  onUpdateItem: (item: PurchaseItem) => void;
  onRemoveItem: (itemId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  products,
  isArabic,
  onUpdateItem,
  onRemoveItem
}) => {
  const handleProductChange = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let unitPrice = 0;
    if (product.type === 'single') {
      unitPrice = product.price || 0;
    } else if (product.variants && product.variants.length > 0) {
      unitPrice = product.variants[0].price;
    }
    
    const taxAmount = (unitPrice * item.quantity * item.taxRate) / 100;
    const totalPrice = (unitPrice * item.quantity) + taxAmount;
    
    onUpdateItem({
      ...item,
      productId,
      productName: product.name,
      productNameAr: product.nameAr,
      unitPrice,
      taxAmount,
      totalPrice,
      size: product.type === 'sized' ? product.variants[0].size : undefined
    });
  };

  return (
    <UITableRow>
      <TableCell>
        <ProductSelect
          productId={item.productId}
          products={products}
          isArabic={isArabic}
          onValueChange={handleProductChange}
        />
      </TableCell>
      <TableCell>
        <SizeSelect
          productId={item.productId}
          size={item.size || ''}
          products={products}
          isArabic={isArabic}
          onValueChange={(size) => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return;
            
            const variant = product.variants.find(v => v.size === size);
            if (!variant) return;
            
            const unitPrice = variant.price;
            const taxAmount = (unitPrice * item.quantity * item.taxRate) / 100;
            const totalPrice = (unitPrice * item.quantity) + taxAmount;
            
            onUpdateItem({
              ...item,
              size,
              unitPrice,
              taxAmount,
              totalPrice
            });
          }}
        />
      </TableCell>
      <TableCell>
        <Input 
          type="number" 
          min="1"
          value={item.quantity}
          onChange={(e) => {
            const quantity = parseInt(e.target.value) || 1;
            const taxAmount = (item.unitPrice * quantity * item.taxRate) / 100;
            const totalPrice = (item.unitPrice * quantity) + taxAmount;
            
            onUpdateItem({
              ...item,
              quantity,
              taxAmount,
              totalPrice
            });
          }}
        />
      </TableCell>
      <TableCell>
        <Input 
          type="number" 
          min="0"
          step="0.01"
          value={item.unitPrice}
          onChange={(e) => {
            const unitPrice = parseFloat(e.target.value) || 0;
            const taxAmount = (unitPrice * item.quantity * item.taxRate) / 100;
            const totalPrice = (unitPrice * item.quantity) + taxAmount;
            
            onUpdateItem({
              ...item,
              unitPrice,
              taxAmount,
              totalPrice
            });
          }}
        />
      </TableCell>
      <TableCell>
        {formatCurrency(item.totalPrice)}
      </TableCell>
      <TableCell>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-destructive"
          onClick={() => onRemoveItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </UITableRow>
  );
};

export default TableRow;
