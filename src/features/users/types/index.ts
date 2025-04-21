
import { User, UserRole } from "@/types";

// Extend User type to include password for the form
export interface UserWithPassword extends User {
  password?: string; // Make password optional with ? modifier
  isActive: boolean;
  companyId?: string; // Company association
}

export interface UserFormProps {
  user: UserWithPassword;
  onUserChange: (user: UserWithPassword) => void;
  isArabic: boolean;
  canManageAdmins: boolean;
}

// Use export type for UserRole
export type { UserRole };

export interface Company {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  email?: string;      // Add company email
  password?: string;   // Add company password
  address?: string;
  phone?: string;
  taxNumber?: string;
  subscriptionStart?: string;
  subscriptionEnd?: string;
}

// Company form interface
export interface CompanyFormProps {
  company: Company;
  onCompanyChange: (company: Company) => void;
  isArabic: boolean;
}
