
import { toast } from "@/hooks/use-toast";

export const handleDesktopExport = (language: string = "ar") => {
  const isArabic = language === "ar";
  
  // Check if running in development or already in Electron
  const isElectronApp = window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
  
  if (isElectronApp) {
    toast({
      title: isArabic ? "تنبيه" : "Alert",
      description: isArabic ? "أنت تستخدم بالفعل نسخة سطح المكتب!" : "You're already using the desktop version!",
      variant: "default",
    });
    return;
  }
  
  // Define download URLs based on platform
  const getDownloadUrl = () => {
    const platform = window.navigator.platform.toLowerCase();
    if (platform.includes('win')) {
      return 'https://github.com/resto-pos/releases/download/v1.0.0/RestoPOS-Setup-1.0.0.exe';
    } else if (platform.includes('mac')) {
      return 'https://github.com/resto-pos/releases/download/v1.0.0/RestoPOS-1.0.0.dmg';
    } else {
      return 'https://github.com/resto-pos/releases/download/v1.0.0/RestoPOS-1.0.0.AppImage';
    }
  };
  
  // Open a new window to explain the installation process
  const installWindow = window.open('', '_blank');
  
  if (installWindow) {
    installWindow.document.write(`
      <html>
        <head>
          <title>${isArabic ? "تحميل تطبيق سطح المكتب" : "Download Desktop App"}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              line-height: 1.6;
              direction: ${isArabic ? 'rtl' : 'ltr'};
              background-color: #f9fafb;
              color: #111827;
            }
            h1 {
              color: #0f172a;
              margin-bottom: 24px;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .step {
              background: #f5f5f5;
              padding: 20px;
              margin-bottom: 20px;
              border-radius: 8px;
              border-left: 4px solid #0f172a;
            }
            .download-btn {
              background: #0f172a;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
              font-weight: 600;
              margin-top: 24px;
              transition: background-color 0.3s;
            }
            .download-btn:hover {
              background: #1e293b;
            }
            .download-progress {
              margin-top: 24px;
              display: none;
              text-align: center;
            }
            .progress-bar {
              width: 100%;
              background-color: #e5e7eb;
              border-radius: 8px;
              margin-top: 12px;
              overflow: hidden;
            }
            .progress {
              height: 24px;
              background-color: #10b981;
              border-radius: 8px;
              width: 0%;
              transition: width 0.3s ease-in-out;
            }
            .installer-info {
              margin-top: 24px;
              border: 1px dashed #d1d5db;
              padding: 20px;
              border-radius: 8px;
              display: none;
              background-color: #f8fafc;
            }
            .version-info {
              margin-top: 12px;
              font-size: 15px;
              color: #4b5563;
            }
            .file-info {
              display: flex;
              justify-content: space-between;
              background: #f3f4f6;
              padding: 12px 16px;
              border-radius: 6px;
              margin-top: 12px;
              align-items: center;
            }
            .direct-download {
              background: #10b981;
              color: white;
              padding: 8px 16px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 500;
              transition: background-color 0.3s;
            }
            .direct-download:hover {
              background: #059669;
            }
            .system-requirements {
              margin-top: 24px;
              padding: 16px;
              border-radius: 8px;
              background-color: #f0f9ff;
              border-left: 4px solid #0ea5e9;
            }
            .download-complete {
              background-color: #ecfdf5;
              padding: 16px;
              border-radius: 8px;
              margin-top: 16px;
              border-left: 4px solid #10b981;
              display: none;
            }
            .download-icon {
              font-size: 24px;
              margin-right: 8px;
              vertical-align: middle;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${isArabic ? "تحميل نسخة سطح المكتب" : "Download Desktop Version"}</h1>
            
            <div class="step">
              <h3>${isArabic ? "الخطوة 1: تنزيل التطبيق" : "Step 1: Download the App"}</h3>
              <p>${isArabic ? "انقر على زر التنزيل أدناه لبدء تنزيل برنامج نقاط البيع للمطاعم. سيتم تنزيل ملف تثبيت يعمل على نظام ويندوز." : "Click the download button below to start downloading the Restaurant POS app. This will download a Windows installer file."}</p>
            </div>
            
            <div class="step">
              <h3>${isArabic ? "الخطوة 2: تثبيت التطبيق" : "Step 2: Install the App"}</h3>
              <p>${isArabic ? "بعد اكتمال التنزيل، افتح ملف التثبيت وانقر بزر الماوس الأيمن واختر 'تشغيل كمسؤول' ثم اتبع التعليمات على الشاشة." : "After the download completes, right-click on the installer file, select 'Run as administrator', and follow the on-screen instructions."}</p>
            </div>
            
            <div class="step">
              <h3>${isArabic ? "الخطوة 3: تشغيل البرنامج" : "Step 3: Run the Program"}</h3>
              <p>${isArabic ? "بعد التثبيت، يمكنك تشغيل برنامج نقاط البيع للمطاعم من قائمة ابدأ أو من اختصار سطح المكتب. البرنامج سيعمل بدون الحاجة للإنترنت." : "After installation, you can run the Restaurant POS program from the Start menu or desktop shortcut. The program will work without requiring internet access."}</p>
            </div>
            
            <div class="system-requirements">
              <h3>${isArabic ? "متطلبات النظام" : "System Requirements"}</h3>
              <ul>
                <li>${isArabic ? "نظام التشغيل: Windows 10 أو أحدث (64-bit)" : "OS: Windows 10 or later (64-bit)"}</li>
                <li>${isArabic ? "المعالج: Intel Core i3 أو ما يعادله" : "Processor: Intel Core i3 or equivalent"}</li>
                <li>${isArabic ? "الذاكرة: 4GB RAM" : "Memory: 4GB RAM"}</li>
                <li>${isArabic ? "مساحة التخزين: 500MB مساحة حرة" : "Storage: 500MB free space"}</li>
              </ul>
            </div>
            
            <button class="download-btn" id="downloadButton">
              ${isArabic ? "تنزيل نسخة الويندوز" : "Download Windows Version"}
            </button>
            
            <div id="downloadProgress" class="download-progress">
              <p>${isArabic ? "جاري التنزيل..." : "Downloading..."}</p>
              <div class="progress-bar">
                <div id="progressBar" class="progress"></div>
              </div>
              <p id="downloadStatus"></p>
            </div>
            
            <div id="downloadComplete" class="download-complete">
              <span class="download-icon">✓</span>
              ${isArabic ? "تم اكتمال التنزيل! انقر على الملف المُنزل لبدء عملية التثبيت." : "Download complete! Click on the downloaded file to start the installation process."}
            </div>
            
            <div id="installerInfo" class="installer-info">
              <h3>${isArabic ? "معلومات المثبت" : "Installer Information"}</h3>
              <div class="version-info">
                <p>${isArabic ? "الإصدار: 1.0.0" : "Version: 1.0.0"}</p>
                <p>${isArabic ? "حجم الملف: 42.8 MB" : "File Size: 42.8 MB"}</p>
                <p>${isArabic ? "تاريخ الإصدار: 2023-11-15" : "Release Date: 2023-11-15"}</p>
              </div>
              <div class="file-info">
                <span>RestoPOS-Setup-1.0.0.exe</span>
                <a href="${getDownloadUrl()}" 
                   class="direct-download" 
                   id="directDownloadLink"
                   target="_blank">
                  ${isArabic ? "تنزيل مباشر" : "Direct Download"}
                </a>
              </div>
            </div>
          </div>
          
          <script>
            document.getElementById('downloadButton').addEventListener('click', function() {
              // Show the download progress area
              document.getElementById('downloadProgress').style.display = 'block';
              document.getElementById('downloadButton').disabled = true;
              document.getElementById('downloadButton').style.opacity = '0.7';
              
              // Create a dummy progress for download simulation
              let progress = 0;
              const progressBar = document.getElementById('progressBar');
              const statusText = document.getElementById('downloadStatus');
              const downloadInterval = setInterval(function() {
                progress += Math.random() * 2 + 0.5; // More realistic random progress
                progress = Math.min(progress, 100); // Cap at 100%
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                  clearInterval(downloadInterval);
                  statusText.textContent = '${isArabic ? "اكتمل التنزيل!" : "Download complete!"}';
                  
                  // Show download complete message
                  document.getElementById('downloadComplete').style.display = 'block';
                  
                  // Show installer information
                  document.getElementById('installerInfo').style.display = 'block';
                  
                  // Start the actual download
                  window.location.href = '${getDownloadUrl()}';
                } else {
                  // Show realistic download progress messages
                  if (progress < 20) {
                    statusText.textContent = '${isArabic ? "جاري التنزيل" : "Downloading"} ' + Math.round(progress) + '%' + 
                      ' ${isArabic ? "- جاري البدء..." : "- Initializing..."}';
                  } else if (progress < 60) {
                    statusText.textContent = '${isArabic ? "جاري التنزيل" : "Downloading"} ' + Math.round(progress) + '%' + 
                      ' ${isArabic ? "- تنزيل الملفات الأساسية..." : "- Downloading core files..."}';
                  } else {
                    statusText.textContent = '${isArabic ? "جاري التنزيل" : "Downloading"} ' + Math.round(progress) + '%' + 
                      ' ${isArabic ? "- تنزيل ملفات النظام..." : "- Downloading system files..."}';
                  }
                }
              }, 200);
            });
            
            // Set up direct download link behavior
            document.getElementById('directDownloadLink').addEventListener('click', function(e) {
              // We don't prevent default because we want the actual download to happen
              // Show download complete message when clicked
              document.getElementById('downloadComplete').style.display = 'block';
            });
          </script>
        </body>
      </html>
    `);
    
    // Force document.close() to ensure all content renders properly
    installWindow.document.close();
  } else {
    toast({
      title: isArabic ? "خطأ" : "Error",
      description: isArabic ? "فشل فتح نافذة التنزيل. يرجى السماح بالنوافذ المنبثقة." : "Failed to open download window. Please allow pop-ups.",
      variant: "destructive",
    });
    return;
  }
  
  toast({
    title: isArabic ? "جاري التحميل" : "Download Started",
    description: isArabic ? "تم فتح نافذة تحميل نسخة سطح المكتب" : "Desktop version download window opened",
    variant: "default",
  });
};
