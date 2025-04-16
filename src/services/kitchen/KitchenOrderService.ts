
import { KitchenOrder, KitchenOrderStatus, Invoice } from "@/types";
import { BaseService } from "../base/BaseService";

export interface IKitchenOrderService {
  createKitchenOrder: (invoice: Invoice) => Promise<KitchenOrder>;
  getKitchenOrders: () => Promise<KitchenOrder[]>;
  updateKitchenOrderStatus: (orderId: string, status: KitchenOrderStatus) => Promise<void>;
}

class BrowserKitchenOrderService extends BaseService implements IKitchenOrderService {
  private completedOrdersKey = 'completed-kitchen-orders';
  
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

  async updateKitchenOrderStatus(orderId: string, status: KitchenOrderStatus): Promise<void> {
    try {
      const storedOrders = localStorage.getItem('kitchenOrders');
      if (!storedOrders) return;

      const orders: KitchenOrder[] = JSON.parse(storedOrders);
      const updatedOrder = orders.find(order => order.id === orderId);
      
      if (updatedOrder) {
        // Update the order status
        updatedOrder.status = status;
        updatedOrder.updatedAt = new Date().toISOString();
        
        // If order is completed, store it in completed orders
        if (status === 'completed') {
          const completedOrders = this.getCompletedOrders();
          completedOrders.push({
            ...updatedOrder,
            completedAt: new Date().toISOString()
          });
          localStorage.setItem(this.completedOrdersKey, JSON.stringify(completedOrders));
        }
      }

      // Remove completed/cancelled orders from active list
      const activeOrders = status === 'completed' || status === 'cancelled' 
        ? orders.filter(order => order.id !== orderId)
        : orders;

      localStorage.setItem('kitchenOrders', JSON.stringify(activeOrders));
    } catch (error) {
      console.error('Error updating kitchen order status:', error);
      throw error;
    }
  }

  private getCompletedOrders(): KitchenOrder[] {
    try {
      const stored = localStorage.getItem(this.completedOrdersKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting completed orders:', error);
      return [];
    }
  }
}

const kitchenOrderService = new BrowserKitchenOrderService();
export default kitchenOrderService;
