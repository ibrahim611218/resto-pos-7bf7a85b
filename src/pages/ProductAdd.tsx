
import React from "react";
import ProductForm from "@/components/ProductForm";

// Export the component content for direct use
export const ProductAddContent: React.FC = () => {
  return <ProductForm />;
};

// This is only kept for backward compatibility
const ProductAdd: React.FC = () => (
  <ProductAddContent />
);

export default ProductAdd;
