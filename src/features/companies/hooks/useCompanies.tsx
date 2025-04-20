
import { useState, useEffect } from "react";
import { Company } from "@/features/users/types";
import { companyService } from "@/services";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const isArabic = language === "ar";

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

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (company: Company) => {
    try {
      const success = await companyService.saveCompany(company);
      if (success) {
        toast.success(isArabic ? "تم إضافة الشركة بنجاح" : "Company added successfully");
        fetchCompanies();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error(isArabic ? "خطأ في إضافة الشركة" : "Error adding company");
      return false;
    }
  };

  const handleUpdateCompany = async (company: Company) => {
    try {
      const success = await companyService.updateCompany(company);
      if (success) {
        toast.success(isArabic ? "تم تحديث الشركة بنجاح" : "Company updated successfully");
        fetchCompanies();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error(isArabic ? "خطأ في تحديث الشركة" : "Error updating company");
      return false;
    }
  };

  const handleDeleteCompany = async (companyId: string) => {
    try {
      const success = await companyService.deleteCompany(companyId);
      if (success) {
        toast.success(isArabic ? "تم حذف الشركة بنجاح" : "Company deleted successfully");
        fetchCompanies();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error(isArabic ? "خطأ في حذف الشركة" : "Error deleting company");
      return false;
    }
  };

  const handleRenewSubscription = async (company: Company) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

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
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error renewing subscription:", error);
      toast.error(isArabic ? "خطأ في تجديد الاشتراك" : "Error renewing subscription");
      return false;
    }
  };

  return {
    companies,
    isLoading,
    handleAddCompany,
    handleUpdateCompany,
    handleDeleteCompany,
    handleRenewSubscription
  };
};
