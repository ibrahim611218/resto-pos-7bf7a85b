
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
              <img src="/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png" alt="Default Logo" className="h-20 w-20 mb-2" />
            </div>
          )}
        </div>
      </div>
      <Button type="button" variant="outline" className="mt-2 border-[#00825A] text-[#00825A] hover:bg-[#00825A] hover:text-white" onClick={() => document.getElementById('logo-upload')?.click()}>
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
