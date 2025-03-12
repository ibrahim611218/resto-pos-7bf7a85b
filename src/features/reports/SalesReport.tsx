
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";

const mockSalesData = [
  { name: "يناير", sales: 4000 },
  { name: "فبراير", sales: 3000 },
  { name: "مارس", sales: 2000 },
  { name: "أبريل", sales: 2780 },
  { name: "مايو", sales: 1890 },
  { name: "يونيو", sales: 2390 },
  { name: "يوليو", sales: 3490 },
];

const SalesReport: React.FC = () => {
  const [reportType, setReportType] = useState("daily");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const handleExportPDF = () => {
    console.log("Exporting report as PDF");
    // PDF export implementation will go here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">تقارير المبيعات</h1>
          <p className="text-muted-foreground">عرض وتحليل بيانات المبيعات</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="نوع التقرير" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">يومي</SelectItem>
              <SelectItem value="weekly">أسبوعي</SelectItem>
              <SelectItem value="monthly">شهري</SelectItem>
              <SelectItem value="yearly">سنوي</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start">
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {startDate ? format(startDate, "yyyy/MM/dd") : "تاريخ البداية"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start">
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {endDate ? format(endDate, "yyyy/MM/dd") : "تاريخ النهاية"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button onClick={handleExportPDF}>
            <Download className="ml-2 h-4 w-4" />
            تصدير PDF
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تقرير المبيعات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={mockSalesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="المبيعات" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReport;
