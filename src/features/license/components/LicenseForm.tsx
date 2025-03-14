
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { useLicense } from '@/features/auth/hooks/useLicense';

type LicenseFormProps = {
  onLicenseGenerated: (license: any) => void;
  onExportLicenses: () => void;
};

const LicenseForm: React.FC<LicenseFormProps> = ({ 
  onLicenseGenerated, 
  onExportLicenses 
}) => {
  const { generateLicense } = useLicense();
  const [licenseType, setLicenseType] = useState<'trial' | 'full'>('trial');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateLicense = async () => {
    setIsGenerating(true);
    try {
      const license = await generateLicense(licenseType, durationDays);
      if (license) {
        onLicenseGenerated(license);
      }
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>إنشاء رمز تفعيل جديد</CardTitle>
        <CardDescription>قم بإنشاء رموز تفعيل للعملاء</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license-type">نوع الترخيص</Label>
            <Select 
              value={licenseType} 
              onValueChange={(value) => setLicenseType(value as 'trial' | 'full')}
            >
              <SelectTrigger id="license-type">
                <SelectValue placeholder="اختر نوع الترخيص" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trial">تجريبي</SelectItem>
                <SelectItem value="full">إصدار كامل</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">مدة الترخيص (بالأيام)</Label>
            <Input
              id="duration"
              type="number"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              min={1}
              max={3650}
            />
          </div>
          
          <Button 
            onClick={handleGenerateLicense}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? 'جاري الإنشاء...' : 'إنشاء رمز تفعيل'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onExportLicenses}
          >
            <Download className="ml-2 h-4 w-4" />
            تصدير جميع رموز التفعيل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseForm;
