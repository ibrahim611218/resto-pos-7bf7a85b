
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Invoice } from "@/types";
import { generateInvoiceQRCodeData, handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

import {
  InvoiceHeader,
  InvoiceItems,
  InvoiceSummary,
  InvoiceQRCode,
  InvoiceActions,
  EmailDialog
} from "./invoice-details";

interface InvoiceDetailsModalProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
  formatInvoiceDate: (date: Date) => string;
  onPrint: (invoice: Invoice) => void;
  onRefund?: (invoiceId: string) => boolean;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  invoice,
  open,
  onClose,
  formatInvoiceDate,
  onPrint,
  onRefund
}) => {
  const { settings } = useBusinessSettings();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  
  if (!invoice) return null;

  const qrCodeData = generateInvoiceQRCodeData(invoice);

  // Calculate discount amount
  const discountAmount = invoice.discountType === "percentage" 
    ? (invoice.subtotal + invoice.taxAmount) * (invoice.discount / 100)
    : invoice.discount;

  // Handle print using handleInvoiceExport with complete data
  const handlePrint = () => {
    // Make sure we have all the data we need
    console.log("Printing invoice with settings:", settings);
    if (invoice && settings) {
      // Pass the complete invoice object and settings
      handleInvoiceExport("print", invoice, settings);
    } else {
      console.error("Missing invoice or settings for printing", {
        hasInvoice: !!invoice,
        hasSettings: !!settings
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <InvoiceHeader 
          invoice={invoice} 
          settings={settings}
          formatInvoiceDate={formatInvoiceDate}
        />

        <div className="space-y-4 relative" id="invoice-printable-content">
          {invoice.status === "refunded" && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="transform rotate-45 text-red-500/20 text-6xl font-bold">
                مسترجعة
              </div>
            </div>
          )}

          <InvoiceSummary 
            invoice={invoice} 
            settings={settings}
            discountAmount={discountAmount}
          />

          <Separator />

          <InvoiceItems items={invoice.items} />

          <Separator />

          <InvoiceQRCode 
            qrCodeData={qrCodeData}
            notes={settings.invoiceNotesAr}
          />
        </div>

        <InvoiceActions 
          invoice={invoice}
          settings={settings}
          onPrint={handlePrint}
          onShowEmailDialog={() => setShowEmailDialog(true)}
          onRefund={onRefund}
        />
        
        <EmailDialog 
          email={email}
          setEmail={setEmail}
          invoice={invoice}
          settings={settings}
          onClose={() => setShowEmailDialog(false)}
          show={showEmailDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetailsModal;
