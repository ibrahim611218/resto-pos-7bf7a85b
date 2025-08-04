import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DailyClosingService } from '@/services/dailyClosingService';
import { DailyClosing } from '@/types/dailyClosing';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface DailyClosingManagerProps {
  isArabic: boolean;
}

const DailyClosingManager: React.FC<DailyClosingManagerProps> = ({ isArabic }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentSession, setCurrentSession] = useState<DailyClosing | null>(null);
  const [openingCash, setOpeningCash] = useState<string>('');
  const [actualCash, setActualCash] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<string>('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  
  const dailyService = new DailyClosingService();

  useEffect(() => {
    loadCurrentSession();
  }, []);

  const loadCurrentSession = () => {
    const session = dailyService.getCurrentSession();
    setCurrentSession(session);
  };

  const startNewDay = () => {
    const amount = parseFloat(openingCash);
    if (isNaN(amount) || amount < 0) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى إدخال مبلغ صحيح" : "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const session = dailyService.startNewSession(amount, user?.id || '');
    setCurrentSession(session);
    setOpeningCash('');
    
    toast({
      title: isArabic ? "تم البدء" : "Started",
      description: isArabic ? "تم بدء يومية جديدة" : "New daily session started"
    });
  };

  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0 || !expenseDescription.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى إدخال بيانات المصروف بشكل صحيح" : "Please enter valid expense data",
        variant: "destructive"
      });
      return;
    }

    const success = dailyService.addExpense({
      amount,
      description: expenseDescription,
      category: expenseCategory || 'عام',
      timestamp: new Date().toISOString(),
      addedBy: user?.id || ''
    });

    if (success) {
      loadCurrentSession();
      setExpenseAmount('');
      setExpenseDescription('');
      setExpenseCategory('');
      
      toast({
        title: isArabic ? "تم الإضافة" : "Added",
        description: isArabic ? "تم إضافة المصروف" : "Expense added successfully"
      });
    }
  };

  const closeDay = () => {
    const amount = parseFloat(actualCash);
    if (isNaN(amount) || amount < 0) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى إدخال مبلغ الكاش الفعلي" : "Please enter actual cash amount",
        variant: "destructive"
      });
      return;
    }

    const success = dailyService.closeSession(amount, user?.id || '');
    if (success) {
      setCurrentSession(null);
      setActualCash('');
      
      toast({
        title: isArabic ? "تم الإغلاق" : "Closed",
        description: isArabic ? "تم إغلاق اليومية بنجاح" : "Daily session closed successfully"
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  if (!currentSession) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {isArabic ? "بدء يومية جديدة" : "Start New Daily Session"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="openingCash">
                {isArabic ? "الكاش الافتتاحي" : "Opening Cash"}
              </Label>
              <Input
                id="openingCash"
                type="number"
                step="0.01"
                value={openingCash}
                onChange={(e) => setOpeningCash(e.target.value)}
                placeholder={isArabic ? "أدخل المبلغ الافتتاحي" : "Enter opening amount"}
              />
            </div>
            <Button onClick={startNewDay} className="w-full">
              <Clock className="h-4 w-4 mr-2" />
              {isArabic ? "بدء اليومية" : "Start Session"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {isArabic ? "اليومية النشطة" : "Active Session"}
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {new Date(currentSession.date).toLocaleDateString('ar-SA')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(currentSession.openingCash)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isArabic ? "الافتتاحي" : "Opening"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(currentSession.totalSales)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isArabic ? "المبيعات" : "Sales"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(currentSession.totalExpenses)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isArabic ? "المصروفات" : "Expenses"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(currentSession.expectedCash)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isArabic ? "الكاش المتوقع" : "Expected Cash"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Expense */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            {isArabic ? "إضافة مصروف" : "Add Expense"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="expenseAmount">
                {isArabic ? "المبلغ" : "Amount"}
              </Label>
              <Input
                id="expenseAmount"
                type="number"
                step="0.01"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="expenseDescription">
                {isArabic ? "الوصف" : "Description"}
              </Label>
              <Input
                id="expenseDescription"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                placeholder={isArabic ? "وصف المصروف" : "Expense description"}
              />
            </div>
            <div>
              <Label htmlFor="expenseCategory">
                {isArabic ? "الفئة" : "Category"}
              </Label>
              <Input
                id="expenseCategory"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                placeholder={isArabic ? "فئة المصروف" : "Expense category"}
              />
            </div>
          </div>
          <Button onClick={addExpense} className="w-full">
            <TrendingDown className="h-4 w-4 mr-2" />
            {isArabic ? "إضافة مصروف" : "Add Expense"}
          </Button>
        </CardContent>
      </Card>

      {/* Sales Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {isArabic ? "ملخص المبيعات" : "Sales Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(currentSession.cashSales)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isArabic ? "مبيعات كاش" : "Cash Sales"}
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-600">
                {formatCurrency(currentSession.cardSales)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isArabic ? "مبيعات شبكة" : "Card Sales"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Close Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            {isArabic ? "إغلاق اليومية" : "Close Session"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="actualCash">
              {isArabic ? "الكاش الفعلي في الدرج" : "Actual Cash in Drawer"}
            </Label>
            <Input
              id="actualCash"
              type="number"
              step="0.01"
              value={actualCash}
              onChange={(e) => setActualCash(e.target.value)}
              placeholder={isArabic ? "أدخل الكاش الفعلي" : "Enter actual cash amount"}
            />
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">
              {isArabic ? "الكاش المتوقع:" : "Expected Cash:"}
            </div>
            <div className="text-lg font-bold">
              {formatCurrency(currentSession.expectedCash)}
            </div>
          </div>

          <Button onClick={closeDay} className="w-full" variant="destructive">
            <XCircle className="h-4 w-4 mr-2" />
            {isArabic ? "إغلاق اليومية" : "Close Session"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyClosingManager;