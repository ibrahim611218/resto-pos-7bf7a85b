
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Invoice } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

interface ReturnOrderDialogProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onReturn: (invoice: Invoice, reason: string) => void;
}

const ReturnOrderDialog: React.FC<ReturnOrderDialogProps> = ({ 
  open, 
  onClose, 
  invoice, 
  onReturn 
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isArabic = language === "ar";
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const isAdmin = user?.role === "admin" || user?.role === "manager";

  const handleSubmit = () => {
    if (!isAdmin) {
      // This is just for demo purposes. In a real app, you would verify the password against the admin user's actual password
      if (password !== "admin123") {
        setError(isArabic ? "كلمة المرور غير صحيحة" : "Invalid password");
        return;
      }
    }
    
    if (!reason.trim()) {
      setError(isArabic ? "الرجاء إدخال سبب الإرجاع" : "Please enter a return reason");
      return;
    }
    
    if (invoice) {
      onReturn(invoice, reason);
      resetForm();
      onClose();
    }
  };
  
  const resetForm = () => {
    setReason("");
    setPassword("");
    setError("");
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "إرجاع الطلب" : "Return Order"}
          </DialogTitle>
          <DialogDescription>
            {isArabic 
              ? "سيتم إرجاع هذا الطلب وإلغاء الفاتورة. يتطلب هذا الإجراء صلاحيات المدير."
              : "This will return the order and cancel the invoice. This action requires manager permissions."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {!isAdmin && (
            <div className="space-y-2">
              <Label htmlFor="admin-password">
                {isArabic ? "كلمة مرور المدير" : "Admin Password"}
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isArabic ? "أدخل كلمة مرور المدير" : "Enter admin password"}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="return-reason">
              {isArabic ? "سبب الإرجاع" : "Return Reason"}
            </Label>
            <Textarea
              id="return-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={isArabic ? "أدخل سبب إرجاع الطلب" : "Enter reason for returning the order"}
              rows={3}
            />
          </div>
          
          {error && (
            <div className="text-destructive text-sm">
              {error}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            {isArabic ? "تأكيد الإرجاع" : "Confirm Return"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnOrderDialog;
