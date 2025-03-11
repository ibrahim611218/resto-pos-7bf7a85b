
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  initialImage = "/placeholder.svg", 
  onImageChange,
  className = ""
}) => {
  const [imagePreview, setImagePreview] = useState<string>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setImagePreview("/placeholder.svg");
    onImageChange("/placeholder.svg");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center overflow-hidden"
        style={{ height: className ? 'auto' : '200px' }}
      >
        {imagePreview !== "/placeholder.svg" ? (
          <div className="relative h-full w-full">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={clearImage}
            >
              <X size={14} />
            </Button>
          </div>
        ) : (
          <div className="text-center p-4 cursor-pointer" onClick={handleButtonClick}>
            <UploadCloud className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isArabic ? "انقر لتحميل صورة" : "Click to upload image"}
            </p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
