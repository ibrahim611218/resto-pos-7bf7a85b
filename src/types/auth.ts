
export type UserRole = "owner" | "admin" | "supervisor" | "cashier" | "kitchen" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
