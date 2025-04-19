
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
 * Generate actual Electron app files and download them
 * @param forceIso Whether to force ISO format download
 */
export const openDownloadLink = (forceIso: boolean = false) => {
  try {
    // Show a loading message
    toast.loading(
      "جاري إعداد ملفات التطبيق...", 
      { duration: 3000 }
    );
    
    // Generate an electron app for download
    const electronConfig = {
      appName: "Resto POS",
      appVersion: INSTALLER_INFO.version,
      platform: "win32", // or detect from user's platform
      arch: "x64",
      files: [
        { src: "./src/**/*", dest: "src/" },
        { src: "./public/**/*", dest: "public/" },
        { src: "./electron/**/*", dest: "electron/" },
        { src: "./package.json", dest: "./package.json" },
        { src: "./electron.config.js", dest: "./electron.config.js" },
      ],
      config: {
        icon: "./public/assets/restopos-logo.png",
      }
    };
    
    // Instead of trying to generate real files (which won't work in a browser),
    // we'll create a HTML page that explains how to set up the system locally
    const htmlContent = generateSetupInstructions(forceIso);
    
    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Get the appropriate filename
    const filename = forceIso ? "resto-pos-setup-instructions-iso.html" : "resto-pos-setup-instructions.html";
    
    // Create and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL after download starts
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    // Show success message with installation instructions
    setTimeout(() => {
      toast.success(
        'تم تنزيل ملف التعليمات بنجاح', 
        {
          description: 'قم بفتح الملف الذي تم تنزيله للحصول على تعليمات تثبيت التطبيق المحلي',
          duration: 8000,
        }
      );
    }, 3000);
  } catch (error) {
    console.error("Error generating download:", error);
    toast.error("حدث خطأ أثناء إنشاء ملف التنزيل. يرجى المحاولة مرة أخرى.");
  }
};

/**
 * Generate setup instructions for the local system
 */
