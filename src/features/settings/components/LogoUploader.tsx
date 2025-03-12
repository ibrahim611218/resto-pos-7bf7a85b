
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface LogoUploaderProps {
  logo: string | null;
  isArabic: boolean;
  onLogoChange: (logo: string) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ logo, isArabic, onLogoChange }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(logo);
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        onLogoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="border rounded-md p-4 space-y-4 text-center">
      <Label htmlFor="logo">{isArabic ? "شعار المطعم" : "Restaurant Logo"}</Label>
      <div className="flex justify-center">
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 w-40 h-40 flex flex-col items-center justify-center">
          {logoPreview || logo ? (
            <img 
              src={logoPreview || logo} 
              alt="Restaurant Logo" 
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center">
              <img src="/assets/restopos-logo.png" alt="Default Logo" className="h-16 w-16 mb-2" />
              <div className="text-sm text-center">
                <span className="text-[#004d40] font-bold">Resto</span>
                <span className="text-orange-500 font-bold">POS</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Button type="button" variant="outline" className="mt-2 border-[#004d40] text-[#004d40] hover:bg-[#004d40] hover:text-white" onClick={() => document.getElementById('logo-upload')?.click()}>
        <Upload className="ml-2" size={16} />
        {isArabic ? "رفع شعار" : "Upload Logo"}
      </Button>
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoChange}
      />
    </div>
  );
};

export default LogoUploader;
