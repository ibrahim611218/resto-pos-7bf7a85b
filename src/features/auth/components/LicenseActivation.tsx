
import React, { useState } from 'react';
import { useLicense } from '../hooks/useLicense';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, KeyRound, Mail, Lock } from 'lucide-react';
import logo from '/assets/restopos-logo.png';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LicenseActivation = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { activateLicense } = useLicense();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!licenseKey.trim()) {
      toast.error('الرجاء إدخال رمز التفعيل');
      return;
    }
    
    setIsActivating(true);
    try {
      const result = await activateLicense(licenseKey.trim());
      if (result) {
        navigate('/');
      }
    } finally {
      setIsActivating(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    
    setIsLoggingIn(true);
    try {
      const success = login(email.trim(), password.trim());
      if (success) {
        navigate('/license-generator');
      } else {
        toast.error('بيانات غير صحيحة');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20">
            <img src={logo} alt="NectarPOS Logo" className="w-full" />
          </div>
          <CardTitle className="text-2xl">تفعيل البرنامج</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="activation" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="activation">تفعيل البرنامج</TabsTrigger>
              <TabsTrigger value="admin">دخول المسؤول</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activation">
              <form onSubmit={handleActivate} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="licenseKey" className="text-sm font-medium">
                    رمز التفعيل
                  </label>
                  <div className="flex items-center space-x-2 border rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                    <span className="px-3 py-2 bg-muted">
                      <KeyRound className="h-5 w-5 text-muted-foreground" />
                    </span>
                    <Input
                      id="licenseKey"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      className="flex-1 border-0 focus-visible:ring-0"
                      placeholder="أدخل رمز التفعيل"
                      dir="ltr"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isActivating}>
                  {isActivating ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري التفعيل...
                    </>
                  ) : (
                    'تفعيل البرنامج'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    البريد الإلكتروني
                  </label>
                  <div className="flex items-center space-x-2 border rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                    <span className="px-3 py-2 bg-muted">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </span>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 border-0 focus-visible:ring-0"
                      placeholder="أدخل البريد الإلكتروني"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    كلمة المرور
                  </label>
                  <div className="flex items-center space-x-2 border rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                    <span className="px-3 py-2 bg-muted">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </span>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 border-0 focus-visible:ring-0"
                      placeholder="أدخل كلمة المرور"
                      dir="ltr"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            إذا لم يكن لديك رمز تفعيل، يرجى التواصل مع المسؤول
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 NectarPOS. جميع الحقوق محفوظة
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LicenseActivation;
