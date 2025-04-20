
import React from 'react';
import { TableHead, TableHeader as UITableHeader, TableRow } from '@/components/ui/table';

interface PurchaseTableHeaderProps {
  isArabic: boolean;
}

const PurchaseTableHeader: React.FC<PurchaseTableHeaderProps> = ({ isArabic }) => {
  return (
    <UITableHeader>
      <TableRow>
        <TableHead>{isArabic ? 'المنتج' : 'Product'}</TableHead>
        <TableHead>{isArabic ? 'الحجم' : 'Size'}</TableHead>
        <TableHead className="w-24">{isArabic ? 'الكمية' : 'Quantity'}</TableHead>
        <TableHead className="w-32">{isArabic ? 'سعر الوحدة' : 'Unit Price'}</TableHead>
        <TableHead className="w-32">{isArabic ? 'إجمالي السعر' : 'Total Price'}</TableHead>
        <TableHead className="w-24">{isArabic ? 'إجراءات' : 'Actions'}</TableHead>
      </TableRow>
    </UITableHeader>
  );
};

export default PurchaseTableHeader;
