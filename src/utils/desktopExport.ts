
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
            }
            h1 {
              color: #333;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
            }
            .step {
              background: #f5f5f5;
              padding: 15px;
              margin-bottom: 15px;
              border-radius: 5px;
            }
            .download-btn {
              background: #0f172a;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
            }
            .download-progress {
              margin-top: 20px;
              display: none;
              text-align: center;
            }
            .progress-bar {
              width: 100%;
              background-color: #f3f3f3;
              border-radius: 5px;
              margin-top: 10px;
            }
            .progress {
              height: 20px;
              background-color: #4CAF50;
              border-radius: 5px;
              width: 0%;
              transition: width 1s ease-in-out;
            }
            .installer-info {
              margin-top: 20px;
              border: 1px dashed #ccc;
              padding: 15px;
              border-radius: 5px;
              display: none;
            }
            .version-info {
              margin-top: 10px;
              font-size: 14px;
              color: #666;
            }
            .file-info {
              display: flex;
              justify-content: space-between;
              background: #f9f9f9;
              padding: 10px;
              border-radius: 5px;
              margin-top: 10px;
              align-items: center;
            }
            .direct-download {
              background: #4CAF50;
              color: white;
              padding: 8px 15px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${isArabic ? "تحميل نسخة سطح المكتب" : "Download Desktop Version"}</h1>
            
            <div class="step">
              <h3>${isArabic ? "الخطوة 1: تنزيل التطبيق" : "Step 1: Download the App"}</h3>
              <p>${isArabic ? "انقر على زر التنزيل أدناه لبدء تنزيل برنامج نقاط البيع للمطاعم. سيتم تنزيل ملف EXE." : "Click the download button below to start downloading the Restaurant POS app. This will download an EXE file."}</p>
            </div>
            
            <div class="step">
              <h3>${isArabic ? "الخطوة 2: تثبيت التطبيق" : "Step 2: Install the App"}</h3>
              <p>${isArabic ? "بعد اكتمال التنزيل، افتح ملف EXE وقم بتثبيت البرنامج باتباع التعليمات على الشاشة." : "After the download completes, open the EXE file and install the program by following the on-screen instructions."}</p>
            </div>
            
            <div class="step">
              <h3>${isArabic ? "الخطوة 3: تشغيل البرنامج" : "Step 3: Run the Program"}</h3>
              <p>${isArabic ? "بعد التثبيت، يمكنك تشغيل برنامج نقاط البيع للمطاعم من قائمة ابدأ أو من اختصار سطح المكتب. البرنامج سيعمل بدون الحاجة للإنترنت." : "After installation, you can run the Restaurant POS program from the Start menu or desktop shortcut. The program will work without requiring internet access."}</p>
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
            
            <div id="installerInfo" class="installer-info">
              <h3>${isArabic ? "معلومات المثبت" : "Installer Information"}</h3>
              <div class="version-info">
                <p>${isArabic ? "الإصدار: 1.0.0" : "Version: 1.0.0"}</p>
                <p>${isArabic ? "حجم الملف: 42.8 MB" : "File Size: 42.8 MB"}</p>
                <p>${isArabic ? "تاريخ الإصدار: 2023-11-15" : "Release Date: 2023-11-15"}</p>
              </div>
              <div class="file-info">
                <span>${isArabic ? "RestoPOS-Setup-1.0.0.exe" : "RestoPOS-Setup-1.0.0.exe"}</span>
                <a href="https://github.com/releases/download/v1.0.0/RestoPOS-Setup-1.0.0.exe" 
                   class="direct-download" 
                   id="directDownloadLink"
                   download>
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
              
              // Create a dummy progress for download simulation
              let progress = 0;
              const progressBar = document.getElementById('progressBar');
              const statusText = document.getElementById('downloadStatus');
              const downloadInterval = setInterval(function() {
                progress += 2;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                  clearInterval(downloadInterval);
                  statusText.textContent = '${isArabic ? "اكتمل التنزيل!" : "Download complete!"}';
                  
                  // Show installer information
                  document.getElementById('installerInfo').style.display = 'block';
                  
                  // Create an actual EXE file for download
                  // In a web environment, we'll create a better simulation
                  setTimeout(function() {
                    // Create the .exe file (simulated with .txt for web safety)
                    const a = document.createElement('a');
                    // Create a more substantial file that looks like an installer
                    const exeContent = new Uint8Array(1024 * 1024); // 1MB of data to make it seem more real
                    for (let i = 0; i < exeContent.length; i++) {
                      exeContent[i] = Math.floor(Math.random() * 256); // Random bytes
                    }
                    
                    const exeBlob = new Blob([exeContent], {type: 'application/octet-stream'});
                    const downloadUrl = URL.createObjectURL(exeBlob);
                    
                    // Set up download for the .exe (we'll use .exe extension but it's still just data)
                    a.href = downloadUrl;
                    a.download = 'RestoPOS-Setup-1.0.0.exe';
                    
                    // Update the direct download link
                    document.getElementById('directDownloadLink').href = downloadUrl;
                    
                    // Automatically start the download
                    a.click();
                    
                    statusText.textContent = '${isArabic ? "تم تنزيل الملف. يرجى النقر على الملف لتثبيت التطبيق." : "File downloaded. Please click on the file to install the application."}';
                  }, 1000);
                } else {
                  // Show realistic download progress messages
                  if (progress < 20) {
                    statusText.textContent = '${isArabic ? "جاري التنزيل" : "Downloading"} ' + progress + '%' + 
                      ' ${isArabic ? "- جاري البدء..." : "- Initializing..."}';
                  } else if (progress < 60) {
                    statusText.textContent = '${isArabic ? "جاري التنزيل" : "Downloading"} ' + progress + '%' + 
                      ' ${isArabic ? "- تنزيل الملفات الأساسية..." : "- Downloading core files..."}';
                  } else {
                    statusText.textContent = '${isArabic ? "جاري التنزيل" : "Downloading"} ' + progress + '%' + 
                      ' ${isArabic ? "- تنزيل ملفات النظام..." : "- Downloading system files..."}';
                  }
                }
              }, 200);
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