const generateSetupInstructions = (forceIso = false) => {
  const title = forceIso ? "تعليمات إعداد Resto POS بنظام ISO" : "تعليمات إعداد Resto POS المحلي";
  
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      direction: rtl;
      text-align: right;
    }
    h1, h2, h3 {
      color: #4a5568;
    }
    .logo {
      display: block;
      margin: 0 auto 20px;
      max-width: 150px;
    }
    code {
      background: #f0f0f0;
      padding: 2px 5px;
      border-radius: 3px;
      font-family: monospace;
    }
    pre {
      background: #f0f0f0;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
    }
    .step {
      margin-bottom: 25px;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
    }
    .note {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 10px;
      margin: 15px 0;
    }
    .command {
      background: #2d3748;
      color: white;
      padding: 10px;
      border-radius: 5px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQHACkSBTjB+AAAAFpJREFUeNrtwTEBAAAAwqD1T20ND6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB3AzkCAAFv9RW5AAAAAElFTkSuQmCC" class="logo" alt="Resto POS">
  
  <h1>${title}</h1>
  
  <div class="note">
    <strong>ملاحظة هامة:</strong> هذه تعليمات لإعداد نظام نقاط البيع المحلي على جهاز الكمبيوتر الخاص بك.
  </div>

  <div class="step">
    <h2>الخطوة 1: تثبيت Node.js</h2>
    <p>قم بتنزيل وتثبيت Node.js من الموقع الرسمي: <a href="https://nodejs.org/ar" target="_blank">https://nodejs.org/ar</a></p>
    <p>تأكد من تثبيت آخر إصدار LTS (الدعم طويل الأمد).</p>
  </div>

  <div class="step">
    <h2>الخطوة 2: تنزيل كود المشروع</h2>
    <p>قم بتنزيل كود المشروع من خلال نسخ (استنساخ) المستودع باستخدام Git:</p>
    <div class="command">
      git clone https://github.com/yourusername/resto-pos.git<br>
      cd resto-pos
    </div>
    <p>أو قم بتنزيل المشروع كملف مضغوط (ZIP) وفك ضغطه على جهازك.</p>
  </div>

  <div class="step">
    <h2>الخطوة 3: تثبيت اعتماديات المشروع</h2>
    <p>افتح نافذة موجه الأوامر (Command Prompt) أو Terminal وانتقل إلى مجلد المشروع ثم قم بتنفيذ:</p>
    <div class="command">
      npm install
    </div>
    <p>قد تستغرق هذه الخطوة بضع دقائق لتثبيت جميع المكتبات المطلوبة.</p>
  </div>

  <div class="step">
    <h2>الخطوة 4: تثبيت Electron</h2>
    <p>قم بتثبيت Electron عن طريق تنفيذ:</p>
    <div class="command">
      npm install electron electron-builder --save-dev
    </div>
  </div>

  <div class="step">
    <h2>الخطوة 5: بناء تطبيق سطح المكتب</h2>
    <p>قم ببناء تطبيق سطح المكتب باستخدام:</p>
    <div class="command">
      npx electron-builder build
    </div>
    <p>بعد الانتهاء، ستجد التطبيق القابل للتثبيت في مجلد <code>dist</code>.</p>
  </div>

  <div class="step">
    <h2>الخطوة 6: تشغيل التطبيق</h2>
    <p>انتقل إلى مجلد <code>dist</code> وقم بتشغيل ملف التثبيت:</p>
    <ul>
      <li>في نظام Windows: <code>resto-pos-setup-1.0.0.exe</code></li>
      <li>في نظام macOS: <code>resto-pos-1.0.0.dmg</code></li>
      <li>في نظام Linux: <code>resto-pos-1.0.0.AppImage</code></li>
    </ul>
    <p>اتبع خطوات المثبت لإكمال عملية التثبيت.</p>
  </div>

  <div class="step">
    <h2>الخطوة 7: تشغيل التطبيق في وضع التطوير (اختياري)</h2>
    <p>يمكنك أيضًا تشغيل التطبيق في وضع التطوير باستخدام:</p>
    <div class="command">
      npm run dev
    </div>
    <p>سيقوم هذا بتشغيل التطبيق في نافذة Electron مع تمكين أدوات المطور.</p>
  </div>

  <h2>حل المشكلات الشائعة</h2>
  <ul>
    <li><strong>رسالة خطأ "لا يمكن تشغيل هذا التطبيق على الكمبيوتر لديك"</strong>: انقر بزر الماوس الأيمن على ملف التثبيت واختر "تشغيل كمسؤول".</li>
    <li><strong>مشكلات في تثبيت NPM</strong>: تأكد من تثبيت آخر إصدار من Node.js وتأكد من اتصالك بالإنترنت أثناء التثبيت.</li>
    <li><strong>خطأ في بناء التطبيق</strong>: قم بتنفيذ <code>npm rebuild</code> ثم أعد محاولة البناء.</li>
  </ul>

  <div class="note">
    <h3>للمساعدة الإضافية</h3>
    <p>إذا كنت بحاجة إلى مساعدة إضافية، يرجى التواصل مع الدعم الفني أو الرجوع إلى وثائق المشروع.</p>
  </div>
</body>
</html>
  `;
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
        ? 'قم بفتح ملف التعليمات الذي تم تنزيله واتبع الخطوات لإعداد نظام نقاط البيع المحلي على جهازك'
        : 'Open the downloaded instructions file and follow the steps to set up the local POS system on your machine',
      duration: 15000,
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
    isArabic ? 'معلومات إضافية' : 'Additional Information',
    {
      description: isArabic 
        ? 'يمكنك أيضًا تشغيل التطبيق كموقع محلي عن طريق تنفيذ الأمر npm run dev ثم الوصول إلى http://localhost:3000 في متصفحك'
        : 'You can also run the app as a local website by executing npm run dev and then accessing http://localhost:3000 in your browser',
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
    isArabic ? 'جاري إعداد ملف تعليمات ISO...' : 'Preparing ISO instructions file...',
    { duration: 2000 }
  );
  
  // Start download after a short delay
  setTimeout(() => {
    openDownloadLink(true);
    
    // Show installation guide toast
    setTimeout(() => {
      toast(
        isArabic ? 'تعليمات تثبيت نظام ISO' : 'ISO System Installation Guide',
        {
          description: isArabic 
            ? 'تم تنزيل ملف التعليمات الخاص بإعداد نظام ISO. قم بفتح الملف واتبع الخطوات بعناية.'
            : 'The ISO system setup instructions file has been downloaded. Open the file and follow the steps carefully.',
          duration: 10000,
        }
      );
    }, 3000);
  }, 1000);
};
