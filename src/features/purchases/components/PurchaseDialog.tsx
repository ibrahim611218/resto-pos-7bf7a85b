
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PurchaseInvoice, PurchaseItem, Supplier, Language, Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import purchasesService from '@/services/purchases/PurchasesService';
import productService from '@/services/products/ProductService';
import { v4 as uuidv4 } from 'uuid';
import PurchaseItemsTable from './PurchaseItemsTable';
import { formatCurrency } from '@/utils/formatters';
import SupplierDialog from './SupplierDialog';
import { toast } from 'sonner';

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: PurchaseInvoice | null;
  onSave: (purchase: PurchaseInvoice) => Promise<void>;
  language: Language;
}

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({
  open,
  onOpenChange,
  initialData,
  onSave,
  language
}) => {
  const { language: contextLanguage } = useLanguage();
  const isArabic = (language || contextLanguage) === 'ar';
  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  
  // Purchase invoice fields
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [taxRate, setTaxRate] = useState<number>(15); // Default VAT rate in Saudi Arabia
  const [notes, setNotes] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending' | 'partial'>('paid');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
  
  // Calculated fields
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  
  useEffect(() => {
    if (open) {
      loadSuppliers();
      loadProducts();
      
      if (initialData) {
        // Populate form with initial data
        setSelectedSupplierId(initialData.supplier.id);
        setPurchaseDate(new Date(initialData.date).toISOString().split('T')[0]);
        setItems([...initialData.items]);
        setNotes(initialData.notes || '');
        setPaymentStatus(initialData.paymentStatus);
        setPaymentMethod(initialData.paymentMethod);
        setTaxRate(calculateEffectiveTaxRate(initialData.items, initialData.taxAmount, initialData.subtotal));
      } else {
        // Reset form
        setSelectedSupplierId('');
        setPurchaseDate(new Date().toISOString().split('T')[0]);
        setItems([]);
        setNotes('');
        setPaymentStatus('paid');
        setPaymentMethod('cash');
        setTaxRate(15);
      }
    }
  }, [initialData, open]);
  
  useEffect(() => {
    // Calculate totals whenever items change
    calculateTotals();
  }, [items, taxRate]);
  
  const loadSuppliers = async () => {
    try {
      const suppliersList = await purchasesService.getSuppliers();
      setSuppliers(suppliersList);
    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  };
  
  const loadProducts = async () => {
    try {
      const productsList = await productService.getProducts();
      console.log("Loaded products:", productsList);
      setProducts(productsList);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };
  
  const calculateEffectiveTaxRate = (items: PurchaseItem[], totalTax: number, subtotal: number): number => {
    if (subtotal === 0) return 15; // Default tax rate
    return (totalTax / subtotal) * 100;
  };
  
  const calculateTotals = () => {
    const calculatedSubtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const calculatedTaxAmount = (calculatedSubtotal * taxRate) / 100;
    const calculatedTotal = calculatedSubtotal + calculatedTaxAmount;
    
    setSubtotal(calculatedSubtotal);
    setTaxAmount(calculatedTaxAmount);
    setTotal(calculatedTotal);
  };
  
  const handleAddItem = () => {
    if (products.length === 0) {
      toast.error(isArabic ? 'الرجاء إضافة منتجات أولاً' : 'Please add products first');
      return;
    }
    
    const firstProduct = products[0];
    // Determine the default price based on product type
    let defaultPrice = 0;
    if (firstProduct.type === 'single') {
      defaultPrice = firstProduct.price || 0;
    } else if (firstProduct.variants && firstProduct.variants.length > 0) {
      // For sized products, use the first variant's price
      defaultPrice = firstProduct.variants[0].price;
    }
    
    const newItem: PurchaseItem = {
      id: uuidv4(),
      productId: firstProduct.id,
      productName: firstProduct.name,
      productNameAr: firstProduct.nameAr,
      quantity: 1,
      unitPrice: defaultPrice,
      taxRate: taxRate,
      taxAmount: (defaultPrice * taxRate) / 100,
      totalPrice: defaultPrice + ((defaultPrice * taxRate) / 100)
    };
    
    setItems([...items, newItem]);
  };
  
  const handleUpdateItem = (updatedItem: PurchaseItem) => {
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  };
  
  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };
  
  const handleSaveSupplier = async (supplier: Supplier) => {
    try {
      await purchasesService.saveSupplier(supplier);
      toast.success(isArabic ? 'تم حفظ المورد بنجاح' : 'Supplier saved successfully');
      loadSuppliers();
      setSelectedSupplierId(supplier.id);
      setSupplierDialogOpen(false);
    } catch (error) {
      console.error('Error saving supplier:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء حفظ المورد' : 'Error saving the supplier');
    }
  };
  
  const handleSubmit = async () => {
    // Validate required fields
    if (!selectedSupplierId) {
      toast.error(isArabic ? 'الرجاء تحديد المورد' : 'Please select a supplier');
      return;
    }
    
    if (items.length === 0) {
      toast.error(isArabic ? 'الرجاء إضافة منتج واحد على الأقل' : 'Please add at least one item');
      return;
    }
    
    const supplier = suppliers.find(s => s.id === selectedSupplierId);
    if (!supplier) {
      toast.error(isArabic ? 'المورد المحدد غير موجود' : 'Selected supplier not found');
      return;
    }
    
    const purchase: PurchaseInvoice = {
      id: initialData?.id || '',
      invoiceNumber: initialData?.invoiceNumber || '',
      supplier: supplier,
      date: new Date(purchaseDate),
      items: items,
      subtotal: subtotal,
      taxAmount: taxAmount,
      total: total,
      notes: notes,
      paymentStatus: paymentStatus,
      paymentMethod: paymentMethod,
      createdBy: 'admin', // TODO: Replace with actual user ID
      createdAt: initialData?.createdAt || new Date()
    };
    
    await onSave(purchase);
    onOpenChange(false); // Close dialog after saving
  };
  
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
            
            <TabsContent value="details" className="space-y-4 py-4">
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
                    <Button type="button" variant="outline" onClick={() => setSupplierDialogOpen(true)}>
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
            </TabsContent>
            
            <TabsContent value="items" className="space-y-4 py-4">
              <Button type="button" onClick={handleAddItem}>
                {isArabic ? 'إضافة منتج' : 'Add Item'}
              </Button>
              
              <PurchaseItemsTable
                items={items}
                products={products}
                onUpdateItem={handleUpdateItem}
                onRemoveItem={handleRemoveItem}
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
