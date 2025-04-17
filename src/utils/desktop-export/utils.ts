
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
    // For development and testing, show a toast with information
    // since we don't have the actual exe file in the repo
    toast.info('تنزيل الملف غير متاح حاليًا', {
      description: 'مطلوب إعداد ملف التثبيت على الخادم أولًا',
      duration: 5000,
    });
    
    // In a production environment with actual files, this would work:
    /*
    const downloadUrl = getDownloadUrl();
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = INSTALLER_INFO.filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('بدأ تنزيل التطبيق', {
      description: `بعد التنزيل، قم بتشغيل ملف ${INSTALLER_INFO.filename} لتثبيت التطبيق`,
      duration: 6000,
    });
    */
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
