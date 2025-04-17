
import { BusinessSettings } from "@/types";

/**
 * Generates HTML for the invoice header section
 */
export const generateInvoiceHeader = (settings: BusinessSettings): string => {
  // استخدام شعار RestoPOS الثابت كبديل عندما لا يتوفر شعار للعمل
  const restoposLogoHtml = `
    <div class="brand-logo">
      <img src="/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png" width="150" height="auto" alt="RestoPOS">
    </div>
  `;

  return `
    <div class="invoice-header">
      ${settings.logo ? 
        `<img src="${settings.logo}" class="logo" alt="شعار المطعم">` : 
        restoposLogoHtml
      }
      <h1>${settings.nameAr || settings.name || "RestoPOS"}</h1>
      ${settings.taxNumber ? `<p>الرقم الضريبي: ${settings.taxNumber}</p>` : ''}
      ${settings.addressAr ? `<p>${settings.addressAr}</p>` : ''}
      ${settings.phone ? `<p>هاتف: ${settings.phone}</p>` : ''}
      ${settings.commercialRegisterAr ? `<p>السجل التجاري: ${settings.commercialRegisterAr}</p>` : ''}
    </div>
  `;
};
