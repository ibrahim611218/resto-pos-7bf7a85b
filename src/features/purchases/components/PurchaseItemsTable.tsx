
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { PurchaseItem, Product } from '@/types';
import PurchaseTableHeader from './purchase-items-table/TableHeader';
import TableRow from './purchase-items-table/TableRow';
import EmptyState from './purchase-items-table/EmptyState';

interface PurchaseItemsTableProps {
  items: PurchaseItem[];
  products: Product[];
  onUpdateItem: (item: PurchaseItem) => void;
  onRemoveItem: (itemId: string) => void;
  language: "en" | "ar";
}

const PurchaseItemsTable: React.FC<PurchaseItemsTableProps> = ({
  items,
  products,
  onUpdateItem,
  onRemoveItem,
  language
}) => {
  const isArabic = language === 'ar';

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <PurchaseTableHeader isArabic={isArabic} />
        <TableBody>
          {items.length === 0 ? (
            <EmptyState isArabic={isArabic} />
          ) : (
            items.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                products={products}
                isArabic={isArabic}
                onUpdateItem={onUpdateItem}
                onRemoveItem={onRemoveItem}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseItemsTable;
