
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sampleCategories } from "@/data/sampleData";
import { mockProducts } from "@/features/pos/data/mockData";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { mockCustomers } from "@/features/customers/hooks/useCustomers";

type DataType = "products" | "categories" | "inventory" | "invoices" | "customers" | "all" | "kitchen" | "vat-reports";

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
    // Delete products from localStorage
    localStorage.removeItem('products');
    localStorage.removeItem('stored-products');
    // Delete products from mockProducts array
    mockProducts.length = 0;
  };

  const deleteAllCategories = () => {
    // Delete categories from localStorage
    localStorage.removeItem('categories');
    localStorage.removeItem('stored-categories');
    // Delete categories from sampleCategories array
    sampleCategories.length = 0;
  };

  const deleteAllInventory = () => {
    // Delete ALL inventory from localStorage
    localStorage.removeItem('inventory-items');
    localStorage.removeItem('stored-inventory');
    // Clear any cached inventory data
    localStorage.removeItem('defaultInventory');
  };

  const deleteAllInvoices = () => {
    // Delete invoices from localStorage
    localStorage.removeItem('invoices');
    localStorage.removeItem('stored-invoices');
    // Reset invoice numbers (start from 1 in the next run)
    localStorage.setItem('lastInvoiceNumber', '0');
    // Delete invoices from mockInvoices array
    mockInvoices.length = 0;
  };

  const deleteAllCustomers = () => {
    // Delete customers from localStorage
    localStorage.removeItem('customers');
    localStorage.removeItem('stored-customers');
    // Delete customers from mockCustomers array
    mockCustomers.length = 0;
  };
  
  const deleteKitchenData = () => {
    // Delete kitchen orders
    localStorage.removeItem('kitchenOrders');
    localStorage.removeItem('completed-kitchen-orders');
    localStorage.removeItem('stored-kitchen-orders');
  };
  
  const deleteVatReports = () => {
    // Delete VAT reports from localStorage
    localStorage.removeItem('stored-vat-reports');
  };

  const deleteAllData = () => {
    // Delete all data
    deleteAllProducts();
    deleteAllCategories();
    deleteAllInventory(); 
    deleteAllInvoices();
    deleteAllCustomers();
    deleteKitchenData();
    deleteVatReports();
    
    // Delete settings
    localStorage.removeItem('business-settings');
    localStorage.removeItem('display-settings');
    localStorage.removeItem('stored-settings');
    
    // Delete any additional data
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
        case "kitchen":
          deleteKitchenData();
          toast.success(isArabic ? "تم حذف جميع بيانات المطبخ بنجاح" : "All kitchen data has been deleted successfully");
          navigate("/kitchen");
          break;
        case "vat-reports":
          deleteVatReports();
          toast.success(isArabic ? "تم حذف جميع تقارير ضريبة القيمة المضافة بنجاح" : "All VAT reports have been deleted successfully");
          navigate("/vat-report");
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
      case "kitchen":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع بيانات المطبخ؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all kitchen data? This action cannot be undone.";
      case "vat-reports":
        return isArabic 
          ? "هل أنت متأكد من حذف جميع تقارير ضريبة القيمة المضافة؟ لا يمكن التراجع عن هذه العملية."
          : "Are you sure you want to delete all VAT reports? This action cannot be undone.";
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
