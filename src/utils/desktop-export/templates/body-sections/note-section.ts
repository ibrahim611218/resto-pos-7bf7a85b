
/**
 * Creates the important note section
 * @param isArabic Whether the language is Arabic
 * @returns HTML string for the note section
 */
export const generateNoteSection = (isArabic: boolean): string => {
  return `<div class="note">
      <p><strong>${isArabic ? 'ملاحظة هامة:' : 'Important Note:'}</strong> ${isArabic ? 'بعد اكتمال التنزيل، ستحتاج إلى تشغيل ملف التثبيت يدوياً من مجلد التنزيلات الخاص بك.' : 'After the download completes, you will need to manually run the installer file from your downloads folder.'}</p>
    </div>`;
};
