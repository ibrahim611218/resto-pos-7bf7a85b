
import { Invoice, BusinessSettings, CartItem, InvoiceExportType } from "@/types";
import { toast } from "@/hooks/use-toast";

export const generateInvoiceNumber = (): string => {
  const prefix = "INV";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
};

export const calculateInvoiceAmounts = (
  items: CartItem[],
  taxRate: number,
  discount: number = 0,
  discountType: "percentage" | "fixed" = "percentage"
): { subtotal: number; taxAmount: number; total: number } => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const taxableSubtotal = items
    .filter((item) => item.taxable)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const taxAmount = +(taxableSubtotal * (taxRate / 100)).toFixed(2);
  
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;
  
  const total = +Math.max(0, subtotal + taxAmount - discountAmount).toFixed(2);
  
  return {
    subtotal: +subtotal.toFixed(2),
    taxAmount: +taxAmount.toFixed(2),
    total,
  };
};

export const formatCurrency = (
  amount: number,
  locale: string = "en-US",
  currency: string = "SAR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

export const exportInvoiceToPDF = (
  invoice: Invoice,
  businessSettings: BusinessSettings
): void => {
  // This would integrate with a PDF generation library
  console.log("Export to PDF", invoice, businessSettings);
  // Implementation would use libraries like jspdf or pdfmake
  
  // For demonstration, show toast message
  toast({
    title: "تم تصدير الفاتورة",
    description: `تم تصدير الفاتورة رقم ${invoice.number} بنجاح`,
  });
  
  // Simulate PDF download
  setTimeout(() => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,');
    element.setAttribute('download', `invoice-${invoice.number}.pdf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, 1000);
};

export const emailInvoice = async (
  invoice: Invoice,
  email: string,
  businessSettings: BusinessSettings
): Promise<boolean> => {
  // This would integrate with an email service
  console.log("Email invoice", invoice, email, businessSettings);
  
  // For demonstration, show toast message
  toast({
    title: "تم إرسال الفاتورة",
    description: `تم إرسال الفاتورة رقم ${invoice.number} إلى ${email} بنجاح`,
  });
  
  return true; // Successful email sending
};

export const handleInvoiceExport = (
  exportType: InvoiceExportType,
  invoice: Invoice,
  businessSettings: BusinessSettings,
  email?: string
): void => {
  switch (exportType) {
    case "print":
      window.print();
      break;
    case "pdf":
      exportInvoiceToPDF(invoice, businessSettings);
      break;
    case "email":
      if (email) {
        emailInvoice(invoice, email, businessSettings);
      } else {
        toast({
          title: "خطأ",
          description: "يرجى تحديد عنوان البريد الإلكتروني",
          variant: "destructive",
        });
      }
      break;
  }
};

// Generate QR code data for invoice
export const generateInvoiceQRCodeData = (invoice: Invoice): string => {
  const data = {
    invoiceNumber: invoice.number,
    total: invoice.total,
    date: invoice.date,
    businessName: "مطعم الذواق", // يمكن استخدام بيانات المتجر الفعلية
    taxNumber: "300000000000003", // يمكن استخدام الرقم الضريبي الفعلي
  };
  return JSON.stringify(data);
};
