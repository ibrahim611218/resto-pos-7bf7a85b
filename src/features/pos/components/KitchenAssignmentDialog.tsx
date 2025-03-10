
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Language, CartItem } from "@/types";
import { ChefHat, Check } from "lucide-react";

interface KitchenAssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  invoiceId: string;
  language: Language;
}

const KitchenAssignmentDialog: React.FC<KitchenAssignmentDialogProps> = ({
  isOpen,
  onClose,
  cartItems,
  invoiceId,
  language,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isArabic = language === "ar";

  const handleSendToKitchen = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: isArabic ? "تم إرسال الطلب للمطبخ" : "Order sent to kitchen",
        description: isArabic
          ? `تم إرسال الطلب رقم ${invoiceId} إلى المطبخ`
          : `Order #${invoiceId} has been sent to the kitchen`,
        variant: "default",
      });
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isArabic ? "إرسال الطلب للمطبخ" : "Send Order to Kitchen"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="h-12 w-12 text-primary" />
          </div>
          
          <p className="text-center mb-4">
            {isArabic
              ? "هل تريد إرسال هذا الطلب إلى المطبخ للتحضير؟"
              : "Do you want to send this order to the kitchen for preparation?"}
          </p>
          
          <div className="border rounded-md p-3 max-h-48 overflow-y-auto">
            <h3 className="font-medium mb-2">
              {isArabic ? "محتويات الطلب:" : "Order Items:"}
            </h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-1 text-sm">
                <span>{isArabic ? item.nameAr : item.name} x{item.quantity}</span>
                <span className="text-muted-foreground">{getSizeLabel(item.size, language)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleSendToKitchen} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                {isArabic ? "جاري الإرسال..." : "Sending..."}
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                {isArabic ? "إرسال للمطبخ" : "Send to Kitchen"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function getSizeLabel(size: string, language: Language): string {
  if (language === "ar") {
    return size === "small" ? "صغير" : size === "medium" ? "وسط" : "كبير";
  }
  return size === "small" ? "S" : size === "medium" ? "M" : "L";
}

export default KitchenAssignmentDialog;
