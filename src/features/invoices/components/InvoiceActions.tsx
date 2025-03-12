import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Printer, FileText, RotateCcw, ChevronLeft, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Invoice } from "@/types";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface InvoiceActionsProps {
  invoice: Invoice;
  onBack?: () => void;
  onExport?: (type: "print" | "pdf" | "email") => void;
  onReturn?: (invoice: Invoice) => void;
  onPrint?: (invoice: Invoice) => void;
}

const InvoiceActions: React.FC<InvoiceActionsProps> = ({
  invoice,
  onBack,
  onExport,
  onReturn,
  onPrint
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isArabic = language === "ar";
  const isAdminOrManager = user?.role === "admin" || user?.role === "manager";

  return (
    <div className="flex justify-between items-center">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="p-0">
          <ChevronLeft className="mr-1" size={16} />
          {isArabic ? "العودة" : "Back"}
        </Button>
      )}

      <div className="flex space-x-2">
        {onPrint && (
          <Button variant="outline" size="sm" onClick={() => onPrint(invoice)}>
            <Printer className="mr-2" size={14} />
            {isArabic ? "طباعة" : "Print"}
          </Button>
        )}

        {isAdminOrManager && onReturn && invoice.status !== "refunded" && (
          <Button variant="outline" size="sm" onClick={() => onReturn(invoice)}>
            <RotateCcw className="mr-2" size={14} />
            {isArabic ? "إرجاع الطلب" : "Return Order"}
          </Button>
        )}

        {onExport && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExport("print")}>
                <Printer className="mr-2" size={14} />
                {isArabic ? "طباعة" : "Print"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("pdf")}>
                <FileText className="mr-2" size={14} />
                {isArabic ? "تصدير PDF" : "Export PDF"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("email")}>
                <Mail className="mr-2" size={14} />
                {isArabic ? "إرسال بالبريد" : "Email"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default InvoiceActions;
