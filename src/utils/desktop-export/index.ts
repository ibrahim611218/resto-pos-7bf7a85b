
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
    // Generate the download URL
    const downloadUrl = getDownloadUrl();
    
    // Create a blob with the HTML content
    const htmlContent = generateDownloadPageTemplate(language);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    
    // Open a new window with the HTML content
    const installWindow = window.open(blobUrl, '_blank');
    
    if (installWindow) {
      // Show success notification
      showNotification("download-started", language);
    } else {
      // Show error notification if popup is blocked
      showNotification("popup-blocked", language);
    }
  } catch (error) {
    console.error("Error opening desktop export window:", error);
    showNotification("export-error", language);
  }
};
