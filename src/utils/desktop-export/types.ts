
/**
 * System requirements data structure
 */
export interface SystemRequirements {
  os: {
    ar: string;
    en: string;
  };
  processor: {
    ar: string;
    en: string;
  };
  memory: {
    ar: string;
    en: string;
  };
  storage: {
    ar: string;
    en: string;
  };
}

/**
 * Installer information data structure
 */
export interface InstallerInfo {
  version: string;
  size: string;
  releaseDate: string;
  filename: string;
}

/**
 * App installation instructions data structure
 */
export interface AppInstructions {
  ar: {
    title: string;
    steps: string[];
  };
  en: {
    title: string;
    steps: string[];
  };
}

/**
 * Download URLs for different platforms
 */
export interface DownloadUrls {
  windows: string;
  mac: string;
  linux: string;
}
