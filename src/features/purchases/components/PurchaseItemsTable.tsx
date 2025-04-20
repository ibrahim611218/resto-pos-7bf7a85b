
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { PurchaseItem, Product, Language } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { useLanguage } from '@/context/LanguageContext';

interface PurchaseItemsTableProps {
  items: PurchaseItem[];
  products: Product[];
  onUpdateItem: (item: PurchaseItem) => void;
  onRemoveItem: (itemId: string) => void;
  language: Language;
}

const PurchaseItemsTable: React.FC<PurchaseItemsTableProps> = ({
  items,
  products,
  onUpdateItem,
  onRemoveItem,
  language
}) => {
  const { language: contextLanguage } = useLanguage();
  const isArabic = (language || contextLanguage) === 'ar';
  
  const handleProductChange = (itemId: string, productId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get the default price based on product type
    let unitPrice = 0;
    if (product.type === 'single') {
      unitPrice = product.price || 0;
    } else if (product.variants && product.variants.length > 0) {
      // For sized products, use the first variant's price as default
      unitPrice = product.variants[0].price;
    }
    
    const taxRate = item.taxRate;
    const taxAmount = (unitPrice * item.quantity * taxRate) / 100;
    const totalPrice = (unitPrice * item.quantity) + taxAmount;
    
    onUpdateItem({
      ...item,
      productId,
      productName: product.name,
      productNameAr: product.nameAr,
      unitPrice,
      taxAmount,
      totalPrice
    });
  };
  
  const handleQuantityChange = (itemId: string, quantityStr: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const quantity = parseInt(quantityStr) || 1;
    const taxAmount = (item.unitPrice * quantity * item.taxRate) / 100;
    const totalPrice = (item.unitPrice * quantity) + taxAmount;
    
    onUpdateItem({
      ...item,
      quantity,
      taxAmount,
      totalPrice
    });
  };
  
  const handleUnitPriceChange = (itemId: string, priceStr: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const unitPrice = parseFloat(priceStr) || 0;
    const taxAmount = (unitPrice * item.quantity * item.taxRate) / 100;
    const totalPrice = (unitPrice * item.quantity) + taxAmount;
    
    onUpdateItem({
      ...item,
      unitPrice,
      taxAmount,
      totalPrice
    });
  };
  
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? 'المنتج' : 'Product'}</TableHead>
            <TableHead className="w-24">{isArabic ? 'الكمية' : 'Quantity'}</TableHead>
            <TableHead className="w-32">{isArabic ? 'سعر الوحدة' : 'Unit Price'}</TableHead>
            <TableHead className="w-32">{isArabic ? 'إجمالي السعر' : 'Total Price'}</TableHead>
            <TableHead className="w-24">{isArabic ? 'إجراءات' : 'Actions'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                {isArabic ? 'لا توجد منتجات. اضغط زر "إضافة منتج".' : 'No items. Click "Add Item" button.'}
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Select 
                    value={item.productId} 
                    onValueChange={(value) => handleProductChange(item.id, value)}
                  >
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
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleUnitPriceChange(item.id, e.target.value)}
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseItemsTable;
