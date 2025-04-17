
/**
 * Creates the download section of the template body
 * @param isArabic Whether the language is Arabic
 * @param downloadUrl URL to download the installer
 * @param filename Installer file name
 * @returns HTML string for the download section
 */
export const generateDownloadSection = (isArabic: boolean, downloadUrl: string, filename: string): string => {
  return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQHACkSBTjB+AAAAFpJREFUeNrtwTEBAAAAwqD1T20ND6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB3AzkCAAFv9RW5AAAAAElFTkSuQmCC" alt="Resto POS Logo" class="logo">
    
    <h1>${isArabic ? 'تحميل برنامج Resto POS' : 'Download Resto POS'}</h1>
    
    <p style="text-align: center;">${isArabic ? 'التنزيل سيبدأ تلقائياً. إذا لم يبدأ، اضغط على زر التحميل أدناه:' : 'Your download will start automatically. If not, please click the download button below:'}</p>
    
    <a href="${downloadUrl}" class="download-btn" id="download-link" download="${filename}">
      ${isArabic ? 'تحميل Resto POS' : 'Download Resto POS'}
    </a>

    <div class="progress">
      <div class="progress-bar" id="progress-bar">
        <div class="progress-text" id="progress-text">0%</div>
      </div>
    </div>`;
};
