import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sampleCategories } from "@/data/sampleData";
import { mockProducts } from "@/features/pos/data/mockData";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { mockCustomers } from "@/features/customers/hooks/useCustomers";

type DataType = "products" | "categories" | "inventory" | "invoices" | "customers" | "all";

export const useDataManagement = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const navigate = useNavigate();
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<DataType>("all");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAction = (type: DataType) => {
    setActionType(type);
    setShowConfirmDialog(true);
  };

  const deleteAllProducts = () => {
    // حذف المنتجات من الذاكرة المحلية
    localStorage.removeItem('products');
    // حذف المنتجات من المصفوفة الافتراضية
    mockProducts.length = 0;
  };

  const deleteAllCategories = () => {
    // حذف التصنيفات من الذاكرة المحلية
    localStorage.removeItem('categories');
    // حذف التصنيفات من المصفوفة الافتراضية
    sampleCategories.length = 0;
  };

  const deleteAllInventory = () => {
    // حذف المخزون من الذاكرة المحلية
    localStorage.removeItem('inventory');
    // حذف بيانات المخزون الافتراضية إذا وجدت
    localStorage.removeItem('defaultInventory');
  };

  const deleteAllInvoices = () => {
    // حذف الفواتير من الذاكرة المحلية
    localStorage.removeItem('invoices');
    // إعادة تعيين أرقام الفواتير (ببدء العد من 1 في المرة القادمة)
    localStorage.setItem('lastInvoiceNumber', '0');
    // حذف الفواتير من المصفوفة الافتراضية
    mockInvoices.length = 0;
  };

  const deleteAllCustomers = () => {
    // حذف العملاء من الذاكرة المحلية
    localStorage.removeItem('customers');
    // حذف العملاء من المصفوفة الافتراضية
    mockCustomers.length = 0;
  };

  const deleteAllData = () => {
    // حذف جميع البيانات
    deleteAllProducts();
    deleteAllCategories();
    deleteAllInventory();
    deleteAllInvoices();
    deleteAllCustomers();
    
    // حذف الإعدادات
    localStorage.removeItem('business-settings');
    localStorage.removeItem('display-settings');
    
    // حذف أي بيانات إضافية
    localStorage.removeItem('defaultProducts');
    localStorage.removeItem('defaultCategories');
    localStorage.removeItem('defaultInventory');
    localStorage.removeItem('lastInvoiceNumber');
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    
    try {
      switch(actionType) {
        case "products":
          deleteAllProducts();
          toast.success(isArabic ? "تم حذف جميع المنتجات بنجاح" : "All products have been deleted successfully");
          navigate("/products");
          break;
        case "categories":
          deleteAllCategories();
          toast.success(isArabic ? "تم حذف جميع التصنيفات بنجاح" : "All categories have been deleted successfully");
          navigate("/categories");
          break;
        case "inventory":
          deleteAllInventory();
          toast.success(isArabic ? "تم حذف جميع بيانات المخزون بنجاح" : "All inventory data has been deleted successfully");
          navigate("/inventory");
          break;
        case "invoices":
          deleteAllInvoices();
          toast.success(isArabic ? "تم حذف جميع الفواتير بنجاح" : "All invoices have been deleted successfully");
          navigate("/invoices");
          break;
        case "customers":
          deleteAllCustomers();
          toast.success(isArabic ? "تم حذف جميع العملاء بنجاح" : "All customers have been deleted successfully");
          navigate("/customers");
          break;
        case "all":
          deleteAllData();
          toast.success(isArabic ? "تم حذف جميع البيانات بنجاح" : "All data has been deleted successfully");
          break;
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast.error(isArabic ? "حدث خطأ أثناء عملية الحذف" : "An error occurred during deletion");
    } finally {
      setIsDeleting(false);
      setShowConfirmDialog(false);
    }
  };

  const getConfirmationMessage = () => {
    switch(actionType) {
      case "products":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع المنتجات؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all products? This action cannot be undone.";
      case "categories":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع التصنيفات؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all categories? This action cannot be undone.";
      case "inventory":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع بيانات المخزون؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all inventory data? This action cannot be undone.";
      case "invoices":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع الفواتير؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all invoices? This action cannot be undone.";
      case "customers":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع العملاء؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all customers? This action cannot be undone.";
      case "all":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all data? This action cannot be undone.";
      default:
        return "";
    }
  };

  return {
    isArabic,
    navigate,
    showConfirmDialog,
    setShowConfirmDialog,
    actionType,
    isDeleting,
    handleDeleteAction,
    confirmDelete,
    getConfirmationMessage
  };
};
