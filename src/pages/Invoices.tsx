
import React from "react";
import {
  Search,
  Filter,
  Download,
  Printer,
  Mail,
  Receipt,
  FileSpreadsheet,
  FilePdf,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import GlassCard from "@/components/ui-custom/GlassCard";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import { toast } from "sonner";
import { Language, Invoice } from "@/types";

interface InvoicesProps {
  language: Language;
}

const Invoices = ({ language }: InvoicesProps) => {
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "completed" | "cancelled" | "refunded">("all");
  
  // Mock invoice data
  const invoices: Invoice[] = [
    {
      id: "1",
      number: "INV-20240501-001",
      date: new Date("2024-05-01T14:30:00"),
      items: [],
      subtotal: 145,
      taxAmount: 21.75,
      total: 166.75,
      paymentMethod: "Cash",
      customer: {
        name: "John Doe",
        phone: "+966 50 123 4567",
        email: "john@example.com",
      },
      cashierId: "1",
      cashierName: "Ahmed",
      status: "completed",
    },
    {
      id: "2",
      number: "INV-20240430-002",
      date: new Date("2024-04-30T12:15:00"),
      items: [],
      subtotal: 78.5,
      taxAmount: 11.78,
      total: 90.28,
      paymentMethod: "Credit Card",
      customer: {
        name: "Sarah Smith",
        phone: "+966 55 987 6543",
        email: "sarah@example.com",
      },
      cashierId: "2",
      cashierName: "Fatima",
      status: "completed",
    },
    {
      id: "3",
      number: "INV-20240430-003",
      date: new Date("2024-04-30T18:45:00"),
      items: [],
      subtotal: 210,
      taxAmount: 31.5,
      total: 241.5,
      paymentMethod: "Digital Wallet",
      cashierId: "1",
      cashierName: "Ahmed",
      status: "refunded",
    },
    {
      id: "4",
      number: "INV-20240429-004",
      date: new Date("2024-04-29T20:10:00"),
      items: [],
      subtotal: 124.75,
      taxAmount: 18.71,
      total: 143.46,
      paymentMethod: "Cash",
      cashierId: "3",
      cashierName: "Khalid",
      status: "cancelled",
    },
    {
      id: "5",
      number: "INV-20240429-005",
      date: new Date("2024-04-29T15:30:00"),
      items: [],
      subtotal: 95.25,
      taxAmount: 14.29,
      total: 109.54,
      paymentMethod: "Credit Card",
      customer: {
        name: "Mohammed Ali",
        phone: "+966 54 111 2222",
        email: "mohammed@example.com",
        taxNumber: "300000000000003",
      },
      cashierId: "2",
      cashierName: "Fatima",
      status: "completed",
    },
  ];
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-500/10";
      case "cancelled":
        return "text-red-500 bg-red-500/10";
      case "refunded":
        return "text-amber-500 bg-amber-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };
  
  const getStatusLabel = (status: string): string => {
    if (isArabic) {
      switch (status) {
        case "completed":
          return "مكتمل";
        case "cancelled":
          return "ملغي";
        case "refunded":
          return "مسترجع";
        default:
          return status;
      }
    } else {
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  const handleViewInvoice = (id: string) => {
    toast.info(
      isArabic
        ? `سيتم عرض تفاصيل الفاتورة ${id}`
        : `Invoice ${id} details would be displayed`
    );
  };
  
  const handlePrintInvoice = (id: string) => {
    toast.info(
      isArabic ? `سيتم طباعة الفاتورة ${id}` : `Invoice ${id} would be printed`
    );
  };
  
  const handleEmailInvoice = (id: string, email?: string) => {
    if (email) {
      toast.info(
        isArabic
          ? `سيتم إرسال الفاتورة ${id} إلى ${email}`
          : `Invoice ${id} would be emailed to ${email}`
      );
    } else {
      toast.error(
        isArabic
          ? "لا يوجد بريد إلكتروني للعميل"
          : "Customer email not available"
      );
    }
  };
  
  const handleDownloadInvoice = (id: string, format: "pdf" | "excel") => {
    toast.info(
      isArabic
        ? `سيتم تنزيل الفاتورة ${id} بصيغة ${format === "pdf" ? "PDF" : "Excel"}`
        : `Invoice ${id} would be downloaded as ${format === "pdf" ? "PDF" : "Excel"}`
    );
  };
  
  const filteredInvoices = filter === "all"
    ? invoices
    : invoices.filter((invoice) => invoice.status === filter);
    
  const searchedInvoices = searchTerm
    ? filteredInvoices.filter(
        (invoice) =>
          invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.cashierName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredInvoices;
  
  return (
    <div 
      className={`space-y-6 p-6 pb-16 ${isArabic ? "font-[system-ui]" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {isArabic ? "الفواتير" : "Invoices"}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              {isArabic ? "تصدير" : "Export"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => 
              toast.info(isArabic ? "سيتم تصدير جميع الفواتير بصيغة Excel" : "All invoices would be exported as Excel")
            }>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              {isArabic ? "تصدير كملف Excel" : "Export as Excel"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => 
              toast.info(isArabic ? "سيتم تصدير جميع الفواتير بصيغة PDF" : "All invoices would be exported as PDF")
            }>
              <FilePdf className="mr-2 h-4 w-4" />
              {isArabic ? "تصدير كملف PDF" : "Export as PDF"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={isArabic ? "بحث في الفواتير..." : "Search invoices..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {isArabic ? "تصفية حسب الحالة" : "Filter by Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("all")}>
              {isArabic ? "جميع الفواتير" : "All Invoices"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter("completed")}>
              {isArabic ? "مكتملة" : "Completed"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("cancelled")}>
              {isArabic ? "ملغية" : "Cancelled"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("refunded")}>
              {isArabic ? "مسترجعة" : "Refunded"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="space-y-4">
        {searchedInvoices.map((invoice, index) => (
          <GlassCard
            key={invoice.id}
            animation="fade"
            delay={index * 100}
            hover
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Receipt className="h-4 w-4 mr-2 text-primary" />
                  <h3 className="font-medium">{invoice.number}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(invoice.date)}
                </p>
              </div>
              
              <div className="mt-2 md:mt-0 flex items-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    invoice.status
                  )}`}
                >
                  {getStatusLabel(invoice.status)}
                </span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isArabic ? "العميل" : "Customer"}
                </p>
                <p className="font-medium">
                  {invoice.customer?.name || (isArabic ? "عميل عادي" : "Walk-in Customer")}
                </p>
                {invoice.customer?.phone && (
                  <p className="text-sm text-muted-foreground">{invoice.customer.phone}</p>
                )}
                {invoice.customer?.taxNumber && (
                  <p className="text-sm text-muted-foreground">
                    {isArabic ? "الرقم الضريبي: " : "Tax Number: "}
                    {invoice.customer.taxNumber}
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isArabic ? "تفاصيل الدفع" : "Payment Details"}
                </p>
                <p className="font-medium">
                  {isArabic
                    ? invoice.paymentMethod === "Cash"
                      ? "نقدًا"
                      : invoice.paymentMethod === "Credit Card"
                      ? "بطاقة ائتمان"
                      : "محفظة رقمية"
                    : invoice.paymentMethod}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? "الكاشير: " : "Cashier: "}
                  {invoice.cashierName}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isArabic ? "المبلغ" : "Amount"}
                </p>
                <p className="text-xl font-bold">
                  {invoice.total.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? "شامل ضريبة القيمة المضافة" : "VAT included"}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewInvoice(invoice.number)}
              >
                <Eye className="mr-2 h-4 w-4" />
                {isArabic ? "عرض" : "View"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePrintInvoice(invoice.number)}
              >
                <Printer className="mr-2 h-4 w-4" />
                {isArabic ? "طباعة" : "Print"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => 
                  handleEmailInvoice(invoice.number, invoice.customer?.email)
                }
                disabled={!invoice.customer?.email}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isArabic ? "إرسال بريد" : "Email"}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {isArabic ? "تنزيل" : "Download"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleDownloadInvoice(invoice.number, "pdf")}
                  >
                    <FilePdf className="mr-2 h-4 w-4" />
                    {isArabic ? "تنزيل كملف PDF" : "Download as PDF"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDownloadInvoice(invoice.number, "excel")}
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    {isArabic ? "تنزيل كملف Excel" : "Download as Excel"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </GlassCard>
        ))}
        
        {searchedInvoices.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">
              {isArabic ? "لا توجد فواتير" : "No invoices found"}
            </h3>
            <p className="text-muted-foreground">
              {isArabic
                ? "جرب تغيير معايير البحث أو التصفية"
                : "Try changing your search or filter criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
