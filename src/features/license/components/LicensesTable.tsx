
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { format } from 'date-fns';
import { License } from '@/services/license/LicenseService';

type LicensesTableProps = {
  licenses: License[];
  isLoading: boolean;
  onCopyLicense: (key: string) => void;
};

const LicensesTable: React.FC<LicensesTableProps> = ({ 
  licenses, 
  isLoading, 
  onCopyLicense 
}) => {
  return (
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
                        onClick={() => onCopyLicense(license.key)}
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
  );
};

export default LicensesTable;
