
import { useState, useEffect } from 'react';
import { BusinessSettings } from '@/types';

// قيم افتراضية لإعدادات المطعم
const defaultSettings: BusinessSettings = {
  name: "مطعم الذواق",
  nameAr: "مطعم الذواق",
  taxNumber: "300000000000003",
  address: "شارع الملك فهد، الرياض، المملكة العربية السعودية",
  addressAr: "شارع الملك فهد، الرياض، المملكة العربية السعودية",
  phone: "+966 50 000 0000",
  email: "info@restaurant.com",
  taxRate: 15,
  commercialRegister: "1010000000",
  commercialRegisterAr: "١٠١٠٠٠٠٠٠٠",
  invoiceNotes: "شكراً لزيارتكم، نتمنى أن تزورونا مرة أخرى",
  invoiceNotesAr: "شكراً لزيارتكم، نتمنى أن تزورونا مرة أخرى",
};

export const useBusinessSettings = () => {
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    // محاولة استرداد الإعدادات من التخزين المحلي
    const savedSettings = localStorage.getItem('businessSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // حفظ الإعدادات في التخزين المحلي عند تغييرها
  useEffect(() => {
    localStorage.setItem('businessSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
};
