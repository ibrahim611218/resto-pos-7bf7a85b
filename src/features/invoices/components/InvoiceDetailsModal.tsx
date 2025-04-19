
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Invoice, Size } from "@/types";
import { generateInvoiceQRCodeData, handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  formatInvoiceDate: (date: string | Date) => string;
  onPrint: (invoice: Invoice) => void;
  onRefund?: (invoice: Invoice) => boolean;
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
  const discountAmount = invoice.discount && invoice.discountType === "percentage" 
    ? (invoice.subtotal + invoice.taxAmount) * (invoice.discount / 100)
    : invoice.discount || 0;

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
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex-shrink-0">
          <InvoiceHeader 
            invoice={invoice} 
            settings={settings}
            formatInvoiceDate={formatInvoiceDate}
          />
        </div>

        <ScrollArea className="flex-1 my-4">
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

            {/* Convert InvoiceItem[] to be compatible with CartItem[] interface requirements */}
            <InvoiceItems items={invoice.items.map(item => ({
              ...item,
              productId: item.productId || "",
              variantId: item.variantId || "",
              categoryId: "",
              size: (item.size as Size) || "regular",
              taxable: !!item.taxable
            }))} />

            <Separator />

            <InvoiceQRCode 
              qrCodeData={qrCodeData}
              notes={settings?.invoiceNotesAr}
            />
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 pt-4 border-t">
          <InvoiceActions 
            invoice={invoice}
            settings={settings}
            onPrint={handlePrint}
            onShowEmailDialog={() => setShowEmailDialog(true)}
            onRefund={onRefund ? () => onRefund(invoice) : undefined}
          />
        </div>
        
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
