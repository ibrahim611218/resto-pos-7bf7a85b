
import { User, UserRole } from "@/types";

// Note: In a real app, we would never store passwords in code
// This is just for demonstration purposes
interface MockUser extends User {
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "أحمد المدير",
    email: "admin@example.com",
    role: "admin",
    password: "admin123",
  },
  {
    id: "2",
    name: "محمد المحاسب",
    email: "cashier@example.com",
    role: "cashier",
    password: "cashier123",
  },
  {
    id: "3",
    name: "علي الطباخ",
    email: "kitchen@example.com",
    role: "kitchen",
    password: "kitchen123",
  },
];
