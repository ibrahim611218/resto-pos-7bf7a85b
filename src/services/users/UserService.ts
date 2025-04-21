
import { UserWithPassword } from "@/features/users/types";
import { BaseService } from "../base/BaseService";
import { v4 as uuidv4 } from 'uuid';
import { Company } from "@/features/users/types";

class UserService extends BaseService {
  private storageKey = 'stored-users';
  private permissionsKey = 'user_permissions_data';
  private companiesKey = 'stored-companies';

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
        const { mockUsers } = await import('../../features/auth/data/mockUsers');
        localStorage.setItem(this.storageKey, JSON.stringify(mockUsers));
        return mockUsers;
      }
      
      // Get current user
      const currentUserJson = localStorage.getItem('user');
      const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
      const isPrimaryOwner = currentUser && currentUser.email === "eng.ibrahimabdalfatah@gmail.com";
      
      console.log("Current user:", currentUser?.email);
      console.log("Is primary owner:", isPrimaryOwner);
      
      // Filter users by company only if not primary owner
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId && !isPrimaryOwner) {
        console.log("Filtering users by company ID:", currentCompanyId);
        return users.filter(user => user.companyId === currentCompanyId);
      }
      
      console.log("Returning all users:", users.length);
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  async getCompanies(): Promise<Company[]> {
    try {
      const storedCompanies = localStorage.getItem(this.companiesKey);
      if (storedCompanies) {
        const companies = JSON.parse(storedCompanies);
        console.log("Retrieved companies:", companies);
        return companies;
      }
      return [];
    } catch (error) {
      console.error('Error getting companies:', error);
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
      if (!user.id) {
        user.id = uuidv4();
      }
      
      console.log("Saving user:", user.email);
      
      // Get existing users or initialize empty array
      const storedUsers = localStorage.getItem(this.storageKey);
      let users: UserWithPassword[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if user already exists (by id or email)
      const existingUserIndex = users.findIndex(u => 
        u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase())
      );
      
      if (existingUserIndex >= 0) {
        console.log("User already exists, updating:", user.email);
        users[existingUserIndex] = user;
      } else {
        console.log("Adding new user:", user.email);
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
      
      // Check if user exists before proceeding
      const userExists = users.some(user => user.id === userId);
      if (!userExists) {
        console.log("UserService - User not found with ID:", userId);
        return false;
      }
      
      const filteredUsers = users.filter(user => user.id !== userId);
      console.log("UserService - Users after filtering:", filteredUsers.length);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredUsers));
      
      // Delete user permissions
      await this.deleteUserPermissions(userId);
      
      return true;
    } catch (error) {
      console.error('Error deleting user from localStorage:', error);
      return false;
    }
  }
  
  async getUserPermissions(userId: string): Promise<string[]> {
    try {
      const storedPermissions = localStorage.getItem(this.permissionsKey);
      if (!storedPermissions) return [];
      
      const allPermissions = JSON.parse(storedPermissions);
      return allPermissions[userId] || [];
    } catch (error) {
      console.error('Error getting user permissions:', error);
      return [];
    }
  }
  
  async updateUserPermissions(userId: string, permissions: string[]): Promise<boolean> {
    try {
      const storedPermissions = localStorage.getItem(this.permissionsKey);
      const allPermissions = storedPermissions ? JSON.parse(storedPermissions) : {};
      
      allPermissions[userId] = permissions;
      
      localStorage.setItem(this.permissionsKey, JSON.stringify(allPermissions));
      return true;
    } catch (error) {
      console.error('Error updating user permissions:', error);
      return false;
    }
  }
  
  async deleteUserPermissions(userId: string): Promise<boolean> {
    try {
      console.log("UserService - Deleting permissions for user:", userId);
      const storedPermissions = localStorage.getItem(this.permissionsKey);
      if (!storedPermissions) return true;
      
      const allPermissions = JSON.parse(storedPermissions);
      delete allPermissions[userId];
      
      localStorage.setItem(this.permissionsKey, JSON.stringify(allPermissions));
      return true;
    } catch (error) {
      console.error('Error deleting user permissions:', error);
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
}

const userService = new UserService();
export default userService;
