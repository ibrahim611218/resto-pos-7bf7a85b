
import { Category } from "@/types";
import { sampleCategories } from "@/data/sampleData";

class CategoryService {
  private storageKey = 'stored-categories';
  
  // Get all categories from localStorage or fallback to sample data
  getCategories(): Category[] {
    try {
      const storedCategories = localStorage.getItem(this.storageKey);
      if (storedCategories) {
        return JSON.parse(storedCategories);
      }
      
      // Initialize with sample data if nothing is stored
      this.saveCategories(sampleCategories);
      return sampleCategories;
    } catch (error) {
      console.error('Error loading categories:', error);
      return sampleCategories;
    }
  }
  
  // Save a single category
  saveCategory(category: Category): boolean {
    try {
      const categories = this.getCategories();
      const index = categories.findIndex(c => c.id === category.id);
      
      if (index !== -1) {
        // Update existing category
        categories[index] = category;
      } else {
        // Add new category
        categories.push(category);
      }
      
      this.saveCategories(categories);
      return true;
    } catch (error) {
      console.error('Error saving category:', error);
      return false;
    }
  }
  
  // Delete a category
  deleteCategory(categoryId: string): boolean {
    try {
      const categories = this.getCategories();
      const filteredCategories = categories.filter(c => c.id !== categoryId);
      
      this.saveCategories(filteredCategories);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }
  
  // Save all categories
  saveCategories(categories: Category[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }
}

const categoryService = new CategoryService();
export default categoryService;
