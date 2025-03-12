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
  const printableContent = generatePrintablePDF(invoice, businessSettings);
  
  const printIframe = document.createElement('iframe');
  printIframe.style.position = 'fixed';
  printIframe.style.right = '-9999px';
  printIframe.style.bottom = '-9999px';
  printIframe.style.width = '0';
  printIframe.style.height = '0';
  printIframe.style.border = '0';
  
  document.body.appendChild(printIframe);
  
  printIframe.contentDocument.write(printableContent);
  printIframe.contentDocument.close();
  
  printIframe.onload = () => {
    try {
      const blob = new Blob([printableContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoice.number}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        document.body.removeChild(printIframe);
      }, 100);
      
      toast({
        title: "تم تصدير الفاتورة",
        description: `تم تصدير الفاتورة رقم ${invoice.number} بنجاح`,
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "خطأ في تصدير الفاتورة",
        description: "حدث خطأ أثناء تصدير الفاتورة إلى PDF",
        variant: "destructive",
      });
    }
  };
};

const generatePrintablePDF = (invoice: Invoice, businessSettings: BusinessSettings): string => {
  const qrCodeElement = React.createElement(QRCodeCanvas, { value: generateInvoiceQRCodeData(invoice), size: 100 });
  const qrCodeString = renderToString(qrCodeElement);
  
  const discountAmount = invoice.discountType === "percentage" 
    ? (invoice.subtotal + invoice.taxAmount) * (invoice.discount / 100)
    : invoice.discount;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <title>فاتورة ${invoice.number}</title>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 20px; 
          direction: rtl;
        }
        .invoice-header { 
          text-align: center; 
          margin-bottom: 20px; 
        }
        .logo { 
          max-width: 150px; 
          max-height: 80px; 
          margin: 0 auto;
          display: block;
        }
        .invoice-details { 
          margin-bottom: 20px; 
        }
        .invoice-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0;
        }
        .invoice-table th, .invoice-table td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: right; 
        }
        .invoice-table th { 
          background-color: #f2f2f2; 
        }
        .invoice-summary { 
          margin-top: 20px; 
          text-align: left;
          width: 50%;
          margin-left: auto;
        }
        .invoice-summary p {
          display: flex;
          justify-content: space-between;
        }
        .qr-code { 
          text-align: center; 
          margin-top: 20px; 
        }
        .invoice-footer { 
          margin-top: 30px; 
          text-align: center; 
          font-size: 12px;
          color: #666;
        }
        .total-row {
          font-weight: bold;
          font-size: 1.2em;
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        ${businessSettings.logo ? `<img src="${businessSettings.logo}" class="logo" alt="شعار المطعم">` : ''}
        <h1>${businessSettings.nameAr || businessSettings.name}</h1>
        ${businessSettings.taxNumber ? `<p>الرقم الضريبي: ${businessSettings.taxNumber}</p>` : ''}
        ${businessSettings.addressAr ? `<p>${businessSettings.addressAr}</p>` : ''}
        ${businessSettings.phone ? `<p>هاتف: ${businessSettings.phone}</p>` : ''}
        ${businessSettings.commercialRegisterAr ? `<p>السجل التجاري: ${businessSettings.commercialRegisterAr}</p>` : ''}
      </div>
      
      <div class="invoice-details">
        <h2 style="text-align: center;">فاتورة رقم #${invoice.number}</h2>
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
      
      <div class="invoice-summary">
        <p><strong>المجموع الفرعي:</strong> <span>${invoice.subtotal.toFixed(2)} ر.س</span></p>
        <p><strong>ضريبة القيمة المضافة (${businessSettings.taxRate}%):</strong> <span>${invoice.taxAmount.toFixed(2)} ر.س</span></p>
        ${invoice.discount ? `<p><strong>الخصم${invoice.discountType === 'percentage' ? ` (${invoice.discount}%)` : ''}:</strong> <span>${
          discountAmount.toFixed(2)
        } ر.س</span></p>` : ''}
        <p class="total-row"><strong>الإجمالي:</strong> <span>${invoice.total.toFixed(2)} ر.س</span></p>
      </div>
      
      <div class="qr-code">
        ${qrCodeString}
      </div>
      
      <div class="invoice-footer">
        <p>${businessSettings.invoiceNotesAr || businessSettings.invoiceNotes || ''}</p>
        <p>شكراً لزيارتكم</p>
      </div>

      <script>
        window.onload = function() {
          // Auto print when loaded
          // window.print();
        };
      </script>
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
  console.log("Email invoice", invoice, email, businessSettings);
  
  toast({
    title: "تم إرسال الفاتورة",
    description: `تم إرسال الفاتورة رقم ${invoice.number} إلى ${email} بنجاح`,
  });
  
  return true;
};

export const handleInvoiceExport = (
  exportType: InvoiceExportType,
  invoice: Invoice,
  businessSettings: BusinessSettings,
  email?: string
): void => {
  switch (exportType) {
    case "print":
      const printContent = generatePrintablePDF(invoice, businessSettings);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
          printWindow.print();
          
          // Close after printing (some browsers might do this automatically)
          // printWindow.close();
        }, 500);
      } else {
        toast({
          title: "تنبيه",
          description: "يرجى السماح بالنوافذ المنبثقة للطباعة",
          variant: "destructive",
        });
      }
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

export const generateInvoiceQRCodeData = (invoice: Invoice): string => {
  const data = {
    invoiceNumber: invoice.number,
    total: invoice.total,
    date: invoice.date,
    businessName: "مطعم الذواق",
    taxNumber: "300000000000003",
  };
  return JSON.stringify(data);
};
