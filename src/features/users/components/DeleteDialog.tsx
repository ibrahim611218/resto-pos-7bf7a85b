
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserWithPassword } from "../types";

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserWithPassword | null;
  onDeleteUser: () => void;
  isArabic: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  onDeleteUser,
  isArabic,
}) => {
  if (!selectedUser) return null;

  const handleDelete = () => {
    onDeleteUser();
    // مربع الحوار سيتم إغلاقه تلقائيًا من خلال onDeleteUser
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="dark:border-orange-500/40">
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {isArabic ? "حذف" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
