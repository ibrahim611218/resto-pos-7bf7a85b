
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/types';
import { BaseService } from '../base/BaseService';

class ProductService extends BaseService {
  private storageKey = 'stored-products';

  async getProducts(): Promise<Product[]> {
    try {
      // Get the current company ID
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      
      const storedProducts = localStorage.getItem(this.storageKey);
      let products: Product[] = [];
      
      if (storedProducts) {
        products = JSON.parse(storedProducts);
        console.log(`Retrieved ${products.length} products from localStorage`);
      }
      
      return products;
    } catch (error) {
      console.error("Error getting products:", error);
      return [];
    }
  }
  
  async getProductById(id: string): Promise<Product | null> {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === id) || null;
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  }
  
  async saveProduct(product: Product): Promise<{success: boolean, id?: string, error?: string}> {
    try {
      // Ensure product has an ID
      if (!product.id) {
        product.id = uuidv4();
      }
      
      // Get the current company ID and associate it with the product
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId) {
        product.companyId = currentCompanyId;
      }
      
      // Get existing products
      const products = await this.getProducts();
      
      // Check if product already exists (update) or is new (add)
      const index = products.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        // Update existing product
        products[index] = product;
      } else {
        // Add new product
        products.push(product);
      }
      
      // Save back to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(products));
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('product-updated'));
      
      return { success: true, id: product.id };
    } catch (error) {
      console.error("Error saving product:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  async deleteProduct(id: string): Promise<boolean> {
    try {
      let products = await this.getProducts();
      products = products.filter(product => product.id !== id);
      
      localStorage.setItem(this.storageKey, JSON.stringify(products));
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('product-updated'));
      
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }
}

const productService = new ProductService();
export default productService;
