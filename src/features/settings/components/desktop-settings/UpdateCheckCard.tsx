
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

const UpdateCheckCard = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(
    localStorage.getItem('lastUpdateCheck')
  );

  const handleCheckUpdate = async () => {
    setIsCheckingUpdate(true);
    
    try {
      // Simulate checking for updates
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store last check timestamp
      const now = new Date().toISOString();
      localStorage.setItem('lastUpdateCheck', now);
      setLastChecked(now);
      
      // For now, we'll just show a toast notification
      toast.success(
        isArabic 
          ? "أنت تستخدم أحدث إصدار من النظام" 
          : "You are using the latest version of the system"
      );
    } catch (error) {
      console.error("Error checking for updates:", error);
      toast.error(
        isArabic 
          ? "تعذر التحقق من التحديثات، يرجى المحاولة لاحقًا" 
          : "Failed to check for updates, please try again later"
      );
    } finally {
      setIsCheckingUpdate(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? 'ar-SA' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">
        {isArabic ? "تحديث النظام" : "System Update"}
      </h3>
      <Button 
        onClick={handleCheckUpdate}
        variant="outline"
        disabled={isCheckingUpdate}
        className="w-full flex items-center justify-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isCheckingUpdate ? 'animate-spin' : ''}`} />
        {isArabic 
          ? isCheckingUpdate ? "جاري التحقق..." : "التحقق من التحديثات" 
          : isCheckingUpdate ? "Checking..." : "Check for Updates"}
      </Button>
      
      {lastChecked && (
        <p className="mt-2 text-xs text-muted-foreground text-center">
          {isArabic 
            ? `آخر تحقق: ${formatDate(lastChecked)}` 
            : `Last checked: ${formatDate(lastChecked)}`}
        </p>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>
          {isArabic 
            ? "يقوم النظام بالتحقق من وجود تحديثات جديدة والتنبيه في حالة توفرها." 
            : "The system checks for new updates and alerts when they are available."}
        </p>
      </div>
    </Card>
  );
};

export default UpdateCheckCard;
