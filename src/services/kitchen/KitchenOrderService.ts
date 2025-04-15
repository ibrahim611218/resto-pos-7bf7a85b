
import { KitchenOrder, KitchenOrderStatus, Invoice } from "@/types";
import { BaseService } from "../base/BaseService";

export interface IKitchenOrderService {
  createKitchenOrder: (invoice: Invoice) => Promise<KitchenOrder>;
  getKitchenOrders: () => Promise<KitchenOrder[]>;
  updateKitchenOrderStatus: (orderId: string, status: KitchenOrderStatus) => Promise<void>;
}

class BrowserKitchenOrderService extends BaseService implements IKitchenOrderService {
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
      updatedAt: new Date().toISOString()
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
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return order;
      });

      // If order is completed or cancelled, remove it from the list
      const filteredOrders = status === 'completed' || status === 'cancelled' 
        ? updatedOrders.filter(order => order.id !== orderId)
        : updatedOrders;

      localStorage.setItem('kitchenOrders', JSON.stringify(filteredOrders));
    } catch (error) {
      console.error('Error updating kitchen order status:', error);
      throw error;
    }
  }
}

const kitchenOrderService = new BrowserKitchenOrderService();
export default kitchenOrderService;
