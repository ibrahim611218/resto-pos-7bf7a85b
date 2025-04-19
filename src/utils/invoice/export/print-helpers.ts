
/**
 * Opens a new window with the content to be printed
 */
export const openPrintWindow = (content: string): Window | null => {
  try {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error("Could not open print window. Pop-up might be blocked");
      return null;
    }
    
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    
    return printWindow;
  } catch (error) {
    console.error("Error opening print window:", error);
    return null;
  }
};

/**
 * Sets up print window with options
 */
export interface PrintWindowOptions {
  title?: string;
  printAutomatically?: boolean;
  delay?: number;
  isPdf?: boolean;
}

export const setupPrintWindow = (
  printWindow: Window,
  options: PrintWindowOptions = {}
): void => {
  const {
    title = 'Print Document',
    printAutomatically = true,
    delay = 1000,
    isPdf = false
  } = options;
  
  if (title) {
    printWindow.document.title = title;
  }
  
  // Focus the window to make sure it's in the foreground
  printWindow.focus();
  
  // For PDF mode, we don't automatically print
  if (printAutomatically && !isPdf) {
    setTimeout(() => {
      try {
        // Set print media before printing to ensure styles are applied
        const style = printWindow.document.createElement('style');
        style.textContent = `
          @media print {
            body { -webkit-print-color-adjust: exact; }
            .invoice-container { page-break-inside: avoid !important; }
          }
        `;
        printWindow.document.head.appendChild(style);
        
        // Print the document
        printWindow.print();
        
        // Don't close the window yet to allow print dialog to appear
      } catch (error) {
        console.error("Error in print function:", error);
      }
    }, delay);
  }
};
