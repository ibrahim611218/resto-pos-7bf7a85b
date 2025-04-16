
import { DOWNLOAD_URLS } from './constants';

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
  const downloadUrl = getDownloadUrl();
  window.open(downloadUrl, '_blank');
};
