
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
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    } catch (error) {
      console.error("Error saving all products to storage:", error);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      
      if (currentCompanyId) {
        const companyProducts = allProducts.filter(p => p.companyId === currentCompanyId);
        console.log(`Retrieved ${companyProducts.length} products for company ${currentCompanyId} from a total of ${allProducts.length}`);
        return companyProducts;
      }
      
      const nonCompanyProducts = allProducts.filter(p => !p.companyId);
      console.log(`No company selected. Retrieved ${nonCompanyProducts.length} products without a companyId.`);
      return nonCompanyProducts;
      
    } catch (error) {
      console.error("Error getting products:", error);
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
      if (!product.id) {
        product.id = uuidv4();
      }
      
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId && !product.companyId) {
        product.companyId = currentCompanyId;
      }
      
      const allProducts = await this.getAllProducts();
      
      const index = allProducts.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        allProducts[index] = product;
      } else {
        allProducts.push(product);
      }
      
      await this.saveAllProducts(allProducts);
      
      window.dispatchEvent(new CustomEvent('product-updated'));
      
      return { success: true, id: product.id };
    } catch (error) {
      console.error("Error saving product:", error);
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
