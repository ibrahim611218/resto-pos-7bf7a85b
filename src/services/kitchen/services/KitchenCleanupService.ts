
import { KitchenOrder } from "@/types";
import { BusinessSettings } from "@/types";

export class KitchenCleanupService {
  static async cleanupIfWorkDayEnded(
    workEndTime: string | undefined,
    getOrders: () => Promise<KitchenOrder[]>,
    getCompletedOrders: () => Promise<KitchenOrder[]>,
    lastCleanupKey: string
  ): Promise<void> {
    if (!workEndTime) return;
    
    const now = new Date();
    const [hours, minutes] = workEndTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes, 0, 0);
    
    const lastCleanup = localStorage.getItem(lastCleanupKey);
    const today = now.toDateString();
    
    if (lastCleanup === today) return;
    
    if (now >= endTime) {
      try {
        const orders = await getOrders();
        const completedOrders = orders.filter(order => order.status === 'completed');
        
        if (completedOrders.length > 0) {
          const historyOrders = await getCompletedOrders();
          localStorage.setItem(
            'completed-kitchen-orders', 
            JSON.stringify([...completedOrders, ...historyOrders].slice(0, 100))
          );
          
          const activeOrders = orders.filter(order => order.status !== 'completed');
          localStorage.setItem('kitchenOrders', JSON.stringify(activeOrders));
        }
        
        localStorage.setItem(lastCleanupKey, today);
      } catch (error) {
        console.error('Error during work day cleanup:', error);
      }
    }
  }
}
