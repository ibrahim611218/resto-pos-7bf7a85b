

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useBusinessSettings } from '@/hooks/useBusinessSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import GeneralInfo from './components/general-info/GeneralInfo';
import ContactInformation from './components/contact-info/ContactInformation';
import TaxSettings from './components/tax-settings/TaxSettings';
import WorkHoursSettings from './components/work-hours/WorkHoursSettings';
import { TouchModeSettings } from './components/touch-mode/TouchModeSettings';
import { WindowSizeSettings } from './components/window-size/WindowSizeSettings';
import DataManagement from './components/DataManagement';
import BackupManagement from './components/BackupManagement';
import backupService from '@/services/backup/BackupService';

const BusinessSettingsForm: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { settings, updateSettings, loading } = useBusinessSettings();
  const [activeTab, setActiveTab] = useState('general');
  const [localSettings, setLocalSettings] = useState(settings);

  // تفعيل النسخ الاحتياطي التلقائي عند تحميل المكون
  useEffect(() => {
    backupService.setupAutoBackup(60); // كل ساعة
  }, []);

  // تحديث الإعدادات المحلية عند تغيير الإعدادات من الخادم
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setLocalSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSave = async () => {
    try {
      await updateSettings(localSettings);
      toast.success(isArabic ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(isArabic ? 'فشل في حفظ الإعدادات' : 'Failed to save settings');
    }
  };

  const tabs = [
    {
      id: 'general',
      label: isArabic ? 'المعلومات العامة' : 'General Info',
      component: <GeneralInfo settings={localSettings} isArabic={isArabic} onChange={handleSettingsChange} />
    },
    {
      id: 'contact',
      label: isArabic ? 'معلومات الاتصال' : 'Contact Information',
      component: <ContactInformation settings={localSettings} isArabic={isArabic} onChange={handleSettingsChange} />
    },
    {
      id: 'tax',
      label: isArabic ? 'إعدادات الضرائب' : 'Tax Settings',
      component: <TaxSettings settings={localSettings} isArabic={isArabic} onChange={handleSettingsChange} onSwitchChange={handleSwitchChange} />
    },
    {
      id: 'hours',
      label: isArabic ? 'ساعات العمل' : 'Work Hours',
      component: <WorkHoursSettings settings={localSettings} isArabic={isArabic} onChange={handleSettingsChange} />
    },
    {
      id: 'display',
      label: isArabic ? 'إعدادات العرض' : 'Display Settings',
      component: (
        <div className="space-y-6">
          <TouchModeSettings settings={{touchMode: false}} toggleTouchMode={() => {}} isArabic={isArabic} />
          <WindowSizeSettings 
            windowSize={{width: '1024', height: '768'}} 
            setWindowSize={() => {}} 
            applyWindowSize={() => {}} 
            maximizeWindow={() => {}} 
            isArabic={isArabic} 
          />
        </div>
      )
    },
    {
      id: 'backup',
      label: isArabic ? 'النسخ الاحتياطية' : 'Backup & Restore',
      component: <BackupManagement />
    },
    {
      id: 'data',
      label: isArabic ? 'إدارة البيانات' : 'Data Management',
      component: <DataManagement />
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? 'إعدادات الأعمال' : 'Business Settings'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-7 w-full">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                {tab.component}
              </TabsContent>
            ))}
          </Tabs>

          <Separator className="my-6" />

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ الإعدادات' : 'Save Settings')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessSettingsForm;

