
import React, { useEffect, useState } from "react";
import { Language } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import kitchenOrderService from "@/services/kitchen/KitchenOrderService";

interface ChefCompletionProps {
  language: Language;
}

interface ChefStats {
  name: string;
  completed: number;
  total: number;
  completionRate: number;
}

const ChefCompletionStats: React.FC<ChefCompletionProps> = ({ language }) => {
  const isArabic = language === "ar";
  const [stats, setStats] = useState<ChefStats[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      const orders = await kitchenOrderService.getKitchenOrders();
      const completedOrders = orders.filter(order => order.status === 'completed');
      
      // Calculate completion rates
      const chefStats: { [key: string]: ChefStats } = {};
      
      orders.forEach(order => {
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
      
      // Calculate completion rates
      const statsArray = Object.values(chefStats).map(stat => ({
        ...stat,
        completionRate: Math.round((stat.completed / stat.total) * 100)
      }));
      
      setStats(statsArray);
    };
    
    loadStats();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isArabic ? "نسب إنجاز الشيفات" : "Chef Completion Rates"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="completionRate"
                name={isArabic ? "نسبة الإنجاز" : "Completion Rate"}
                fill="#4f46e5"
                label={{ position: 'top' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {stats.map((chef) => (
            <div key={chef.name} className="flex justify-between items-center p-2 border rounded">
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
      </CardContent>
    </Card>
  );
};

export default ChefCompletionStats;
