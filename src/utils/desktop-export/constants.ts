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
      "بعد تنزيل الملف، انقر مرتين على restopos-setup-1.0.0.exe لبدء عملية التثبيت",
      "اتبع تعليمات المثبت واقبل أي طلبات لصلاحيات المسؤول إذا لزم الأمر",
      "حدد مجلد التثبيت واكمل عملية التثبيت",
      "بعد الانتهاء، سيتم إنشاء اختصار على سطح المكتب. انقر عليه لتشغيل التطبيق"
    ]
  },
  en: {
    title: "How to install and run the application",
    steps: [
      "After downloading, double-click restopos-setup-1.0.0.exe to start the installation",
      "Follow the installer instructions and accept any administrator permission requests if needed",
      "Select the installation folder and complete the installation process",
      "After finishing, a desktop shortcut will be created. Click it to run the application"
    ]
  }
};
