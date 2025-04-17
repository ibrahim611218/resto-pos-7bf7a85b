
import { DOWNLOAD_URLS } from './constants';

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
    let url = '';
    
    // Determine the appropriate download URL based on platform
    if (platform.includes('win')) {
      url = DOWNLOAD_URLS.windows;
    } else if (platform.includes('mac')) {
      url = DOWNLOAD_URLS.mac;
    } else if (platform.includes('linux')) {
      url = DOWNLOAD_URLS.linux;
    } else {
      // Default to Windows download
      url = DOWNLOAD_URLS.windows;
    }
    
    console.log("Download URL determined:", url);
    return url;
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
    const downloadUrl = getDownloadUrl();
    console.log("Opening download URL:", downloadUrl);
    
    // Check if URL is valid
    if (!downloadUrl || typeof downloadUrl !== 'string') {
      throw new Error("Invalid download URL");
    }
    
    // Force download file instead of opening in browser
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = ''; // This triggers download rather than navigation
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error("Error opening download link:", error);
    alert("خطأ في فتح رابط التحميل. يرجى المحاولة مرة أخرى.");
  }
};
