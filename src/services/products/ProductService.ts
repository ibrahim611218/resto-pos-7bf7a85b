
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
        console.log(`ProductService.getAllProducts: Retrieved ${products.length} products from localStorage`);
        return products;
      }
      console.log("ProductService.getAllProducts: No products found in localStorage");
      return [];
    } catch (error) {
      console.error("ProductService.getAllProducts: Error getting all products from storage:", error);
      return [];
    }
  }

  private async saveAllProducts(products: Product[]): Promise<void> {
    console.log(`ProductService.saveAllProducts: Saving ${products.length} products to localStorage`);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
    console.log("ProductService.saveAllProducts: Products saved successfully");
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
      console.log("ProductService.getProducts: Products without companyId:", nonCompanyProducts.map(p => ({ id: p.id, name: p.name, nameAr: p.nameAr })));
      return nonCompanyProducts;
      
    } catch (error) {
      console.error("ProductService.getProducts: Error getting products:", error);
      return [];
    }
  }
  
  async getProductById(id: string): Promise<Product | null> {
    try {
      const allProducts = await this.getAllProducts();
      const product = allProducts.find(product => product.id === id) || null;
      console.log(`ProductService.getProductById: Looking for product ${id}, found:`, product ? 'YES' : 'NO');
      return product;
    } catch (error) {
      console.error("ProductService.getProductById: Error getting product:", error);
      return null;
    }
  }
  
  async saveProduct(product: Product): Promise<{success: boolean, id?: string, error?: string}> {
    try {
      console.log("ProductService.saveProduct: Attempting to save product:", {
        id: product.id,
        name: product.name,
        nameAr: product.nameAr,
        type: product.type,
        variants: product.variants?.length || 0
      });
      
      if (!product.id) {
        product.id = uuidv4();
        console.log(`ProductService.saveProduct: Generated new ID: ${product.id}`);
      }
      
      const currentCompanyId = localStorage.getItem('currentCompanyId');
      if (currentCompanyId && !product.companyId) {
        product.companyId = currentCompanyId;
        console.log(`ProductService.saveProduct: Assigned companyId ${currentCompanyId} to product.`);
      }
      
      const allProducts = await this.getAllProducts();
      console.log(`ProductService.saveProduct: Found ${allProducts.length} existing products in total.`);
      
      const index = allProducts.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        console.log(`ProductService.saveProduct: Updating existing product at index ${index}.`);
        allProducts[index] = product;
      } else {
        console.log("ProductService.saveProduct: Adding new product.");
        allProducts.push(product);
      }
      
      console.log(`ProductService.saveProduct: Total products now: ${allProducts.length}. Saving all products.`);
      await this.saveAllProducts(allProducts);
      
      // التحقق من أن المنتج تم حفظه فعلاً
      const savedProducts = await this.getAllProducts();
      const savedProduct = savedProducts.find(p => p.id === product.id);
      if (savedProduct) {
        console.log("ProductService.saveProduct: Product successfully saved and verified in storage");
      } else {
        console.error("ProductService.saveProduct: Product was not found after saving!");
      }
      
      console.log("ProductService.saveProduct: All products saved successfully. Dispatching 'product-updated' event.");
      window.dispatchEvent(new CustomEvent('product-updated'));
      
      return { success: true, id: product.id };
    } catch (error) {
      console.error("ProductService.saveProduct: Error saving product:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  
  async deleteProduct(id: string): Promise<boolean> {
    try {
      console.log(`ProductService.deleteProduct: Attempting to delete product ${id}`);
      let allProducts = await this.getAllProducts();
      const beforeCount = allProducts.length;
      
      allProducts = allProducts.filter(product => product.id !== id);
      const afterCount = allProducts.length;
      
      console.log(`ProductService.deleteProduct: Filtered products from ${beforeCount} to ${afterCount}`);
      
      await this.saveAllProducts(allProducts);
      
      window.dispatchEvent(new CustomEvent('product-updated'));
      console.log("ProductService.deleteProduct: Product deleted successfully");
      
      return true;
    } catch (error) {
      console.error("ProductService.deleteProduct: Error deleting product:", error);
      return false;
    }
  }
}

const productService = new ProductService();
export default productService;
