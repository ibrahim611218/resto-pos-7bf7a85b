import { useEffect } from 'react';

/**
 * Hook to sync reports when invoices or purchases are updated
 */
export const useReportsSync = () => {
  useEffect(() => {
    // Listen for invoice and purchase updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'stored-invoices' || e.key === 'stored-purchase-invoices') {
        // Trigger custom event for reports to refresh
        window.dispatchEvent(new CustomEvent('reports-data-updated'));
      }
    };

    // Listen for custom events
    const handleDataUpdate = () => {
      window.dispatchEvent(new CustomEvent('reports-data-updated'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('invoice-created', handleDataUpdate);
    window.addEventListener('invoice-updated', handleDataUpdate);
    window.addEventListener('purchase-created', handleDataUpdate);
    window.addEventListener('purchase-updated', handleDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('invoice-created', handleDataUpdate);
      window.removeEventListener('invoice-updated', handleDataUpdate);
      window.removeEventListener('purchase-created', handleDataUpdate);
      window.removeEventListener('purchase-updated', handleDataUpdate);
    };
  }, []);
};
