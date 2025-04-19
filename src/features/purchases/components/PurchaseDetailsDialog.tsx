
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PurchaseInvoice, Language } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/utils/formatters';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Printer, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PurchaseDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchase: PurchaseInvoice | null;
  language: Language;
}

const PurchaseDetailsDialog: React.FC<PurchaseDetailsDialogProps> = ({
  open,
  onOpenChange,
  purchase,
  language
}) => {
  const { language: contextLanguage } = useLanguage();
  const isArabic = (language || contextLanguage) === 'ar';
  
  if (!purchase) return null;
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', options);
  };
  
  const handlePrint = () => {
    // TODO: Implement print functionality
    console.log('Print purchase invoice:', purchase.invoiceNumber);
  };
  
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export purchase invoice to Excel:', purchase.invoiceNumber);
  };
  
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid': return isArabic ? 'مدفوع' : 'Paid';
      case 'partial': return isArabic ? 'مدفوع جزئياً' : 'Partially Paid';
      case 'pending': return isArabic ? 'غير مدفوع' : 'Pending';
      default: return status;
    }
  };
  
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash': return isArabic ? 'نقداً' : 'Cash';
      case 'card': return isArabic ? 'بطاقة' : 'Card';
      case 'transfer': return isArabic ? 'تحويل بنكي' : 'Bank Transfer';
      default: return method;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? `تفاصيل فاتورة المشتريات رقم: ${purchase.invoiceNumber}` : `Purchase Invoice Details: ${purchase.invoiceNumber}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? 'معلومات المورد' : 'Supplier Information'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold">
                  {isArabic && purchase.supplier.nameAr ? purchase.supplier.nameAr : purchase.supplier.name}
                </p>
                {purchase.supplier.taxNumber && (
                  <p>{isArabic ? `الرقم الضريبي: ${purchase.supplier.taxNumber}` : `Tax Number: ${purchase.supplier.taxNumber}`}</p>
                )}
                {purchase.supplier.address && (
                  <p>{purchase.supplier.address}</p>
                )}
                {purchase.supplier.phone && (
                  <p>{isArabic ? `الهاتف: ${purchase.supplier.phone}` : `Phone: ${purchase.supplier.phone}`}</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? 'معلومات الفاتورة' : 'Invoice Information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>{isArabic ? 'رقم الفاتورة:' : 'Invoice Number:'}</span>
                  <span>{purchase.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isArabic ? 'التاريخ:' : 'Date:'}</span>
                  <span>{formatDate(purchase.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isArabic ? 'حالة الدفع:' : 'Payment Status:'}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    purchase.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    purchase.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getPaymentStatusText(purchase.paymentStatus)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{isArabic ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                  <span>{getPaymentMethodText(purchase.paymentMethod)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'المنتجات' : 'Items'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>{isArabic ? 'المنتج' : 'Product'}</TableHead>
                    <TableHead className="text-right">{isArabic ? 'الكمية' : 'Quantity'}</TableHead>
                    <TableHead className="text-right">{isArabic ? 'سعر الوحدة' : 'Unit Price'}</TableHead>
                    <TableHead className="text-right">{isArabic ? 'قيمة الضريبة' : 'Tax'}</TableHead>
                    <TableHead className="text-right">{isArabic ? 'الإجمالي' : 'Total'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchase.items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {isArabic && item.productNameAr ? item.productNameAr : item.productName}
                      </TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.taxAmount)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.totalPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Invoice Summary */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-2 items-end">
                <div className="flex justify-between w-full md:w-1/3">
                  <span>{isArabic ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span>{formatCurrency(purchase.subtotal)}</span>
                </div>
                <div className="flex justify-between w-full md:w-1/3">
                  <span>{isArabic ? 'ضريبة القيمة المضافة:' : 'VAT:'}</span>
                  <span>{formatCurrency(purchase.taxAmount)}</span>
                </div>
                <div className="flex justify-between w-full md:w-1/3 font-bold text-lg">
                  <span>{isArabic ? 'الإجمالي:' : 'Total:'}</span>
                  <span>{formatCurrency(purchase.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Notes */}
          {purchase.notes && (
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? 'ملاحظات' : 'Notes'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{purchase.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              {isArabic ? 'طباعة' : 'Print'}
            </Button>
            <Button onClick={handleExport}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              {isArabic ? 'تصدير' : 'Export'}
            </Button>
          </div>
          
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? 'إغلاق' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDetailsDialog;
