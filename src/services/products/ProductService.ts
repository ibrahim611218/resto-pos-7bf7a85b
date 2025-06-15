
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/types';
import { BaseService } from '../base/BaseService';

class ProductService extends BaseService {
  private storageKey = 'stored-products';

  private async getAllProducts(): Promise<Product[]> {
    try {
      const storedProducts = localStorage.getItem(this.storageKey);
      if (storedProducts) {
        return JSON.parse(storedProducts);
      }
      return [];
    } catch (error) {
      console.error("Error getting all products from storage:", error);
      return [];
    }
  }

  private async saveAllProducts(products: Product[]): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  async getProducts(): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      console.log(`ProductService.getProducts: Retrieved ${allProducts.length} total products from storage.`);
      
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      console.log(`ProductService.getProducts: Current companyId from localStorage is '${currentCompanyId}'.`);
      
      if (currentCompanyId) {
        const companyProducts = allProducts.filter(p => p.companyId === currentCompanyId);
        console.log(`ProductService.getProducts: Filtering for companyId '${currentCompanyId}'. Found ${companyProducts.length} products.`);
        return companyProducts;
      }
      
      const nonCompanyProducts = allProducts.filter(p => !p.companyId);
      console.log(`ProductService.getProducts: No companyId. Filtering for products without a companyId. Found ${nonCompanyProducts.length} products.`);
      return nonCompanyProducts;
      
    } catch (error) {
      console.error("ProductService.getProducts: Error getting products:", error);
      return [];
    }
  }
  
  async getProductById(id: string): Promise<Product | null> {
    try {
      const allProducts = await this.getAllProducts();
      return allProducts.find(product => product.id === id) || null;
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  }
  
  async saveProduct(product: Product): Promise<{success: boolean, id?: string, error?: string}> {
    try {
      console.log("ProductService: Attempting to save product:", JSON.parse(JSON.stringify(product)));
      if (!product.id) {
        product.id = uuidv4();
      }
      
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId && !product.companyId) {
        product.companyId = currentCompanyId;
        console.log(`ProductService: Assigned companyId ${currentCompanyId} to product.`);
      }
      
      const allProducts = await this.getAllProducts();
      console.log(`ProductService: Found ${allProducts.length} existing products in total.`);
      
      const index = allProducts.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        console.log(`ProductService: Updating existing product at index ${index}.`);
        allProducts[index] = product;
      } else {
        console.log("ProductService: Adding new product.");
        allProducts.push(product);
      }
      
      console.log(`ProductService: Total products now: ${allProducts.length}. Saving all products.`);
      await this.saveAllProducts(allProducts);
      console.log("ProductService: All products saved successfully. Dispatching 'product-updated' event.");
      
      window.dispatchEvent(new CustomEvent('product-updated'));
      
      return { success: true, id: product.id };
    } catch (error) {
      console.error("ProductService: Error saving product:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  async deleteProduct(id: string): Promise<boolean> {
    try {
      let allProducts = await this.getAllProducts();
      allProducts = allProducts.filter(product => product.id !== id);
      
      await this.saveAllProducts(allProducts);
      
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
