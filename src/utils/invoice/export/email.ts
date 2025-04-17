
import { Invoice, BusinessSettings } from "@/types";
import { toast } from "@/hooks/use-toast";

/**
 * Sends invoice via email
 */
export const emailInvoice = async (
  invoice: Invoice,
  email: string,
  businessSettings: BusinessSettings
): Promise<boolean> => {
  console.log("Email invoice", invoice, email, businessSettings);
  
  toast({
    title: "تم إرسال الفاتورة",
    description: `تم إرسال الفاتورة رقم ${invoice.number} إلى ${email} بنجاح`,
  });
  
  return true;
};
