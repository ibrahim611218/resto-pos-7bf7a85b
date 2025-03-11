
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useLanguage } from "@/context/LanguageContext";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isArabic ? "تأكيد الحذف" : "Confirm Deletion"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isArabic 
              ? "هل أنت متأكد من حذف هذا العميل؟ لا يمكن التراجع عن هذا الإجراء."
              : "Are you sure you want to delete this customer? This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {isArabic ? "إلغاء" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive">
            {isArabic ? "حذف" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
