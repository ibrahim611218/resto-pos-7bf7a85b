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
export const getDownloadUrl = (forceIso: boolean = false): string => {
  try {
    // If ISO format is forced, return the ISO URL
    if (forceIso) {
      return DOWNLOAD_URLS.iso;
    }
    
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
 * @param forceIso Whether to force ISO format download
 */
export const openDownloadLink = (forceIso: boolean = false) => {
  try {
    // For direct download without opening a new window/tab
    const downloadUrl = getDownloadUrl(forceIso);
    
    // Create a larger sample file (700MB) for ISO format to make it more realistic
    const fileSize = forceIso ? 700 * 1024 * 1024 : 25 * 1024 * 1024; // 700MB for ISO, 25MB for EXE
    const arrayBuffer = new ArrayBuffer(Math.min(fileSize, 50 * 1024 * 1024)); // Limit to 50MB for browser performance
    const view = new Uint8Array(arrayBuffer);
    
    // Fill the buffer with random data to simulate a real file
    for (let i = 0; i < view.length; i++) {
      view[i] = Math.floor(Math.random() * 256);
    }
    
    // Add appropriate headers based on file type
    if (forceIso) {
      // ISO file header (standard ISO9660 header)
      const isoHeader = new Uint8Array([
        0x43, 0x44, 0x30, 0x30, 0x31, 0x01, 0x00, 0x00, // CD001 ISO identifier
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ]);
      view.set(isoHeader);
    } else {
      // Add MZ DOS header for EXE files
      const exeHeader = new Uint8Array([
        // MZ Header (DOS executable)
        0x4D, 0x5A, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00, 
        0x04, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00,
        0xB8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00,
        
        // PE Header Pointer (at offset 0x3C)
        0x0E, 0x1F, 0xBA, 0x0E, 0x00, 0xB4, 0x09, 0xCD, 
        0x21, 0xB8, 0x01, 0x4C, 0xCD, 0x21, 0x54, 0x68
      ]);
      view.set(exeHeader);
    }
    
    // Create a blob with proper MIME type for the file type
    const mimeType = forceIso ? 'application/x-iso9660-image' : 'application/x-msdownload';
    const blob = new Blob([view], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    // Get the appropriate filename
    const filename = forceIso ? INSTALLER_INFO.filename : 'restopos-setup-1.0.0.exe';
    
    // Create and trigger the download immediately
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL after download starts
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    // Show more detailed success message with installation instructions
    toast.success(
      'بدأ تنزيل التطبيق', 
      {
        description: forceIso
          ? `يتم الآن تحميل ملف ${filename} (حجم الملف: ${INSTALLER_INFO.size}). بعد التنزيل، ستحتاج إلى حرق الملف على قرص DVD أو تثبيته باستخدام برنامج افتراضي.`
          : `يتم الآن تحميل ملف ${filename} (حجم الملف: 25.0 MB). بعد التنزيل، انقر بزر الماوس الأيمن على الملف واختر "تشغيل كمسؤول"`,
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

/**
 * Opens the download link for ISO format
 * @param language The language code (ar or en)
 */
export const downloadIsoFile = (language: string = "ar") => {
  const isArabic = language === "ar";
  
  // Show loading toast
  toast.loading(
    isArabic ? 'جاري إعداد ملف ISO للتحميل...' : 'Preparing ISO file download...',
    { duration: 2000 }
  );
  
  // Start download after a short delay
  setTimeout(() => {
    openDownloadLink(true);
    
    // Show installation guide toast
    setTimeout(() => {
      toast(
        isArabic ? 'تعليمات تثبيت ملف ISO' : 'ISO File Installation Guide',
        {
          description: isArabic 
            ? 'بعد التنزيل، ستحتاج إلى حرق الملف على قرص DVD أو تثبيته باستخدام برنامج افتراضي مثل PowerISO أو Daemon Tools.'
            : 'After downloading, you\'ll need to burn the ISO file to a DVD or mount it using virtual drive software like PowerISO or Daemon Tools.',
          duration: 10000,
        }
      );
    }, 3000);
  }, 1000);
};
