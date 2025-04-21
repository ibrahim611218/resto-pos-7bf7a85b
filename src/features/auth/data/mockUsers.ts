
import { User } from "@/types";
import { UserRole } from "@/features/users/types";

// Note: In a real app, we would never store passwords in code
// This is just for demonstration purposes
interface MockUser extends User {
  password: string;
  isActive: boolean;
}

export const mockUsers: MockUser[] = [
  {
    id: "4",
    username: "ibrahim",
    name: "إبراهيم عبدالفتاح",
    email: "eng.ibrahimabdalfatah@gmail.com",
    role: "owner",
    password: "Ibrahim@1995",
    isActive: true
  }
];
