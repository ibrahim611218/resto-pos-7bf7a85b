
import { KitchenOrder } from "@/types";
import { exportToExcel } from "../excel/excel-export";
import * as XLSX from 'xlsx';
import { toast } from "@/hooks/use-toast";

/**
 * تصدير تقرير إنجاز الشيفات إلى ملف Excel
 */
export const exportKitchenReport = (completedOrders: KitchenOrder[], isArabic: boolean = false): boolean => {
  try {
    // تحويل البيانات إلى تنسيق مناسب للتصدير
    const chefStats = calculateChefStats(completedOrders);
    
    // تحديد عناوين الأعمدة
    const headers = isArabic 
      ? ['الشيف', 'عدد الطلبات المكتملة', 'إجمالي الطلبات', 'نسبة الإنجاز (%)', 'متوسط وقت الإكمال (دقيقة)']
      : ['Chef', 'Completed Orders', 'Total Orders', 'Completion Rate (%)', 'Avg Completion Time (min)'];
    
    // تحويل بيانات الشيفات إلى صفوف
    const data = Object.values(chefStats).map(chef => [
      chef.name,
      chef.completed,
      chef.total,
      chef.completionRate.toFixed(2),
      chef.avgCompletionTime.toFixed(2)
    ]);
    
    // تصدير البيانات
    const title = isArabic ? 'تقرير إنجاز الشيفات' : 'Chef Completion Report';
    const fileName = isArabic ? 'تقرير_انجاز_الشيفات' : 'chef_completion_report';
    
    return exportToExcel({
      headers,
      data,
      fileName,
      title,
      isArabic
    });
  } catch (error) {
    console.error('Error exporting kitchen report:', error);
    toast({
      title: isArabic ? "خطأ في التصدير" : "Export Error",
      description: isArabic ? "حدث خطأ أثناء إنشاء تقرير المطبخ" : "An error occurred while creating the kitchen report",
      variant: "destructive"
    });
    return false;
  }
};

/**
 * حساب إحصائيات الشيفات من الطلبات المكتملة
 */
const calculateChefStats = (orders: KitchenOrder[]): Record<string, ChefStat> => {
  const stats: Record<string, ChefStat> = {};
  
  orders.forEach(order => {
    const chefName = order.cashierName || 'Unknown';
    
    if (!stats[chefName]) {
      stats[chefName] = {
        name: chefName,
        completed: 0,
        total: 0,
        completionTimes: [],
        completionRate: 0,
        avgCompletionTime: 0
      };
    }
    
    // زيادة إجمالي الطلبات
    stats[chefName].total++;
    
    // إذا كان الطلب مكتملاً، نحسب وقت الإكمال
    if (order.status === 'completed' && order.completedAt && order.createdAt) {
      stats[chefName].completed++;
      
      const startTime = new Date(order.createdAt).getTime();
      const endTime = new Date(order.completedAt).getTime();
      const completionTime = (endTime - startTime) / (1000 * 60); // بالدقائق
      
      stats[chefName].completionTimes.push(completionTime);
    }
  });
  
  // حساب النسب المئوية ومتوسط أوقات الإكمال
  Object.values(stats).forEach(chef => {
    chef.completionRate = (chef.completed / chef.total) * 100;
    
    const totalTime = chef.completionTimes.reduce((sum, time) => sum + time, 0);
    chef.avgCompletionTime = chef.completionTimes.length > 0 
      ? totalTime / chef.completionTimes.length 
      : 0;
  });
  
  return stats;
};

interface ChefStat {
  name: string;
  completed: number;
  total: number;
  completionTimes: number[];
  completionRate: number;
  avgCompletionTime: number;
}
