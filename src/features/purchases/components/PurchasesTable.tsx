
import React from 'react';
import { PurchaseInvoice } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface PurchasesTableProps {
  purchases: PurchaseInvoice[];
  onView: (purchase: PurchaseInvoice) => void;
  onEdit: (purchase: PurchaseInvoice) => void;
  onDelete: (purchase: PurchaseInvoice) => void;
  isArabic: boolean;
}

const PurchasesTable: React.FC<PurchasesTableProps> = ({ 
  purchases, 
  onView, 
  onEdit, 
  onDelete,
  isArabic 
}) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', options);
  };

  if (purchases.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center py-6">
          {isArabic ? 'لا توجد فواتير مشتريات' : 'No purchase invoices found'}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isArabic ? 'رقم الفاتورة' : 'Invoice #'}</TableHead>
          <TableHead>{isArabic ? 'المورد' : 'Supplier'}</TableHead>
          <TableHead>{isArabic ? 'التاريخ' : 'Date'}</TableHead>
          <TableHead>{isArabic ? 'المجموع' : 'Total'}</TableHead>
          <TableHead>{isArabic ? 'حالة الدفع' : 'Payment Status'}</TableHead>
          <TableHead>{isArabic ? 'الإجراءات' : 'Actions'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map(purchase => (
          <TableRow key={purchase.id}>
            <TableCell>{purchase.invoiceNumber}</TableCell>
            <TableCell>
              {isArabic && purchase.supplier.nameAr ? purchase.supplier.nameAr : purchase.supplier.name}
            </TableCell>
            <TableCell>{formatDate(purchase.date)}</TableCell>
            <TableCell>{formatCurrency(purchase.total)}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                purchase.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                purchase.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {isArabic 
                  ? purchase.paymentStatus === 'paid' ? 'مدفوع' :
                    purchase.paymentStatus === 'partial' ? 'مدفوع جزئياً' :
                    'غير مدفوع'
                  : purchase.paymentStatus}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onView(purchase)}>
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(purchase)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive" 
                  onClick={() => onDelete(purchase)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PurchasesTable;
