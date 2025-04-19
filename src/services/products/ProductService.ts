
import { Product, ProductType, ProductVariant, Size } from "@/types";
import { v4 as uuidv4 } from 'uuid';

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
  async getProducts(): Promise<Product[]> {
    const productsString = localStorage.getItem('products');
    const products: Product[] = productsString ? JSON.parse(productsString) : [];
    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    return product || null;
  }

  async saveProduct(product: Product): Promise<void> {
    const products = await this.getProducts();
    const existingProductIndex = products.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      products[existingProductIndex] = product;
    } else {
      products.push(product);
    }

    localStorage.setItem('products', JSON.stringify(products));
  }

  async createProduct(productData: Omit<ProductBase, 'id'>): Promise<Product> {
    const newProduct: Product = {
      id: uuidv4(),
      ...productData,
    };
    await this.saveProduct(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return null;
    }

    const updatedProduct = { ...products[productIndex], ...updates };
    products[productIndex] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return false;
    }

    products.splice(productIndex, 1);
    localStorage.setItem('products', JSON.stringify(products));
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
        variants: [],
      };
      mockProducts.push(product);
    }
    return mockProducts;
  }

  async seedMockProducts(count: number = 5): Promise<void> {
    const mockProducts = this.generateMockProducts(count);
    localStorage.setItem('products', JSON.stringify(mockProducts));
  }

  // Fix the issue with "regular" not being assignable to Size
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
      size: "medium" as Size, // Use a valid Size value instead of "regular"
    };
  }
}

const productService = new ProductService();

export default productService;
