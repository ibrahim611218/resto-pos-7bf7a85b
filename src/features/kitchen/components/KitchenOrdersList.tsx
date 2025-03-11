
import React, { useState } from "react";
import { KitchenOrder, Language, KitchenOrderStatus } from "@/types";
import KitchenOrderCard from "./KitchenOrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { toast } from "@/hooks/use-toast";

interface KitchenOrdersListProps {
  language: Language;
}

// Mock data for kitchen orders
const mockKitchenOrders: KitchenOrder[] = [
  {
    id: "ko1",
    invoiceId: "INV-20230001",
    status: "pending",
    items: [
      { id: "item1", name: "Espresso", nameAr: "إسبريسو", quantity: 2, size: "medium", status: "pending" },
      { id: "item2", name: "Cappuccino", nameAr: "كابتشينو", quantity: 1, size: "large", status: "pending" }
    ],
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    updatedAt: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: "ko2",
    invoiceId: "INV-20230002",
    status: "preparing",
    items: [
      { id: "item3", name: "Latte", nameAr: "لاتيه", quantity: 3, size: "small", status: "preparing" },
      { id: "item4", name: "American Coffee", nameAr: "قهوة أمريكية", quantity: 2, size: "large", status: "preparing" }
    ],
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 20 * 60000).toISOString()
  },
  {
    id: "ko3",
    invoiceId: "INV-20230003",
    status: "ready",
    items: [
      { id: "item5", name: "Tea", nameAr: "شاي", quantity: 4, size: "medium", status: "ready" }
    ],
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60000).toISOString()
  }
];

const KitchenOrdersList: React.FC<KitchenOrdersListProps> = ({ language }) => {
  const [orders, setOrders] = useState<KitchenOrder[]>(mockKitchenOrders);
  const [activeTab, setActiveTab] = useState<string>("active");
  const isArabic = language === "ar";

  // Filter orders based on active tab
  const activeOrders = orders.filter((order) => 
    ["pending", "preparing", "ready"].includes(order.status)
  );
  
  const completedOrders = orders.filter((order) => 
    order.status === "completed"
  );

  const handleStatusChange = (orderId: string, newStatus: KitchenOrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
      )
    );

    // Notify the cashier (in a real app, this would send a notification via WebSockets)
    const changedOrder = orders.find(order => order.id === orderId);
    if (changedOrder) {
      // This is just for demo purposes. In a real app, this would be replaced with WebSocket communication
      console.log(`Order ${changedOrder.invoiceId} status changed to ${newStatus}`);
      
      // Notify the cashier about the status change
      if (newStatus === "ready") {
        // Simulate a notification from the server after a delay
        setTimeout(() => {
          toast({
            title: isArabic ? "طلب جاهز من المطبخ" : "Order Ready from Kitchen",
            description: isArabic 
              ? `الطلب رقم ${changedOrder.invoiceId} جاهز للتسليم`
              : `Order #${changedOrder.invoiceId} is ready for pickup`,
            variant: "default",
          });
        }, 2000);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="active">
            {isArabic ? "الطلبات النشطة" : "Active Orders"}
            {activeOrders.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                {activeOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {isArabic ? "الطلبات المكتملة" : "Completed Orders"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          {activeOrders.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                {isArabic ? "لا توجد طلبات نشطة" : "No active orders"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeOrders.map((order, index) => (
                <AnimatedTransition key={order.id} animation="fade" delay={index * 100}>
                  <KitchenOrderCard
                    id={order.id}
                    invoiceId={order.invoiceId}
                    items={order.items}
                    status={order.status}
                    createdAt={order.createdAt}
                    language={language}
                    onStatusChange={handleStatusChange}
                  />
                </AnimatedTransition>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {completedOrders.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                {isArabic ? "لا توجد طلبات مكتملة" : "No completed orders"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {completedOrders.map((order, index) => (
                <AnimatedTransition key={order.id} animation="fade" delay={index * 100}>
                  <KitchenOrderCard
                    id={order.id}
                    invoiceId={order.invoiceId}
                    items={order.items}
                    status={order.status}
                    createdAt={order.createdAt}
                    language={language}
                    onStatusChange={handleStatusChange}
                  />
                </AnimatedTransition>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KitchenOrdersList;
