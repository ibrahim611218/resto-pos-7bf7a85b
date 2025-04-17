
import { isRunningInElectron, getDownloadUrl, openDownloadLink } from './utils';
import { showNotification } from './notifications';
import { generateDownloadPageTemplate } from './templates';
import { INSTALLER_INFO } from './constants';
import { toast } from 'sonner';

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
    // Get download URL based on platform
    const downloadUrl = getDownloadUrl();
    
    // Use the direct download method for immediate file download
    openDownloadLink();
    
    // Show success notification
    showNotification("download-started", language);
    
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};
