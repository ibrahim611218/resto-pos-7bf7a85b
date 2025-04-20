
import { KitchenOrder, KitchenOrderStatus, Invoice } from "@/types";
import { BaseService } from "../base/BaseService";
import { IKitchenOrderService } from "./interfaces/IKitchenOrderService";
import { KitchenStatsService } from "./services/KitchenStatsService";
import { KitchenCleanupService } from "./services/KitchenCleanupService";
import databaseService from "../index";

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
      const settings = await databaseService.getSettings();
      await KitchenCleanupService.cleanupIfWorkDayEnded(
        settings.workEndTime,
        this.getKitchenOrders.bind(this),
        this.getCompletedOrders.bind(this),
        this.lastCleanupKey
      );
      
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
      const completedOrders = await this.getCompletedOrders();
      if (completedOrders.length > 0) {
        const ordersToKeep = completedOrders.slice(0, 100);
        localStorage.setItem(this.completedOrdersKey, JSON.stringify(ordersToKeep));
      }
      
      localStorage.setItem('kitchenOrders', JSON.stringify([]));
      localStorage.setItem(this.lastCleanupKey, new Date().toDateString());
    } catch (error) {
      console.error('Error cleaning up old orders:', error);
      throw error;
    }
  }

  async getDailyStats() {
    try {
      const [activeOrders, completedOrders] = await Promise.all([
        this.getKitchenOrders(),
        this.getCompletedOrders()
      ]);
      
      return KitchenStatsService.calculateDailyStats(activeOrders, completedOrders);
    } catch (error) {
      console.error('Error getting daily stats:', error);
      throw error;
    }
  }
}

const kitchenOrderService = new BrowserKitchenOrderService();
export default kitchenOrderService;
