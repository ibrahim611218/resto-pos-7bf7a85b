
/**
 * Helper functions for QR code rendering in print window
 */

/**
 * Applies fixes to ensure QR codes render properly before printing
 */
export const fixQRCodeRendering = (printWindow: Window): void => {
  const qrElements = printWindow.document.querySelectorAll('.qr-code, .amount-barcode');
  
  qrElements.forEach(function(el) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.display = 'block';
    htmlEl.style.visibility = 'visible';
    htmlEl.style.opacity = '0.99';
    
    setTimeout(function() {
      htmlEl.style.opacity = '1';
    }, 50);
  });
};

/**
 * Creates and adds a script to force QR code rendering
 */
export const addQRRenderingScript = (printWindow: Window): void => {
  const forceRenderScript = printWindow.document.createElement('script');
  forceRenderScript.textContent = `
    function forceQRCodeRender() {
      var qrElements = document.querySelectorAll('.qr-code, .amount-barcode');
      qrElements.forEach(function(el) {
        el.style.display = 'block';
        el.style.visibility = 'visible';
      });
      console.log("QR codes forced to render:", qrElements.length);
    }
    
    // Run multiple times to ensure rendering
    forceQRCodeRender();
    setTimeout(forceQRCodeRender, 500);
    setTimeout(forceQRCodeRender, 1000);
    
    // Right before print
    window.addEventListener('beforeprint', forceQRCodeRender);
  `;
  
  printWindow.document.body.appendChild(forceRenderScript);
};
