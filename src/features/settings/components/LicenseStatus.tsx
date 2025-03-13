
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLicense } from "@/hooks/useLicense";
import { Calendar, Clock, Lock, Unlock, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface LicenseStatusProps {
  isArabic: boolean;
}

const LicenseStatus: React.FC<LicenseStatusProps> = ({ isArabic }) => {
  const { licenseState, loading, deactivateLicense } = useLicense();
  
  const getLicenseTypeLabel = () => {
    switch (licenseState.licenseType) {
      case 'trial':
        return isArabic ? 'نسخة تجريبية' : 'Trial';
      case 'monthly':
        return isArabic ? 'اشتراك شهري' : 'Monthly Subscription';
      case 'yearly':
        return isArabic ? 'اشتراك سنوي' : 'Yearly Subscription';
      default:
        return isArabic ? 'غير معروف' : 'Unknown';
    }
  };
  
  const getBadgeVariant = () => {
    if (!licenseState.isLicensed) return "destructive";
    if (licenseState.isTrial) return "secondary";
    return "default";
  };
  
  const formatDate = (isoDate: string) => {
    try {
      return format(
        new Date(isoDate), 
        'PPP', 
        { locale: isArabic ? ar : undefined }
      );
    } catch (e) {
      return isArabic ? 'تاريخ غير صالح' : 'Invalid date';
    }
  };
  
  const handleDeactivateLicense = async () => {
    if (window.confirm(isArabic 
      ? 'هل أنت متأكد من رغبتك في إلغاء تفعيل الترخيص؟ سيتوقف البرنامج عن العمل حتى يتم إعادة التفعيل.'
      : 'Are you sure you want to deactivate your license? The application will stop working until it is reactivated.'
    )) {
      await deactivateLicense();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isArabic ? 'معلومات الترخيص' : 'License Information'}
        </CardTitle>
        <CardDescription>
          {isArabic ? 'تفاصيل ترخيص البرنامج الخاص بك' : 'Your software license details'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {licenseState.isLicensed ? (
                <Lock className="h-5 w-5 ml-2 text-green-500" />
              ) : (
                <Unlock className="h-5 w-5 ml-2 text-red-500" />
              )}
              <span className="font-medium">
                {isArabic ? 'حالة الترخيص:' : 'License Status:'}
              </span>
            </div>
            <Badge variant={getBadgeVariant()}>
              {licenseState.isLicensed
                ? (licenseState.isTrial 
                    ? (isArabic ? 'نسخة تجريبية' : 'Trial') 
                    : (isArabic ? 'مُفعل' : 'Active'))
                : (isArabic ? 'غير مُفعل' : 'Inactive')}
            </Badge>
          </div>
          
          {licenseState.isLicensed && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 ml-2 text-blue-500" />
                  <span className="font-medium">
                    {isArabic ? 'نوع الترخيص:' : 'License Type:'}
                  </span>
                </div>
                <span>{getLicenseTypeLabel()}</span>
              </div>
              
              {licenseState.expiresAt && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 ml-2 text-orange-500" />
                    <span className="font-medium">
                      {isArabic ? 'تاريخ الانتهاء:' : 'Expiry Date:'}
                    </span>
                  </div>
                  <span>{formatDate(licenseState.expiresAt)}</span>
                </div>
              )}
              
              {licenseState.daysRemaining !== undefined && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 ml-2 text-purple-500" />
                    <span className="font-medium">
                      {isArabic ? 'الأيام المتبقية:' : 'Days Remaining:'}
                    </span>
                  </div>
                  <span>
                    {licenseState.daysRemaining} {isArabic ? 'يوم' : 'days'}
                  </span>
                </div>
              )}
              
              {licenseState.daysRemaining !== undefined && licenseState.daysRemaining < 7 && (
                <div className="flex items-start mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 ml-2 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800">
                      {isArabic 
                        ? 'ترخيصك على وشك الانتهاء. يرجى تجديد الاشتراك للاستمرار في استخدام البرنامج.'
                        : 'Your license is about to expire. Please renew your subscription to continue using the software.'}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          
          {licenseState.isLicensed && (
            <Button variant="destructive" onClick={handleDeactivateLicense} disabled={loading}>
              {isArabic ? 'إلغاء تفعيل الترخيص' : 'Deactivate License'}
            </Button>
          )}
          
          {!licenseState.isLicensed && (
            <Button variant="default" onClick={() => window.location.href = '/activate'} disabled={loading}>
              {isArabic ? 'تفعيل الترخيص' : 'Activate License'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseStatus;
