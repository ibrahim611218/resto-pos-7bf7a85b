
/**
 * Generate script content for the invoice template
 */
export const generateScriptContent = (isPdf: boolean = false): string => {
  return `
    window.onload = function() {
      console.log("Invoice print window loaded");
      
      // Show content once loaded
      document.querySelector('.delayed-content').classList.add('content-loaded');
      
      // Force all images to load before printing
      const allImages = document.querySelectorAll('img');
      let loadedImages = 0;
      
      function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages >= allImages.length) {
          console.log("All images loaded, preparing to print");
          prepareForPrinting();
        }
      }
      
      // Add load events to all images
      allImages.forEach(function(img) {
        if (img.complete) {
          checkAllImagesLoaded();
        } else {
          img.onload = checkAllImagesLoaded;
          img.onerror = checkAllImagesLoaded; // Count even if error
        }
        
        // Make image visible
        img.style.display = 'block';
        img.style.visibility = 'visible';
      });
      
      // Prepare document for printing
      function prepareForPrinting() {
        // Force QR code rendering
        var qrElements = document.querySelectorAll('.qr-code, .amount-barcode');
        qrElements.forEach(function(el) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          
          // Make sure all images inside are visible
          var imgs = el.querySelectorAll('img');
          imgs.forEach(function(img) {
            img.style.display = 'block';
            img.style.visibility = 'visible';
          });
        });
        
        setTimeout(function() {
          window.focus();
          ${!isPdf ? 'window.print();' : ''}
        }, 1000);
      }
      
      // In case we have no images or they've already loaded
      if (allImages.length === 0 || loadedImages === allImages.length) {
        setTimeout(prepareForPrinting, 1000);
      }
      
      // Also force rendering before print
      window.addEventListener('beforeprint', function() {
        var qrElements = document.querySelectorAll('.qr-code, .amount-barcode');
        qrElements.forEach(function(el) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
        });
      });
    };
  `;
};
