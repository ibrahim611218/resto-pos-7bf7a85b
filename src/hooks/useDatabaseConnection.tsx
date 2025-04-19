
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { useNetworkStatus } from './useNetworkStatus';
import { isCapacitor } from '@/services/base/BaseService';

export function useDatabaseConnection() {
  const [isConnected, setIsConnected] = useState(true); // Always connected in offline mode
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionAttempted, setConnectionAttempted] = useState(true);
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    // When running as a native app, we don't need to worry about database connections
    if (isCapacitor()) {
      setIsConnected(true);
      setConnectionAttempted(true);
      setErrorDetails(null);
    }
  }, []);

  const testDatabaseConnection = useCallback(async () => {
    // Always report successful connection in offline mode
    return true;
  }, [isArabic]);

  return {
    isConnected: true, // Always return true for offline mode
    errorDetails: null,
    testDatabaseConnection,
    isLoading: false,
    connectionAttempted: true
  };
}
