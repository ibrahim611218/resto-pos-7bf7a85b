
// Constants for desktop export functionality

// Download URLs by platform - Update these URLs with your actual download links
export const DOWNLOAD_URLS = {
  windows: 'https://github.com/electron/electron/releases/download/v28.1.0/electron-v28.1.0-win32-x64.zip',
  mac: 'https://github.com/electron/electron/releases/download/v28.1.0/electron-v28.1.0-darwin-x64.zip',
  linux: 'https://github.com/electron/electron/releases/download/v28.1.0/electron-v28.1.0-linux-x64.zip',
};

// System requirements
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
  releaseDate: "2023-11-15",
  filename: "RestoPOS-Setup-1.0.0.exe"
};
