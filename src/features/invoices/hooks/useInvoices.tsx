
import { useState, useEffect, useCallback } from "react";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import databaseService from "@/services/index";

export const useInvoices = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تصفية الفواتير عند تغيير مصطلح البحث أو الفواتير
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredInvoices(invoices);
      return;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    const filtered = invoices.filter(
      (invoice) =>
        invoice.number.toLowerCase().includes(lowercaseSearch) ||
        (invoice.customer?.name && invoice.customer.name.toLowerCase().includes(lowercaseSearch))
    );
    setFilteredInvoices(filtered);
  }, [searchTerm, invoices]);

  // جلب الفواتير عند تحميل الصفحة
  useEffect(() => {
    loadInvoicesFromStorage();
  }, []);

  const loadInvoicesFromStorage = useCallback(async () => {
    try {
      setLoading(true);
      const data = await databaseService.getInvoices();
      setInvoices(data);
      setFilteredInvoices(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setError(isArabic ? "حدث خطأ أثناء تحميل الفواتير" : "Error loading invoices");
    } finally {
      setLoading(false);
    }
  }, [isArabic]);

  // عرض تفاصيل الفاتورة
  const viewInvoiceDetails = useCallback((id: string) => {
    const invoice = invoices.find((inv) => inv.id === id);
    if (invoice) {
      setSelectedInvoice(invoice);
    }
  }, [invoices]);

  // إغلاق نافذة تفاصيل الفاتورة
  const closeInvoiceDetails = useCallback(() => {
    setSelectedInvoice(null);
  }, []);

  // إضافة فاتورة جديدة
  const addNewInvoice = useCallback(async (invoice: Invoice) => {
    try {
      // حفظ الفاتورة في قاعدة البيانات
      const result = await databaseService.saveInvoice(invoice);
      
      if (result.success) {
        // تحديث حالة الفواتير بعد الحفظ الناجح فقط
        setInvoices(prev => {
          // التأكد من عدم وجود ازدواجية للفاتورة
          const invoiceExists = prev.some(inv => inv.number === invoice.number);
          if (invoiceExists) {
            console.log("Invoice already exists:", invoice.number);
            return prev;
          }
          return [invoice, ...prev];
        });
        return true;
      } else {
        console.error("Failed to save invoice:", result.error);
        return false;
      }
    } catch (error) {
      console.error("Error adding invoice:", error);
      return false;
    }
  }, []);

  // تنسيق تاريخ الفاتورة
  const formatInvoiceDate = useCallback((date: Date) => {
    return new Date(date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [isArabic]);

  // الحصول على لون شارة الحالة
  const getStatusBadgeColor = useCallback((status: "completed" | "cancelled" | "refunded" | "pending") => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "refunded":
        return "bg-amber-500";
      case "pending":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  }, []);

  // طباعة الفاتورة
  const printInvoice = useCallback((invoice: Invoice) => {
    // هذا مجرد تمثيل لـ TypeScript، تتم معالجة الطباعة الفعلية في InvoicesList
    console.log("Printing invoice:", invoice.number);
    return true;
  }, []);

  // إرجاع فاتورة
  const refundInvoice = useCallback((invoiceId: string): boolean => {
    // البحث عن الفاتورة المراد إرجاعها
    const invoiceToRefund = invoices.find(inv => inv.id === invoiceId);
    
    if (!invoiceToRefund) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "لم يتم العثور على الفاتورة" : "Invoice not found",
        variant: "destructive",
      });
      return false;
    }
    
    if (invoiceToRefund.status === "refunded") {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "تم استرجاع هذه الفاتورة بالفعل" : "This invoice has already been refunded",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // إنشاء نسخة من الفاتورة بحالة مسترجعة
      const refundedInvoice: Invoice = {
        ...invoiceToRefund,
        status: "refunded"
      };
      
      // تحديث الفاتورة في الحالة فورًا
      setInvoices(prevInvoices => 
        prevInvoices.map(inv => 
          inv.id === invoiceId ? {...inv, status: "refunded"} : inv
        )
      );
      
      // تحديث الفاتورة المحددة إذا كانت هي التي يتم إرجاعها
      if (selectedInvoice && selectedInvoice.id === invoiceId) {
        setSelectedInvoice({...selectedInvoice, status: "refunded"});
      }
      
      // تحديث الفاتورة في قاعدة البيانات بشكل غير متزامن
      databaseService.updateInvoice(refundedInvoice)
        .then(result => {
          if (!result.success) {
            console.error("Error saving refund status to database:", result.error);
            // إرجاع حالة التغييرات إذا فشل تحديث قاعدة البيانات
            setInvoices(prevInvoices => [...prevInvoices]);
            if (selectedInvoice && selectedInvoice.id === invoiceId) {
              setSelectedInvoice({...selectedInvoice});
            }
            return false;
          }
        })
        .catch(error => {
          console.error("Error during refund:", error);
          return false;
        });
      
      toast({
        title: isArabic ? "تم إرجاع الفاتورة" : "Invoice Refunded",
        description: isArabic 
          ? `تم إرجاع الفاتورة رقم ${invoiceToRefund.number} بنجاح` 
          : `Invoice #${invoiceToRefund.number} has been refunded successfully`,
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error("Error refunding invoice:", error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ أثناء استرجاع الفاتورة" : "Error refunding invoice",
        variant: "destructive",
      });
      return false;
    }
  }, [invoices, isArabic, selectedInvoice]);

  return {
    invoices,
    filteredInvoices,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedInvoice,
    viewInvoiceDetails,
    closeInvoiceDetails,
    formatInvoiceDate,
    getStatusBadgeColor,
    printInvoice,
    addNewInvoice,
    refundInvoice,
    loadInvoicesFromStorage
  };
};
