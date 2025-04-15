
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, RefreshCw } from "lucide-react";

interface ReportHeaderProps {
  itemCount: number;
  isArabic: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  itemCount,
  isArabic,
  searchTerm,
  onSearchChange,
  onRefresh
}) => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {isArabic ? "تقرير المخزون" : "Inventory Report"}
        </h1>
        <p className="text-muted-foreground">
          {isArabic 
            ? `${itemCount} منتج في المخزون` 
            : `${itemCount} items in inventory`}
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <SearchIcon 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={18} 
          />
          <Input
            type="text"
            placeholder={isArabic ? "بحث في المخزون..." : "Search inventory..."}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`pl-8 ${isArabic ? 'text-right pr-8 pl-4' : 'text-left'}`}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onRefresh}
          className="ml-2"
          title={isArabic ? "تحديث بيانات المخزون" : "Refresh inventory data"}
        >
          <RefreshCw size={18} />
        </Button>
      </div>
    </>
  );
};

export default ReportHeader;
