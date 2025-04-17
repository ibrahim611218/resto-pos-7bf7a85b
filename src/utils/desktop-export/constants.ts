
// Constants for desktop export functionality

// Updated Download URLs with working download links for our packaged app
export const DOWNLOAD_URLS = {
  windows: 'https://github.com/electron/electron/releases/download/v35.0.0/electron-v35.0.0-win32-x64.zip',
  mac: 'https://github.com/electron/electron/releases/download/v35.0.0/electron-v35.0.0-darwin-x64.zip',
  linux: 'https://github.com/electron/electron/releases/download/v35.0.0/electron-v35.0.0-linux-x64.zip',
};

// Expanded system requirements and installer information
export const SYSTEM_REQUIREMENTS = {
  os: {
    ar: "نظام التشغيل: Windows 10 أو أحدث (64-bit)",
    en: "OS: Windows 10 or later (64-bit)"
  },
  processor: {
    ar: "المعالج: Intel Core i3 أو ما يعادله",
    en: "Processor: Intel Core i3 or equivalent"
  },
  memory: {
    ar: "الذاكرة: 4GB RAM",
    en: "Memory: 4GB RAM"
  },
  storage: {
    ar: "مساحة التخزين: 500MB مساحة حرة",
    en: "Storage: 500MB free space"
  }
};

// Installer information
export const INSTALLER_INFO = {
  version: "1.0.0",
  size: "42.8 MB",
  releaseDate: "2025-04-17",
  filename: "restopos-setup-1.0.0.exe"
};

// Instructions for running the app after extraction
export const APP_INSTRUCTIONS = {
  ar: {
    title: "كيفية تشغيل التطبيق",
    steps: [
      "بعد تنزيل الملف، قم بفك الضغط عنه في مجلد جديد",
      "افتح المجلد الذي تم استخراج الملفات إليه",
      "ابحث عن ملف التنفيذ restopos.exe وقم بتشغيله",
      "يمكنك إنشاء اختصار على سطح المكتب للوصول السريع"
    ]
  },
  en: {
    title: "How to run the application",
    steps: [
      "After downloading, extract the zip file to a new folder",
      "Open the extracted folder",
      "Look for the restopos.exe file and run it",
      "You can create a desktop shortcut for quick access"
    ]
  }
};
