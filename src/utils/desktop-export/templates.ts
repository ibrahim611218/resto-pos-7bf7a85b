
import { SYSTEM_REQUIREMENTS, INSTALLER_INFO } from './constants';

/**
 * Generates the HTML template for the download page
 * @param language The language code (ar or en)
 * @param downloadUrl The URL for downloading the desktop application
 * @returns HTML string for the download page
 */
export const generateDownloadPageTemplate = (language: string, downloadUrl: string): string => {
  const isArabic = language === "ar";
  
  return `<!DOCTYPE html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isArabic ? 'تحميل نسخة سطح المكتب' : 'Download Desktop Version'}</title>
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
    h1 {
      color: #2563eb;
      margin-top: 0;
    }
    .download-btn {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 12px 25px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 20px;
      transition: background-color 0.3s;
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
      h1 {
        color: #3b82f6;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${isArabic ? 'تحميل نسخة سطح المكتب' : 'Download Desktop Version'}</h1>
    
    <p>${isArabic ? 'اضغط على زر التحميل أدناه لتنزيل نسخة سطح المكتب من تطبيق Resto POS:' : 'Click the download button below to download the desktop version of Resto POS:'}</p>
    
    <a href="${downloadUrl}" class="download-btn" id="download-link" download>
      ${isArabic ? 'تحميل Resto POS' : 'Download Resto POS'}
    </a>
    
    <div class="file-info">
      <div>${isArabic ? 'الإصدار:' : 'Version:'} ${INSTALLER_INFO.version}</div>
      <div>${isArabic ? 'حجم الملف:' : 'File Size:'} ${INSTALLER_INFO.size}</div>
      <div>${isArabic ? 'تاريخ الإصدار:' : 'Release Date:'} ${INSTALLER_INFO.releaseDate}</div>
      <div>${isArabic ? 'اسم الملف:' : 'Filename:'} ${INSTALLER_INFO.filename}</div>
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
    
    <div class="steps">
      <h3>${isArabic ? 'خطوات التثبيت' : 'Installation Steps'}</h3>
      <ol>
        <li>${isArabic ? 'قم بتنزيل الملف من الزر أعلاه' : 'Download the file using the button above'}</li>
        <li>${isArabic ? 'بعد اكتمال التنزيل، افتح ملف التثبيت' : 'After downloading completes, open the installer file'}</li>
        <li>${isArabic ? 'اتبع تعليمات المثبت لإكمال عملية التثبيت' : 'Follow the installer instructions to complete installation'}</li>
        <li>${isArabic ? 'قم بتشغيل التطبيق من قائمة ابدأ أو سطح المكتب' : 'Launch the application from Start menu or desktop'}</li>
      </ol>
    </div>
    
    <div class="note">
      <p><strong>${isArabic ? 'ملاحظة:' : 'Note:'}</strong> ${isArabic ? 'قد يتم تعطيل التنزيل بواسطة برامج مكافحة الفيروسات أو مانع الإعلانات. إذا واجهت مشكلة، قم بتعطيل هذه البرامج مؤقتًا أو أضف هذا الموقع إلى قائمة الاستثناءات.' : 'The download might be blocked by antivirus or ad blockers. If you experience issues, temporarily disable these programs or add this site to their exceptions list.'}</p>
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
        }
      }, 800);
    });
  </script>
</body>
</html>`;
};
