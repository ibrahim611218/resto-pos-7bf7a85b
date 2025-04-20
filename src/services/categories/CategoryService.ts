
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
      return sampleCategories;
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
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredCategories));
      
      // Dispatch events to notify the application of data changes
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
