
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
  
  // Determine the appropriate download URL based on platform
  if (platform.includes('win')) {
    return DOWNLOAD_URLS.windows;
  } else if (platform.includes('mac')) {
    return DOWNLOAD_URLS.mac;
  } else {
    // Default to Windows if platform cannot be determined or is Linux
    return DOWNLOAD_URLS.windows;
  }
};
