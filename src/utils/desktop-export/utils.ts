
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
    
    // Create a blob with custom HTML that will provide instructions
    const blob = new Blob([
      `<html>
        <head>
          <meta http-equiv="refresh" content="0;url=${downloadUrl}">
          <title>تنزيل Resto POS</title>
        </head>
        <body>
          <p>جاري التنزيل... إذا لم يبدأ التنزيل تلقائيًا، <a href="${downloadUrl}">انقر هنا</a></p>
        </body>
      </html>`
    ], { type: 'text/html' });
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show a toast with instructions
    toast.success('بدأ تنزيل التطبيق', {
      description: 'بعد التنزيل، قم بفك الضغط عن الملف وابحث عن restopos.exe لتشغيل التطبيق',
      duration: 6000,
    });
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
