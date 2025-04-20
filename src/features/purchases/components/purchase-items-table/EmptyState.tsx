
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

interface EmptyStateProps {
  isArabic: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isArabic }) => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-6">
        {isArabic ? 'لا توجد منتجات. اضغط زر "إضافة منتج".' : 'No items. Click "Add Item" button.'}
      </TableCell>
    </TableRow>
  );
};

export default EmptyState;
