
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
  address?: string;
  phone?: string;
  email?: string;
  taxNumber?: string;
  createdAt: string;
  ownerId?: string; // Reference to the owner user
}

// Company form interface
export interface CompanyFormProps {
  company: Company;
  onCompanyChange: (company: Company) => void;
  isArabic: boolean;
}
