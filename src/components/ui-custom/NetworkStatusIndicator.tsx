
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useLanguage } from '@/context/LanguageContext';
import { Wifi, WifiOff } from 'lucide-react';

interface NetworkStatusIndicatorProps {
  showOnline?: boolean;
}

const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({ 
  showOnline = false 
}) => {
  const { isOnline } = useNetworkStatus();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Only show when offline or if showOnline is true
  if (isOnline && !showOnline) return null;

  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
        isOnline ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4" />
          <span>{isArabic ? 'متصل بالإنترنت' : 'Online'}</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <span>{isArabic ? 'غير متصل بالإنترنت' : 'Offline'}</span>
        </>
      )}
    </div>
  );
};

export default NetworkStatusIndicator;
