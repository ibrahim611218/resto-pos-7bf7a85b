
import { User } from "@/types";

// Define UserRole type
export type UserRole = "admin" | "owner" | "supervisor" | "cashier" | "kitchen";

// Extend User type to include password for the form
export interface UserWithPassword extends User {
  password?: string;
  isActive: boolean;
  companyId?: string; // Company association
}

export interface UserFormProps {
  user: UserWithPassword;
  onUserChange: (user: UserWithPassword) => void;
  isArabic: boolean;
  canManageAdmins: boolean;
}

export interface Company {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  email?: string;
  password?: string;
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
