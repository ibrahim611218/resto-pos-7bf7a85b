import { User, UserRole } from "@/types";

// Extend User type to include password for the form
export interface UserWithPassword extends User {
  password: string;
  isActive: boolean;
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
}

export interface UserWithPassword {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  isActive: boolean;
  companyId?: string; // Add company association
}
