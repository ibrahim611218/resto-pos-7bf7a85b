
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { PrinterIcon, DownloadIcon, MailIcon } from "lucide-react";
import { Invoice, BusinessSettings } from "@/types";
import { handleInvoiceExport } from "@/utils/invoice";

interface InvoiceActionsProps {
  invoice: Invoice;
  settings: BusinessSettings;
  onPrint: (invoice: Invoice) => void;
  onShowEmailDialog: () => void;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  invoice,
  settings,
  onPrint,
  onShowEmailDialog
}) => {
  return (
    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
      <Button 
        variant="outline" 
        className="flex-1"
        onClick={() => onPrint(invoice)}
      >
        <PrinterIcon className="mr-2 h-4 w-4" />
        طباعة
      </Button>
      <Button 
        className="flex-1"
        onClick={() => handleInvoiceExport("pdf", invoice, settings)}
      >
        <DownloadIcon className="mr-2 h-4 w-4" />
        تحميل PDF
      </Button>
      <Button 
        variant="outline"
        className="flex-1"
        onClick={onShowEmailDialog}
      >
        <MailIcon className="mr-2 h-4 w-4" />
        إرسال بالبريد
      </Button>
    </DialogFooter>
  );
};
