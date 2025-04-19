
export type KitchenOrderStatus = "pending" | "in-progress" | "preparing" | "ready" | "completed" | "cancelled";
export type KitchenItemStatus = "pending" | "preparing" | "ready";

export interface KitchenOrder {
  id: string;
  invoiceId: string;
  items: KitchenOrderItem[];
  status: KitchenOrderStatus;
  orderType?: "takeaway" | "dineIn";
  tableNumber?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  cashierName?: string;
}

export interface KitchenOrderItem {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  notes?: string;
  status: KitchenItemStatus;
  size: string;
}
