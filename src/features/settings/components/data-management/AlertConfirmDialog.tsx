
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface AlertConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  confirmationMessage: string;
  title: string;
  onConfirm: () => void;
  isDeleting: boolean;
  cancelText: string;
  confirmText: string;
  deletingText: string;
}

const AlertConfirmDialog: React.FC<AlertConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  confirmationMessage,
  title,
  onConfirm,
  isDeleting,
  cancelText,
  confirmText,
  deletingText
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{confirmationMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className="bg-destructive text-destructive-foreground"
            disabled={isDeleting}
          >
            {isDeleting ? deletingText : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertConfirmDialog;
