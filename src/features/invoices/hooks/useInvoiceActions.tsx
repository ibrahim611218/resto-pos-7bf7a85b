
import { useState } from "react";
import { Invoice } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

export const useInvoiceActions = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isReturningOrder, setIsReturningOrder] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleReturnOrder = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsReturningOrder(true);
  };

  const processReturnOrder = (invoice: Invoice, reason: string) => {
    // In a real implementation, this would call an API to process the return
    // and update the database
    
    toast.success(
      isArabic
        ? `تم إرجاع الطلب رقم ${invoice.number} بنجاح`
        : `Order #${invoice.number} returned successfully`
    );
    
    // Log the return for demonstration purposes
    console.log("Order returned:", {
      invoiceId: invoice.id,
      reason,
      timestamp: new Date().toISOString()
    });
    
    setIsReturningOrder(false);
    setSelectedInvoice(null);
  };

  const printInvoice = (invoice: Invoice) => {
    // Call the export/print functionality
    if (window.print) {
      // Create a temporary iframe to print just the invoice
      const printFrame = document.createElement('iframe');
      
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      
      document.body.appendChild(printFrame);
      
      const printDocument = printFrame.contentWindow?.document;
      
      if (printDocument) {
        // Generate the invoice HTML
        const printContent = `
          <!DOCTYPE html>
          <html dir="${isArabic ? 'rtl' : 'ltr'}">
          <head>
            <title>Invoice #${invoice.number}</title>
            <meta charset="UTF-8">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 20px; 
                direction: ${isArabic ? 'rtl' : 'ltr'};
              }
              .invoice-header { 
                text-align: center; 
                margin-bottom: 20px; 
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
                text-align: ${isArabic ? 'right' : 'left'}; 
              }
              .invoice-table th { 
                background-color: #f2f2f2; 
              }
              .invoice-summary { 
                margin-top: 20px; 
                text-align: ${isArabic ? 'left' : 'right'};
              }
              .invoice-footer { 
                margin-top: 30px; 
                text-align: center; 
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="invoice-header">
              <h1>${isArabic ? 'فاتورة' : 'Invoice'} #${invoice.number}</h1>
            </div>
            
            <div class="invoice-details">
              <p><strong>${isArabic ? 'التاريخ' : 'Date'}:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
              <p><strong>${isArabic ? 'الكاشير' : 'Cashier'}:</strong> ${invoice.cashierName}</p>
              <p><strong>${isArabic ? 'طريقة الدفع' : 'Payment Method'}:</strong> ${invoice.paymentMethod}</p>
            </div>
            
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>${isArabic ? 'المنتج' : 'Product'}</th>
                  <th>${isArabic ? 'السعر' : 'Price'}</th>
                  <th>${isArabic ? 'الكمية' : 'Quantity'}</th>
                  <th>${isArabic ? 'المجموع' : 'Total'}</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map((item, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${isArabic && item.nameAr ? item.nameAr : item.name} (${item.size})</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="invoice-summary">
              <p><strong>${isArabic ? 'المجموع الفرعي' : 'Subtotal'}:</strong> ${invoice.subtotal.toFixed(2)}</p>
              <p><strong>${isArabic ? 'الضريبة' : 'Tax'}:</strong> ${invoice.taxAmount.toFixed(2)}</p>
              ${invoice.discount ? `<p><strong>${isArabic ? 'الخصم' : 'Discount'}:</strong> ${invoice.discount}${invoice.discountType === 'percentage' ? '%' : ''}</p>` : ''}
              <p><strong>${isArabic ? 'المجموع الكلي' : 'Total'}:</strong> ${invoice.total.toFixed(2)}</p>
            </div>
            
            <div class="invoice-footer">
              <p>${isArabic ? 'شكراً لتعاملكم معنا' : 'Thank you for your business'}</p>
            </div>
          </body>
          </html>
        `;
        
        printDocument.open();
        printDocument.write(printContent);
        printDocument.close();
        
        printFrame.onload = () => {
          try {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
            
            // Remove the iframe after printing
            setTimeout(() => {
              document.body.removeChild(printFrame);
            }, 1000);
          } catch (error) {
            console.error("Error printing invoice:", error);
            document.body.removeChild(printFrame);
            
            toast.error(
              isArabic 
                ? "حدث خطأ أثناء الطباعة" 
                : "Error printing invoice"
            );
          }
        };
      }
    } else {
      toast.error(
        isArabic 
          ? "الطباعة غير متوفرة في هذا المتصفح" 
          : "Printing is not available in this browser"
      );
    }
  };

  return {
    isReturningOrder,
    selectedInvoice,
    handleReturnOrder,
    processReturnOrder,
    printInvoice,
    closeReturnDialog: () => setIsReturningOrder(false),
  };
};
