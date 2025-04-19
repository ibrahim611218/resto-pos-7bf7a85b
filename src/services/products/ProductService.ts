
import { Product, ProductType, ProductVariant, Size } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { isCapacitor } from "../base/BaseService";

interface ProductBase {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  categoryId: string;
  image: string;
  type: ProductType;
  taxable: boolean;
  price?: number;
  variants?: ProductVariant[];
  size: Size;
}

class ProductService {
  private readonly STORAGE_KEY = 'products';
  
  async getProducts(): Promise<Product[]> {
    try {
      const productsString = localStorage.getItem(this.STORAGE_KEY);
      const products: Product[] = productsString ? JSON.parse(productsString) : [];
      console.log(`Retrieved ${products.length} products from localStorage`);
      return products;
    } catch (error) {
      console.error('Error retrieving products:', error);
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
    window.dispatchEvent(new CustomEvent('product-updated'));
    window.dispatchEvent(new CustomEvent('data-updated'));
  }

  async saveProduct(product: Product): Promise<void> {
    try {
      console.log('Saving product:', product.name);
      const products = await this.getProducts();
      const existingProductIndex = products.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        console.log('Updating existing product');
        products[existingProductIndex] = product;
      } else {
        console.log('Adding new product');
        products.push(product);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      this.dispatchUpdateEvent();
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }

  async createProduct(productData: Omit<ProductBase, 'id'>): Promise<Product> {
    try {
      console.log('Creating new product:', productData.name);
      const newProduct = {
        id: uuidv4(),
        ...productData,
      } as Product;
      await this.saveProduct(newProduct);
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
      console.log('Updating product:', id);
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        console.log('Product not found for update');
        return null;
      }

      const updatedProduct = { ...products[productIndex], ...updates };
      products[productIndex] = updatedProduct;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      this.dispatchUpdateEvent();
      
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      console.log('Deleting product:', id);
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        console.log('Product not found for deletion');
        return false;
      }

      products.splice(productIndex, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      this.dispatchUpdateEvent();
      
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
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
        variants: [],
      };
      mockProducts.push(product);
    }
    return mockProducts;
  }

  async seedMockProducts(count: number = 5): Promise<void> {
    try {
      const mockProducts = this.generateMockProducts(count);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockProducts));
    } catch (error) {
      console.error('Error seeding mock products:', error);
      throw error;
    }
  }

  getBaseProduct(product: Product): ProductBase {
    return {
      id: product.id,
      name: product.name,
      nameAr: product.nameAr || "",
      description: product.description || "",
      descriptionAr: product.descriptionAr || "", 
      categoryId: product.categoryId,
      image: product.image || "",
      type: product.type,
      taxable: product.taxable,
      price: product.type === "single" ? product.price || 0 : undefined,
      variants: product.type === "sized" ? product.variants : [],
      size: "medium" // Now a valid Size value
    };
  }
}

const productService = new ProductService();
export default productService;
