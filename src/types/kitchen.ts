
export interface KitchenOrder {
  id: string;
  invoiceId: string;
  items: KitchenOrderItem[];
  status: KitchenOrderStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  cashierName?: string;  // إضافة اسم الكاشير كخاصية اختيارية
  completedAt?: string;  // إضافة وقت الإكمال كخاصية اختيارية
}

export interface KitchenOrderItem {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  size: string;
  status: KitchenItemStatus;
}

export type KitchenOrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type KitchenItemStatus = 'pending' | 'preparing' | 'ready';
