
import { Invoice } from "@/types";

/**
 * Generates HTML for the invoice items table
 */
export const generateInvoiceItemsTable = (invoice: Invoice): string => {
  return `
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
  `;
};
