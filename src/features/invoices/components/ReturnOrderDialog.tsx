import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { Invoice } from "@/types";

interface ReturnOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  invoice: Invoice;
}

export const ReturnOrderDialog: React.FC<ReturnOrderDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  invoice
}) => {
  const { hasPermission } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();

  const [returnReason, setReturnReason] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleConfirm = () => {
    if (!hasPermission(["admin", "owner"])) {
      toast({
        title: isArabic ? "غير مسموح" : "Permission Denied",
        description: isArabic ? "لا يسمح لك بإرجاع هذه الفاتورة" : "You don't have permission to return this invoice",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(returnReason);
      setReturnReason("");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isArabic ? "إرجاع الفاتورة" : "Return Invoice"}</DialogTitle>
          <DialogDescription>
            {isArabic
              ? "أدخل سبب إرجاع الفاتورة."
              : "Enter the reason for returning the invoice."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason" className="text-right">
              {isArabic ? "السبب" : "Reason"}
            </Label>
            <Input
              id="reason"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isProcessing}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={isProcessing || !returnReason}>
            {isArabic ? "تأكيد الإرجاع" : "Confirm Return"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
