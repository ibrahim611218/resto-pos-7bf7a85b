
import { Product, ProductType, ProductVariant, Size } from "@/types";
import { v4 as uuidv4 } from 'uuid';

interface ProductBase {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  categoryId: string;
  image?: string;
  type: ProductType;
  taxable: boolean;
  price?: number;
  variants?: ProductVariant[];
}

class ProductService {
  async getProducts(): Promise<Product[]> {
    try {
      const productsString = localStorage.getItem('products');
      const products: Product[] = productsString ? JSON.parse(productsString) : [];
      
      // Ensure all products have variants array
      const normalizedProducts = products.map(product => ({
        ...product,
        variants: product.variants || []
      }));
      
      console.log(`Retrieved ${normalizedProducts.length} products from localStorage`);
      return normalizedProducts;
    } catch (error) {
      console.error("Error retrieving products:", error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    return product || null;
  }

  private dispatchUpdateEvent() {
    console.log('Dispatching data update events');
    // Dispatch both events for maximum compatibility
    window.dispatchEvent(new CustomEvent('product-updated'));
    window.dispatchEvent(new CustomEvent('data-updated'));
  }

  async saveProduct(product: Product): Promise<void> {
    console.log('Saving product:', product);
    
    if (!product.id) {
      throw new Error('Product ID is required');
    }
    
    // Ensure product has variants array
    const productToSave = {
      ...product,
      variants: product.variants || []
    };
    
    try {
      const products = await this.getProducts();
      const existingProductIndex = products.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        console.log('Updating existing product');
        products[existingProductIndex] = productToSave;
      } else {
        console.log('Adding new product');
        products.push(productToSave);
      }

      localStorage.setItem('products', JSON.stringify(products));
      this.dispatchUpdateEvent();
    } catch (error) {
      console.error("Error saving product:", error);
      throw error;
    }
  }

  async createProduct(productData: Omit<ProductBase, 'id'>): Promise<Product> {
    console.log('Creating new product:', productData);
    
    // Ensure we have variants
    const variants = productData.variants || [];
    if (productData.type === "single" && variants.length === 0) {
      variants.push({
        id: `var-${uuidv4()}`,
        size: "medium",
        price: productData.price || 0
      });
    }
    
    const newProduct = {
      id: `prod-${uuidv4()}`,
      ...productData,
      variants
    } as Product;
    
    await this.saveProduct(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    console.log('Updating product:', id);
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      console.log('Product not found for update');
      return null;
    }

    const updatedProduct = { ...products[productIndex], ...updates };
    
    // Ensure variants array exists
    if (!updatedProduct.variants) {
      updatedProduct.variants = [];
    }
    
    products[productIndex] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    this.dispatchUpdateEvent();
    
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    console.log('Deleting product:', id);
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      console.log('Product not found for deletion');
      return false;
    }

    products.splice(productIndex, 1);
    localStorage.setItem('products', JSON.stringify(products));
    this.dispatchUpdateEvent();
    
    return true;
  }

  private generateMockProducts(count: number = 5): Product[] {
    const mockProducts: Product[] = [];
    for (let i = 1; i <= count; i++) {
      const product: Product = {
        id: uuidv4(),
        name: `Product ${i}`,
        nameAr: `منتج ${i}`,
        description: `Description for Product ${i}`,
        descriptionAr: `وصف للمنتج ${i}`,
        price: 25 + i * 5,
        categoryId: uuidv4(),
        image: `https://placehold.co/600x400?text=Product${i}`,
        type: "single",
        taxable: true,
        variants: [{
          id: `var-${i}`,
          size: "medium",
          price: 25 + i * 5
        }],
      };
      mockProducts.push(product);
    }
    return mockProducts;
  }

  async seedMockProducts(count: number = 5): Promise<void> {
    const mockProducts = this.generateMockProducts(count);
    localStorage.setItem('products', JSON.stringify(mockProducts));
    this.dispatchUpdateEvent();
  }
}

const productService = new ProductService();
export default productService;
