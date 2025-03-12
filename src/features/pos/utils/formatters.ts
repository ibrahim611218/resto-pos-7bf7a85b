
import { Language } from "@/types";

export const formatInvoiceDate = (date: Date, language: Language) => {
  return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
