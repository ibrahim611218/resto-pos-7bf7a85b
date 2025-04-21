
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import { BaseService } from '../base/BaseService';

class CategoryService extends BaseService {
  private storageKey = 'stored-categories';

  async getCategories(): Promise<Category[]> {
    try {
      // Get the current company ID
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      
      const storedCategories = localStorage.getItem(this.storageKey);
      let categories: Category[] = [];
      
      if (storedCategories) {
        categories = JSON.parse(storedCategories);
        
        // If we have a company ID, filter categories by company
        if (currentCompanyId) {
          categories = categories.filter(cat => 
            !cat.companyId || cat.companyId === currentCompanyId
          );
        }
        
        console.log(`CategoryService: Found ${categories.length} total categories, ${categories.filter(cat => !cat.isDeleted).length} active`);
      }
      
      return categories;
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  }

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const categories = await this.getCategories();
      return categories.find(category => category.id === id) || null;
    } catch (error) {
      console.error("Error getting category:", error);
      return null;
    }
  }
  
  async saveCategory(category: Category): Promise<{success: boolean, id?: string, error?: string}> {
    try {
      // Ensure category has an ID
      if (!category.id) {
        category.id = uuidv4();
      }
      
      // Get the current company ID and associate it with the category
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId) {
        category.companyId = currentCompanyId;
      }
      
      // Get all categories (not filtered by company)
      const storedCategories = localStorage.getItem(this.storageKey);
      let categories: Category[] = storedCategories ? JSON.parse(storedCategories) : [];
      
      // Check if category already exists
      const index = categories.findIndex(c => c.id === category.id);
      
      if (index !== -1) {
        // Update existing category
        categories[index] = category;
      } else {
        // Add new category
        categories.push(category);
      }
      
      // Save back to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(categories));
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('category-updated'));
      
      return { success: true, id: category.id };
    } catch (error) {
      console.error("Error saving category:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  async deleteCategory(id: string): Promise<boolean> {
    try {
      // Get all categories
      const storedCategories = localStorage.getItem(this.storageKey);
      if (!storedCategories) return false;
      
      let categories: Category[] = JSON.parse(storedCategories);
      
      // Find the category
      const index = categories.findIndex(c => c.id === id);
      if (index === -1) return false;
      
      // Mark as deleted instead of removing
      categories[index] = {
        ...categories[index],
        isDeleted: true
      };
      
      // Save back to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(categories));
      
      // Notify components
      window.dispatchEvent(new CustomEvent('category-updated'));
      
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      return false;
    }
  }
  
  async deleteAllCategories(): Promise<boolean> {
    try {
      // Get all categories
      const storedCategories = localStorage.getItem(this.storageKey);
      if (!storedCategories) return true; // If no categories exist, consider it success
      
      let categories: Category[] = JSON.parse(storedCategories);
      
      // Mark all categories as deleted
      categories = categories.map(category => ({
        ...category,
        isDeleted: true
      }));
      
      // Save back to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(categories));
      
      // Notify components
      window.dispatchEvent(new CustomEvent('category-updated'));
      
      return true;
    } catch (error) {
      console.error("Error deleting all categories:", error);
      return false;
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
