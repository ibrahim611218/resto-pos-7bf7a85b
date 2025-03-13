
import { toast } from "@/hooks/use-toast";

type ToastType = {
  title: string;
  description: string;
  variant: "default" | "destructive";
};

/**
 * Shows notification toasts for the desktop export process
 * @param type The type of notification to show
 * @param language The language code (ar or en)
 */
export const showNotification = (
  type: "already-in-desktop" | "download-started" | "popup-blocked",
  language: string = "ar"
): void => {
  const isArabic = language === "ar";
  const notifications: Record<string, ToastType> = {
    "already-in-desktop": {
      title: isArabic ? "تنبيه" : "Alert",
      description: isArabic
        ? "أنت تستخدم بالفعل نسخة سطح المكتب!"
        : "You're already using the desktop version!",
      variant: "default",
    },
    "download-started": {
      title: isArabic ? "جاري التحميل" : "Download Started",
      description: isArabic
        ? "تم فتح نافذة تحميل نسخة سطح المكتب"
        : "Desktop version download window opened",
      variant: "default",
    },
    "popup-blocked": {
      title: isArabic ? "خطأ" : "Error",
      description: isArabic
        ? "فشل فتح نافذة التنزيل. يرجى السماح بالنوافذ المنبثقة."
        : "Failed to open download window. Please allow pop-ups.",
      variant: "destructive",
    },
  };

  const notification = notifications[type];
  toast(notification);
};
