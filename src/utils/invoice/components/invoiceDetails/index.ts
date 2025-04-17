
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
      
      ${invoice.customer ? `
        <div class="customer-info">
          <p><strong>العميل:</strong> ${invoice.customer.name}</p>
          ${invoice.customer.phone ? `<p><strong>رقم الهاتف:</strong> ${invoice.customer.phone}</p>` : ''}
          ${invoice.customer.email ? `<p><strong>البريد الإلكتروني:</strong> ${invoice.customer.email}</p>` : ''}
          ${invoice.customer.taxNumber ? `<p><strong>الرقم الضريبي:</strong> ${invoice.customer.taxNumber}</p>` : ''}
          ${invoice.customer.commercialRegister ? `<p><strong>السجل التجاري:</strong> ${invoice.customer.commercialRegister}</p>` : ''}
          ${invoice.customer.address ? `<p><strong>العنوان:</strong> ${invoice.customer.address}</p>` : ''}
        </div>
      ` : ''}
    </div>
  `;
};
