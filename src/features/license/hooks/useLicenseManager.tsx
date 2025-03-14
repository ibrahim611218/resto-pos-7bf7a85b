
import { useState, useEffect } from 'react';
import { useLicense } from '@/features/auth/hooks/useLicense';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { License } from '@/services/license/LicenseService';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const useLicenseManager = () => {
  const { generateLicense, getAllLicenses } = useLicense();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authorization
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
  
  const handleLicenseGenerated = (license: License) => {
    setLicenses(prev => [license, ...prev]);
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
  
  return {
    licenses,
    isLoading,
    handleLicenseGenerated,
    handleCopyLicense,
    handleExportLicenses
  };
};
