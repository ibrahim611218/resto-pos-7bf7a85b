
import { Company } from "@/features/users/types";
import { BaseService } from "../base/BaseService";
import { v4 as uuidv4 } from 'uuid';

class CompanyService extends BaseService {
  private storageKey = 'stored-companies';

  async getCompanies(): Promise<Company[]> {
    try {
      const storedCompanies = localStorage.getItem(this.storageKey);
      let companies: Company[] = [];
      
      if (storedCompanies) {
        companies = JSON.parse(storedCompanies);
      }
      
      if (!companies || companies.length === 0) {
        // إنشاء شركة افتراضية إذا لم توجد شركات
        const defaultCompany: Company = {
          id: uuidv4(),
          name: 'Default Company',
          isActive: true,
          createdAt: new Date().toISOString(),
          subscriptionStart: new Date().toISOString(),
          subscriptionEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
        };
        
        companies = [defaultCompany];
        localStorage.setItem(this.storageKey, JSON.stringify(companies));
      }
      
      console.log("Retrieved companies:", companies);
      return companies;
    } catch (error) {
      console.error('Error getting companies:', error);
      return [];
    }
  }

  async getCompanyById(companyId: string): Promise<Company | null> {
    try {
      const companies = await this.getCompanies();
      const company = companies.find(company => company.id === companyId);
      
      if (!company) {
        console.error('Company not found with ID:', companyId);
        return null;
      }
      
      return company;
    } catch (error) {
      console.error('Error getting company by ID:', error);
      return null;
    }
  }
  
  async saveCompany(company: Company): Promise<boolean> {
    try {
      if (!company.id) {
        company.id = uuidv4();
      }
      
      if (!company.createdAt) {
        company.createdAt = new Date().toISOString();
      }
      
      // تأكد من وجود تاريخ بداية ونهاية الاشتراك
      if (!company.subscriptionStart) {
        company.subscriptionStart = new Date().toISOString();
      }
      
      if (!company.subscriptionEnd) {
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);
        company.subscriptionEnd = endDate.toISOString();
      }
      
      const companies = await this.getCompanies();
      
      // التحقق من وجود الشركة مسبقاً
      const existingCompanyIndex = companies.findIndex(c => c.id === company.id);
      if (existingCompanyIndex >= 0) {
        companies[existingCompanyIndex] = company;
      } else {
        companies.push(company);
      }
      
      console.log("Saving company:", company);
      localStorage.setItem(this.storageKey, JSON.stringify(companies));
      return true;
    } catch (error) {
      console.error('Error saving company to localStorage:', error);
      return false;
    }
  }
  
  async updateCompany(company: Company): Promise<boolean> {
    try {
      const companies = await this.getCompanies();
      const index = companies.findIndex(c => c.id === company.id);
      
      if (index === -1) {
        return false;
      }
      
      companies[index] = company;
      console.log("Updating company:", company);
      localStorage.setItem(this.storageKey, JSON.stringify(companies));
      return true;
    } catch (error) {
      console.error('Error updating company in localStorage:', error);
      return false;
    }
  }
  
  async deleteCompany(companyId: string): Promise<boolean> {
    try {
      const companies = await this.getCompanies();
      const filteredCompanies = companies.filter(company => company.id !== companyId);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredCompanies));
      return true;
    } catch (error) {
      console.error('Error deleting company from localStorage:', error);
      return false;
    }
  }
}

const companyService = new CompanyService();
export default companyService;
