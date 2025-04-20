
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableHeaderProps {
  isArabic: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ isArabic }) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{isArabic ? 'المنتج' : 'Product'}</TableHead>
        <TableHead>{isArabic ? 'الحجم' : 'Size'}</TableHead>
        <TableHead className="w-24">{isArabic ? 'الكمية' : 'Quantity'}</TableHead>
        <TableHead className="w-32">{isArabic ? 'سعر الوحدة' : 'Unit Price'}</TableHead>
        <TableHead className="w-32">{isArabic ? 'إجمالي السعر' : 'Total Price'}</TableHead>
        <TableHead className="w-24">{isArabic ? 'إجراءات' : 'Actions'}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeader;
