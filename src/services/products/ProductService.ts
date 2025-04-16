
import { Product } from "@/types";
import { sampleProducts } from "@/data/sampleData";

class ProductService {
  private storageKey = 'stored-products';
  
  // Get all products from localStorage or fallback to sample data
  getProducts(): Product[] {
    try {
      const storedProducts = localStorage.getItem(this.storageKey);
      if (storedProducts) {
        return JSON.parse(storedProducts);
      }
      
      // Initialize with sample data if nothing is stored
      this.saveProducts(sampleProducts);
      return sampleProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return sampleProducts;
    }
  }
  
  // Save a single product
  saveProduct(product: Product): boolean {
    try {
      const products = this.getProducts();
      const index = products.findIndex(p => p.id === product.id);
      
      if (index !== -1) {
        // Update existing product
        products[index] = product;
      } else {
        // Add new product
        products.push(product);
      }
      
      this.saveProducts(products);
      return true;
    } catch (error) {
      console.error('Error saving product:', error);
      return false;
    }
  }
  
  // Delete a product
  deleteProduct(productId: string): boolean {
    try {
      const products = this.getProducts();
      const filteredProducts = products.filter(p => p.id !== productId);
      
      this.saveProducts(filteredProducts);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
  
  // Save all products
  saveProducts(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}

const productService = new ProductService();
export default productService;
