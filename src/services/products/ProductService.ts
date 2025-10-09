
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
        
        // If we have a company ID, filter products by company
        if (currentCompanyId) {
          products = products.filter(product => 
            !product.companyId || product.companyId === currentCompanyId
          );
        }
        
        console.log(`ProductService: Retrieved ${products.length} products for the current company.`);
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
      console.log("ProductService: Saving product", product);
      
      // Ensure product has an ID
      if (!product.id) {
        product.id = `prod-${uuidv4()}`;
        console.log("ProductService: Generated new ID", product.id);
      }
      
      // Ensure variants array exists
      if (!product.variants || !Array.isArray(product.variants)) {
        console.warn("ProductService: Product missing variants array, initializing empty array");
        product.variants = [];
      }
      
      // Get the current company ID and associate it with the product
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId) {
        product.companyId = currentCompanyId;
        console.log("ProductService: Associated with company", currentCompanyId);
      }
      
      // Get ALL products from localStorage (not filtered by company)
      const allProductsJson = localStorage.getItem(this.storageKey);
      const allProducts: Product[] = allProductsJson ? JSON.parse(allProductsJson) : [];
      console.log("ProductService: Found", allProducts.length, "total products in storage");
      
      // Check if product already exists (update) or is new (add)
      const index = allProducts.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        // Update existing product
        console.log("ProductService: Updating existing product at index", index);
        allProducts[index] = product;
      } else {
        // Add new product
        console.log("ProductService: Adding new product");
        allProducts.push(product);
      }
      
      // Save ALL products back to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(allProducts));
      console.log("ProductService: Saved", allProducts.length, "products to storage");
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('product-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      
      console.log("ProductService: Product saved successfully");
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
