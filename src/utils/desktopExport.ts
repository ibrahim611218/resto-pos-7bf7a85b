
import { toast } from "@/hooks/use-toast";

export const handleDesktopExport = (language: "en" | "ar" = "ar") => {
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
            
            <button class="download-btn" onclick="window.location.href='/desktop-app-download'">
              ${isArabic ? "تنزيل نسخة الويندوز" : "Download Windows Version"}
            </button>
          </div>
        </body>
      </html>
    `);
  } else {
    toast({
      title: isArabic ? "خطأ" : "Error",
      description: isArabic ? "فشل فتح نافذة التنزيل. يرجى السماح بالنوافذ المنبثقة." : "Failed to open download window. Please allow pop-ups.",
      variant: "destructive",
    });
  }
  
  toast({
    title: isArabic ? "جاري التحميل" : "Download Started",
    description: isArabic ? "تم بدء تحميل نسخة سطح المكتب" : "Desktop version download initiated",
    variant: "default",
  });
};
