
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
      ${settings.taxEnabled !== false && settings.taxNumber ? `<p style="display: flex; justify-content: space-between; width: 100%;"><strong>الرقم الضريبي:</strong> <span>${settings.taxNumber}</span></p>` : ''}
      ${settings.showAddress !== false && settings.addressAr ? `<p style="display: flex; justify-content: space-between; width: 100%;"><strong>العنوان:</strong> <span>${settings.addressAr}</span></p>` : ''}
      ${settings.showPhone !== false && settings.phone ? `<p style="display: flex; justify-content: space-between; width: 100%;"><strong>للتواصل:</strong> <span>${settings.phone}</span></p>` : ''}
      ${settings.showEmail !== false && settings.email ? `<p style="display: flex; justify-content: space-between; width: 100%;"><strong>البريد الإلكتروني:</strong> <span>${settings.email}</span></p>` : ''}
      ${settings.commercialRegisterAr ? `<p style="display: flex; justify-content: space-between; width: 100%;"><strong>السجل التجاري:</strong> <span>${settings.commercialRegisterAr}</span></p>` : ''}
    </div>
  `;
};
