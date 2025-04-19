
import { UserWithPassword } from '../../features/users/types';
import { isElectron } from '../base/BaseService';

class UserService {
  async getUsers(): Promise<UserWithPassword[]> {
    try {
      if (isElectron()) {
        const users = await window.electron.invoke('users:getAll');
        return users;
      }
      
      // Return empty array for web version
      return [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async saveUser(user: UserWithPassword): Promise<any> {
    try {
      if (isElectron()) {
        return await window.electron.invoke('users:save', user);
      }
      return null;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async updateUser(user: UserWithPassword): Promise<any> {
    try {
      if (isElectron()) {
        return await window.electron.invoke('users:update', user);
      }
      return null;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<any> {
    try {
      if (isElectron()) {
        return await window.electron.invoke('users:delete', userId);
      }
      return null;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async updateUserPermissions(userId: string, permissions: string[]): Promise<any> {
    try {
      if (isElectron()) {
        return await window.electron.invoke('users:updatePermissions', { userId, permissions });
      }
      return null;
    } catch (error) {
      console.error('Error updating user permissions:', error);
      throw error;
    }
  }

  async updateUserPassword(userId: string, hashedPassword: string): Promise<any> {
    try {
      if (isElectron()) {
        return await window.electron.invoke('users:updatePassword', { userId, hashedPassword });
      }
      return null;
    } catch (error) {
      console.error('Error updating user password:', error);
      throw error;
    }
  }
}

export default new UserService();
