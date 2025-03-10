
import React, { useState } from "react";
import { Clock, ChefHat, CheckCircle2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Language, KitchenOrderStatus } from "@/types";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { arSA, enUS } from "date-fns/locale";

interface KitchenOrderCardProps {
  id: string;
  invoiceId: string;
  items: Array<{
    id: string;
    name: string;
    nameAr?: string;
    quantity: number;
    size: string;
  }>;
  status: KitchenOrderStatus;
  createdAt: string;
  language: Language;
  onStatusChange: (orderId: string, newStatus: KitchenOrderStatus) => void;
}

const KitchenOrderCard: React.FC<KitchenOrderCardProps> = ({
  id,
  invoiceId,
  items,
  status,
  createdAt,
  language,
  onStatusChange,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isArabic = language === "ar";
  
  const getStatusColor = (status: KitchenOrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "preparing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "ready":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusLabel = (status: KitchenOrderStatus) => {
    switch (status) {
      case "pending":
        return isArabic ? "قيد الانتظار" : "Pending";
      case "preparing":
        return isArabic ? "قيد التحضير" : "Preparing";
      case "ready":
        return isArabic ? "جاهز" : "Ready";
      case "completed":
        return isArabic ? "مكتمل" : "Completed";
      case "cancelled":
        return isArabic ? "ملغي" : "Cancelled";
      default:
        return status;
    }
  };

  const getSizeLabel = (size: string) => {
    if (isArabic) {
      return size === "small" ? "صغير" : size === "medium" ? "وسط" : "كبير";
    }
    return size === "small" ? "S" : size === "medium" ? "M" : "L";
  };

  const handleUpdateStatus = (newStatus: KitchenOrderStatus) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      onStatusChange(id, newStatus);
      setIsUpdating(false);
      
      const statusMessage = getStatusLabel(newStatus);
      toast({
        title: isArabic ? "تم تحديث الحالة" : "Status Updated",
        description: isArabic
          ? `تم تحديث حالة الطلب ${invoiceId} إلى ${statusMessage}`
          : `Order ${invoiceId} status updated to ${statusMessage}`,
      });
    }, 500);
  };

  const getTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: isArabic ? arSA : enUS,
    });
  };

  const renderActionButton = () => {
    switch (status) {
      case "pending":
        return (
          <Button 
            className="w-full" 
            onClick={() => handleUpdateStatus("preparing")}
            disabled={isUpdating}
          >
            <ChefHat className="mr-2 h-4 w-4" />
            {isArabic ? "بدء التحضير" : "Start Preparing"}
          </Button>
        );
      case "preparing":
        return (
          <Button 
            className="w-full" 
            onClick={() => handleUpdateStatus("ready")}
            disabled={isUpdating}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {isArabic ? "تم التحضير" : "Mark as Ready"}
          </Button>
        );
      case "ready":
        return (
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => handleUpdateStatus("completed")}
            disabled={isUpdating}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {isArabic ? "تم التسليم" : "Mark as Completed"}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`${status === "completed" ? "opacity-60" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {isArabic ? "طلب رقم" : "Order"} #{invoiceId}
          </CardTitle>
          <Badge className={`${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {getTimeAgo(createdAt)}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-1 border-b">
              <div className="flex items-center">
                <span className="font-medium">
                  {isArabic && item.nameAr ? item.nameAr : item.name}
                </span>
                <span className="text-xs ml-2 text-muted-foreground">
                  ({getSizeLabel(item.size)})
                </span>
              </div>
              <span className="text-sm">x{item.quantity}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        {renderActionButton()}
      </CardFooter>
    </Card>
  );
};

export default KitchenOrderCard;
