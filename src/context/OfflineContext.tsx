
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { isCapacitor } from '@/services/base/BaseService';

interface OfflineContextType {
  isOfflineMode: boolean;
  isNativeApp: boolean;
  syncDataWhenOnline: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType>({
  isOfflineMode: false,
  isNativeApp: false,
  syncDataWhenOnline: async () => {}
});

export const useOfflineMode = () => useContext(OfflineContext);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOnline } = useNetworkStatus();
  const [isNativeApp, setIsNativeApp] = useState(false);
  
  useEffect(() => {
    // Check if we're running in a native app environment
    setIsNativeApp(isCapacitor());
  }, []);

  // Function to sync data when we get back online
  const syncDataWhenOnline = async () => {
    // In the future, we could add sync logic here
    // For now, our app is fully offline and uses localStorage
    console.log('Syncing data not implemented - using local storage only');
  };

  return (
    <OfflineContext.Provider 
      value={{
        isOfflineMode: !isOnline,
        isNativeApp,
        syncDataWhenOnline
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};
