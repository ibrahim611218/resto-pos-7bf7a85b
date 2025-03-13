
import { isRunningInElectron, getDownloadUrl } from './utils';
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
    
    // Simply open the download URL in a new tab
    window.open(downloadUrl, '_blank');
    
    // Show success notification
    showNotification("download-started", language);
    
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};
