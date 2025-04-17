
import { SYSTEM_REQUIREMENTS, INSTALLER_INFO, APP_INSTRUCTIONS } from './constants';

/**
 * Generates the HTML template for the download page
 * @param language The language code (ar or en)
 * @param downloadUrl The URL for downloading the desktop application
 * @returns HTML string for the download page
 */
export const generateDownloadPageTemplate = (language: string, downloadUrl: string): string => {
  const isArabic = language === "ar";
  const instructions = isArabic ? APP_INSTRUCTIONS.ar : APP_INSTRUCTIONS.en;
  
  return `<!DOCTYPE html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isArabic ? 'تحميل نسخة سطح المكتب - Resto POS' : 'Download Desktop Version - Resto POS'}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
      direction: ${isArabic ? 'rtl' : 'ltr'};
      text-align: ${isArabic ? 'right' : 'left'};
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .logo {
      display: block;
      width: 100px;
      height: 100px;
      margin: 0 auto 20px auto;
    }
    h1 {
      color: #2563eb;
      margin-top: 0;
      text-align: center;
    }
    .download-btn {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 12px 25px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px auto;
      transition: background-color 0.3s;
      text-align: center;
      width: 80%;
      max-width: 300px;
      display: block;
    }
    .download-btn:hover {
      background-color: #1d4ed8;
    }
    .requirements {
      background: #f1f5f9;
      padding: 20px;
      border-radius: 5px;
      margin-top: 30px;
    }
    .file-info {
      display: flex;
      justify-content: space-between;
      background: #e2e8f0;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .file-info div {
      margin: 5px 10px;
    }
    .steps {
      margin-top: 30px;
    }
    .steps li {
      margin-bottom: 10px;
    }
    .note {
      background: #fff7ed;
      border-left: 4px solid #f97316;
      padding: 15px;
      margin-top: 30px;
    }
    .instructions {
      background: #e0f2fe;
      padding: 20px;
      border-radius: 5px;
      margin-top: 30px;
    }
    .progress {
      height: 20px;
      width: 100%;
      background: #e2e8f0;
      border-radius: 10px;
      margin-top: 20px;
      overflow: hidden;
      position: relative;
    }
    .progress-bar {
      height: 100%;
      background: #2563eb;
      width: 0%;
      transition: width 0.5s;
      border-radius: 10px;
      position: relative;
    }
    .progress-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
      color: white;
      font-weight: bold;
      text-shadow: 0 0 3px rgba(0,0,0,0.5);
      line-height: 20px;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1a1a1a;
        color: #e0e0e0;
      }
      .container {
        background: #2a2a2a;
      }
      .requirements {
        background: #333;
      }
      .file-info {
        background: #3a3a3a;
      }
      .note {
        background: #3a3000;
        border-left-color: #f97316;
      }
      .instructions {
        background: #0c4a6e;
      }
      h1 {
        color: #3b82f6;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQHACkSBTjB+AAAAFpJREFUeNrtwTEBAAAAwqD1T20ND6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB3AzkCAAFv9RW5AAAAAElFTkSuQmCC" alt="Resto POS Logo" class="logo">
    
    <h1>${isArabic ? 'تحميل برنامج Resto POS' : 'Download Resto POS'}</h1>
    
    <p style="text-align: center;">${isArabic ? 'التنزيل سيبدأ تلقائياً. إذا لم يبدأ، اضغط على زر التحميل أدناه:' : 'Your download will start automatically. If not, please click the download button below:'}</p>
    
    <a href="${downloadUrl}" class="download-btn" id="download-link" download="${INSTALLER_INFO.filename}">
      ${isArabic ? 'تحميل Resto POS' : 'Download Resto POS'}
    </a>

    <div class="progress">
      <div class="progress-bar" id="progress-bar">
        <div class="progress-text" id="progress-text">0%</div>
      </div>
    </div>
    
    <div class="file-info">
      <div>${isArabic ? 'الإصدار:' : 'Version:'} ${INSTALLER_INFO.version}</div>
      <div>${isArabic ? 'حجم الملف:' : 'File Size:'} ${INSTALLER_INFO.size}</div>
      <div>${isArabic ? 'تاريخ الإصدار:' : 'Release Date:'} ${INSTALLER_INFO.releaseDate}</div>
      <div>${isArabic ? 'اسم الملف:' : 'Filename:'} ${INSTALLER_INFO.filename}</div>
    </div>
    
    <div class="instructions">
      <h3>${instructions.title}</h3>
      <ol>
        ${instructions.steps.map(step => `<li>${step}</li>`).join('\n        ')}
      </ol>
    </div>
    
    <div class="requirements">
      <h3>${isArabic ? 'متطلبات النظام' : 'System Requirements'}</h3>
      <ul>
        <li>${isArabic ? SYSTEM_REQUIREMENTS.os.ar : SYSTEM_REQUIREMENTS.os.en}</li>
        <li>${isArabic ? SYSTEM_REQUIREMENTS.processor.ar : SYSTEM_REQUIREMENTS.processor.en}</li>
        <li>${isArabic ? SYSTEM_REQUIREMENTS.memory.ar : SYSTEM_REQUIREMENTS.memory.en}</li>
        <li>${isArabic ? SYSTEM_REQUIREMENTS.storage.ar : SYSTEM_REQUIREMENTS.storage.en}</li>
      </ul>
    </div>
    
    <div class="note">
      <p><strong>${isArabic ? 'ملاحظة هامة:' : 'Important Note:'}</strong> ${isArabic ? 'بعد اكتمال التنزيل، ستحتاج إلى تشغيل ملف التثبيت يدوياً من مجلد التنزيلات الخاص بك.' : 'After the download completes, you will need to manually run the installer file from your downloads folder.'}</p>
    </div>
  </div>

  <script>
    // Auto-download trigger
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        var link = document.getElementById('download-link');
        if (link) {
          link.click();
          console.log('Auto-download triggered');
          simulateProgress();
        }
      }, 800);
    });

    function simulateProgress() {
      var progressBar = document.getElementById('progress-bar');
      var progressText = document.getElementById('progress-text');
      var width = 0;
      var interval = setInterval(function() {
        if (width >= 100) {
          clearInterval(interval);
          progressText.textContent = '${isArabic ? 'اكتمل التنزيل!' : 'Download Complete!'}';
        } else {
          width += Math.random() * 10;
          if (width > 100) width = 100;
          progressBar.style.width = width + '%';
          progressText.textContent = Math.round(width) + '%';
        }
      }, 500);
    }
  </script>
</body>
</html>`;
};
