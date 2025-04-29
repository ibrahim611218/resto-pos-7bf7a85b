
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
  
  // For debugging purposes
  console.log("Invoice items data:", JSON.stringify(invoice.items));
  
  let tableHTML = `
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
  `;

  // Process each item individually to catch errors
  invoice.items.forEach((item, index) => {
    try {
      console.log(`Processing item ${index+1}:`, item.nameAr || item.name);
      
      const itemName = item.nameAr || item.name || "غير معروف";
      
      // Only show size if not a single product type
      const isSingleProduct = item.type === "single";
      
      // Get Arabic size name
      let sizeText = '';
      if (!isSingleProduct && item.size && item.size !== "regular" && item.size !== "medium") {
        if (item.size === "small") sizeText = "(صغير)";
        else if (item.size === "large") sizeText = "(كبير)";
        else if (item.size === "xlarge") sizeText = "(كبير جداً)";
        else sizeText = `(${item.size})`;
      }
        
      const itemPrice = typeof item.price === 'number' ? item.price.toFixed(2) : '0.00';
      const itemQuantity = item.quantity || 1;
      const itemTotal = (Number(item.price) * Number(itemQuantity)).toFixed(2);
      
      tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${itemName} ${sizeText}</td>
          <td>${itemPrice} ر.س</td>
          <td>${itemQuantity}</td>
          <td>${itemTotal} ر.س</td>
        </tr>
      `;
    } catch (error) {
      console.error(`Error processing item ${index+1}:`, error);
      tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>خطأ في بيانات المنتج</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      `;
    }
  });
  
  tableHTML += `
      </tbody>
    </table>
  `;
  
  return tableHTML;
};
