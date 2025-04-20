
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UserWithPassword } from "../types";

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserWithPassword | null;
  onDeleteUser: () => Promise<boolean> | boolean;
  isArabic: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  onDeleteUser,
  isArabic,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!selectedUser) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await onDeleteUser();
      if (result) {
        onOpenChange(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="dark:border-orange-500/40" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "تأكيد الحذف" : "Confirm Deletion"}
          </DialogTitle>
          <DialogDescription>
            {isArabic 
              ? `هل أنت متأكد من حذف المستخدم: ${selectedUser?.name}؟`
              : `Are you sure you want to delete user: ${selectedUser?.name}?`
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isArabic ? "حذف" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
