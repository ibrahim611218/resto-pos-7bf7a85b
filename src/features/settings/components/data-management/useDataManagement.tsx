
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DataType } from "./types";
import { useConfirmationMessages } from "./hooks/useConfirmationMessages";
import * as deleteOps from "./utils/deleteOperations";

export const useDataManagement = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const navigate = useNavigate();
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<DataType>("all");
  const [isDeleting, setIsDeleting] = useState(false);

  const { getConfirmationMessage } = useConfirmationMessages(isArabic);

  const handleDeleteAction = (type: DataType) => {
    setActionType(type);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    
    try {
      switch(actionType) {
        case "products":
          deleteOps.deleteAllProducts();
          toast.success(isArabic ? "تم حذف جميع المنتجات بنجاح" : "All products have been deleted successfully");
          navigate("/products");
          break;
        case "categories":
          deleteOps.deleteAllCategories();
          toast.success(isArabic ? "تم حذف جميع التصنيفات بنجاح" : "All categories have been deleted successfully");
          navigate("/categories");
          break;
        case "inventory":
          deleteOps.deleteAllInventory();
          toast.success(isArabic ? "تم حذف جميع بيانات المخزون بنجاح" : "All inventory data has been deleted successfully");
          navigate("/inventory");
          break;
        case "invoices":
          deleteOps.deleteAllInvoices();
          toast.success(isArabic ? "تم حذف جميع الفواتير بنجاح" : "All invoices have been deleted successfully");
          navigate("/invoices");
          break;
        case "customers":
          deleteOps.deleteAllCustomers();
          toast.success(isArabic ? "تم حذف جميع العملاء بنجاح" : "All customers have been deleted successfully");
          navigate("/customers");
          break;
        case "kitchen":
          deleteOps.deleteKitchenData();
          toast.success(isArabic ? "تم حذف جميع بيانات المطبخ بنجاح" : "All kitchen data has been deleted successfully");
          navigate("/kitchen");
          break;
        case "vat-reports":
          deleteOps.deleteVatReports();
          toast.success(isArabic ? "تم حذف جميع تقارير ضريبة القيمة المضافة بنجاح" : "All VAT reports have been deleted successfully");
          navigate("/vat-report");
          break;
        case "users":
          deleteOps.deleteAllUsers();
          toast.success(isArabic ? "تم حذف جميع المستخدمين بنجاح" : "All users have been deleted successfully");
          navigate("/user-management");
          break;
        case "all":
          deleteOps.deleteAllData();
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
