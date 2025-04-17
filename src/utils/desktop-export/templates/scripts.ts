
/**
 * Creates the JavaScript script for the download page
 * @param isArabic Whether the language is Arabic
 * @returns HTML script section as a string
 */
export const generateScriptSection = (isArabic: boolean): string => {
  return `<script>
    // Auto-download trigger
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        var link = document.getElementById('download-link');
        if (link) {
          link.click();
          console.log('Auto-download triggered');
          simulateProgress();
        }
      }, 800);
    });

    function simulateProgress() {
      var progressBar = document.getElementById('progress-bar');
      var progressText = document.getElementById('progress-text');
      var width = 0;
      var interval = setInterval(function() {
        if (width >= 100) {
          clearInterval(interval);
          progressText.textContent = '${isArabic ? 'اكتمل التنزيل!' : 'Download Complete!'}';
        } else {
          width += Math.random() * 10;
          if (width > 100) width = 100;
          progressBar.style.width = width + '%';
          progressText.textContent = Math.round(width) + '%';
        }
      }, 500);
    }
  </script>`;
};
