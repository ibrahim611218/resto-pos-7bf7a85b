
import { BaseService } from "../../base/BaseService";

export class UserPermissionsService extends BaseService {
  private permissionsKey = 'user_permissions_data';

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
      console.log("UserPermissionsService - Deleting permissions for user:", userId);
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
}

export const userPermissionsService = new UserPermissionsService();
