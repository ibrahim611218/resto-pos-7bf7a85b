
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
    // Open a new window to explain the installation process
    const installWindow = window.open('', '_blank');
    
    if (installWindow) {
      // Write the HTML template to the new window
      installWindow.document.write(generateDownloadPageTemplate(language));
      
      // Force document.close() to ensure all content renders properly
      installWindow.document.close();
      
      // Show success notification
      showNotification("download-started", language);
    } else {
      // Show error notification if popup is blocked
      showNotification("popup-blocked", language);
    }
  } catch (error) {
    console.error("Error opening desktop export window:", error);
    showNotification("popup-blocked", language);
  }
};
