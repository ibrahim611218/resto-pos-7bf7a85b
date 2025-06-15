
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductFormHeader from "./product-form/ProductFormHeader";
import ProductBasicInfo from "./product-form/ProductBasicInfo";
import ProductCategorySelect from "./product-form/ProductCategorySelect";
import ProductTypeRadio from "./product-form/ProductTypeRadio";
import ProductTaxSwitch from "./product-form/ProductTaxSwitch";
import ProductPriceInput from "./product-form/ProductPriceInput";
import ProductVariantsManager from "./product-form/ProductVariantsManager";
import ProductFormFooter from "./product-form/ProductFormFooter";
import { useProductForm } from "./product-form/hooks/useProductForm";
import { Toaster } from "@/components/ui/toaster";

const ProductForm = () => {
  const {
    product,
    variants,
    isEditing,
    isArabic,
    isSubmitting,
    handleInputChange,
    handleSwitchChange,
    handleTypeChange,
    handleCategoryChange,
    handlePriceChange,
    handleImageChange,
    addVariant,
    updateVariant,
    removeVariant,
    handleSubmit,
    navigate
  } = useProductForm();

  const onFormSubmit = (e: React.FormEvent) => {
    console.log("Form submitting with product:", product);
    handleSubmit(e);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={onFormSubmit}>
          <div className="mb-6">
            <ProductFormHeader isEditing={isEditing} isArabic={isArabic} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "معلومات المنتج" : "Product Information"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ProductBasicInfo 
                    product={product}
                    handleInputChange={handleInputChange}
                    handleImageChange={handleImageChange}
                    isArabic={isArabic}
                  />
                </CardContent>
              </Card>

              {product.type === "sized" && (
                <Card>
                  <CardHeader>
                    <CardTitle>{isArabic ? "المقاسات والأسعار" : "Sizes & Prices"}</CardTitle>
                  </Header>
                  <CardContent>
                    <ProductVariantsManager 
                      variants={variants}
                      addVariant={addVariant}
                      updateVariant={updateVariant}
                      removeVariant={removeVariant}
                      isArabic={isArabic}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "التنظيم والإعدادات" : "Organization & Settings"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProductCategorySelect 
                    categoryId={product.categoryId}
                    handleCategoryChange={handleCategoryChange}
                    isArabic={isArabic}
                  />
                  <ProductTypeRadio 
                    productType={product.type}
                    handleTypeChange={handleTypeChange}
                    isArabic={isArabic}
                  />
                  {product.type === "single" && (
                    <ProductPriceInput 
                      price={product.price}
                      handlePriceChange={handlePriceChange}
                      isArabic={isArabic}
                    />
                  )}
                  <ProductTaxSwitch 
                    taxable={product.taxable}
                    handleSwitchChange={handleSwitchChange}
                    isArabic={isArabic}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8">
            <ProductFormFooter 
              isEditing={isEditing}
              isArabic={isArabic}
              isSubmitting={isSubmitting}
              onCancel={() => navigate("/products")}
            />
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default ProductForm;
