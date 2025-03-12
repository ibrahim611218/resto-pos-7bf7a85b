
import { Invoice, BusinessSettings } from "@/types";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { renderToString } from "react-dom/server";
import { generateInvoiceQRCodeData } from "./qrcode";
import { calculateDiscountAmount } from "./calculations";

/**
 * Generates HTML content for printable invoice
 */
export const generateInvoiceTemplate = (invoice: Invoice, businessSettings: BusinessSettings): string => {
  const qrCodeElement = React.createElement(QRCodeCanvas, { value: generateInvoiceQRCodeData(invoice), size: 100 });
  const qrCodeString = renderToString(qrCodeElement);
  
  const discountAmount = calculateDiscountAmount(
    invoice.subtotal,
    invoice.taxAmount,
    invoice.discount || 0,
    invoice.discountType || "percentage"
  );
  
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
        .customer-info {
          margin-top: 10px;
          border: 1px solid #ddd;
          padding: 10px;
          background-color: #f9f9f9;
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
        
        ${invoice.customer ? `
          <div class="customer-info">
            <p><strong>العميل:</strong> ${invoice.customer.name}</p>
            ${invoice.customer.taxNumber ? `<p><strong>الرقم الضريبي:</strong> ${invoice.customer.taxNumber}</p>` : ''}
          </div>
        ` : ''}
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
