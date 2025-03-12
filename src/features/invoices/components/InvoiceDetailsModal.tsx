
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PrinterIcon, DownloadIcon, MailIcon } from "lucide-react";
import { Invoice } from "@/types";
import { formatCurrency, handleInvoiceExport, generateInvoiceQRCodeData } from "@/utils/invoice";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";
import { QRCodeSVG } from "qrcode.react";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

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
  const { settings } = useBusinessSettings();
  const [showEmailDialog, setShowEmailDialog] = React.useState(false);
  const [email, setEmail] = React.useState("");
  
  if (!invoice) return null;

  const qrCodeData = generateInvoiceQRCodeData(invoice);

  // Calculate discount amount
  const discountAmount = invoice.discountType === "percentage" 
    ? (invoice.subtotal + invoice.taxAmount) * (invoice.discount / 100)
    : invoice.discount;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
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

        <div className="space-y-4" id="invoice-printable-content">
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

          {invoice.orderType && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">نوع الطلب</h3>
                <p>{invoice.orderType === "dineIn" ? "محلي" : "سفري"}</p>
              </div>
              {invoice.orderType === "dineIn" && invoice.tableNumber && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground">رقم الطاولة</h3>
                  <p>{invoice.tableNumber}</p>
                </div>
              )}
            </div>
          )}

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
              <span className="text-muted-foreground">ضريبة القيمة المضافة ({settings.taxRate}%)</span>
              <span>{formatCurrency(invoice.taxAmount, "ar-SA", "SAR")}</span>
            </div>
            
            {invoice.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>الخصم {invoice.discountType === 'percentage' ? `(${invoice.discount}%)` : ''}</span>
                <span>- {formatCurrency(discountAmount, "ar-SA", "SAR")}</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold">
              <span>الإجمالي</span>
              <span>{formatCurrency(invoice.total, "ar-SA", "SAR")}</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded">
              <QRCodeSVG value={qrCodeData} size={120} />
            </div>
          </div>
          
          {settings.invoiceNotesAr && (
            <div className="text-center text-sm text-muted-foreground border-t pt-2">
              {settings.invoiceNotesAr}
            </div>
          )}
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
            onClick={() => setShowEmailDialog(true)}
          >
            <MailIcon className="mr-2 h-4 w-4" />
            إرسال بالبريد
          </Button>
        </DialogFooter>
        
        {showEmailDialog && (
          <div className="border-t pt-3 mt-2">
            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <div className="flex gap-2">
              <input
                type="email"
                className="flex-1 border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني"
              />
              <Button 
                onClick={() => {
                  handleInvoiceExport("email", invoice, settings, email);
                  setShowEmailDialog(false);
                }}
                disabled={!email}
              >
                إرسال
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetailsModal;
