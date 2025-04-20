import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Company } from "../users/types";
import { companyService } from "@/services";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import CompanyFormDialog from "./components/CompanyFormDialog";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";

const CompanyManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { user, isOwner } = useAuth();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const newCompanyTemplate: Company = {
    id: "",
    name: "",
    isActive: true,
    createdAt: new Date().toISOString(),
    email: "",
    password: "",
    subscriptionStart: new Date().toISOString(),
    subscriptionEnd: new Date().toISOString()
  };
  
  const [newCompany, setNewCompany] = useState<Company>(newCompanyTemplate);
  
  useEffect(() => {
    fetchCompanies();
  }, []);
  
  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const fetchedCompanies = await companyService.getCompanies();
      setCompanies(fetchedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error(isArabic ? "خطأ في جلب بيانات الشركات" : "Error fetching companies data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddCompany = async (company: Company) => {
    try {
      const success = await companyService.saveCompany(company);
      if (success) {
        toast.success(isArabic ? "تم إضافة الشركة بنجاح" : "Company added successfully");
        fetchCompanies();
        setIsAddDialogOpen(false);
        setNewCompany(newCompanyTemplate);
      }
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error(isArabic ? "خطأ في إضافة الشركة" : "Error adding company");
    }
  };
  
  const handleUpdateCompany = async (company: Company) => {
    try {
      const success = await companyService.updateCompany(company);
      if (success) {
        toast.success(isArabic ? "تم تحديث الشركة بنجاح" : "Company updated successfully");
        fetchCompanies();
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error(isArabic ? "خطأ في تحديث الشركة" : "Error updating company");
    }
  };
  
  const handleDeleteCompany = async () => {
    if (!selectedCompany) return;
    
    try {
      const success = await companyService.deleteCompany(selectedCompany.id);
      if (success) {
        toast.success(isArabic ? "تم حذف الشركة بنجاح" : "Company deleted successfully");
        fetchCompanies();
        setIsDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error(isArabic ? "خطأ في حذف الشركة" : "Error deleting company");
    }
  };
  
  const handleManageUsers = (company: Company) => {
    // Set the selected company as the current company
    localStorage.setItem('currentCompanyId', company.id);
    toast.info(
      isArabic 
        ? `تم تحديد الشركة: ${company.name} كشركة نشطة`
        : `Company ${company.name} is now active`
    );
    window.location.href = "/user-management";
  };

  const handleRenewSubscription = async (company: Company) => {
    // Set new subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // Add 1 year to current date

    const updatedCompany = {
      ...company,
      subscriptionStart: startDate.toISOString(),
      subscriptionEnd: endDate.toISOString(),
    };

    try {
      const success = await companyService.updateCompany(updatedCompany);
      if (success) {
        toast.success(isArabic ? "تم تجديد الاشتراك بنجاح" : "Subscription renewed successfully");
        fetchCompanies();
      }
    } catch (error) {
      console.error("Error renewing subscription:", error);
      toast.error(isArabic ? "خطأ في تجديد الاشتراك" : "Error renewing subscription");
    }
  };
  
  // Check if user is admin or owner
  const canManageCompanies = isOwner() || user?.role === 'admin';
  
  if (!canManageCompanies) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-800">
          {isArabic 
            ? "لا تملك صلاحيات كافية للوصول إلى هذه الصفحة" 
            : "You don't have sufficient permissions to access this page"}
        </p>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="container mx-auto p-4" dir={isArabic ? "rtl" : "ltr"}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isArabic ? "إدارة الشركات" : "Company Management"}</CardTitle>
          <Button onClick={() => {
            setNewCompany(newCompanyTemplate);
            setIsAddDialogOpen(true);
          }} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            {isArabic ? "إضافة شركة" : "Add Company"}
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
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
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            company.isActive 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {company.isActive 
                              ? (isArabic ? "نشط" : "Active") 
                              : (isArabic ? "غير نشط" : "Inactive")}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRenewSubscription(company)}
                            >
                              <Calendar className="h-4 w-4" />
                              <span className="sr-only">{isArabic ? "تجديد الاشتراك" : "Renew Subscription"}</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleManageUsers(company)}
                            >
                              <Users className="h-4 w-4" />
                              <span className="sr-only">{isArabic ? "إدارة المستخدمين" : "Manage Users"}</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setSelectedCompany(company);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">{isArabic ? "تعديل" : "Edit"}</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => {
                                setSelectedCompany(company);
                                setIsDeleteDialogOpen(true);
                              }}
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
          )}
        </CardContent>
      </Card>

      {/* Add Company Dialog */}
      <CompanyFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        company={newCompany}
        onCompanyChange={setNewCompany}
        onSave={handleAddCompany}
        title={isArabic ? "إضافة شركة جديدة" : "Add New Company"}
        isArabic={isArabic}
      />

      {/* Edit Company Dialog */}
      <CompanyFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        company={selectedCompany || newCompanyTemplate}
        onCompanyChange={setSelectedCompany}
        onSave={handleUpdateCompany}
        title={isArabic ? "تعديل بيانات الشركة" : "Edit Company"}
        isArabic={isArabic}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteCompany}
        title={isArabic ? "حذف الشركة" : "Delete Company"}
        description={
          isArabic
            ? "هل أنت متأكد من حذف هذه الشركة؟ هذا الإجراء لا يمكن التراجع عنه."
            : "Are you sure you want to delete this company? This action cannot be undone."
        }
        isArabic={isArabic}
      />
    </div>
  );
};

export default CompanyManagement;
