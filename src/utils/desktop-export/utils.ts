
import { DOWNLOAD_URLS, INSTALLER_INFO } from './constants';
import { toast } from 'sonner';

/**
 * Check if the application is running in Electron environment
 * @returns boolean
 */
export const isRunningInElectron = (): boolean => {
  try {
    // Check if 'window.electron' exists or other Electron-specific objects
    return window && window.navigator && 
      /electron/i.test(window.navigator.userAgent);
  } catch (error) {
    return false;
  }
};

/**
 * Determines the correct download URL based on the user's platform
 * @returns string URL for the appropriate installer
 */
export const getDownloadUrl = (): string => {
  try {
    const platform = navigator.platform.toLowerCase();
    
    // Determine the appropriate download URL based on platform
    if (platform.includes('win')) {
      return DOWNLOAD_URLS.windows;
    } else if (platform.includes('mac')) {
      return DOWNLOAD_URLS.mac;
    } else if (platform.includes('linux')) {
      return DOWNLOAD_URLS.linux;
    } else {
      // Default to Windows download
      return DOWNLOAD_URLS.windows;
    }
  } catch (error) {
    console.error("Error getting download URL:", error);
    return DOWNLOAD_URLS.windows; // Default fallback
  }
};

/**
 * Opens the download link in a new browser window
 */
export const openDownloadLink = () => {
  try {
    // Create a file with sample content (since we don't have a real installer)
    const downloadUrl = getDownloadUrl();
    
    // Create a blob with sample content to simulate a download
    const sampleContent = `This is a placeholder file for ${INSTALLER_INFO.filename}.\n\n` +
      `In production, this would be the actual installer file.\n` +
      `Version: ${INSTALLER_INFO.version}\n` +
      `Release Date: ${INSTALLER_INFO.releaseDate}`;
    
    const blob = new Blob([sampleContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = INSTALLER_INFO.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL after download starts
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    toast.success(
      'بدأ تنزيل التطبيق', 
      {
        description: `بعد التنزيل، قم بتشغيل ملف ${INSTALLER_INFO.filename} لتثبيت التطبيق`,
        duration: 6000,
      }
    );
  } catch (error) {
    console.error("Error opening download link:", error);
    toast.error("خطأ في فتح رابط التحميل. يرجى المحاولة مرة أخرى.");
  }
};

/**
 * Creates a desktop shortcut (for use in Electron environment)
 */
export const createDesktopShortcut = async () => {
  // This function would be implemented when we have an actual Electron app running
  console.log("Creating desktop shortcut (not implemented)");
  return false;
};
