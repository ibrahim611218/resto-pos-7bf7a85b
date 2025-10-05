import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSettings } from '@/types';

interface InvoiceDisplaySettingsProps {
  settings: BusinessSettings;
  isArabic: boolean;
  onSwitchChange: (name: string, checked: boolean) => void;
}

const InvoiceDisplaySettings: React.FC<InvoiceDisplaySettingsProps> = ({
  settings,
  isArabic,
  onSwitchChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isArabic ? 'إعدادات عرض الفاتورة' : 'Invoice Display Settings'}</CardTitle>
        <CardDescription>
          {isArabic 
            ? 'تحكم في العناصر المعروضة في الفاتورة' 
            : 'Control which elements are displayed on the invoice'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="taxEnabled" className="flex-1">
            {isArabic ? 'تفعيل الضريبة' : 'Enable Tax'}
            <p className="text-sm text-muted-foreground mt-1">
              {isArabic 
                ? 'عند التفعيل سيتم إظهار الرقم الضريبي والضريبة في الفاتورة' 
                : 'When enabled, tax number and tax will be shown on invoice'}
            </p>
          </Label>
          <Switch
            id="taxEnabled"
            checked={settings.taxEnabled !== false}
            onCheckedChange={(checked) => onSwitchChange('taxEnabled', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showAddress" className="flex-1">
            {isArabic ? 'إظهار العنوان' : 'Show Address'}
            <p className="text-sm text-muted-foreground mt-1">
              {isArabic 
                ? 'عرض عنوان المؤسسة في الفاتورة' 
                : 'Display business address on invoice'}
            </p>
          </Label>
          <Switch
            id="showAddress"
            checked={settings.showAddress !== false}
            onCheckedChange={(checked) => onSwitchChange('showAddress', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showPhone" className="flex-1">
            {isArabic ? 'إظهار رقم الجوال' : 'Show Phone Number'}
            <p className="text-sm text-muted-foreground mt-1">
              {isArabic 
                ? 'عرض رقم الجوال في الفاتورة' 
                : 'Display phone number on invoice'}
            </p>
          </Label>
          <Switch
            id="showPhone"
            checked={settings.showPhone !== false}
            onCheckedChange={(checked) => onSwitchChange('showPhone', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showEmail" className="flex-1">
            {isArabic ? 'إظهار البريد الإلكتروني' : 'Show Email'}
            <p className="text-sm text-muted-foreground mt-1">
              {isArabic 
                ? 'عرض البريد الإلكتروني في الفاتورة' 
                : 'Display email on invoice'}
            </p>
          </Label>
          <Switch
            id="showEmail"
            checked={settings.showEmail !== false}
            onCheckedChange={(checked) => onSwitchChange('showEmail', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showRestoPOSBranding" className="flex-1">
            {isArabic ? 'إظهار علامة RestoPOS' : 'Show RestoPOS Branding'}
            <p className="text-sm text-muted-foreground mt-1">
              {isArabic 
                ? 'عرض "تم إنشاؤها بواسطة نظام RestoPOS" في أسفل الفاتورة' 
                : 'Show "Created by RestoPOS" at the bottom of invoice'}
            </p>
          </Label>
          <Switch
            id="showRestoPOSBranding"
            checked={settings.showRestoPOSBranding !== false}
            onCheckedChange={(checked) => onSwitchChange('showRestoPOSBranding', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDisplaySettings;
