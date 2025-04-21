
import { Category } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { sampleCategories } from '@/data/sampleData';

class CategoryService {
  private readonly STORAGE_KEY = 'categories';

  async getCategories(): Promise<Category[]> {
    try {
      // Try to get categories from localStorage
      const categoriesString = localStorage.getItem(this.STORAGE_KEY);
      let categories: Category[] = categoriesString ? JSON.parse(categoriesString) : [];
      
      // If no categories in localStorage, use sample data
      if (categories.length === 0) {
        categories = sampleCategories;
        // Save sample data to localStorage for future use
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
      }
      
      // Filter out inactive categories and ensure each has required properties
      return categories.filter(category => !category.isDeleted);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const categories = await this.getCategories();
      return categories.find(category => category.id === id) || null;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      return null;
    }
  }

  async saveCategory(category: Category): Promise<boolean> {
    try {
      // Get all categories including soft-deleted ones
      const categoriesString = localStorage.getItem(this.STORAGE_KEY);
      const allCategories: Category[] = categoriesString ? JSON.parse(categoriesString) : [];
      
      const existingIndex = allCategories.findIndex(c => c.id === category.id);
      
      // Ensure the category has all required fields
      const newCategory = {
        ...category,
        id: category.id || `cat-${uuidv4()}`,
        isDeleted: false // Make sure it's marked as not deleted
      };
      
      if (existingIndex >= 0) {
        allCategories[existingIndex] = newCategory;
      } else {
        allCategories.push(newCategory);
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allCategories));
      
      // Dispatch events to notify the application of data changes
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      
      return true;
    } catch (error) {
      console.error('Error saving category:', error);
      return false;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const categoriesString = localStorage.getItem(this.STORAGE_KEY);
      if (!categoriesString) return false;
      
      const categories: Category[] = JSON.parse(categoriesString);
      const categoryIndex = categories.findIndex(category => category.id === id);
      
      if (categoryIndex === -1) {
        return false; // Category not found
      }
      
      // Soft delete: Mark the category as deleted rather than removing it
      categories[categoryIndex] = {
        ...categories[categoryIndex],
        isDeleted: true
      };
      
      // Save the updated list to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
      
      // Dispatch events to notify the application of data changes
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      
      // If using electron, try to delete from the database as well
      if (window.db && window.db.deleteCategory) {
        try {
          await window.db.deleteCategory(id);
          console.log(`Category ${id} deleted from database`);
        } catch (dbError) {
          console.error('Error deleting category from database:', dbError);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  async deleteAllCategories(): Promise<boolean> {
    try {
      // Get current categories
      const categoriesString = localStorage.getItem(this.STORAGE_KEY);
      if (categoriesString) {
        const categories: Category[] = JSON.parse(categoriesString);
        
        // Mark all categories as deleted
        const updatedCategories = categories.map(category => ({
          ...category,
          isDeleted: true
        }));
        
        // Save the updated list to localStorage
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedCategories));
      } else {
        // If no categories exist, just create an empty array
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
      }
      
      // If using electron, try to delete from the database as well
      if (window.db) {
        try {
          if (window.db.deleteAllCategories) {
            await window.db.deleteAllCategories();
          } else if (window.electron) {
            await window.electron.invoke('db:deleteAllCategories');
          }
          console.log('All categories deleted from database');
        } catch (dbError) {
          console.error('Error deleting all categories from database:', dbError);
        }
      }
      
      // Dispatch events to notify the application of data changes
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      
      return true;
    } catch (error) {
      console.error('Error deleting all categories:', error);
      return false;
    }
  }

  // Method to clear the cache and force refresh
  async refreshCategories(): Promise<void> {
    try {
      // Force a fresh fetch
      if (window.db && window.db.getCategories) {
        const freshCategories = await window.db.getCategories();
        
        // Filter out deleted categories
        const activeCategories = freshCategories.filter((cat: Category) => !cat.isDeleted);
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(activeCategories));
      }
      
      // Dispatch events to notify the application of data changes
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
    } catch (error) {
      console.error('Error refreshing categories:', error);
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
