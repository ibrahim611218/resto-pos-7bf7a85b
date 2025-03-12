
import { User, UserRole } from "@/types";

// Extend User type to include password for the form
export interface UserWithPassword extends User {
  password: string;
}

export interface UserFormProps {
  user: UserWithPassword;
  onUserChange: (user: UserWithPassword) => void;
  isArabic: boolean;
  canManageAdmins: boolean;
}
