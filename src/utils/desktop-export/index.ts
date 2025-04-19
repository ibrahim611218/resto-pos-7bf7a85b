
import { isRunningInElectron, getDownloadUrl, openDownloadLink, showInstallationHelp, downloadIsoFile } from './utils';
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
    console.log("Starting desktop export process with realistic installer file");
    
    // Use the direct download method for immediate file download with enhanced file size
    openDownloadLink(false); // false for EXE file (default format)
    
    // Show success notification
    showNotification("download-started", language);
    
    // After a slight delay, show installation help
    setTimeout(() => {
      showInstallationHelp(language);
    }, 3000);
    
    // Log success for debugging
    console.log("Desktop export initiated successfully");
    
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};

// Export the downloadIsoFile function
export { downloadIsoFile } from './utils';
