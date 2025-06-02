
import { Invoice } from "@/types/invoices";
import { Product, Category } from "@/types/products";
import { UserWithPassword } from "@/features/users/types";
import { Company } from "@/features/users/types";
import { BusinessSettings } from "@/types/settings";
import { Customer } from "@/types/customers";
import { PurchaseInvoice } from "@/types/purchases";

export interface BackupData {
  version: string;
  timestamp: string;
  data: {
    products: Product[];
    categories: Category[];
    invoices: Invoice[];
    users: UserWithPassword[];
    companies: Company[];
    customers: Customer[];
    purchases: PurchaseInvoice[];
    settings: BusinessSettings;
  };
}

class BackupService {
  private readonly BACKUP_VERSION = "1.0.0";

  constructor() {
    // تشغيل النسخ الاحتياطي التلقائي عند بدء تشغيل الخدمة
    this.setupAutoBackup();
    this.setupDataProtection();
  }

  async createBackup(): Promise<BackupData> {
    try {
      console.log("إنشاء نسخة احتياطية من البيانات...");

      // جمع جميع البيانات من localStorage
      const products = JSON.parse(localStorage.getItem('stored-products') || '[]');
      const categories = JSON.parse(localStorage.getItem('stored-categories') || '[]');
      const invoices = JSON.parse(localStorage.getItem('stored-invoices') || '[]');
      const users = JSON.parse(localStorage.getItem('stored-users') || '[]');
      const companies = JSON.parse(localStorage.getItem('stored-companies') || '[]');
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const purchases = JSON.parse(localStorage.getItem('purchase-invoices') || '[]');
      const settings = JSON.parse(localStorage.getItem('business-settings') || '{}');

      const backupData: BackupData = {
        version: this.BACKUP_VERSION,
        timestamp: new Date().toISOString(),
        data: {
          products,
          categories,
          invoices,
          users,
          companies,
          customers,
          purchases,
          settings
        }
      };

      console.log("تم إنشاء النسخة الاحتياطية بنجاح");
      return backupData;
    } catch (error) {
      console.error("خطأ في إنشاء النسخة الاحتياطية:", error);
      throw new Error("فشل في إنشاء النسخة الاحتياطية");
    }
  }

  async exportBackup(): Promise<void> {
    try {
      const backupData = await this.createBackup();
      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("تم تصدير النسخة الاحتياطية بنجاح");
    } catch (error) {
      console.error("خطأ في تصدير النسخة الاحتياطية:", error);
      throw error;
    }
  }

  async restoreBackup(backupData: BackupData): Promise<void> {
    try {
      console.log("بدء استعادة النسخة الاحتياطية...");

      // التحقق من إصدار النسخة الاحتياطية
      if (!this.isValidBackup(backupData)) {
        throw new Error("النسخة الاحتياطية غير صالحة أو تالفة");
      }

      // إنشاء نسخة احتياطية من البيانات الحالية قبل الاستعادة
      const currentBackup = await this.createBackup();
      localStorage.setItem('last-backup-before-restore', JSON.stringify(currentBackup));

      // استعادة البيانات
      const { data } = backupData;
      
      localStorage.setItem('stored-products', JSON.stringify(data.products));
      localStorage.setItem('stored-categories', JSON.stringify(data.categories));
      localStorage.setItem('stored-invoices', JSON.stringify(data.invoices));
      localStorage.setItem('stored-users', JSON.stringify(data.users));
      localStorage.setItem('stored-companies', JSON.stringify(data.companies));
      localStorage.setItem('customers', JSON.stringify(data.customers));
      localStorage.setItem('purchase-invoices', JSON.stringify(data.purchases));
      localStorage.setItem('business-settings', JSON.stringify(data.settings));

      // إرسال حدث لتحديث البيانات في التطبيق
      window.dispatchEvent(new Event('data-updated'));
      window.dispatchEvent(new Event('backup-restored'));

      console.log("تم استعادة النسخة الاحتياطية بنجاح");
    } catch (error) {
      console.error("خطأ في استعادة النسخة الاحتياطية:", error);
      throw error;
    }
  }

  async importBackup(file: File): Promise<void> {
    try {
      const text = await file.text();
      const backupData: BackupData = JSON.parse(text);
      await this.restoreBackup(backupData);
    } catch (error) {
      console.error("خطأ في استيراد النسخة الاحتياطية:", error);
      throw new Error("فشل في استيراد النسخة الاحتياطية - تأكد من صحة الملف");
    }
  }

  private isValidBackup(backupData: any): backupData is BackupData {
    return (
      backupData &&
      typeof backupData.version === 'string' &&
      typeof backupData.timestamp === 'string' &&
      backupData.data &&
      Array.isArray(backupData.data.products) &&
      Array.isArray(backupData.data.categories) &&
      Array.isArray(backupData.data.invoices) &&
      Array.isArray(backupData.data.users)
    );
  }

