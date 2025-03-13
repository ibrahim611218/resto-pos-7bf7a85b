
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
          </div>
          
          <script>
            document.getElementById('downloadButton').addEventListener('click', function() {
              // Show the download progress area
              document.getElementById('downloadProgress').style.display = 'block';
              document.getElementById('downloadButton').disabled = true;
              
              // Create a dummy file to download
              // In a real app, this would be a link to your actual installer
              let progress = 0;
              const progressBar = document.getElementById('progressBar');
              const statusText = document.getElementById('downloadStatus');
              const downloadInterval = setInterval(function() {
                progress += 5;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                  clearInterval(downloadInterval);
                  statusText.textContent = '${isArabic ? "اكتمل التنزيل!" : "Download complete!"}';
                  
                  // Create a sample file for download
                  setTimeout(function() {
                    const a = document.createElement('a');
                    const content = '${isArabic ? "هذا ملف تجريبي للتنزيل. في الإصدار الفعلي، هذا سيكون الملف التنفيذي الحقيقي للتطبيق." : "This is a sample download file. In the actual release, this would be the real executable file."}';
                    const file = new Blob([content], {type: 'text/plain'});
                    a.href = URL.createObjectURL(file);
                    a.download = 'resto-pos-setup.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    
                    statusText.textContent = '${isArabic ? "تم تنزيل الملف. في الإصدار الفعلي، سيكون هذا ملف تنفيذي. يرجى المتابعة مع خطوات التثبيت." : "File downloaded. In the actual release, this would be an executable file. Please proceed with installation steps."}';
                  }, 500);
                } else {
                  statusText.textContent = '${isArabic ? "جاري التنزيل" : "Downloading"} ' + progress + '%';
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
