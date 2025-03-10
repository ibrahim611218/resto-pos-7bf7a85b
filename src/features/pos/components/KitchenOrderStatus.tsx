
import React, { useEffect, useState } from "react";
import { Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Language } from "@/types";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";

interface KitchenOrder {
  id: string;
  status: "pending" | "preparing" | "ready";
  items: { name: string; nameAr?: string; quantity: number }[];
  timestamp: number;
}

interface KitchenOrderStatusProps {
  language: Language;
}

// Mock function to get pending kitchen orders
const getKitchenOrders = (): KitchenOrder[] => {
  // This would be a real API call in production
  return [
    {
      id: "INV-20230001",
      status: "pending",
      items: [
        { name: "Espresso", nameAr: "إسبريسو", quantity: 2 },
        { name: "Cappuccino", nameAr: "كابتشينو", quantity: 1 }
      ],
      timestamp: Date.now() - 1000 * 60 * 5 // 5 minutes ago
    },
    {
      id: "INV-20230002",
      status: "preparing",
      items: [
        { name: "Latte", nameAr: "لاتيه", quantity: 1 },
        { name: "American Coffee", nameAr: "قهوة أمريكية", quantity: 3 }
      ],
      timestamp: Date.now() - 1000 * 60 * 15 // 15 minutes ago
    },
    {
      id: "INV-20230003",
      status: "ready",
      items: [
        { name: "Tea", nameAr: "شاي", quantity: 2 }
      ],
      timestamp: Date.now() - 1000 * 60 * 25 // 25 minutes ago
    }
  ];
};

const KitchenOrderStatus: React.FC<KitchenOrderStatusProps> = ({ language }) => {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const isArabic = language === "ar";

  useEffect(() => {
    // In a real app, this would use WebSockets or polling to get updates
    setOrders(getKitchenOrders());
    
    // Set up a timer to simulate order status changes
    const interval = setInterval(() => {
      setOrders(prev => 
        prev.map(order => {
          // Randomly update some orders
          if (Math.random() > 0.7) {
            if (order.status === "pending") {
              return { ...order, status: "preparing" };
            } else if (order.status === "preparing") {
              return { ...order, status: "ready" };
            }
          }
          return order;
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter orders by status
  const pendingOrders = orders.filter(o => o.status === "pending");
  const preparingOrders = orders.filter(o => o.status === "preparing");
  const readyOrders = orders.filter(o => o.status === "ready");

  const formatTime = (timestamp: number) => {
    const mins = Math.floor((Date.now() - timestamp) / (1000 * 60));
    return isArabic ? `${mins} دقيقة` : `${mins} min`;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return isArabic ? "قيد الانتظار" : "Pending";
      case "preparing":
        return isArabic ? "قيد التحضير" : "Preparing";
      case "ready":
        return isArabic ? "جاهز" : "Ready";
      default:
        return status;
    }
  };

  return (
    <div className="p-3 bg-muted/30 rounded-lg">
      <h3 className="font-semibold mb-2">
        {isArabic ? "حالة طلبات المطبخ" : "Kitchen Orders Status"}
        <Badge className="ml-2 bg-primary/20 text-primary">
          {pendingOrders.length + preparingOrders.length + readyOrders.length}
        </Badge>
      </h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {[...pendingOrders, ...preparingOrders, ...readyOrders].map((order, index) => (
          <AnimatedTransition key={order.id} animation="fade" delay={index * 50}>
            <div className="p-2 bg-card rounded-md flex items-center justify-between border">
              <div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">#{order.id}</span>
                  <Badge 
                    variant={
                      order.status === "ready" ? "default" :
                      order.status === "preparing" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {order.status === "ready" ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatTime(order.timestamp)}
                </p>
              </div>
              <span className="text-sm">
                {order.items.reduce((total, item) => total + item.quantity, 0)}{" "}
                {isArabic ? "عنصر" : "items"}
              </span>
            </div>
          </AnimatedTransition>
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {isArabic ? "لا توجد طلبات في المطبخ" : "No kitchen orders"}
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenOrderStatus;
