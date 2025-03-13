
import { DOWNLOAD_URLS } from './constants';

/**
 * Detects if the application is running inside Electron
 * @returns boolean indicating if running in Electron
 */
export const isRunningInElectron = (): boolean => {
  return window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
};

/**
 * Determines the correct download URL based on the user's platform
 * @returns string URL for the appropriate installer
 */
export const getDownloadUrl = (): string => {
  const platform = window.navigator.platform.toLowerCase();
  
  if (platform.includes('win')) {
    return DOWNLOAD_URLS.windows;
  } else if (platform.includes('mac')) {
    return DOWNLOAD_URLS.mac;
  } else {
    return DOWNLOAD_URLS.linux;
  }
};
