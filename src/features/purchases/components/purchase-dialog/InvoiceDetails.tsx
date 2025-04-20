
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Supplier } from '@/types';

interface InvoiceDetailsProps {
  selectedSupplierId: string;
  setSelectedSupplierId: (id: string) => void;
  purchaseDate: string;
  setPurchaseDate: (date: string) => void;
  paymentStatus: 'paid' | 'pending' | 'partial';
  setPaymentStatus: (status: 'paid' | 'pending' | 'partial') => void;
  paymentMethod: 'cash' | 'card' | 'transfer';
  setPaymentMethod: (method: 'cash' | 'card' | 'transfer') => void;
  notes: string;
  setNotes: (notes: string) => void;
  suppliers: Supplier[];
  onAddSupplier: () => void;
  isArabic: boolean;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  selectedSupplierId,
  setSelectedSupplierId,
  purchaseDate,
  setPurchaseDate,
  paymentStatus,
  setPaymentStatus,
  paymentMethod,
  setPaymentMethod,
  notes,
  setNotes,
  suppliers,
  onAddSupplier,
  isArabic
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>{isArabic ? 'المورد' : 'Supplier'}</Label>
          <div className="flex gap-2">
            <Select value={selectedSupplierId} onValueChange={setSelectedSupplierId}>
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر المورد' : 'Select supplier'} />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {isArabic && supplier.nameAr ? supplier.nameAr : supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="button" variant="outline" onClick={onAddSupplier}>
              {isArabic ? 'إضافة' : 'Add'}
            </Button>
          </div>
        </div>

        <div>
          <Label>{isArabic ? 'تاريخ الشراء' : 'Purchase Date'}</Label>
          <Input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        <div>
          <Label>{isArabic ? 'حالة الدفع' : 'Payment Status'}</Label>
          <Select value={paymentStatus} onValueChange={(value: 'paid' | 'pending' | 'partial') => setPaymentStatus(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">{isArabic ? 'مدفوع' : 'Paid'}</SelectItem>
              <SelectItem value="pending">{isArabic ? 'غير مدفوع' : 'Pending'}</SelectItem>
              <SelectItem value="partial">{isArabic ? 'مدفوع جزئياً' : 'Partial'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{isArabic ? 'طريقة الدفع' : 'Payment Method'}</Label>
          <Select value={paymentMethod} onValueChange={(value: 'cash' | 'card' | 'transfer') => setPaymentMethod(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">{isArabic ? 'نقداً' : 'Cash'}</SelectItem>
              <SelectItem value="card">{isArabic ? 'بطاقة' : 'Card'}</SelectItem>
              <SelectItem value="transfer">{isArabic ? 'تحويل بنكي' : 'Bank Transfer'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Label>{isArabic ? 'ملاحظات' : 'Notes'}</Label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={isArabic ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
