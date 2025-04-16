
import { Product, ProductVariant } from "@/types";
import { sampleProducts } from "@/data/sampleData";

class ProductService {
  private storageKey = 'stored-products';
  
  // Get all products from localStorage or fallback to sample data
  getProducts(): Product[] {
    try {
      const storedProducts = localStorage.getItem(this.storageKey);
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        // Ensure all products have valid structure
        return this.validateProducts(products);
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
      
      // Ensure product has valid structure before saving
      const validatedProduct = this.validateProduct(product);
      
      if (index !== -1) {
        // Update existing product
        products[index] = validatedProduct;
      } else {
        // Add new product
        products.push(validatedProduct);
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
    // Make sure all products are valid before saving
    const validProducts = products.map(product => this.validateProduct(product));
    localStorage.setItem(this.storageKey, JSON.stringify(validProducts));
  }
  
  // Validate a single product structure to prevent errors
  private validateProduct(product: Product): Product {
    const validatedProduct = { ...product };
    
    // Ensure product has variants array
    if (!Array.isArray(validatedProduct.variants)) {
      validatedProduct.variants = [];
    }
    
    // For single products, ensure price exists
    if (validatedProduct.type === 'single') {
      if (typeof validatedProduct.price !== 'number' || isNaN(validatedProduct.price)) {
        validatedProduct.price = 0;
      }
      
      // Add a default variant if none exists
      if (validatedProduct.variants.length === 0) {
        validatedProduct.variants.push({
          id: `var-${Date.now()}`,
          size: 'regular',
          price: validatedProduct.price || 0
        });
      }
    }
    
    // For sized products, ensure they have at least one variant
    if (validatedProduct.type === 'sized' && validatedProduct.variants.length === 0) {
      validatedProduct.variants.push({
        id: `var-${Date.now()}`,
        size: 'medium',
        price: 0
      });
    }
    
    // Validate each variant to ensure it has a price
    validatedProduct.variants = validatedProduct.variants.map(variant => {
      const validVariant: ProductVariant = { ...variant };
      if (typeof validVariant.price !== 'number' || isNaN(validVariant.price)) {
        validVariant.price = 0;
      }
      return validVariant;
    });
    
    return validatedProduct;
  }
  
  // Validate an array of products
  private validateProducts(products: Product[]): Product[] {
    return products.map(product => this.validateProduct(product));
  }
}

const productService = new ProductService();
export default productService;
