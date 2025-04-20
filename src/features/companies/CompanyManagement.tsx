
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Company } from "../users/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import CompanyFormDialog from "./components/CompanyFormDialog";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import CompaniesTable from "./components/CompaniesTable";
import { useCompanies } from "./hooks/useCompanies";

const CompanyManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { user, isOwner } = useAuth();
  const {
    companies,
    isLoading,
    handleAddCompany,
    handleUpdateCompany,
    handleDeleteCompany,
    handleRenewSubscription
  } = useCompanies();
  
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
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

  const handleManageUsers = (company: Company) => {
    localStorage.setItem('currentCompanyId', company.id);
    toast.info(
      isArabic 
        ? `تم تحديد الشركة: ${company.name} كشركة نشطة`
        : `Company ${company.name} is now active`
    );
    window.location.href = "/user-management";
  };
  
  // Check if user is authorized to access this page
  const isAuthorizedEmail = user?.email === "eng.ibrahimabdalfatah@gmail.com"; // Changed from "emg" to "eng"
  const canManageCompanies = (isOwner() || user?.role === 'admin') && isAuthorizedEmail;
  
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
            <CompaniesTable
              companies={companies}
              isArabic={isArabic}
              onManageUsers={handleManageUsers}
              onRenewSubscription={handleRenewSubscription}
              onEdit={(company) => {
                setSelectedCompany(company);
                setIsEditDialogOpen(true);
              }}
              onDelete={(company) => {
                setSelectedCompany(company);
                setIsDeleteDialogOpen(true);
              }}
            />
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
        onConfirm={() => selectedCompany && handleDeleteCompany(selectedCompany.id)}
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
