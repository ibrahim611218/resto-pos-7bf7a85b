
// Constants for desktop export functionality

// Updated Download URLs - we'll use direct file downloads from our server
export const DOWNLOAD_URLS = {
  windows: '/downloads/restopos-setup-1.0.0.exe',  // Local file path
  mac: '/downloads/restopos-mac-1.0.0.zip',
  linux: '/downloads/restopos-linux-1.0.0.zip',
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

// Installer information - Updated with proper executable name and size
export const INSTALLER_INFO = {
  version: "1.0.0",
  size: "48.5 MB",
  releaseDate: "2025-04-17",
  filename: "restopos-setup-1.0.0.exe"
};

// Instructions for running the app after installation
export const APP_INSTRUCTIONS = {
  ar: {
    title: "كيفية تثبيت وتشغيل التطبيق",
    steps: [
      "بعد تنزيل الملف، انقر بزر الماوس الأيمن على restopos-setup-1.0.0.exe واختر \"تشغيل كمسؤول\"",
      "إذا ظهرت رسالة \"لا يمكن تشغيل هذا التطبيق على الكمبيوتر لديك\"، انقر على \"مزيد من المعلومات\" ثم \"تشغيل على أي حال\"",
      "اتبع تعليمات المثبت واقبل أي طلبات لصلاحيات المسؤول إذا لزم الأمر",
      "حدد مجلد التثبيت واكمل عملية التثبيت",
      "بعد الانتهاء، سيتم إنشاء اختصار على سطح المكتب. انقر عليه لتشغيل التطبيق"
    ],
    troubleshooting: [
      "قم بتعطيل برنامج مكافحة الفيروسات مؤقتًا أثناء التثبيت",
      "تأكد من تشغيل الملف كمسؤول",
      "تحقق من إعدادات SmartScreen في Windows وقم بالسماح للتطبيق"
    ]
  },
  en: {
    title: "How to install and run the application",
    steps: [
      "After downloading, right-click on restopos-setup-1.0.0.exe and select \"Run as administrator\"",
      "If you see \"This app can't run on your PC\" message, click \"More info\" then \"Run anyway\"",
      "Follow the installer instructions and accept any administrator permission requests if needed",
      "Select the installation folder and complete the installation process",
      "After finishing, a desktop shortcut will be created. Click it to run the application"
    ],
    troubleshooting: [
      "Temporarily disable antivirus during installation",
      "Make sure to run the file as administrator",
      "Check Windows SmartScreen settings and allow the application"
    ]
  }
};

// Error messages for desktop export
export const ERROR_MESSAGES = {
  ar: {
    cannotRun: "لا يمكن تشغيل هذا التطبيق على الكمبيوتر لديك",
    solution: "للعثور على إصدار الكمبيوتر لديك، ارجع إلى ناشر البرامج."
  },
  en: {
    cannotRun: "This app can't run on your PC",
    solution: "To find a version for your PC, check with the software publisher."
  }
};
