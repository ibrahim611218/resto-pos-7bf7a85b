import { KitchenOrder, KitchenOrderStatus, Invoice } from "@/types";
import { BaseService } from "../base/BaseService";

export interface IKitchenOrderService {
  createKitchenOrder: (invoice: Invoice) => Promise<KitchenOrder>;
  getKitchenOrders: () => Promise<KitchenOrder[]>;
  getCompletedOrders: () => Promise<KitchenOrder[]>;
  updateKitchenOrderStatus: (orderId: string, status: KitchenOrderStatus) => Promise<void>;
}

class BrowserKitchenOrderService extends BaseService implements IKitchenOrderService {
  private completedOrdersKey = 'completed-kitchen-orders';
  private lastCleanupKey = 'last-kitchen-cleanup';
  
  async createKitchenOrder(invoice: Invoice): Promise<KitchenOrder> {
    const kitchenOrder: KitchenOrder = {
      id: invoice.id,
      invoiceId: invoice.number,
      status: "pending",
      items: invoice.items.map(item => ({
        id: item.id,
        name: item.name,
        nameAr: item.nameAr,
        quantity: item.quantity,
        size: item.size,
        status: "pending"
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cashierName: invoice.cashierName
    };

    try {
      const storedOrders = localStorage.getItem('kitchenOrders');
      const orders: KitchenOrder[] = storedOrders ? JSON.parse(storedOrders) : [];
      orders.unshift(kitchenOrder);
      localStorage.setItem('kitchenOrders', JSON.stringify(orders));
      return kitchenOrder;
    } catch (error) {
      console.error('Error creating kitchen order:', error);
      throw error;
    }
  }

  async getKitchenOrders(): Promise<KitchenOrder[]> {
    try {
      const storedOrders = localStorage.getItem('kitchenOrders');
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error('Error getting kitchen orders:', error);
      return [];
    }
  }
  
  async getCompletedOrders(): Promise<KitchenOrder[]> {
    try {
      const storedOrders = localStorage.getItem(this.completedOrdersKey);
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error('Error getting completed orders:', error);
      return [];
    }
  }

  async updateKitchenOrderStatus(orderId: string, status: KitchenOrderStatus): Promise<void> {
    try {
      const storedOrders = localStorage.getItem('kitchenOrders');
      if (!storedOrders) return;

      const orders: KitchenOrder[] = JSON.parse(storedOrders);
      const updatedOrder = orders.find(order => order.id === orderId);
      
      if (updatedOrder) {
        updatedOrder.status = status;
        updatedOrder.updatedAt = new Date().toISOString();
        
        if (status === 'completed') {
          const completedOrders = await this.getCompletedOrders();
          completedOrders.unshift({
            ...updatedOrder,
            completedAt: new Date().toISOString()
          });
          localStorage.setItem(this.completedOrdersKey, JSON.stringify(completedOrders));
        }
      }

      const activeOrders = status === 'completed' || status === 'cancelled' 
        ? orders.filter(order => order.id !== orderId)
        : orders;

      localStorage.setItem('kitchenOrders', JSON.stringify(activeOrders));
    } catch (error) {
      console.error('Error updating kitchen order status:', error);
      throw error;
    }
  }

  async cleanupOldOrders(): Promise<void> {
    try {
      const lastCleanup = localStorage.getItem(this.lastCleanupKey);
      const today = new Date().toDateString();
      
      if (lastCleanup === today) {
        return;
      }
      
      const completedOrders = await this.getCompletedOrders();
      if (completedOrders.length > 0) {
        const ordersToKeep = completedOrders.slice(0, 100);
        localStorage.setItem(this.completedOrdersKey, JSON.stringify(ordersToKeep));
      }
      
      localStorage.setItem('kitchenOrders', JSON.stringify([]));
      
      localStorage.setItem(this.lastCleanupKey, today);
    } catch (error) {
      console.error('Error cleaning up old orders:', error);
      throw error;
    }
  }

  async getDailyStats(): Promise<{
    totalOrders: number;
    completedOrders: number;
    completionRate: number;
    averageCompletionTime: number;
  }> {
    try {
      const [activeOrders, completedOrders] = await Promise.all([
        this.getKitchenOrders(),
        this.getCompletedOrders()
      ]);
      
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const todayOrders = [...activeOrders, ...completedOrders].filter(order => {
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
    } catch (error) {
      console.error('Error getting daily stats:', error);
      throw error;
    }
  }
}

const kitchenOrderService = new BrowserKitchenOrderService();
export default kitchenOrderService;
