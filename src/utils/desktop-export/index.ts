
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
    
    // Use data URL approach which is more reliable than blob URLs
    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
    
    // Open the data URL in a new window
    const newWindow = window.open(dataUrl, '_blank');
    
    if (!newWindow) {
      // Show popup blocked notification
      showNotification("popup-blocked", language);
      return;
    }
    
    // Show success notification
    showNotification("download-started", language);
    
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};
