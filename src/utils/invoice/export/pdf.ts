import { Invoice, BusinessSettings } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceTemplate } from "../template";

/**
 * Exports invoice to PDF using html2pdf (works on mobile + desktop).
 * Triggers a real file download (no browser print dialog).
 */
export const exportInvoiceToPDF = async (
  invoice: Invoice,
  businessSettings: BusinessSettings
): Promise<void> => {
  try {
    console.log("Exporting invoice to PDF:", invoice.id, invoice.number);

    const html = generateInvoiceTemplate(invoice, businessSettings, true);

    // Render HTML into an off-screen container so html2pdf can capture it
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0";
    container.style.width = "210mm";
    container.style.background = "#ffffff";
    container.innerHTML = html;
    document.body.appendChild(container);

    // Pick only the invoice body (avoid full <html> wrapper)
    const target =
      (container.querySelector(".invoice-container") as HTMLElement) || container;

    // @ts-ignore - no types shipped
    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .from(target)
      .set({
        margin: 5,
        filename: `invoice-${invoice.number}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();

    document.body.removeChild(container);

    toast({
      title: "تم تصدير الفاتورة",
      description: `تم تنزيل الفاتورة رقم ${invoice.number} بصيغة PDF`,
    });
  } catch (error) {
    console.error("Error in exportInvoiceToPDF:", error);
    toast({
      title: "خطأ في تصدير الفاتورة",
      description: "حدث خطأ أثناء تصدير الفاتورة إلى PDF",
      variant: "destructive",
    });
  }
};
