
/**
 * Generate script content for the invoice template
 */
export const generateScriptContent = (isPdf: boolean = false): string => {
  return `
    window.onload = function() {
      console.log("Invoice print window loaded");
      
      // Show content once loaded
      document.querySelector('.delayed-content').classList.add('content-loaded');
      
      // Force QR code rendering
      function forceQRCodeRender() {
        console.log("Forcing QR code rendering");
        var qrElements = document.querySelectorAll('.qr-code, .amount-barcode');
        qrElements.forEach(function(el) {
          // Force redraw of elements
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '0.99';
          setTimeout(function() {
            el.style.opacity = '1';
          }, 50);
          
          // Make sure all SVGs inside are visible
          var svgs = el.querySelectorAll('svg, canvas, img');
          svgs.forEach(function(svg) {
            svg.style.display = 'block';
            svg.style.visibility = 'visible';
          });
        });
      }
      
      // Run rendering multiple times
      forceQRCodeRender();
      setTimeout(forceQRCodeRender, 500);
      setTimeout(forceQRCodeRender, 1000);
      
      // Also force rendering before print
      window.addEventListener('beforeprint', forceQRCodeRender);
      
      setTimeout(function() {
        window.focus();
        forceQRCodeRender(); // Force one more time before print
        // Don't auto-print in PDF mode
        ${!isPdf ? 'window.print();' : ''}
      }, 2000);
    };
  `;
};
