
import React, { useState, useEffect } from 'react';
import { useLicense } from '@/features/auth/hooks/useLicense';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { License } from '@/services/license/LicenseService';
import { Copy, Download, Key } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const LicenseGenerator = () => {
  const { generateLicense, getAllLicenses } = useLicense();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [licenseType, setLicenseType] = useState<'trial' | 'full'>('trial');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authorized to access this page
  useEffect(() => {
    if (user?.email !== 'eng.ibrahimabdalfatah@gmail.com') {
      navigate('/unauthorized');
    }
  }, [user, navigate]);
  
  // Load licenses
  useEffect(() => {
    const loadLicenses = async () => {
      setIsLoading(true);
      try {
        const data = await getAllLicenses();
        setLicenses(data);
      } catch (error) {
        console.error('Error loading licenses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLicenses();
  }, [getAllLicenses]);
  
  const handleGenerateLicense = async () => {
    setIsGenerating(true);
    try {
      const license = await generateLicense(licenseType, durationDays);
      if (license) {
        setLicenses(prev => [license, ...prev]);
      }
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('تم نسخ رمز التفعيل');
  };
  
  const handleExportLicenses = () => {
    try {
      const exportData = licenses.map(license => ({
        'رمز التفعيل': license.key,
        'نوع الرخصة': license.type === 'trial' ? 'تجريبي' : 'كامل',
        'تاريخ الإصدار': format(new Date(license.issuedAt), 'yyyy-MM-dd'),
        'تاريخ الانتهاء': format(new Date(license.expiryDate), 'yyyy-MM-dd'),
        'المدة (بالأيام)': license.durationDays,
        'مستخدم': license.used ? 'نعم' : 'لا'
      }));
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `licenses-${format(new Date(), 'yyyy-MM-dd')}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
      toast.success('تم تصدير رموز التفعيل بنجاح');
    } catch (error) {
      console.error('Error exporting licenses:', error);
      toast.error('حدث خطأ أثناء تصدير رموز التفعيل');
    }
  };
  
  return (
    <div className="container p-4" dir="rtl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                onClick={handleExportLicenses}
              >
                <Download className="ml-2 h-4 w-4" />
                تصدير جميع رموز التفعيل
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>رموز التفعيل</CardTitle>
            <CardDescription>جميع رموز التفعيل التي تم إنشاؤها</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : licenses.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                لا توجد رموز تفعيل حتى الآن
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رمز التفعيل</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>المدة</TableHead>
                      <TableHead>تاريخ الانتهاء</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>نسخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licenses.map((license) => (
                      <TableRow key={license.key}>
                        <TableCell className="font-mono">{license.key}</TableCell>
                        <TableCell>
                          {license.type === 'trial' ? 'تجريبي' : 'كامل'}
                        </TableCell>
                        <TableCell>{license.durationDays} يوم</TableCell>
                        <TableCell>
                          {format(new Date(license.expiryDate), 'yyyy-MM-dd')}
                        </TableCell>
                        <TableCell>
                          {license.used ? (
                            <span className="text-destructive">مستخدم</span>
                          ) : (
                            <span className="text-primary">متاح</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyLicense(license.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LicenseGenerator;
