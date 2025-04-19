
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

  useEffect(() => {
    loadPurchases();
  }, []);

  useEffect(() => {
    filterPurchases();
  }, [purchases, searchTerm]);

  const loadPurchases = async () => {
    try {
      const purchasesList = await purchasesService.getPurchaseInvoices();
      setPurchases(purchasesList);
      setFilteredPurchases(purchasesList);
    } catch (error) {
      console.error('Error loading purchases:', error);
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
      await purchasesService.savePurchaseInvoice(purchase);
      toast.success(isArabic ? 'تم حفظ فاتورة الشراء بنجاح' : 'Purchase invoice saved successfully');
      loadPurchases();
    } catch (error) {
      console.error('Error saving purchase:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء حفظ الفاتورة' : 'Error saving the invoice');
    }
  };

  const handleDeletePurchase = async (id: string) => {
    try {
      await purchasesService.deletePurchaseInvoice(id);
      toast.success(isArabic ? 'تم حذف فاتورة الشراء بنجاح' : 'Purchase invoice deleted successfully');
      loadPurchases();
    } catch (error) {
      console.error('Error deleting purchase:', error);
      toast.error(isArabic ? 'حدث خطأ أثناء حذف الفاتورة' : 'Error deleting the invoice');
    }
  };

  return {
    filteredPurchases,
    searchTerm,
    setSearchTerm,
    handleSavePurchase,
    handleDeletePurchase,
    isArabic,
  };
};
