
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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

  const confirmDelete = async () => {
    setIsDeleting(true);
    
    try {
      // Simulate API calls with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let successMessage = "";
      let redirectPath = null;
      
      switch(actionType) {
        case "products":
          // Logic to delete all products would go here
          // Example: await deleteAllProducts();
          successMessage = isArabic ? "تم حذف جميع المنتجات بنجاح" : "All products have been deleted successfully";
          redirectPath = "/products";
          break;
        case "categories":
          // Logic to delete all categories would go here
          // Example: await deleteAllCategories();
          successMessage = isArabic ? "تم حذف جميع التصنيفات بنجاح" : "All categories have been deleted successfully";
          redirectPath = "/categories";
          break;
        case "inventory":
          // Logic to delete all inventory data would go here
          // Example: await deleteAllInventory();
          successMessage = isArabic ? "تم حذف جميع بيانات المخزون بنجاح" : "All inventory data has been deleted successfully";
          redirectPath = "/inventory";
          break;
        case "invoices":
          // Logic to delete all invoices would go here
          // Example: await deleteAllInvoices();
          successMessage = isArabic ? "تم حذف جميع الفواتير بنجاح" : "All invoices have been deleted successfully";
          redirectPath = "/invoices";
          break;
        case "customers":
          // Logic to delete all customers would go here
          // Example: await deleteAllCustomers();
          successMessage = isArabic ? "تم حذف جميع العملاء بنجاح" : "All customers have been deleted successfully";
          redirectPath = "/customers";
          break;
        case "all":
          // Logic to delete all data would go here
          // Example: await deleteAllData();
          successMessage = isArabic ? "تم حذف جميع البيانات بنجاح" : "All data has been deleted successfully";
          break;
      }
      
      toast({
        title: isArabic ? "تم الحذف بنجاح" : "Deleted Successfully",
        description: successMessage,
      });
      
      // Redirect to relevant page if specified
      if (redirectPath) {
        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast({
        variant: "destructive",
        title: isArabic ? "فشل في الحذف" : "Delete Failed",
        description: isArabic ? "حدث خطأ أثناء عملية الحذف" : "An error occurred during deletion",
      });
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
