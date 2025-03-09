
import React, { useState, useEffect } from "react";
import { Language, CartItem } from "@/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import GlassCard from "@/components/ui-custom/GlassCard";
import { Button } from "@/components/ui/button";
import { Check, Clock, ChefHat } from "lucide-react";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";
import { toast } from "sonner";

interface KitchenOrder {
  id: string;
  items: CartItem[];
  status: "pending" | "preparing" | "completed";
  timestamp: Date;
}

interface KitchenOrdersProps {
  language: Language;
}

// Mock orders - in a real app, this would come from an API or database
const mockOrders: KitchenOrder[] = [
  {
    id: "order-1",
    items: [
      {
        id: "item-1",
        productId: "1",
        name: "Espresso",
        nameAr: "إسبريسو",
        variantId: "1-1",
        size: "small",
        price: 10,
        quantity: 2,
        taxable: true,
      },
      {
        id: "item-2",
        productId: "2",
        name: "Cappuccino",
        nameAr: "كابتشينو",
        variantId: "2-2",
        size: "medium",
        price: 15,
        quantity: 1,
        taxable: true,
      },
    ],
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "order-2",
    items: [
      {
        id: "item-3",
        productId: "3",
        name: "Latte",
        nameAr: "لاتيه",
        variantId: "3-3",
        size: "large",
        price: 18,
        quantity: 1,
        taxable: true,
      },
    ],
    status: "preparing",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
];

const KitchenOrders: React.FC<KitchenOrdersProps> = ({ language }) => {
  const isArabic = language === "ar";
  const { user } = useAuth();
  const [orders, setOrders] = useState<KitchenOrder[]>(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: "pending" | "preparing" | "completed") => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );

    if (newStatus === "completed") {
      toast.success(
        isArabic 
          ? "تم إكمال الطلب بنجاح وإرسال إشعار" 
          : "Order completed and notification sent",
        {
          description: isArabic 
            ? `الطلب رقم ${orderId} جاهز للتسليم` 
            : `Order #${orderId} is ready for delivery`
        }
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "preparing": return "bg-blue-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-5 w-5" />;
      case "preparing": return <ChefHat className="h-5 w-5" />;
      case "completed": return <Check className="h-5 w-5" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": 
        return isArabic ? "قيد الانتظار" : "Pending";
      case "preparing": 
        return isArabic ? "قيد التحضير" : "Preparing";
      case "completed": 
        return isArabic ? "مكتمل" : "Completed";
      default: 
        return "";
    }
  };

  // Sort orders by status (pending first, then preparing, then completed) and then by timestamp
  const sortedOrders = [...orders].sort((a, b) => {
    const statusOrder = { pending: 0, preparing: 1, completed: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return a.timestamp.getTime() - b.timestamp.getTime();
  });

  if (!user || user.role !== "kitchen") {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isArabic ? "ليس لديك صلاحية الوصول" : "You don't have access"}
        </h1>
      </div>
    );
  }

  return (
    <div 
      className={`container mx-auto p-4 ${isArabic ? "font-[system-ui]" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <h1 className="text-2xl font-bold mb-6">
        {isArabic ? "طلبات المطبخ" : "Kitchen Orders"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedOrders.map((order) => (
          <GlassCard key={order.id} className="overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  {isArabic ? `الطلب #${order.id}` : `Order #${order.id}`}
                </h2>
                <div className={`px-3 py-1 rounded-full text-white flex items-center gap-2 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{getStatusText(order.status)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {isArabic ? "وقت الطلب:" : "Order Time:"}
                  {" "}
                  {order.timestamp.toLocaleTimeString(isArabic ? "ar-SA" : "en-US")}
                </p>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">
                          {isArabic ? item.nameAr : item.name}
                        </span>
                        <span className="text-sm text-muted-foreground block">
                          {getSizeLabel(item.size, language)} × {item.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-x-2 flex justify-end">
                {order.status === "pending" && (
                  <Button 
                    onClick={() => updateOrderStatus(order.id, "preparing")}
                    className="w-full"
                  >
                    {isArabic ? "بدء التحضير" : "Start Preparing"}
                  </Button>
                )}
                
                {order.status === "preparing" && (
                  <Button 
                    onClick={() => updateOrderStatus(order.id, "completed")}
                    className="w-full"
                  >
                    {isArabic ? "إكمال الطلب" : "Complete Order"}
                  </Button>
                )}
                
                {order.status === "completed" && (
                  <Button 
                    variant="outline" 
                    disabled
                    className="w-full"
                  >
                    {isArabic ? "تم الإكمال" : "Completed"}
                  </Button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default KitchenOrders;
