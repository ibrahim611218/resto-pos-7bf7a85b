
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterCardProps {
  startDate?: Date;
  setStartDate: (date?: Date) => void;
  endDate?: Date;
  setEndDate: (date?: Date) => void;
  paymentMethod?: string;
  setPaymentMethod: (method: string) => void;
  orderType?: string;
  setOrderType: (type: string) => void;
  cashier?: string;
  setCashier: (id: string) => void;
  includeRefunded: boolean;
  setIncludeRefunded: (include: boolean) => void;
  resetFilters: () => void;
  uniqueUsers: { id: string, name: string }[];
  isArabic: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  paymentMethod,
  setPaymentMethod,
  orderType,
  setOrderType,
  cashier,
  setCashier,
  includeRefunded,
  setIncludeRefunded,
  resetFilters,
  uniqueUsers,
  isArabic
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {isArabic ? "تصفية البيانات" : "Filter Data"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>
              {isArabic ? "من تاريخ" : "Start Date"}
            </Label>
            <DatePicker
              selected={startDate}
              onSelect={setStartDate}
              placeholderText={isArabic ? "اختر تاريخ البداية" : "Select start date"}
            />
          </div>
          <div className="space-y-2">
            <Label>
              {isArabic ? "إلى تاريخ" : "End Date"}
            </Label>
            <DatePicker
              selected={endDate}
              onSelect={setEndDate}
              placeholderText={isArabic ? "اختر تاريخ النهاية" : "Select end date"}
            />
          </div>
          <div className="space-y-2">
            <Label>
              {isArabic ? "طريقة الدفع" : "Payment Method"}
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? "جميع طرق الدفع" : "All payment methods"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isArabic ? "جميع طرق الدفع" : "All payment methods"}</SelectItem>
                <SelectItem value="cash">{isArabic ? "نقدي" : "Cash"}</SelectItem>
                <SelectItem value="card">{isArabic ? "بطاقة" : "Card"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>
              {isArabic ? "نوع الطلب" : "Order Type"}
            </Label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? "جميع أنواع الطلبات" : "All order types"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isArabic ? "جميع أنواع الطلبات" : "All order types"}</SelectItem>
                <SelectItem value="takeaway">{isArabic ? "سفري" : "Takeaway"}</SelectItem>
                <SelectItem value="dineIn">{isArabic ? "محلي" : "Dine In"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>
              {isArabic ? "المستخدم" : "User"}
            </Label>
            <Select value={cashier} onValueChange={setCashier}>
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? "جميع المستخدمين" : "All users"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isArabic ? "جميع المستخدمين" : "All users"}</SelectItem>
                {uniqueUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>
              {isArabic ? "الفواتير المستردة" : "Refunded Invoices"}
            </Label>
            <Select 
              value={includeRefunded ? "include" : "exclude"} 
              onValueChange={(val) => setIncludeRefunded(val === "include")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="include">
                  {isArabic ? "تضمين الفواتير المستردة" : "Include refunded"}
                </SelectItem>
                <SelectItem value="exclude">
                  {isArabic ? "استبعاد الفواتير المستردة" : "Exclude refunded"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" onClick={resetFilters} className="w-full">
              {isArabic ? "إعادة تعيين الفلاتر" : "Reset Filters"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
