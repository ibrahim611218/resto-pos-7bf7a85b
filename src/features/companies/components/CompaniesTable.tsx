
import React from "react";
import { Company } from "@/features/users/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Users } from "lucide-react";

interface CompaniesTableProps {
  companies: Company[];
  isArabic: boolean;
  onManageUsers: (company: Company) => void;
  onRenewSubscription: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({
  companies,
  isArabic,
  onManageUsers,
  onRenewSubscription,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? "اسم الشركة" : "Company Name"}</TableHead>
            <TableHead>{isArabic ? "البريد الإلكتروني" : "Email"}</TableHead>
            <TableHead>{isArabic ? "تاريخ بداية الاشتراك" : "Sub. Start"}</TableHead>
            <TableHead>{isArabic ? "تاريخ نهاية الاشتراك" : "Sub. End"}</TableHead>
            <TableHead>{isArabic ? "الحالة" : "Status"}</TableHead>
            <TableHead className="text-right">{isArabic ? "الإجراءات" : "Actions"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                {isArabic ? "لا توجد شركات لعرضها" : "No companies to display"}
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.email || "-"}</TableCell>
                <TableCell>{formatDate(company.subscriptionStart)}</TableCell>
                <TableCell>{formatDate(company.subscriptionEnd)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      company.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {company.isActive
                      ? isArabic ? "نشط" : "Active"
                      : isArabic ? "غير نشط" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRenewSubscription(company)}
                    >
                      <Calendar className="h-4 w-4" />
                      <span className="sr-only">
                        {isArabic ? "تجديد الاشتراك" : "Renew Subscription"}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onManageUsers(company)}
                    >
                      <Users className="h-4 w-4" />
                      <span className="sr-only">
                        {isArabic ? "إدارة المستخدمين" : "Manage Users"}
                      </span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onEdit(company)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">{isArabic ? "تعديل" : "Edit"}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(company)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">{isArabic ? "حذف" : "Delete"}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
