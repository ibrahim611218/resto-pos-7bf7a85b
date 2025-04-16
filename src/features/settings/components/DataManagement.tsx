
import React from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDataManagement } from "./data-management/useDataManagement";
import DeleteAllDataCard from "./data-management/DeleteAllDataCard";
import DataManagementGrid from "./data-management/DataManagementGrid";
import AlertConfirmDialog from "./data-management/AlertConfirmDialog";

const DataManagement: React.FC = () => {
  const { user } = useAuth();
  const {
    isArabic,
    navigate,
    showConfirmDialog,
    setShowConfirmDialog,
    actionType,
    isDeleting,
    handleDeleteAction,
    confirmDelete,
    getConfirmationMessage
  } = useDataManagement();
  
  const isAdmin = user?.role === "admin" || user?.role === "manager";
  
  if (!isAdmin) {
    return (
      <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200 text-yellow-800">
        {isArabic ? "غير مصرح لك بالوصول إلى هذه الصفحة" : "You are not authorized to access this page"}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <DeleteAllDataCard 
        isArabic={isArabic} 
        onDeleteAction={handleDeleteAction} 
      />
      
      <DataManagementGrid 
        isArabic={isArabic}
        onDeleteAction={handleDeleteAction}
        navigate={navigate}
      />
      
      <AlertConfirmDialog
        isOpen={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        confirmationMessage={getConfirmationMessage()}
        title={isArabic ? "تأكيد الحذف" : "Confirm Deletion"}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        cancelText={isArabic ? "إلغاء" : "Cancel"}
        confirmText={isArabic ? "نعم، قم بالحذف" : "Yes, Delete"}
        deletingText={isArabic ? "جاري الحذف..." : "Deleting..."}
      />
    </div>
  );
};

export default DataManagement;
