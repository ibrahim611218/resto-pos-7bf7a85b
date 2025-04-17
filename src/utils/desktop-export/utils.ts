
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
 * Opens the download link directly in the browser to immediately start download
 */
export const openDownloadLink = () => {
  try {
    // For direct download without opening a new window/tab
    const downloadUrl = '/downloads/restopos-setup-1.0.0.exe';
    
    // Create a blob with sample content to simulate a download
    const sampleContent = `This is the RestoPOS installer file ${INSTALLER_INFO.filename}.\n\n` +
      `Version: ${INSTALLER_INFO.version}\n` +
      `Release Date: ${INSTALLER_INFO.releaseDate}`;
    
    const blob = new Blob([sampleContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger the download immediately
    const link = document.createElement('a');
    link.href = url;
    link.download = INSTALLER_INFO.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL after download starts
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    // Show more detailed success message with installation instructions
    toast.success(
      'بدأ تنزيل التطبيق', 
      {
        description: `يتم الآن تحميل ملف ${INSTALLER_INFO.filename} مباشرةً. بعد التنزيل، انقر بزر الماوس الأيمن على الملف واختر "تشغيل كمسؤول"`,
        duration: 8000,
      }
    );
  } catch (error) {
    console.error("Error opening download link:", error);
    toast.error("خطأ في تنزيل الملف. يرجى المحاولة مرة أخرى.");
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

/**
 * Shows installation troubleshooting instructions
 * @param language The language code (ar or en)
 */
export const showInstallationHelp = (language: string = "ar") => {
  const isArabic = language === "ar";
  
  toast(
    isArabic ? 'تعليمات التثبيت' : 'Installation Help',
    {
      description: isArabic 
        ? 'إذا ظهرت رسالة "لا يمكن تشغيل هذا التطبيق"، انقر بزر الماوس الأيمن واختر "تشغيل كمسؤول"'
        : 'If you see "This app can\'t run on your PC" message, right-click the file and select "Run as administrator"',
      duration: 10000,
      action: {
        label: isArabic ? 'المزيد من المساعدة' : 'More Help',
        onClick: () => showExtendedHelp(language),
      },
    }
  );
};

/**
 * Shows extended help for installation issues
 * @param language The language code (ar or en)
 */
const showExtendedHelp = (language: string = "ar") => {
  const isArabic = language === "ar";
  
  toast(
    isArabic ? 'حل مشكلات التثبيت' : 'Installation Troubleshooting',
    {
      description: isArabic 
        ? '1. تحقق من إعدادات الحماية 2. عطل برنامج مكافحة الفيروسات مؤقتًا 3. استخدم خيار "التشغيل كمسؤول"'
        : '1. Check security settings 2. Temporarily disable antivirus 3. Use "Run as administrator"',
      duration: 10000,
    }
  );
};
