
import { generateHeadTemplate } from './head-template';
import { generateDownloadSection } from './body-sections/download-section';
import { generateFileInfoSection } from './body-sections/file-info-section';
import { generateInstructionsSection } from './body-sections/instructions-section';
import { generateRequirementsSection } from './body-sections/requirements-section';
import { generateNoteSection } from './body-sections/note-section';
import { generateScriptSection } from './scripts';
import { SYSTEM_REQUIREMENTS, INSTALLER_INFO, APP_INSTRUCTIONS } from '../constants';
import { AppInstructions, InstallerInfo, SystemRequirements } from '../types';

/**
 * Generates the complete HTML template for the download page
 * @param language The language code (ar or en)
 * @param downloadUrl The URL for downloading the desktop application
 * @returns HTML string for the download page
 */
export const generateDownloadPageTemplate = (language: string, downloadUrl: string): string => {
  const isArabic = language === "ar";
  const instructions = isArabic ? APP_INSTRUCTIONS.ar : APP_INSTRUCTIONS.en;
  
  // Construct the full HTML template
  return `<!DOCTYPE html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
${generateHeadTemplate(isArabic)}
<body>
  <div class="container">
    ${generateDownloadSection(isArabic, downloadUrl, INSTALLER_INFO.filename)}
    
    ${generateFileInfoSection(isArabic, INSTALLER_INFO)}
    
    ${generateInstructionsSection(instructions)}
    
    ${generateRequirementsSection(isArabic, SYSTEM_REQUIREMENTS)}
    
    ${generateNoteSection(isArabic)}
  </div>

  ${generateScriptSection(isArabic)}
</body>
</html>`;
};

// Re-export for backward compatibility with existing code
export * from './head-template';
export * from './body-sections/download-section';
export * from './body-sections/file-info-section';
export * from './body-sections/instructions-section';
export * from './body-sections/requirements-section';
export * from './body-sections/note-section';
export * from './scripts';
