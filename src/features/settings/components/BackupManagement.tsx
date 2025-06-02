
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Download, 
  Upload, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import backupService from "@/services/backup/BackupService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BackupManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoBackups, setAutoBackups] = useState(backupService.getAutoBackups());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleBackupRestored = () => {
      setAutoBackups(backupService.getAutoBackups());
      toast.success(isArabic ? "تم تحديث قائمة النسخ الاحتياطية" : "Backup list updated");
    };

    window.addEventListener('backup-restored', handleBackupRestored);
    window.addEventListener('data-updated', handleBackupRestored);

    return () => {
      window.removeEventListener('backup-restored', handleBackupRestored);
      window.removeEventListener('data-updated', handleBackupRestored);
    };
  }, [isArabic]);

  const handleExportBackup = async () => {
    try {
      setIsProcessing(true);
      await backupService.exportBackup();
      toast.success(isArabic ? "تم تصدير النسخة الاحتياطية بنجاح" : "Backup exported successfully");
    } catch (error) {
      console.error("Error exporting backup:", error);
      toast.error(isArabic ? "فشل في تصدير النسخة الاحتياطية" : "Failed to export backup");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImportBackup = async (file: File) => {
    try {
      setIsProcessing(true);
      await backupService.importBackup(file);
      toast.success(isArabic ? "تم استيراد النسخة الاحتياطية بنجاح" : "Backup imported successfully");
      
      // تحديث قائمة النسخ الاحتياطية التلقائية
      setAutoBackups(backupService.getAutoBackups());
    } catch (error) {
      console.error("Error importing backup:", error);
      toast.error(isArabic ? "فشل في استيراد النسخة الاحتياطية" : "Failed to import backup");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImportBackup(file);
    }
  };

  const handleRestoreAutoBackup = async (backup: any) => {
    try {
      setIsProcessing(true);
      await backupService.restoreBackup(backup);
      toast.success(isArabic ? "تم استعادة النسخة الاحتياطية بنجاح" : "Backup restored successfully");
      setAutoBackups(backupService.getAutoBackups());
    } catch (error) {
      console.error("Error restoring backup:", error);
      toast.error(isArabic ? "فشل في استعادة النسخة الاحتياطية" : "Failed to restore backup");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestoreLatest = async () => {
    try {
      setIsProcessing(true);
      const success = await backupService.restoreLatestBackup();
      if (success) {
        toast.success(isArabic ? "تم استعادة آخر نسخة احتياطية" : "Latest backup restored successfully");
        setAutoBackups(backupService.getAutoBackups());
      } else {
        toast.error(isArabic ? "لا توجد نسخ احتياطية متاحة" : "No backups available");
      }
    } catch (error) {
      console.error("Error restoring latest backup:", error);
      toast.error(isArabic ? "فشل في استعادة النسخة الاحتياطية" : "Failed to restore backup");
    } finally {
      setIsProcessing(false);
    }
  };

  const refreshBackupList = () => {
    setAutoBackups(backupService.getAutoBackups());
    toast.success(isArabic ? "تم تحديث قائمة النسخ الاحتياطية" : "Backup list refreshed");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isArabic 
      ? date.toLocaleString('ar-SA')
      : date.toLocaleString('en-US');
  };

  return (
    <div className="space-y-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* تصدير واستيراد النسخ الاحتياطية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {isArabic ? "إدارة النسخ الاحتياطية" : "Backup Management"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                {isArabic 
                  ? "النظام محمي بنسخ احتياطية تلقائية كل 30 دقيقة"
                  : "System is protected with automatic backups every 30 minutes"
                }
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button
                onClick={handleExportBackup}
                disabled={isProcessing}
                className="w-full"
                variant="default"
              >
                <Download className="h-4 w-4 mr-2" />
                {isArabic ? "تصدير نسخة احتياطية" : "Export Backup"}
              </Button>

              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="w-full"
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isArabic ? "استيراد نسخة احتياطية" : "Import Backup"}
              </Button>

              <Button
                onClick={handleRestoreLatest}
                disabled={isProcessing}
                className="w-full"
                variant="secondary"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {isArabic ? "استعادة آخر نسخة" : "Restore Latest"}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* النسخ الاحتياطية التلقائية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {isArabic ? "النسخ الاحتياطية التلقائية" : "Auto Backups"}
              </div>
              <Button size="sm" variant="ghost" onClick={refreshBackupList}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {autoBackups.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {autoBackups.slice(0, 10).map((backup, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {formatDate(backup.timestamp)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isArabic ? "نسخة تلقائية" : "Auto backup"}
                      </div>
                    </div>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" disabled={isProcessing}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {isArabic ? "استعادة" : "Restore"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent dir={isArabic ? "rtl" : "ltr"}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {isArabic ? "تأكيد الاستعادة" : "Confirm Restore"}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {isArabic 
                              ? "هل أنت متأكد من استعادة هذه النسخة الاحتياطية؟ سيتم استبدال جميع البيانات الحالية."
                              : "Are you sure you want to restore this backup? All current data will be replaced."
                            }
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            {isArabic ? "إلغاء" : "Cancel"}
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRestoreAutoBackup(backup)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            {isArabic ? "استعادة" : "Restore"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  {isArabic 
                    ? "لا توجد نسخ احتياطية تلقائية حتى الآن"
                    : "No automatic backups available yet"
                  }
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          {isArabic 
            ? "البيانات محمية تلقائياً. يتم إنشاء نسخ احتياطية عند التغييرات وقبل إعادة تحميل الصفحة."
            : "Data is automatically protected. Backups are created on changes and before page reload."
          }
        </AlertDescription>
      </Alert>

      {isProcessing && (
        <Alert>
          <AlertDescription className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            {isArabic ? "جاري المعالجة..." : "Processing..."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BackupManagement;
