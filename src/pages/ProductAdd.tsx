
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductForm from "@/components/ProductForm";

// Export the component content for direct use
export const ProductAddContent: React.FC = () => {
  return <ProductForm />;
};

// Export a default component for routing that includes the layout
const ProductAdd: React.FC = () => (
  <MainLayout />
);

export default ProductAdd;
