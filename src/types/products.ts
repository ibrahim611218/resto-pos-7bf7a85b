
import { Size } from './common';

export type ProductType = "single" | "sized";

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  price?: number;
  categoryId: string;
  image?: string;
  type: ProductType;
  taxable: boolean;
  variants: ProductVariant[];  // This should never be undefined
  sizes?: string[];
}

export interface ProductVariant {
  id: string;
  size: Size;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  imageUrl?: string;
  isDeleted?: boolean; // Flag to indicate if category is deleted
}