  // إنشاء نسخة احتياطية تلقائية
  setupAutoBackup(intervalMinutes: number = 30): void {
    const intervalMs = intervalMinutes * 60 * 1000;
    
    // نسخة احتياطية فورية عند بدء التشغيل
    setTimeout(async () => {
      try {
        const backup = await this.createBackup();
        const backupKey = `auto-backup-startup-${Date.now()}`;
        localStorage.setItem(backupKey, JSON.stringify(backup));
        console.log("تم إنشاء نسخة احتياطية عند بدء التشغيل");
      } catch (error) {
        console.error("خطأ في النسخة الاحتياطية الأولية:", error);
      }
    }, 5000);
    
    setInterval(async () => {
      try {
        const backup = await this.createBackup();
        const backupKey = `auto-backup-${Date.now()}`;
        localStorage.setItem(backupKey, JSON.stringify(backup));
        
        // الاحتفاظ بآخر 10 نسخ احتياطية تلقائية
        this.cleanupAutoBackups(10);
        
        console.log("تم إنشاء نسخة احتياطية تلقائية");
      } catch (error) {
        console.error("خطأ في النسخ الاحتياطي التلقائي:", error);
      }
    }, intervalMs);
  }

  // حماية البيانات من الحذف
  setupDataProtection(): void {
    // نسخة احتياطية قبل إعادة تحميل الصفحة
    window.addEventListener('beforeunload', async () => {
      try {
        const backup = await this.createBackup();
        localStorage.setItem('backup-before-unload', JSON.stringify(backup));
      } catch (error) {
        console.error("خطأ في النسخة الاحتياطية قبل إعادة التحميل:", error);
      }
    });

    // استعادة البيانات عند تحميل الصفحة
    window.addEventListener('load', () => {
      const backupBeforeUnload = localStorage.getItem('backup-before-unload');
      if (backupBeforeUnload) {
        try {
          const backup = JSON.parse(backupBeforeUnload);
          console.log("تم العثور على نسخة احتياطية قبل إعادة التحميل");
          // يمكن استخدامها لاستعادة البيانات إذا لزم الأمر
        } catch (error) {
          console.error("خطأ في قراءة النسخة الاحتياطية:", error);
        }
      }
    });

    // نسخة احتياطية عند تغيير البيانات
    const dataKeys = [
      'stored-products', 'stored-categories', 'stored-invoices',
      'stored-users', 'stored-companies', 'customers', 
      'purchase-invoices', 'business-settings'
    ];

    dataKeys.forEach(key => {
      const originalSetItem = localStorage.setItem.bind(localStorage);
      const backupService = this;
      
      // مراقبة تغييرات البيانات المهمة
      if (key.includes('stored-') || key === 'customers' || key === 'purchase-invoices' || key === 'business-settings') {
        window.addEventListener('storage', (e) => {
          if (e.key === key && e.newValue !== e.oldValue) {
            setTimeout(async () => {
              try {
                const backup = await backupService.createBackup();
                localStorage.setItem(`change-backup-${Date.now()}`, JSON.stringify(backup));
                backupService.cleanupChangeBackups();
              } catch (error) {
                console.error("خطأ في النسخة الاحتياطية عند التغيير:", error);
              }
            }, 1000);
          }
        });
      }
    });
  }

  private cleanupAutoBackups(keepCount: number = 10): void {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith('auto-backup-') || key.startsWith('change-backup-')
    );
    
    if (keys.length > keepCount) {
      // ترتيب المفاتيح حسب التاريخ وحذف الأقدم
      keys.sort((a, b) => {
        const timeA = parseInt(a.split('-').pop() || '0');
        const timeB = parseInt(b.split('-').pop() || '0');
        return timeA - timeB;
      });
      
      const toDelete = keys.slice(0, keys.length - keepCount);
      toDelete.forEach(key => localStorage.removeItem(key));
    }
  }

  private cleanupChangeBackups(): void {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('change-backup-'));
    if (keys.length > 5) {
      keys.sort((a, b) => {
        const timeA = parseInt(a.split('-').pop() || '0');
        const timeB = parseInt(b.split('-').pop() || '0');
        return timeA - timeB;
      });
      
      const toDelete = keys.slice(0, keys.length - 5);
      toDelete.forEach(key => localStorage.removeItem(key));
    }
  }

  getAutoBackups(): BackupData[] {
    const keys = Object.keys(localStorage)
      .filter(key => key.startsWith('auto-backup-') || key.startsWith('change-backup-'))
      .sort((a, b) => {
        const timeA = parseInt(a.split('-').pop() || '0');
        const timeB = parseInt(b.split('-').pop() || '0');
        return timeB - timeA; // الأحدث أولاً
      });

    return keys.map(key => {
      try {
        return JSON.parse(localStorage.getItem(key) || '{}');
      } catch {
        return null;
      }
    }).filter(Boolean);
  }

  // استعادة آخر نسخة احتياطية متاحة
  async restoreLatestBackup(): Promise<boolean> {
    try {
      const backups = this.getAutoBackups();
      if (backups.length > 0) {
        await this.restoreBackup(backups[0]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("خطأ في استعادة آخر نسخة احتياطية:", error);
      return false;
    }
  }
}

const backupService = new BackupService();
export default backupService;
