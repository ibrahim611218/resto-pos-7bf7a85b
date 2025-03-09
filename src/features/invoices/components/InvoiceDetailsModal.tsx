
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PrinterIcon, DownloadIcon } from "lucide-react";
import { Invoice } from "@/types";
import { formatCurrency } from "@/utils/invoice";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";

interface InvoiceDetailsModalProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
  formatInvoiceDate: (date: Date) => string;
  onPrint: (invoice: Invoice) => void;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  invoice,
  open,
  onClose,
  formatInvoiceDate,
  onPrint
}) => {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            فاتورة رقم #{invoice.number}
          </DialogTitle>
          <DialogDescription>
            {formatInvoiceDate(invoice.date)} | {invoice.paymentMethod}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">الكاشير</h3>
              <p>{invoice.cashierName}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">العميل</h3>
              <p>{invoice.customer?.name || "عميل عادي"}</p>
              {invoice.customer?.phone && <p className="text-sm">{invoice.customer.phone}</p>}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">الأصناف</h3>
            <div className="space-y-2">
              {invoice.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.nameAr || item.name}</span>
                    <span className="text-sm text-muted-foreground mr-2">
                      ({getSizeLabel(item.size, "ar")}) x {item.quantity}
                    </span>
                  </div>
                  <span>
                    {formatCurrency(item.price * item.quantity, "ar-SA", "SAR")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span>{formatCurrency(invoice.subtotal, "ar-SA", "SAR")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
              <span>{formatCurrency(invoice.taxAmount, "ar-SA", "SAR")}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>الإجمالي</span>
              <span>{formatCurrency(invoice.total, "ar-SA", "SAR")}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onPrint(invoice)}
          >
            <PrinterIcon className="mr-2 h-4 w-4" />
            طباعة
          </Button>
          <Button className="flex-1">
            <DownloadIcon className="mr-2 h-4 w-4" />
            تحميل PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetailsModal;
