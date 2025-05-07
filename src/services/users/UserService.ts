
import { UserWithPassword } from "@/features/users/types";
import { BaseService } from "../base/BaseService";
import { IUserService } from "./interfaces/IUserService";
import { userPermissionsService } from "./services/UserPermissionsService";
import { mockUsers } from "@/features/auth/data/mockUsers";

class UserService extends BaseService implements IUserService {
  private storageKey = 'stored-users';

  async getUsers(): Promise<UserWithPassword[]> {
    try {
      const storedUsers = localStorage.getItem(this.storageKey);
      let users: UserWithPassword[] = [];
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
        console.log("Users loaded from localStorage:", users.length);
      }
      
      if (!users || users.length === 0) {
        console.log("No users found in localStorage, loading mock users");
        localStorage.setItem(this.storageKey, JSON.stringify(mockUsers));
        return mockUsers;
      }
      
      // الحصول على معلومات المستخدم الحالي والتحقق مما إذا كان مدير شركة
      const currentUserJson = localStorage.getItem('user');
      const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
      const isPrimaryOwner = currentUser && currentUser.email === "eng.ibrahimabdalfatah@gmail.com";
      
      // إضافة مدير النظام إذا كان المستخدم الحالي هو المدير الرئيسي
      const systemAdminEmail = "eng.ibrahimabdalfatah@gmail.com";
      const hasSystemAdmin = users.some(user => user.email === systemAdminEmail);
      
      if (!hasSystemAdmin && isPrimaryOwner) {
        console.log("System admin not found, adding it to users list");
        const systemAdmin = mockUsers.find(user => user.email === systemAdminEmail);
        if (systemAdmin) {
          users.push(systemAdmin);
          localStorage.setItem(this.storageKey, JSON.stringify(users));
        }
      }
      
      // فلترة المستخدمين حسب الشركة
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      const isCompanyLogin = localStorage.getItem('isCompanyLogin') === 'true';
      
      console.log("Is company login:", isCompanyLogin);
      console.log("Current company ID:", currentCompanyId);
      
      // إذا كان تسجيل الدخول من حساب شركة، إخفاء مدير النظام
      if (isCompanyLogin && currentCompanyId) {
        console.log("Company login detected, hiding system admin account");
        users = users.filter(user => 
          user.email !== "eng.ibrahimabdalfatah@gmail.com" && 
          user.companyId === currentCompanyId
        );
      } 
      // إذا كان مستخدم عادي وليس المدير الرئيسي
      else if (currentCompanyId && !isPrimaryOwner) {
        console.log("Filtering users by company ID:", currentCompanyId);
        users = users.filter(user => user.companyId === currentCompanyId);
      }
      
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  async getUserById(userId: string): Promise<UserWithPassword | null> {
    try {
      const users = await this.getUsers();
      return users.find(user => user.id === userId) || null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  async saveUser(user: UserWithPassword): Promise<boolean> {
    try {
      console.log("Saving user:", user.email);
      
      const storedUsers = localStorage.getItem(this.storageKey);
      let users: UserWithPassword[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const existingUserIndex = users.findIndex(u => 
        u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase())
      );
      
      if (existingUserIndex >= 0) {
        users[existingUserIndex] = user;
      } else {
        users.push(user);
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
      return false;
    }
  }

  async updateUser(user: UserWithPassword): Promise<boolean> {
    try {
      const users = await this.getUsers();
      const index = users.findIndex(u => u.id === user.id);
      
      if (index === -1) {
        return false;
      }
      
      users[index] = user;
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error updating user in localStorage:', error);
      return false;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      console.log("UserService - Deleting user with ID:", userId);
      const users = await this.getUsers();
      
      const userExists = users.some(user => user.id === userId);
      if (!userExists) {
        console.log("UserService - User not found with ID:", userId);
        return false;
      }
      
      const filteredUsers = users.filter(user => user.id !== userId);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredUsers));
      
      // Delete user permissions
      await userPermissionsService.deleteUserPermissions(userId);
      
      return true;
    } catch (error) {
      console.error('Error deleting user from localStorage:', error);
      return false;
    }
  }

  async updateUserPassword(userId: string, hashedPassword: string): Promise<boolean> {
    try {
      const users = await this.getUsers();
      const index = users.findIndex(u => u.id === userId);
      
      if (index === -1) {
        return false;
      }
      
      users[index].password = hashedPassword;
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error updating user password:', error);
      return false;
    }
  }

  // Delegate permissions management to UserPermissionsService
  getUserPermissions = userPermissionsService.getUserPermissions.bind(userPermissionsService);
  updateUserPermissions = userPermissionsService.updateUserPermissions.bind(userPermissionsService);
  deleteUserPermissions = userPermissionsService.deleteUserPermissions.bind(userPermissionsService);
}

const userService = new UserService();
export default userService;
