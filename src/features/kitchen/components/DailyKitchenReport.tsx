
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Language } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import kitchenOrderService from '@/services/kitchen/KitchenOrderService';

interface DailyStats {
  totalOrders: number;
  completedOrders: number;
  completionRate: number;
  averageCompletionTime: number;
}

export const DailyKitchenReport = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Cleanup old orders first
        await kitchenOrderService.cleanupOldOrders();
        
        // Then load today's stats
        const dailyStats = await kitchenOrderService.getDailyStats();
        setStats(dailyStats);
      } catch (error) {
        console.error('Error loading kitchen stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isArabic ? "تقرير المطبخ اليومي" : "Daily Kitchen Report"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {isArabic ? "إجمالي الطلبات" : "Total Orders"}
            </p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {isArabic ? "الطلبات المكتملة" : "Completed Orders"}
            </p>
            <p className="text-2xl font-bold">{stats.completedOrders}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {isArabic ? "نسبة الإنجاز" : "Completion Rate"}
            </p>
            <p className="text-2xl font-bold">{stats.completionRate.toFixed(1)}%</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {isArabic ? "متوسط وقت التحضير" : "Average Preparation Time"}
            </p>
            <p className="text-2xl font-bold">
              {stats.averageCompletionTime.toFixed(1)}{" "}
              {isArabic ? "دقيقة" : "min"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyKitchenReport;
