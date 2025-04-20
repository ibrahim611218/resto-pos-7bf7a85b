
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PurchaseInvoice, Supplier } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import InvoiceDetails from './purchase-dialog/InvoiceDetails';
import PurchaseItemsTable from './PurchaseItemsTable';
import SupplierDialog from './SupplierDialog';
import { usePurchaseDialog } from '../hooks/usePurchaseDialog';

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: PurchaseInvoice | null;
  onSave: (purchase: PurchaseInvoice) => Promise<void>;
  language: "en" | "ar";
}

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({
  open,
  onOpenChange,
  initialData,
  onSave,
  language
}) => {
  const {
    suppliers,
    products,
    selectedSupplierId,
    setSelectedSupplierId,
    purchaseDate,
    setPurchaseDate,
    items,
    setItems,
    notes,
    setNotes,
    paymentStatus,
    setPaymentStatus,
    paymentMethod,
    setPaymentMethod,
    subtotal,
    taxAmount,
    total,
    supplierDialogOpen,
    setSupplierDialogOpen,
    loadSuppliers,
    loadProducts,
    handleSaveSupplier,
    handleSubmit,
    isArabic
  } = usePurchaseDialog({
    initialData,
    onSave: async (purchase) => {
      await onSave(purchase);
      return;
    },
    onOpenChange,
    language
  });

  useEffect(() => {
    if (open) {
      loadSuppliers();
      loadProducts();
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw]">
          <DialogHeader>
            <DialogTitle>
              {initialData 
                ? (isArabic ? 'تعديل فاتورة مشتريات' : 'Edit Purchase Invoice') 
                : (isArabic ? 'إضافة فاتورة مشتريات جديدة' : 'Add New Purchase Invoice')}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">{isArabic ? 'تفاصيل الفاتورة' : 'Invoice Details'}</TabsTrigger>
              <TabsTrigger value="items">{isArabic ? 'المنتجات' : 'Items'}</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <InvoiceDetails
                selectedSupplierId={selectedSupplierId}
                setSelectedSupplierId={setSelectedSupplierId}
                purchaseDate={purchaseDate}
                setPurchaseDate={setPurchaseDate}
                paymentStatus={paymentStatus}
                setPaymentStatus={setPaymentStatus}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                notes={notes}
                setNotes={setNotes}
                suppliers={suppliers}
                onAddSupplier={() => setSupplierDialogOpen(true)}
                isArabic={isArabic}
              />
            </TabsContent>

            <TabsContent value="items" className="space-y-4 py-4">
              <Button type="button" onClick={() => setItems([...items, {
                id: crypto.randomUUID(),
                productId: '',
                productName: '',
                quantity: 1,
                unitPrice: 0,
                taxRate: 15,
                taxAmount: 0,
                totalPrice: 0
              }])}>
                {isArabic ? 'إضافة منتج' : 'Add Item'}
              </Button>

              <PurchaseItemsTable
                items={items}
                products={products}
                onUpdateItem={(updatedItem) => {
                  const updatedItems = items.map(item =>
                    item.id === updatedItem.id ? updatedItem : item
                  );
                  setItems(updatedItems);
                }}
                onRemoveItem={(itemId) => {
                  setItems(items.filter(item => item.id !== itemId));
                }}
                language={language}
              />

              <div className="flex flex-col space-y-2 items-end">
                <div className="flex justify-between w-full md:w-1/2">
                  <span>{isArabic ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between w-full md:w-1/2">
                  <span>{isArabic ? 'ضريبة القيمة المضافة:' : 'VAT:'}</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex justify-between w-full md:w-1/2 font-bold">
                  <span>{isArabic ? 'الإجمالي:' : 'Total:'}</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleSubmit}>
              {isArabic ? 'حفظ الفاتورة' : 'Save Invoice'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SupplierDialog 
        open={supplierDialogOpen}
        onOpenChange={setSupplierDialogOpen}
        onSave={handleSaveSupplier}
        initialData={null}
        language={language}
      />
    </>
  );
};

export default PurchaseDialog;
