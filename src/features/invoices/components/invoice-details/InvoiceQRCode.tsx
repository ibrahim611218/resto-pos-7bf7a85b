
import React from "react";
import { QRCodeSVG } from "qrcode.react";
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
  
  return (
    <>
      <div className="flex justify-center">
        <div className={`p-2 rounded border ${isDark ? 'bg-white' : 'bg-white'} border-gray-200`}>
          <QRCodeSVG 
            value={qrCodeData} 
            size={120}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
            includeMargin={true}
            style={{
              width: '100px',
              height: '100px',
              display: 'inline-block'
            }}
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
