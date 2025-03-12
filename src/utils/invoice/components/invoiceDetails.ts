
import { Invoice } from "@/types";

/**
 * Generates HTML for the invoice details section
 */
export const generateInvoiceDetails = (invoice: Invoice): string => {
  return `
    <div class="invoice-details">
      <h2 style="text-align: center;">فاتورة رقم #${invoice.number}</h2>
      <p><strong>التاريخ:</strong> ${new Date(invoice.date).toLocaleDateString('ar-SA')}</p>
      <p><strong>الكاشير:</strong> ${invoice.cashierName}</p>
      <p><strong>نوع الطلب:</strong> ${invoice.orderType === 'takeaway' ? 'سفري' : 'محلي'}</p>
      ${invoice.tableNumber ? `<p><strong>رقم الطاولة:</strong> ${invoice.tableNumber}</p>` : ''}
      <p><strong>طريقة الدفع:</strong> ${invoice.paymentMethod}</p>
      
      <div class="customer-info" style="margin-top: 15px; padding: 10px; border: 1px dashed #ccc; border-radius: 5px;">
        <h3 style="margin-top: 0; margin-bottom: 10px; text-align: center; font-size: 16px;">بيانات العميل</h3>
        <p><strong>اسم العميل:</strong> ${invoice.customer?.name || "عميل نقدي"}</p>
        ${invoice.customer?.taxNumber ? `<p><strong>الرقم الضريبي:</strong> ${invoice.customer.taxNumber}</p>` : ''}
        ${invoice.customer?.phone ? `<p><strong>رقم الجوال:</strong> ${invoice.customer.phone}</p>` : ''}
        ${invoice.customer?.email ? `<p><strong>البريد الإلكتروني:</strong> ${invoice.customer.email}</p>` : ''}
      </div>
    </div>
  `;
};
