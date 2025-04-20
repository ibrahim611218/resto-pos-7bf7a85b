import { UserWithPassword } from "@/features/users/types";
import { BaseService } from "../base/BaseService";
import { v4 as uuidv4 } from 'uuid';

class UserService extends BaseService {
  private storageKey = 'stored-users';
  private permissionsKey = 'user-permissions';

  async getUsers(): Promise<UserWithPassword[]> {
    try {
      const storedUsers = localStorage.getItem(this.storageKey);
      let users: UserWithPassword[] = [];
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }
      
      if (!users || users.length === 0) {
        const { mockUsers } = await import('../../features/auth/data/mockUsers');
        localStorage.setItem(this.storageKey, JSON.stringify(mockUsers));
        return mockUsers;
      }
      
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      
      try {
        const { mockUsers } = await import('../../features/auth/data/mockUsers');
        return mockUsers;
      } catch (fallbackError) {
        console.error('Error getting fallback users:', fallbackError);
        return [];
      }
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
      
      const users = await this.getUsers();
      users.push(user);
      
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
      const users = await this.getUsers();
      const filteredUsers = users.filter(user => user.id !== userId);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredUsers));
      
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
