
import { DOWNLOAD_URLS } from './constants';

/**
 * Detects if the application is running inside Electron
 * @returns boolean indicating if running in Electron
 */
export const isRunningInElectron = (): boolean => {
  // Check if the window object has Electron specific properties
  return window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
};

/**
 * Determines the correct download URL based on the user's platform
 * @returns string URL for the appropriate installer
 */
export const getDownloadUrl = (): string => {
  const platform = window.navigator.platform.toLowerCase();
  let url = '';
  
  // Determine the appropriate download URL based on platform
  if (platform.includes('win')) {
    url = DOWNLOAD_URLS.windows;
  } else if (platform.includes('mac')) {
    url = DOWNLOAD_URLS.mac;
  } else {
    // Default to Windows if platform cannot be determined or is Linux
    url = DOWNLOAD_URLS.windows;
  }
  
  // Make sure we have a valid URL
  if (!url || url.trim() === '') {
    console.warn('Invalid download URL, using Windows as fallback');
    return DOWNLOAD_URLS.windows;
  }
  
  return url;
};
