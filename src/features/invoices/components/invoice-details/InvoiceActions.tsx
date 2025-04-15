
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { PrinterIcon, DownloadIcon, MailIcon, ReceiptText } from "lucide-react";
import { Invoice, BusinessSettings } from "@/types";
import { handleInvoiceExport } from "@/utils/invoice";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

interface InvoiceActionsProps {
  invoice: Invoice;
  settings: BusinessSettings;
  onPrint: (invoice: Invoice) => void;
  onShowEmailDialog: () => void;
  onRefund?: (invoice: Invoice) => void;  // Changed type to use Invoice object instead of string
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  invoice,
  settings,
  onPrint,
  onShowEmailDialog,
  onRefund
}) => {
  const { hasPermission } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const canRefund = hasPermission("admin") && invoice.status !== "refunded" && onRefund;
  
  const handleRefund = () => {
    if (onRefund) {
      onRefund(invoice);  // Pass the entire invoice object instead of just the ID
    }
  };

  const handlePrint = () => {
    onPrint(invoice);
  };

  return (
    <DialogFooter className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
      <Button 
        variant="outline" 
        className="flex-1 min-w-[120px]"
        onClick={handlePrint}
      >
        <PrinterIcon className="mr-2 h-4 w-4" />
        {isArabic ? "طباعة" : "Print"}
      </Button>
      <Button 
        className="flex-1 min-w-[120px]"
        onClick={() => handleInvoiceExport("pdf", invoice, settings)}
      >
        <DownloadIcon className="mr-2 h-4 w-4" />
        {isArabic ? "تحميل PDF" : "Download PDF"}
      </Button>
      <Button 
        variant="outline"
        className="flex-1 min-w-[120px]"
        onClick={onShowEmailDialog}
      >
        <MailIcon className="mr-2 h-4 w-4" />
        {isArabic ? "إرسال بالبريد" : "Send by Email"}
      </Button>
      {canRefund && (
        <Button 
          variant="destructive"
          className="flex-1 min-w-[120px]"
          onClick={handleRefund}
        >
          <ReceiptText className="mr-2 h-4 w-4" />
          {isArabic ? "إرجاع الفاتورة" : "Refund Invoice"}
        </Button>
      )}
    </DialogFooter>
  );
};
