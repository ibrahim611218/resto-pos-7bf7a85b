
import { BusinessSettings } from "@/types";

/**
 * Generates HTML for the invoice header section
 */
export const generateInvoiceHeader = (settings: BusinessSettings): string => {
  return `
    <div class="invoice-header">
      ${settings.logo ? 
        `<img src="${settings.logo}" class="logo" alt="شعار المطعم">` : 
        `<div class="brand-logo">
           <img src="/assets/restopos-logo.png" width="80" height="80" alt="RestoPOS">
           <span class="brand-name">
             <span class="brand-name-primary">Resto</span><span class="brand-name-accent">POS</span>
           </span>
         </div>`
      }
      <h1>${settings.nameAr || settings.name || "RestoPOS"}</h1>
      ${settings.taxNumber ? `<p>الرقم الضريبي: ${settings.taxNumber}</p>` : ''}
      ${settings.addressAr ? `<p>${settings.addressAr}</p>` : ''}
      ${settings.phone ? `<p>هاتف: ${settings.phone}</p>` : ''}
      ${settings.commercialRegisterAr ? `<p>السجل التجاري: ${settings.commercialRegisterAr}</p>` : ''}
    </div>
  `;
};
