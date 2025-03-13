
import { isRunningInElectron, getDownloadUrl } from './utils';
import { generateDownloadPageTemplate } from './templates';
import { showNotification } from './notifications';

/**
 * Handles the desktop export process
 * @param language The language code (ar or en)
 */
export const handleDesktopExport = (language: string = "ar") => {
  // Check if already running in Electron
  if (isRunningInElectron()) {
    showNotification("already-in-desktop", language);
    return;
  }
  
  try {
    // Get the download URL based on platform
    const downloadUrl = getDownloadUrl();
    
    // Generate the HTML content
    const htmlContent = generateDownloadPageTemplate(language, downloadUrl);
    
    // Direct approach - Create a new window with document.write
    const newWindow = window.open('', '_blank');
    
    if (!newWindow) {
      // Show popup blocked notification
      showNotification("popup-blocked", language);
      return;
    }
    
    // Write content directly to the new window
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    
    // Trigger download programmatically after a short delay
    setTimeout(() => {
      try {
        const downloadLink = newWindow.document.getElementById('download-link');
        if (downloadLink) {
          downloadLink.click();
          // Show success notification
          showNotification("download-started", language);
        }
      } catch (innerError) {
        console.error("Error triggering download:", innerError);
        showNotification("export-error", language);
      }
    }, 500);
    
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};
