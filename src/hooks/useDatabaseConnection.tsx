
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export function useDatabaseConnection() {
  const [isConnected, setIsConnected] = useState(true); // Default to true to avoid showing error initially
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionAttempted, setConnectionAttempted] = useState(false);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const testDatabaseConnection = useCallback(async () => {
    if (isLoading) return false; // Prevent multiple simultaneous connection attempts
    
    setIsLoading(true);
    
    try {
      if (typeof window !== 'undefined' && window.electron) {
        const result = await window.electron.invoke('db:testConnection');
        
        if (result.success) {
          setIsConnected(true);
          setErrorDetails(null);
          // Only show success toast when reconnecting
          if (connectionAttempted && !isConnected) {
            toast.success(
              isArabic 
                ? `اتصال قاعدة البيانات ناجح (الإصدار: ${result.version})` 
                : `Database connection successful (Version: ${result.version})`
            );
          }
        } else {
          setIsConnected(false);
          setErrorDetails(result.error || 
            (isArabic ? 'خطأ غير معروف في قاعدة البيانات' : 'Unknown database error'));
          
          // Only show error toast on manual reconnection attempts
          if (connectionAttempted) {
            toast.error(
              isArabic 
                ? 'فشل الاتصال بقاعدة البيانات' 
                : 'Failed to connect to the database'
            );
          }
        }
        
        setConnectionAttempted(true);
        return result.success;
      }

      // If not in Electron environment, assume connected
      setIsConnected(true);
      setConnectionAttempted(true);
      return true;
    } catch (error) {
      console.error('Database connection test error:', error);
      setIsConnected(false);
      
      const errorMessage = error instanceof Error ? error.message : 
        (isArabic ? 'خطأ غير معروف' : 'Unknown error');
      setErrorDetails(errorMessage);
      
      // Only show error toast on manual reconnection attempts
      if (connectionAttempted) {
        toast.error(
          isArabic 
            ? 'حدث خطأ أثناء اختبار اتصال قاعدة البيانات' 
            : 'An error occurred while testing database connection'
        );
      }
      
      setConnectionAttempted(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isArabic, isConnected, connectionAttempted, isLoading]);

  useEffect(() => {
    let isMounted = true;
    
    // Attempt connection when component mounts
    testDatabaseConnection().then(() => {
      if (!isMounted) return;
    });
    
    // Set up a periodic connection test only if disconnected
    const connectionCheckInterval = setInterval(() => {
      if (!isConnected && isMounted) {
        testDatabaseConnection();
      }
    }, 30000); // Try reconnecting every 30 seconds if not connected
    
    return () => {
      isMounted = false;
      clearInterval(connectionCheckInterval);
    };
  }, [testDatabaseConnection, isConnected]);

  return {
    isConnected,
    errorDetails,
    testDatabaseConnection,
    isLoading,
    connectionAttempted
  };
}
