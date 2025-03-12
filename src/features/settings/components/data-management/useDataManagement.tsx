
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sampleCategories } from "@/data/sampleData";

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
    // Clear products from localStorage
    localStorage.removeItem('products');
  };

  const deleteAllCategories = () => {
    // Clear categories from localStorage and sampleCategories array
    localStorage.removeItem('categories');
    sampleCategories.length = 0;
  };

  const deleteAllInventory = () => {
    // Clear inventory from localStorage
    localStorage.removeItem('inventory');
  };

  const deleteAllInvoices = () => {
    // Clear invoices from localStorage
    localStorage.removeItem('invoices');
  };

  const deleteAllCustomers = () => {
    // Clear customers from localStorage
    localStorage.removeItem('customers');
  };

  const deleteAllData = () => {
    // Clear all data from localStorage
    deleteAllProducts();
    deleteAllCategories();
    deleteAllInventory();
    deleteAllInvoices();
    deleteAllCustomers();
    // Clear any other relevant data
    localStorage.removeItem('business-settings');
    localStorage.removeItem('display-settings');
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
