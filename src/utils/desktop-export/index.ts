
import { isRunningInElectron, getDownloadUrl } from './utils';
import { showNotification } from './notifications';
import { generateDownloadPageTemplate } from './templates';

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
    
    console.log("Opening download URL:", downloadUrl);
    
    // Try to directly download the file instead of just opening a new window
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success notification
    showNotification("download-started", language);
    
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};
