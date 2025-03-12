
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Invoice, BusinessSettings } from "@/types";

interface InvoiceHeaderProps {
  invoice: Invoice;
  settings: BusinessSettings;
  formatInvoiceDate: (date: Date) => string;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  invoice,
  settings,
  formatInvoiceDate
}) => {
  return (
    <DialogHeader>
      <div className="flex flex-col items-center mb-4">
        {settings.logo ? (
          <img src={settings.logo} alt="شعار المطعم" className="h-16 mb-2" />
        ) : (
          <div className="flex items-center mb-2">
            <img src="/assets/restopos-logo.png" alt="RestoPOS" className="h-12 w-12" />
            <div>
              <span className="text-[#004d40] font-bold text-xl">Resto</span>
              <span className="text-orange-500 font-bold text-xl">POS</span>
            </div>
          </div>
        )}
        <DialogTitle className="text-xl text-center">
          {settings.nameAr || settings.name || "RestoPOS"}
        </DialogTitle>
        <DialogDescription className="text-center">
          {settings.taxNumber && <div>الرقم الضريبي: {settings.taxNumber}</div>}
          {settings.addressAr && <div>{settings.addressAr}</div>}
          {settings.phone && <div>هاتف: {settings.phone}</div>}
        </DialogDescription>
      </div>
      
      <div className="text-center">
        <h2 className="text-lg font-bold">فاتورة رقم #{invoice.number}</h2>
        <p className="text-sm text-muted-foreground">
          {formatInvoiceDate(invoice.date)} | {invoice.paymentMethod}
        </p>
      </div>
    </DialogHeader>
  );
};
