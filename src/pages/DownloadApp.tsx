import React from "react";

const DownloadApp: React.FC = () => {
  React.useEffect(() => {
    document.title = "تحميل البرنامج | RestoPOS";
  }, []);

  return (
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold text-foreground">تحميل البرنامج (نسخة سطح المكتب)</h1>
        <p className="text-sm text-muted-foreground mt-1">
          شغّل النظام بدون إنترنت واحفظ البيانات محليًا على الكمبيوتر باستخدام نسخة سطح المكتب.
        </p>
      </header>

      <main className="space-y-6">
        <section className="rounded-lg border p-4 bg-card text-card-foreground">
          <h2 className="text-lg font-medium mb-2">الخيار الموصى به</h2>
          <p className="text-sm text-muted-foreground mb-3">
            سنجهز لك حزمة تثبيت جاهزة للويندوز/ماك. حتى ذلك الحين، يمكنك إنشاء النسخة لديك محليًا باتباع الخطوات أدناه.
          </p>
          <div className="flex gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 opacity-70 cursor-not-allowed"
              aria-disabled
            >
              تحميل الحزمة (قريبًا)
            </a>
          </div>
        </section>

        <section className="rounded-lg border p-4 bg-card text-card-foreground">
          <h2 className="text-lg font-medium mb-2">إنشاء نسخة سطح المكتب محليًا (Electron)</h2>
          <ol className="list-decimal mr-6 space-y-2 text-sm text-muted-foreground">
            <li>انقل المشروع إلى مستودعك في Github عبر "Export to Github".</li>
            <li>على جهازك: git clone ثم npm install.</li>
            <li>بناء الواجهة: npm run build.</li>
            <li>تعبئة نسخة سطح المكتب: استخدم electron-builder لإنشاء مُثبّت لأنظمتك.</li>
            <li>التشغيل سيكون دون إنترنت، وستُحفظ البيانات محليًا (localStorage/SQLite بحسب الإعداد).</li>
          </ol>
        </section>

        <aside className="rounded-lg border p-4 bg-muted text-muted-foreground">
          ملاحظة: لإخفاء شارة "Edit with Lovable" أسفل الشاشة، افتح إعدادات المشروع ثم فعّل خيار "Hide 'Lovable' Badge".
        </aside>
      </main>
    </div>
  );
};

export default DownloadApp;
