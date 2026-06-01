/**
 * Print helpers — mobile-friendly using a hidden iframe instead of window.open
 * (popup windows are blocked / unreliable on mobile browsers and PWAs).
 */
export interface PrintWindowOptions {
  title?: string;
  printAutomatically?: boolean;
  delay?: number;
  isPdf?: boolean;
}

/**
 * Mounts content inside a hidden iframe and returns its window so callers can
 * print or further manipulate it. Returns null on failure.
 */
export const openPrintWindow = (content: string): Window | null => {
  try {
    // Remove any previous print iframe to avoid stacking
    const previous = document.getElementById("lovable-print-frame");
    if (previous) previous.remove();

    const iframe = document.createElement("iframe");
    iframe.id = "lovable-print-frame";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc || !iframe.contentWindow) {
      console.error("Could not access iframe document for printing");
      return null;
    }

    doc.open();
    doc.write(content);
    doc.close();

    return iframe.contentWindow;
  } catch (error) {
    console.error("Error opening print iframe:", error);
    return null;
  }
};

export const setupPrintWindow = (
  printWindow: Window,
  options: PrintWindowOptions = {}
): void => {
  const {
    title = "Print Document",
    printAutomatically = true,
    delay = 800,
    isPdf = false,
  } = options;

  try {
    if (title && printWindow.document) {
      printWindow.document.title = title;
    }
  } catch {
    // ignore — cross-frame title set may fail in some browsers
  }

  if (printAutomatically && !isPdf) {
    const trigger = () => {
      try {
        const style = printWindow.document.createElement("style");
        style.textContent = `
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .invoice-container { page-break-inside: avoid !important; }
          }
        `;
        printWindow.document.head.appendChild(style);

        printWindow.focus();
        printWindow.print();

        // Cleanup iframe after print dialog resolves
        setTimeout(() => {
          const frame = document.getElementById("lovable-print-frame");
          if (frame) frame.remove();
        }, 1500);
      } catch (error) {
        console.error("Error in print function:", error);
      }
    };

    // Wait for fonts/images to load before printing for better mobile output
    setTimeout(trigger, delay);
  }
};
