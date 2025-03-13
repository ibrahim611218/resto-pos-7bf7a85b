
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
    const htmlContent = generateDownloadPageTemplate(language);
    
    // Create a blob and a URL for it
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    
    // Open the blob URL in a new tab
    const newWindow = window.open(blobUrl, '_blank');
    
    if (newWindow) {
      // Show success notification
      showNotification("download-started", language);
      
      // Clean up the blob URL after the window has loaded
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 5000);
    } else {
      // Show popup blocked notification
      showNotification("popup-blocked", language);
    }
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};
