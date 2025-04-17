
import { InstallerInfo } from '../../types';

/**
 * Creates the file information section
 * @param isArabic Whether the language is Arabic
 * @param installerInfo Information about the installer file
 * @returns HTML string for the file information section
 */
export const generateFileInfoSection = (isArabic: boolean, installerInfo: InstallerInfo): string => {
  return `<div class="file-info">
      <div>${isArabic ? 'الإصدار:' : 'Version:'} ${installerInfo.version}</div>
      <div>${isArabic ? 'حجم الملف:' : 'File Size:'} ${installerInfo.size}</div>
      <div>${isArabic ? 'تاريخ الإصدار:' : 'Release Date:'} ${installerInfo.releaseDate}</div>
      <div>${isArabic ? 'اسم الملف:' : 'Filename:'} ${installerInfo.filename}</div>
    </div>`;
};
