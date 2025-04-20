
import { useState, useEffect } from 'react';
import { PurchaseInvoice, PurchaseItem, Supplier, Product } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import purchasesService from '@/services/purchases/PurchasesService';
import productService from '@/services/products/ProductService';
import { toast } from 'sonner';

export interface UsePurchaseDialogProps {
  initialData: PurchaseInvoice | null;
  onSave: (purchase: PurchaseInvoice) => Promise<void>;
  onOpenChange: (open: boolean) => void;
  language: "en" | "ar";
}

export const usePurchaseDialog = ({ 
  initialData, 
  onSave, 
  onOpenChange,
  language 
}: UsePurchaseDialogProps) => {
  const isArabic = language === 'ar';
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [taxRate, setTaxRate] = useState<number>(15);
  const [notes, setNotes] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending' | 'partial'>('paid');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setSelectedSupplierId(initialData.supplier.id);
      setPurchaseDate(new Date(initialData.date).toISOString().split('T')[0]);
      setItems([...initialData.items]);
      setNotes(initialData.notes || '');
      setPaymentStatus(initialData.paymentStatus);
      setPaymentMethod(initialData.paymentMethod);
      setTaxRate(calculateEffectiveTaxRate(initialData.items, initialData.taxAmount, initialData.subtotal));
    }
  }, [initialData]);

  useEffect(() => {
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
      setProducts(productsList);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const calculateEffectiveTaxRate = (items: PurchaseItem[], totalTax: number, subtotal: number): number => {
    if (subtotal === 0) return 15;
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
      createdBy: 'admin',
      createdAt: initialData?.createdAt || new Date()
    };

    await onSave(purchase);
    onOpenChange(false);
  };

  return {
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
  };
};
