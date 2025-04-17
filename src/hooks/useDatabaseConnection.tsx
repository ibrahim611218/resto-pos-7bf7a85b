
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export function useDatabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const testDatabaseConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.electron) {
        const result = await window.electron.invoke('db:testConnection');
        
        if (result.success) {
          setIsConnected(true);
          toast.success(
            isArabic 
              ? `اتصال قاعدة البيانات ناجح (الإصدار: ${result.version})` 
              : `Database connection successful (Version: ${result.version})`
          );
        } else {
          setIsConnected(false);
          toast.error(
            isArabic 
              ? 'فشل الاتصال بقاعدة البيانات' 
              : 'Failed to connect to the database'
          );
        }
        
        return result.success;
      }
      return false;
    } catch (error) {
      console.error('Database connection test error:', error);
      setIsConnected(false);
      toast.error(
        isArabic 
          ? 'حدث خطأ أثناء اختبار اتصال قاعدة البيانات' 
          : 'An error occurred while testing database connection'
      );
      return false;
    }
  };

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  return {
    isConnected,
    testDatabaseConnection
  };
}
