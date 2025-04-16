
import React from "react";
import { 
  KitchenOrderItem, 
  Language, 
  KitchenOrderStatus 
} from "@/types";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ChefHat, 
  CheckCircle, 
  PlayCircle, 
  CheckCheck,
  User
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface KitchenOrderCardProps {
  id: string;
  invoiceId: string;
  items: KitchenOrderItem[];
  status: KitchenOrderStatus;
  createdAt: string;
  completedAt?: string;
  cashierName?: string;
  language: Language;
  onStatusChange: (id: string, status: KitchenOrderStatus) => void;
  readOnly?: boolean;
}

const KitchenOrderCard: React.FC<KitchenOrderCardProps> = ({
  id,
  invoiceId,
  items,
  status,
  createdAt,
  completedAt,
  cashierName,
  language,
  onStatusChange,
  readOnly = false
}) => {
  const isArabic = language === "ar";
  
  const getStatusColor = (status: KitchenOrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: KitchenOrderStatus) => {
    if (isArabic) {
      switch (status) {
        case "pending":
          return "قيد الانتظار";
        case "preparing":
          return "جاري التحضير";
        case "ready":
          return "جاهز";
        case "completed":
          return "مكتمل";
        case "cancelled":
          return "ملغي";
        default:
          return status;
      }
    }
    return status;
  };
  
  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: isArabic ? ar : undefined
      });
    } catch (error) {
      return isArabic ? "وقت غير معروف" : "unknown time";
    }
  };
  
  const calculateCompletionTime = (startDate: string, endDate: string) => {
    try {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const diffMs = end - start;
      
      // Convert to minutes
      const diffMinutes = Math.floor(diffMs / 60000);
      
      if (diffMinutes < 60) {
        return isArabic 
          ? `${diffMinutes} دقيقة` 
          : `${diffMinutes} min`;
      }
      
      // Convert to hours and minutes
      const hours = Math.floor(diffMinutes / 60);
      const mins = diffMinutes % 60;
      
      return isArabic 
        ? `${hours} ساعة ${mins > 0 ? `و ${mins} دقيقة` : ''}` 
        : `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    } catch (error) {
      return isArabic ? "وقت غير معروف" : "unknown time";
    }
  };
  
  const handleStatusChange = (newStatus: KitchenOrderStatus) => {
    if (readOnly) return;
    onStatusChange(id, newStatus);
  };
  
  const orderStatusClasses = getStatusColor(status);
  
  return (
    <Card className={`border-l-4 ${orderStatusClasses} transition-all hover:shadow-md`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {isArabic ? `طلب #${invoiceId}` : `Order #${invoiceId}`}
          </CardTitle>
          <Badge className={orderStatusClasses}>
            {getStatusText(status)}
          </Badge>
        </div>
        
        {cashierName && (
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <User size={14} className="mr-1" />
            <span>
              {isArabic ? `الشيف: ${cashierName}` : `Chef: ${cashierName}`}
            </span>
          </div>
        )}
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={14} className="mr-1" />
          <span>
            {isArabic ? `تم الطلب ${formatTime(createdAt)}` : `Ordered ${formatTime(createdAt)}`}
          </span>
        </div>
        
        {completedAt && (
          <div className="flex items-center text-sm text-green-600 font-medium">
            <CheckCheck size={14} className="mr-1" />
            <span>
              {isArabic 
                ? `وقت التحضير: ${calculateCompletionTime(createdAt, completedAt)}`
                : `Completion time: ${calculateCompletionTime(createdAt, completedAt)}`
              }
            </span>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium mr-2">
                  {item.quantity}x
                </span>
                <span>
                  {isArabic && item.nameAr ? item.nameAr : item.name}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({item.size})
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      
      {!readOnly && status !== "completed" && status !== "cancelled" && (
        <CardFooter className="flex gap-2 pt-1">
          {status === "pending" && (
            <Button 
              variant="outline" 
              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
              onClick={() => handleStatusChange("preparing")}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              {isArabic ? "بدء التحضير" : "Start Preparing"}
            </Button>
          )}
          
          {status === "preparing" && (
            <Button 
              variant="outline" 
              className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
              onClick={() => handleStatusChange("ready")}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isArabic ? "تم التحضير" : "Ready"}
            </Button>
          )}
          
          {status === "ready" && (
            <Button 
              variant="outline" 
              className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
              onClick={() => handleStatusChange("completed")}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              {isArabic ? "تم التسليم" : "Complete"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default KitchenOrderCard;
