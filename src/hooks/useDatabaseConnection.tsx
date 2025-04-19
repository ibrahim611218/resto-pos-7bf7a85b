
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export function useDatabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const testDatabaseConnection = useCallback(async () => {
    setIsLoading(true);
    
    try {
      if (typeof window !== 'undefined' && window.electron) {
        const result = await window.electron.invoke('db:testConnection');
        
        if (result.success) {
          setIsConnected(true);
          setErrorDetails(null);
          toast.success(
            isArabic 
              ? `اتصال قاعدة البيانات ناجح (الإصدار: ${result.version})` 
              : `Database connection successful (Version: ${result.version})`
          );
        } else {
          setIsConnected(false);
          setErrorDetails(result.error || 
            (isArabic ? 'خطأ غير معروف في قاعدة البيانات' : 'Unknown database error'));
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
      
      const errorMessage = error instanceof Error ? error.message : 
        (isArabic ? 'خطأ غير معروف' : 'Unknown error');
      setErrorDetails(errorMessage);
      
      toast.error(
        isArabic 
          ? 'حدث خطأ أثناء اختبار اتصال قاعدة البيانات' 
          : 'An error occurred while testing database connection'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isArabic]);

  useEffect(() => {
    // Attempt connection when component mounts
    testDatabaseConnection();
    
    // Set up a periodic connection test
    const connectionCheckInterval = setInterval(() => {
      if (!isConnected) {
        testDatabaseConnection();
      }
    }, 30000); // Try reconnecting every 30 seconds if not connected
    
    return () => {
      clearInterval(connectionCheckInterval);
    };
  }, [testDatabaseConnection, isConnected]);

  return {
    isConnected,
    errorDetails,
    testDatabaseConnection,
    isLoading
  };
}
