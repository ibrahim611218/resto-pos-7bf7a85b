
// Base service class for all services
export class BaseService {
  // Base methods that all services inherit
}

// Check if we're running in an Electron environment (always false in our case)
export const isElectron = () => false;

// Check if we're running in a Capacitor/mobile environment
export const isCapacitor = () => {
  return typeof window !== 'undefined' && 
         'Capacitor' in window && 
         window.Capacitor &&
         window.Capacitor.isNativePlatform && 
         window.Capacitor.isNativePlatform();
};

// This is a platform-agnostic way to determine if we have network connectivity
export const isOnline = () => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};
