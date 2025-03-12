
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
        {settings.logo && (
          <img src={settings.logo} alt="شعار المطعم" className="h-16 mb-2" />
        )}
        <DialogTitle className="text-xl text-center">
          {settings.nameAr || settings.name}
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
