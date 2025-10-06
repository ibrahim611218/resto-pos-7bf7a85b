
import { Invoice } from "@/types";

/**
 * Generates HTML for the invoice details section
 */
export const generateInvoiceDetails = (invoice: Invoice): string => {
  return `
    <div class="invoice-details">
      <p style="display: flex; justify-content: space-between; width: 100%; font-size: 15px; font-weight: 700;"><strong>الفاتورة:</strong> <span>#${invoice.number}</span></p>
      <p style="display: flex; justify-content: space-between; width: 100%;"><strong>التاريخ:</strong> <span>${new Date(invoice.date).toLocaleDateString('ar-SA')}</span></p>
      <p style="display: flex; justify-content: space-between; width: 100%;"><strong>الكاشير:</strong> <span>${invoice.cashierName}</span></p>
      <p style="display: flex; justify-content: space-between; width: 100%;"><strong>نوع الطلب:</strong> <span>${invoice.orderType === 'takeaway' ? 'سفري' : 'محلي'}</span></p>
      ${invoice.tableNumber ? `<p style="display: flex; justify-content: space-between; width: 100%;"><strong>رقم الطاولة:</strong> <span>${invoice.tableNumber}</span></p>` : ''}
      <p style="display: flex; justify-content: space-between; width: 100%;"><strong>طريقة الدفع:</strong> <span>${
        invoice.paymentMethod === 'cash' ? 'نقدي' :
        invoice.paymentMethod === 'card' ? 'بطاقة' :
        invoice.paymentMethod === 'transfer' ? 'تحويل بنكي' :
        invoice.paymentMethod
      }</span></p>
      
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
