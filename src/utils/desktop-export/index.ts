
import { isRunningInElectron, getDownloadUrl } from './utils';
import { showNotification } from './notifications';
import { generateDownloadPageTemplate } from './templates';
import { INSTALLER_INFO } from './constants';
import { toast } from 'sonner';

/**
 * Handles the desktop export process
 * @param language The language code (ar or en)
 */
export const handleDesktopExport = (language: string = "ar") => {
  // Check if already running in Electron
  if (isRunningInElectron()) {
    showNotification("already-in-desktop", language);
    return;
  }
  
  try {
    // For development and testing purposes, show a toast notification
    // instead of actually attempting a download that would result in a 404
    const isArabic = language === 'ar';
    
    toast.info(
      isArabic ? 'تنزيل الملف غير متاح حاليًا' : 'File download is not available yet',
      {
        description: isArabic 
          ? 'مطلوب إعداد ملف التثبيت على الخادم أولًا' 
          : 'The installer file needs to be configured on the server first',
        duration: 5000,
      }
    );
    
    /* In production with actual files available, use this code:
    
    // Get the download URL based on platform
    const downloadUrl = getDownloadUrl();
    
    // Create a temporary HTML page with instructions and auto-download
    const downloadPage = generateDownloadPageTemplate(language, downloadUrl);
    const blob = new Blob([downloadPage], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open the download page in a new window
    const newWindow = window.open(url, '_blank');
    
    if (!newWindow) {
      // Show popup blocked notification
      showNotification("popup-blocked", language);
      
      // Alternative approach if popup is blocked
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = INSTALLER_INFO.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Show success notification
    showNotification("download-started", language);
    */
    
  } catch (error) {
    console.error("Desktop export error:", error);
    showNotification("export-error", language);
  }
};
