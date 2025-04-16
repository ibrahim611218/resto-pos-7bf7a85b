
import React, { useEffect, useState } from "react";
import { Language, KitchenOrder } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import kitchenOrderService from "@/services/kitchen/KitchenOrderService";
import { exportKitchenReport } from "@/utils/reports/kitchen/kitchen-report";
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ChefCompletionProps {
  language: Language;
}

interface ChefStats {
  name: string;
  completed: number;
  total: number;
  completionRate: number;
  avgCompletionTime?: number;
}

const ChefCompletionStats: React.FC<ChefCompletionProps> = ({ language }) => {
  const isArabic = language === "ar";
  const [stats, setStats] = useState<ChefStats[]>([]);
  const [completedOrders, setCompletedOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        // 1. الحصول على كل الطلبات المخزنة (بما في ذلك النشطة)
        const activeOrders = await kitchenOrderService.getKitchenOrders();
        
        // 2. الحصول على الطلبات المكتملة من التخزين المحلي
        const storedCompletedOrders = localStorage.getItem('completed-kitchen-orders');
        const completedOrders = storedCompletedOrders ? JSON.parse(storedCompletedOrders) : [];
        
        // 3. دمج الطلبات للتحليل
        const allOrders = [...activeOrders, ...completedOrders];
        setCompletedOrders(completedOrders);
        
        // 4. حساب إحصائيات الشيفات
        const chefStats: { [key: string]: ChefStats } = {};
        
        allOrders.forEach(order => {
          const chefName = order.cashierName || 'Unknown';
          if (!chefStats[chefName]) {
            chefStats[chefName] = {
              name: chefName,
              completed: 0,
              total: 0,
              completionRate: 0
            };
          }
          
          if (order.status === 'completed') {
            chefStats[chefName].completed++;
          }
          chefStats[chefName].total++;
        });
        
        // 5. حساب نسب الإنجاز
        const statsArray = Object.values(chefStats).map(stat => ({
          ...stat,
          completionRate: Math.round((stat.completed / stat.total) * 100)
        }));
        
        setStats(statsArray);
      } catch (error) {
        console.error("Error loading chef stats:", error);
        toast({
          title: isArabic ? "خطأ في تحميل البيانات" : "Error Loading Data",
          description: isArabic ? "حدث خطأ أثناء تحميل إحصائيات الشيفات" : "An error occurred while loading chef statistics",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, [isArabic]);

  const handleExportReport = () => {
    if (completedOrders.length === 0) {
      toast({
        title: isArabic ? "لا توجد بيانات" : "No Data Available",
        description: isArabic ? "لا توجد طلبات مكتملة لتصديرها" : "There are no completed orders to export",
        variant: "destructive"
      });
      return;
    }
    
    const success = exportKitchenReport(completedOrders, isArabic);
    
    if (success) {
      toast({
        title: isArabic ? "تم التصدير بنجاح" : "Export Successful",
        description: isArabic ? "تم تصدير تقرير إنجاز الشيفات بنجاح" : "Chef completion report exported successfully",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          {isArabic ? "نسب إنجاز الشيفات" : "Chef Completion Rates"}
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportReport}
          disabled={loading || completedOrders.length === 0}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          {isArabic ? "تصدير التقرير" : "Export Report"}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : stats.length > 0 ? (
          <>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, isArabic ? "نسبة الإنجاز" : "Completion Rate"]}
                    labelFormatter={(name) => isArabic ? `الشيف: ${name}` : `Chef: ${name}`}
                  />
                  <Bar
                    dataKey="completionRate"
                    name={isArabic ? "نسبة الإنجاز" : "Completion Rate"}
                    fill="#4f46e5"
                    label={{ position: 'top', formatter: (value: number) => `${value}%` }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-medium mb-2">
                {isArabic ? "تفاصيل الإنجاز" : "Completion Details"}
              </h3>
              {stats.map((chef) => (
                <div key={chef.name} className="flex justify-between items-center p-3 border rounded hover:bg-muted/10 transition-colors">
                  <span className="font-medium">{chef.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-primary">
                      {chef.completionRate}%
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({chef.completed}/{chef.total} {isArabic ? "طلب" : "orders"})
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">
                {isArabic ? "إجمالي الطلبات المكتملة" : "Total Completed Orders"}
              </h3>
              <p className="text-3xl font-bold text-primary">
                {completedOrders.length}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  {isArabic ? "طلب" : "orders"}
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              {isArabic ? "لا توجد بيانات متاحة" : "No data available"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChefCompletionStats;
