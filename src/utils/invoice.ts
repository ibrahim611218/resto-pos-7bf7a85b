
import { Invoice, BusinessSettings, CartItem, InvoiceExportType } from "@/types";
import { toast } from "@/hooks/use-toast";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { renderToString } from "react-dom/server";

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
  // For demonstration, show toast message
  toast({
    title: "تم تصدير الفاتورة",
    description: `تم تصدير الفاتورة رقم ${invoice.number} بنجاح`,
  });
  
  // Simulate PDF download
  setTimeout(() => {
    // Create a hidden link to trigger download
    const element = document.createElement('a');
    
    // Generate blob URL for PDF (in real app this would be actual PDF data)
    const pdfData = generatePrintablePDF(invoice, businessSettings);
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    element.setAttribute('href', url);
    element.setAttribute('download', `invoice-${invoice.number}.pdf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(element);
      URL.revokeObjectURL(url);
    }, 100);
  }, 1000);
};

// Helper function to generate PDF content
const generatePrintablePDF = (invoice: Invoice, businessSettings: BusinessSettings): string => {
  // In a real app, this would use a PDF library like jsPDF
  // For now, we'll return simple HTML that would be converted to PDF in a real app
  
  const qrCodeElement = React.createElement(QRCodeCanvas, { value: generateInvoiceQRCodeData(invoice), size: 100 });
  const qrCodeString = renderToString(qrCodeElement);
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${invoice.number}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .invoice-header { text-align: center; margin-bottom: 20px; }
        .invoice-details { margin-bottom: 20px; }
        .invoice-table { width: 100%; border-collapse: collapse; }
        .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
        .invoice-table th { background-color: #f2f2f2; }
        .invoice-footer { margin-top: 30px; text-align: center; }
        .qr-code { text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1>${businessSettings.nameAr || businessSettings.name}</h1>
        <p>${businessSettings.addressAr || businessSettings.address}</p>
        <p>هاتف: ${businessSettings.phone}</p>
        <p>الرقم الضريبي: ${businessSettings.taxNumber}</p>
        <p>السجل التجاري: ${businessSettings.commercialRegisterAr || businessSettings.commercialRegister}</p>
      </div>
      
      <div class="invoice-details">
        <p><strong>رقم الفاتورة:</strong> ${invoice.number}</p>
        <p><strong>التاريخ:</strong> ${new Date(invoice.date).toLocaleDateString('ar-SA')}</p>
        <p><strong>الكاشير:</strong> ${invoice.cashierName}</p>
        <p><strong>نوع الطلب:</strong> ${invoice.orderType === 'takeaway' ? 'سفري' : 'محلي'}</p>
        ${invoice.tableNumber ? `<p><strong>رقم الطاولة:</strong> ${invoice.tableNumber}</p>` : ''}
        <p><strong>طريقة الدفع:</strong> ${invoice.paymentMethod}</p>
      </div>
      
      <table class="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>الصنف</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map((item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.nameAr || item.name} (${item.size})</td>
              <td>${item.price.toFixed(2)} ر.س</td>
              <td>${item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)} ر.س</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="invoice-summary" style="margin-top: 20px; text-align: left;">
        <p><strong>المجموع الفرعي:</strong> ${invoice.subtotal.toFixed(2)} ر.س</p>
        <p><strong>ضريبة القيمة المضافة (${businessSettings.taxRate}%):</strong> ${invoice.taxAmount.toFixed(2)} ر.س</p>
        ${invoice.discount ? `<p><strong>الخصم${invoice.discountType === 'percentage' ? ` (${invoice.discount}%)` : ''}:</strong> ${
          invoice.discountType === 'percentage' 
            ? ((invoice.subtotal + invoice.taxAmount) * (invoice.discount / 100)).toFixed(2) 
            : invoice.discount.toFixed(2)
        } ر.س</p>` : ''}
        <p style="font-size: 1.2em;"><strong>الإجمالي:</strong> ${invoice.total.toFixed(2)} ر.س</p>
      </div>
      
      <div class="qr-code">
        ${qrCodeString}
      </div>
      
      <div class="invoice-footer">
        <p>${businessSettings.invoiceNotesAr || businessSettings.invoiceNotes || ''}</p>
        <p>شكراً لزيارتكم</p>
      </div>
    </body>
    </html>
  `;
  
  return htmlContent;
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
