
import { User, UserRole } from "@/types";

// Note: In a real app, we would never store passwords in code
// This is just for demonstration purposes
interface MockUser extends User {
  password: string;
  isActive: boolean;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "أحمد المدير",
    email: "admin@example.com",
    role: "admin",
    password: "admin123",
    isActive: true
  },
  {
    id: "2",
    name: "محمد المحاسب",
    email: "cashier@example.com",
    role: "cashier",
    password: "cashier123",
    isActive: true
  },
  {
    id: "3",
    name: "علي الطباخ",
    email: "kitchen@example.com",
    role: "kitchen",
    password: "kitchen123",
    isActive: true
  },
  {
    id: "4",
    name: "إبراهيم عبدالفتاح",
    email: "eng.ibrahimabdalfatah@gmail.com",
    role: "admin",
    password: "Ibrahim@1995",
    isActive: true
  },
];
