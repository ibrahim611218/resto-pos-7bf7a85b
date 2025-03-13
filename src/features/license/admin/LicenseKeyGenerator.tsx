
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LicenseType } from "@/types/license";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const LicenseKeyGenerator: React.FC = () => {
  const [licenseType, setLicenseType] = useState<LicenseType>("trial");
  const [quantity, setQuantity] = useState<number>(1);
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([]);

  // Generate a unique license key based on type and current date
  const generateLicenseKey = (type: LicenseType): string => {
    // Create type prefix
    let prefix = "";
    switch (type) {
      case "trial":
        prefix = "T";
        break;
      case "monthly":
        prefix = "M";
        break;
      case "yearly":
        prefix = "Y";
        break;
    }
    
    // Random alphanumeric characters
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const getRandomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));
    
    // Generate parts of the key
    const firstPart = prefix + Array(3).fill(0).map(() => getRandomChar()).join("");
    const secondPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    const thirdPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    const fourthPart = Array(4).fill(0).map(() => getRandomChar()).join("");
    
    return `${firstPart}-${secondPart}-${thirdPart}-${fourthPart}`;
  };

  const handleGenerateKeys = () => {
    const keys = Array(quantity)
      .fill(0)
      .map(() => generateLicenseKey(licenseType));
    setGeneratedKeys(keys);
    toast.success(`تم إنشاء ${quantity} مفتاح ترخيص`);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("تم نسخ المفتاح إلى الحافظة");
  };

  const handleCopyAllKeys = () => {
    navigator.clipboard.writeText(generatedKeys.join("\n"));
    toast.success("تم نسخ جميع المفاتيح إلى الحافظة");
  };

  const handleExportKeys = () => {
    // Create a CSV with license keys
    const header = "License Type,License Key\n";
    const rows = generatedKeys.map(key => `${licenseType},${key}`).join("\n");
    const csv = header + rows;
    
    // Create a blob and download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${licenseType}-licenses-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("تم تصدير المفاتيح إلى ملف CSV");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>منشئ مفاتيح الترخيص</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="license-type">نوع الترخيص</Label>
              <Select
                value={licenseType}
                onValueChange={(value) => setLicenseType(value as LicenseType)}
              >
                <SelectTrigger id="license-type">
                  <SelectValue placeholder="اختر نوع الترخيص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trial">نسخة تجريبية (14 يوم)</SelectItem>
                  <SelectItem value="monthly">اشتراك شهري</SelectItem>
                  <SelectItem value="yearly">اشتراك سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">عدد المفاتيح</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>
          
          <Button onClick={handleGenerateKeys} className="w-full">
            إنشاء مفاتيح الترخيص
          </Button>
          
          {generatedKeys.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">المفاتيح المُنشأة</h3>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCopyAllKeys}>
                    <Copy className="h-4 w-4 ml-2" />
                    نسخ الكل
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportKeys}>
                    <Download className="h-4 w-4 ml-2" />
                    تصدير CSV
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="text-right p-2">#</th>
                        <th className="text-right p-2">مفتاح الترخيص</th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedKeys.map((key, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 text-right">{index + 1}</td>
                          <td className="p-2 text-right font-mono">{key}</td>
                          <td className="p-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleCopyKey(key)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseKeyGenerator;
