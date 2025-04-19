
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { PrinterIcon, DownloadIcon, MailIcon, ReceiptText } from "lucide-react";
import { Invoice, BusinessSettings } from "@/types";
import { handleInvoiceExport } from "@/utils/invoice/export";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

interface InvoiceActionsProps {
  invoice: Invoice;
  settings: BusinessSettings;
  onPrint: (invoice: Invoice) => void;
  onShowEmailDialog: () => void;
  onRefund?: (invoice: Invoice) => void;
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
  const canRefund = hasPermission(["admin", "owner"]) && invoice.status !== "refunded" && onRefund;
  
  const handleRefund = () => {
    if (onRefund) {
      onRefund(invoice);
    }
  };

  const handlePrint = () => {
    console.log("Handling print from InvoiceActions");
    onPrint(invoice);
  };

  const handleDownloadPDF = () => {
    console.log("Handling PDF download from InvoiceActions");
    handleInvoiceExport("pdf", invoice, settings);
  };

  return (
    <DialogFooter className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
      <Button 
        variant="outline" 
        className="flex-1 min-w-[120px]"
        onClick={handlePrint}
      >
        <PrinterIcon className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
        {isArabic ? "طباعة" : "Print"}
      </Button>
      <Button 
        className="flex-1 min-w-[120px]"
        onClick={handleDownloadPDF}
      >
        <DownloadIcon className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
        {isArabic ? "تحميل PDF" : "Download PDF"}
      </Button>
      <Button 
        variant="outline"
        className="flex-1 min-w-[120px]"
        onClick={onShowEmailDialog}
      >
        <MailIcon className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
        {isArabic ? "إرسال بالبريد" : "Send by Email"}
      </Button>
      {canRefund && (
        <Button 
          variant="destructive"
          className="flex-1 min-w-[120px]"
          onClick={handleRefund}
        >
          <ReceiptText className={`${isArabic ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {isArabic ? "إرجاع الفاتورة" : "Refund Invoice"}
        </Button>
      )}
    </DialogFooter>
  );
};
