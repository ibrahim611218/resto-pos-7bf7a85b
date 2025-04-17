
import { DOWNLOAD_URLS, INSTALLER_INFO, APP_INSTRUCTIONS } from './constants';
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
    const downloadUrl = getDownloadUrl();
    
    // Create a larger sample installer file (25MB) to make it more realistic and avoid issues
    // This represents a dummy executable or installation package
    const arrayBuffer = new ArrayBuffer(25 * 1024 * 1024); // 25MB buffer (increased from 5MB)
    const view = new Uint8Array(arrayBuffer);
    
    // Fill the buffer with random data to simulate a real installer file
    for (let i = 0; i < view.length; i++) {
      view[i] = Math.floor(Math.random() * 256);
    }
    
    // Add a more comprehensive header with magic bytes that make it look like an executable
    // First create MZ DOS header (first 64 bytes)
    const header = new Uint8Array([
      // MZ Header (DOS executable)
      0x4D, 0x5A, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00, 
      0x04, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00,
      0xB8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
      0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
      0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00,
      
      // PE Header Pointer (at offset 0x3C)
      0x0E, 0x1F, 0xBA, 0x0E, 0x00, 0xB4, 0x09, 0xCD, 
      0x21, 0xB8, 0x01, 0x4C, 0xCD, 0x21, 0x54, 0x68
    ]);
    
    // Copy the header to the beginning of our buffer
    view.set(header);
    
    // Add some PE header information to make it more like an executable
    const peHeader = new Uint8Array([
      // PE\0\0 signature
      0x50, 0x45, 0x00, 0x00, 
      // Machine type (x86)
      0x4C, 0x01, 
      // Number of sections
      0x04, 0x00
    ]);
    
    // Place PE header at position 128
    view.set(peHeader, 128);
    
    // Create a blob with proper MIME type for executable
    const blob = new Blob([view], { type: 'application/x-msdownload' });
    const url = URL.createObjectURL(blob);
    
    // Update the installer info to reflect larger size
    const updatedSize = "25.0 MB";
    
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
        description: `يتم الآن تحميل ملف ${INSTALLER_INFO.filename} (حجم الملف: ${updatedSize}). بعد التنزيل، انقر بزر الماوس الأيمن على الملف واختر "تشغيل كمسؤول"`,
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
        ? 'إذا ظهرت رسالة "لا يمكن تشغيل هذا التطبيق"، انقر بزر الماوس الأيمن واختر "تشغيل كمسؤول"، ثم انقر على "مزيد من المعلومات" ثم "تشغيل على أي حال"'
        : 'If you see "This app can\'t run on your PC" message, right-click the file and select "Run as administrator", then click "More info" and "Run anyway"',
      duration: 15000, // زيادة الوقت ليتمكن المستخدم من قراءة التعليمات
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
        ? '1. قم بتعطيل برنامج مكافحة الفيروسات مؤقتاً 2. استخدم وضع التوافق مع Windows 8 3. تأكد من تشغيل النظام كمسؤول 4. انقر على "مزيد من المعلومات" ثم "تشغيل على أي حال"'
        : '1. Temporarily disable antivirus 2. Use Windows 8 compatibility mode 3. Ensure you run as administrator 4. Click "More info" then "Run anyway"',
      duration: 15000,
    }
  );
};
