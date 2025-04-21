
import { UserWithPassword } from "@/features/users/types";

export interface IUserService {
  getUsers(): Promise<UserWithPassword[]>;
  getUserById(userId: string): Promise<UserWithPassword | null>;
  saveUser(user: UserWithPassword): Promise<boolean>;
  updateUser(user: UserWithPassword): Promise<boolean>;
  deleteUser(userId: string): Promise<boolean>;
  updateUserPassword(userId: string, hashedPassword: string): Promise<boolean>;
  getUserPermissions(userId: string): Promise<string[]>;
  updateUserPermissions(userId: string, permissions: string[]): Promise<boolean>;
  deleteUserPermissions(userId: string): Promise<boolean>;
}
