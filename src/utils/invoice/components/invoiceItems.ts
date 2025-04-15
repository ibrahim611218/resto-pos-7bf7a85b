
import { Invoice } from "@/types";

/**
 * Generates HTML for the invoice items table
 */
export const generateInvoiceItemsTable = (invoice: Invoice): string => {
  console.log("Generating invoice items table, items count:", invoice.items.length);
  
  if (!invoice.items || invoice.items.length === 0) {
    return `
      <div class="invoice-empty-items">
        <p>لا توجد أصناف في هذه الفاتورة</p>
      </div>
    `;
  }
  
  // إضافة سجل تصحيح للتأكد من البيانات
  console.log("Invoice items data:", JSON.stringify(invoice.items));
  
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
        ${invoice.items.map((item, index) => {
          // إضافة سجل لكل عنصر
          console.log(`Processing item ${index+1}:`, item.nameAr || item.name);
          
          return `
            <tr>
              <td>${index + 1}</td>
              <td>${item.nameAr || item.name} ${item.size ? `(${item.size})` : ''}</td>
              <td>${item.price.toFixed(2)} ر.س</td>
              <td>${item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)} ر.س</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
};
