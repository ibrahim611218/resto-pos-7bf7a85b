
import { useState, useEffect } from 'react';
import { PurchaseInvoice } from '@/types';
import purchasesService from '@/services/purchases/PurchasesService';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<PurchaseInvoice[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<PurchaseInvoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchases();
  }, []);

  useEffect(() => {
    filterPurchases();
  }, [purchases, searchTerm]);

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const purchasesList = await purchasesService.getPurchaseInvoices();
      setPurchases(purchasesList);
      setFilteredPurchases(purchasesList);
    } catch (error) {
      console.error('Error loading purchases:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء تحميل المشتريات' : 'Error loading purchases');
    } finally {
      setLoading(false);
    }
  };

  const filterPurchases = () => {
    if (!searchTerm.trim()) {
      setFilteredPurchases(purchases);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = purchases.filter(purchase => 
      purchase.invoiceNumber.toLowerCase().includes(term) ||
      purchase.supplier.name.toLowerCase().includes(term)
    );
    setFilteredPurchases(filtered);
  };

  const handleSavePurchase = async (purchase: PurchaseInvoice) => {
    try {
      console.log("Saving purchase invoice:", purchase);
      // Make sure each item has the correct properties
      const updatedPurchase = {
        ...purchase,
        items: purchase.items.map(item => ({
          ...item,
          // Ensure all required fields are present
          id: item.id,
          productId: item.productId,
          productName: item.productName,
          productNameAr: item.productNameAr,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          taxAmount: item.taxAmount,
          totalPrice: item.totalPrice,
          size: item.size // Ensure size is included
        }))
      };
      
      const result = await purchasesService.savePurchaseInvoice(updatedPurchase);
      if (result) {
        toast.success(isArabic ? 'تم حفظ فاتورة الشراء بنجاح' : 'Purchase invoice saved successfully');
        await loadPurchases(); // Reload purchases after saving
        return true;
      } else {
        toast.error(isArabic ? 'فشل في حفظ فاتورة الشراء' : 'Failed to save purchase invoice');
        return false;
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء حفظ الفاتورة' : 'Error saving the invoice');
      return false;
    }
  };

  const handleDeletePurchase = async (id: string) => {
    try {
      await purchasesService.deletePurchaseInvoice(id);
      toast.success(isArabic ? 'تم حذف فاتورة الشراء بنجاح' : 'Purchase invoice deleted successfully');
      loadPurchases();
      return true;
    } catch (error) {
      console.error('Error deleting purchase:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء حذف الفاتورة' : 'Error deleting the invoice');
      return false;
    }
  };

  return {
    filteredPurchases,
    searchTerm,
    setSearchTerm,
    handleSavePurchase,
    handleDeletePurchase,
    isArabic,
    loading
  };
};
