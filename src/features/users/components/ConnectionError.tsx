
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectionErrorProps {
  isArabic: boolean;
  errorDetails: string | null;
  connectionLoading: boolean;
  handleReconnect: () => void;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({
  isArabic,
  errorDetails,
  connectionLoading,
  handleReconnect
}) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {isArabic ? "خطأ في الاتصال" : "Connection Error"}
      </AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          {isArabic 
            ? "فشل الاتصال بقاعدة البيانات. يرجى التحقق من الإعدادات." 
            : "Failed to connect to the database. Please check your settings."}
        </p>
        {errorDetails && (
          <div className="text-xs opacity-70">
            {isArabic ? "تفاصيل الخطأ: " : "Error details: "} 
            {errorDetails}
          </div>
        )}
        <div className="mt-2">
          <Button 
            variant="destructive" 
            onClick={handleReconnect} 
            disabled={connectionLoading}
            className="mt-2"
          >
            {connectionLoading 
              ? (isArabic ? "جاري الاتصال..." : "Connecting...") 
              : (isArabic ? "إعادة الاتصال" : "Reconnect")}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionError;
