
import React, { useState, useEffect } from "react";
import { KitchenOrder, Language, KitchenOrderStatus } from "@/types";
import KitchenOrderCard from "./KitchenOrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { toast } from "@/hooks/use-toast";
import kitchenOrderService from "@/services/kitchen/KitchenOrderService";

interface KitchenOrdersListProps {
  language: Language;
}

const KitchenOrdersList: React.FC<KitchenOrdersListProps> = ({ language }) => {
  const [activeOrders, setActiveOrders] = useState<KitchenOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<KitchenOrder[]>([]);
  const [activeTab, setActiveTab] = useState<string>("active");
  const [loading, setLoading] = useState<boolean>(true);
  const isArabic = language === "ar";

  // Fetch kitchen orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // 1. الحصول على الطلبات النشطة
        const fetchedActiveOrders = await kitchenOrderService.getKitchenOrders();
        setActiveOrders(fetchedActiveOrders.filter(order => 
          ["pending", "preparing", "in-progress", "ready"].includes(order.status)
        ));
        
        // 2. الحصول على الطلبات المكتملة
        const fetchedCompletedOrders = await kitchenOrderService.getCompletedOrders();
        setCompletedOrders(fetchedCompletedOrders.slice(0, 20)); // عرض آخر 20 طلب مكتمل فقط للأداء
      } catch (error) {
        console.error("Error fetching kitchen orders:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
    
    // Poll for new orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: KitchenOrderStatus) => {
    try {
      await kitchenOrderService.updateKitchenOrderStatus(orderId, newStatus);
      
      // Update local state
      if (newStatus === "completed") {
        const completedOrder = activeOrders.find(order => order.id === orderId);
        if (completedOrder) {
          setCompletedOrders(prev => [{
            ...completedOrder,
            status: "completed",
            updatedAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
          }, ...prev]);
        }
        setActiveOrders(prev => prev.filter(order => order.id !== orderId));
      } else {
        setActiveOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } 
            : order
        ));
      }

      // Notify about status change
      const statusMessage = isArabic 
        ? getArabicStatusMessage(newStatus)
        : `Order status updated to ${newStatus}`;
      
      toast({
        title: isArabic ? "تم تحديث حالة الطلب" : "Order Status Updated",
        description: statusMessage,
      });

    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic 
          ? "حدث خطأ أثناء تحديث حالة الطلب"
          : "Error updating order status",
        variant: "destructive",
      });
    }
  };

  const getArabicStatusMessage = (status: KitchenOrderStatus): string => {
    switch (status) {
      case "preparing":
        return "جاري تحضير الطلب";
      case "ready":
        return "الطلب جاهز للتسليم";
      case "completed":
        return "تم اكتمال الطلب";
      default:
        return "تم تحديث حالة الطلب";
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
            {completedOrders.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-600 text-white">
                {completedOrders.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : activeOrders.length === 0 ? (
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
                    cashierName={order.cashierName}
                  />
                </AnimatedTransition>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : completedOrders.length === 0 ? (
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
                    completedAt={order.completedAt}
                    language={language}
                    onStatusChange={handleStatusChange}
                    cashierName={order.cashierName}
                    readOnly={true}
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
