
import React from 'react';
import { Input } from '@/components/ui/input';

interface PurchaseSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isArabic: boolean;
}

const PurchaseSearch: React.FC<PurchaseSearchProps> = ({ searchTerm, onSearchChange, isArabic }) => {
  return (
    <div className="mb-4">
      <Input
        placeholder={isArabic ? 'بحث عن فاتورة...' : 'Search invoices...'}
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default PurchaseSearch;
