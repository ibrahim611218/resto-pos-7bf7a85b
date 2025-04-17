
import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface InvoiceQRCodeProps {
  qrCodeData: string;
  notes?: string;
}

export const InvoiceQRCode: React.FC<InvoiceQRCodeProps> = ({ 
  qrCodeData,
  notes
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const parsedData = React.useMemo(() => {
    try {
      return JSON.parse(qrCodeData);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      return { total: 0 };
    }
  }, [qrCodeData]);

  return (
    <>
      <div className="flex flex-col items-center gap-3 print:block print:w-full qr-code-container" style={{pageBreakInside: 'avoid'}}>
        {/* Main QR Code */}
        <div 
          className={`p-1 rounded border ${isDark ? 'bg-white' : 'bg-white'} border-gray-200 print:bg-white print:mx-auto print:my-2 print:block qr-code`}
          style={{minHeight: '100px', minWidth: '100px'}}
        >
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrCodeData)}&margin=5`}
            alt="QR Code" 
            width={90}
            height={90}
            style={{
              width: '90px',
              height: '90px',
              display: 'block',
              margin: '0 auto'
            }}
            className="print:block"
          />
        </div>
      </div>
      
      {notes && (
        <div className="text-center text-sm text-muted-foreground border-t pt-2">
          {notes}
        </div>
      )}
    </>
  );
};

