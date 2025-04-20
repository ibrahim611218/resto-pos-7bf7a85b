
import { KitchenOrder } from "@/types";

export class KitchenStatsService {
  static calculateDailyStats(orders: KitchenOrder[], completedOrders: KitchenOrder[]) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayOrders = [...orders, ...completedOrders].filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= todayStart;
    });
    
    const completed = todayOrders.filter(order => order.status === 'completed');
    
    const completionTimes = completed
      .filter(order => order.completedAt)
      .map(order => {
        const start = new Date(order.createdAt).getTime();
        const end = new Date(order.completedAt!).getTime();
        return (end - start) / (1000 * 60);
      });
    
    const averageTime = completionTimes.length > 0
      ? completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length
      : 0;
    
    return {
      totalOrders: todayOrders.length,
      completedOrders: completed.length,
      completionRate: todayOrders.length > 0 
        ? (completed.length / todayOrders.length) * 100 
        : 0,
      averageCompletionTime: averageTime
    };
  }
}
