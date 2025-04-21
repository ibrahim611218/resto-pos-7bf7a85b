
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
      
      return categories;
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

  async saveCategory(category: Category): Promise<void> {
    try {
      const categories = await this.getCategories();
      const existingIndex = categories.findIndex(c => c.id === category.id);
      
      if (existingIndex >= 0) {
        categories[existingIndex] = category;
      } else {
        const newCategory = { ...category, id: category.id || `cat-${uuidv4()}` };
        categories.push(newCategory);
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
      
      // Dispatch events to notify the application of data changes
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
    } catch (error) {
      console.error('Error saving category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const categories = await this.getCategories();
      const filteredCategories = categories.filter(category => category.id !== id);
      
      if (filteredCategories.length === categories.length) {
        return false; // Category not found
      }
      
      // Save the updated list to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredCategories));
      
      // Dispatch events to notify the application of data changes
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      
      // Also clear out any additional storage for this category
      localStorage.removeItem(`category_${id}`);

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

  // Method to clear the cache and force refresh
  async refreshCategories(): Promise<void> {
    try {
      // Force a fresh fetch
      if (window.db && window.db.getCategories) {
        const freshCategories = await window.db.getCategories();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(freshCategories));
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
