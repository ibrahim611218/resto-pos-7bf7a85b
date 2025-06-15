
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/types';
import { BaseService } from '../base/BaseService';

class ProductService extends BaseService {
  private storageKey = 'stored-products';

  private async getAllProducts(): Promise<Product[]> {
    try {
      const storedProducts = localStorage.getItem(this.storageKey);
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        console.log(`[ProductService.getAllProducts] Retrieved ${products.length} products from localStorage`);
        return products;
      }
      console.log("[ProductService.getAllProducts] No products found in localStorage");
      return [];
    } catch (error) {
      console.error("[ProductService.getAllProducts] Error getting all products from storage:", error);
      return [];
    }
  }

  private async saveAllProducts(products: Product[]): Promise<void> {
    console.log(`[ProductService.saveAllProducts] Saving ${products.length} products to localStorage`);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
    console.log("[ProductService.saveAllProducts] Products saved successfully");
  }

  async getProducts(): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      console.log(`[ProductService.getProducts] Retrieved ${allProducts.length} total products from storage:`, allProducts.map(p => ({id: p.id, name: p.name, companyId: p.companyId})));
      const currentCompanyId = localStorage.getItem('currentCompanyId') || "";
      console.log(`[ProductService.getProducts] Current companyId from localStorage is '${currentCompanyId}'.`);
      
      // إزالة شرط companyId إن لم يوجد، وإظهار كل المنتجات.
      if (currentCompanyId) {
        const companyProducts = allProducts.filter(p => (p.companyId || "") === currentCompanyId);
        console.log(`[ProductService.getProducts] Filtering for companyId '${currentCompanyId}'. Found ${companyProducts.length} products.`);
        return companyProducts;
      }
      // إذا لم يوجد companyId، أظهر كل المنتجات (بدون فلترة companyId)
      console.log("[ProductService.getProducts] No companyId found in localStorage. Returning all products.");
      return allProducts;
      
    } catch (error) {
      console.error("[ProductService.getProducts] Error getting products:", error);
      return [];
    }
  }
  
  async getProductById(id: string): Promise<Product | null> {
    try {
      const allProducts = await this.getAllProducts();
      const product = allProducts.find(product => product.id === id) || null;
      console.log(`[ProductService.getProductById] Looking for product ${id}, found:`, product ? 'YES' : 'NO');
      return product;
    } catch (error) {
      console.error("[ProductService.getProductById] Error getting product:", error);
      return null;
    }
  }
  
  async saveProduct(product: Product): Promise<{success: boolean, id?: string, error?: string}> {
    try {
      console.log("[ProductService.saveProduct] Attempting to save product:", {
        id: product.id,
        name: product.name,
        type: product.type,
        variants: product.variants?.length || 0,
        companyId: product.companyId,
      });
      if (!product.id) {
        product.id = uuidv4();
        console.log(`[ProductService.saveProduct] Generated new ID: ${product.id}`);
      }
      // always assign companyId if there is one in localStorage
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId) {
        product.companyId = currentCompanyId;
      }
      const allProducts = await this.getAllProducts();
      const index = allProducts.findIndex(p => p.id === product.id);
      if (index !== -1) {
        allProducts[index] = product;
        console.log("[ProductService.saveProduct] Updating existing product.");
      } else {
        allProducts.push(product);
        console.log("[ProductService.saveProduct] Adding new product.");
      }
      await this.saveAllProducts(allProducts);
      window.dispatchEvent(new CustomEvent('product-updated'));
      return { success: true, id: product.id };
    } catch (error) {
      console.error("[ProductService.saveProduct] Error saving product:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  async deleteProduct(id: string): Promise<boolean> {
    try {
      console.log(`[ProductService.deleteProduct] Attempting to delete product ${id}`);
      let allProducts = await this.getAllProducts();
      allProducts = allProducts.filter(product => product.id !== id);
      await this.saveAllProducts(allProducts);
      window.dispatchEvent(new CustomEvent('product-updated'));
      return true;
    } catch (error) {
      console.error("[ProductService.deleteProduct] Error deleting product:", error);
      return false;
    }
  }
}

const productService = new ProductService();
export default productService;
