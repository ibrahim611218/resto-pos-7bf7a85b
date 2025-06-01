
import React, { useState, useRef } from "react";
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
  CheckCircle
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
    } catch (error) {
      console.error("Error restoring backup:", error);
      toast.error(isArabic ? "فشل في استعادة النسخة الاحتياطية" : "Failed to restore backup");
    } finally {
      setIsProcessing(false);
    }
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
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {isArabic 
                  ? "تأكد من إنشاء نسخة احتياطية بانتظام لحماية بياناتك"
                  : "Make sure to create regular backups to protect your data"
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
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {isArabic ? "النسخ الاحتياطية التلقائية" : "Auto Backups"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {autoBackups.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {autoBackups.map((backup, index) => (
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
                        <Button size="sm" variant="outline">
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
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          {isArabic 
            ? "يتم إنشاء نسخة احتياطية تلقائية كل ساعة. يتم الاحتفاظ بآخر 5 نسخ فقط."
            : "Automatic backups are created every hour. Only the last 5 backups are kept."
          }
        </AlertDescription>
      </Alert>

      {isProcessing && (
        <Alert>
          <AlertDescription>
            {isArabic ? "جاري المعالجة..." : "Processing..."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BackupManagement;
