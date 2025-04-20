
import { KitchenOrder, KitchenOrderStatus, Invoice } from "@/types";

export interface IKitchenOrderService {
  createKitchenOrder: (invoice: Invoice) => Promise<KitchenOrder>;
  getKitchenOrders: () => Promise<KitchenOrder[]>;
  getCompletedOrders: () => Promise<KitchenOrder[]>;
  updateKitchenOrderStatus: (orderId: string, status: KitchenOrderStatus) => Promise<void>;
  cleanupOldOrders: () => Promise<void>;
  getDailyStats: () => Promise<{
    totalOrders: number;
    completedOrders: number;
    completionRate: number;
    averageCompletionTime: number;
  }>;
}
