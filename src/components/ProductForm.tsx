
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Package, Plus, Tag, X, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { sampleCategories, sampleProducts } from "@/data/sampleData";
import { Product, ProductVariant, ProductType } from "@/types";
import { toast } from "sonner";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const emptyProduct: Product = {
    id: "",
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    image: "/placeholder.svg",
    categoryId: "",
    taxable: true,
    type: "sized",
    variants: [],
  };

  const [product, setProduct] = useState<Product>(emptyProduct);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  
  useEffect(() => {
    if (isEditing) {
      const existingProduct = sampleProducts.find(p => p.id === id);
      if (existingProduct) {
        setProduct(existingProduct);
        setVariants([...existingProduct.variants]);
      } else {
        toast.error("المنتج غير موجود");
        navigate("/products");
      }
    }
  }, [id, isEditing, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setProduct(prev => ({
      ...prev,
      taxable: checked
    }));
  };

  const handleTypeChange = (value: ProductType) => {
    setProduct(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setProduct(prev => ({
      ...prev,
      categoryId: value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProduct(prev => ({
      ...prev,
      price: isNaN(value) ? 0 : value
    }));
  };

  const addVariant = () => {
    const sizeOptions: { size: string, label: string }[] = [
      { size: "small", label: "صغير" },
      { size: "medium", label: "وسط" },
      { size: "large", label: "كبير" }
    ];
    
    // Find a size that doesn't exist yet in variants
    const availableSizes = sizeOptions
      .filter(option => !variants.some(v => v.size === option.size))
      .map(option => option.size);
    
    if (availableSizes.length === 0) {
      toast.error("تم إضافة جميع المقاسات المتاحة");
      return;
    }

    const newVariant: ProductVariant = {
      id: `var-${Date.now()}`,
      size: availableSizes[0] as any,
      price: 0
    };

    setVariants(prev => [...prev, newVariant]);
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const removeVariant = (id: string) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!product.name || !product.categoryId) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (product.type === "sized" && variants.length === 0) {
      toast.error("يرجى إضافة مقاس واحد على الأقل");
      return;
    }

    if (product.type === "single" && (!product.price || product.price <= 0)) {
      toast.error("يرجى إدخال سعر صحيح للمنتج");
      return;
    }

    // Here we would typically save to a database
    // For now, just show a success message and navigate back
    
    const updatedProduct: Product = {
      ...product,
      id: isEditing ? product.id : `prod-${Date.now()}`,
      variants: product.type === "sized" ? variants : [],
    };

    const successMessage = isEditing 
      ? "تم تعديل المنتج بنجاح" 
      : "تم إضافة المنتج بنجاح";
    
    toast.success(successMessage);
    navigate("/products");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="ml-2" size={18} />
              {isEditing ? "تعديل المنتج" : "إضافة منتج جديد"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم المنتج</Label>
                <Input 
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  placeholder="أدخل اسم المنتج"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nameAr">اسم المنتج (عربي)</Label>
                <Input 
                  id="nameAr"
                  name="nameAr"
                  value={product.nameAr || ""}
                  onChange={handleInputChange}
                  placeholder="أدخل اسم المنتج بالعربية"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف المنتج</Label>
              <Textarea 
                id="description"
                name="description"
                value={product.description || ""}
                onChange={handleInputChange}
                placeholder="أدخل وصف المنتج"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descriptionAr">وصف المنتج (عربي)</Label>
              <Textarea 
                id="descriptionAr"
                name="descriptionAr"
                value={product.descriptionAr || ""}
                onChange={handleInputChange}
                placeholder="أدخل وصف المنتج بالعربية"
                rows={3}
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">التصنيف</Label>
              <Select 
                value={product.categoryId} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {sampleCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nameAr || category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>نوع المنتج</Label>
              <RadioGroup 
                value={product.type} 
                onValueChange={(value) => handleTypeChange(value as ProductType)}
                className="flex space-x-4 space-x-reverse"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="sized" id="sized" />
                  <Label htmlFor="sized">متعدد المقاسات</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single">منتج فردي (بالحبة)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch 
                  id="taxable"
                  checked={product.taxable}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="taxable">خاضع للضريبة</Label>
              </div>
            </div>

            {product.type === "single" ? (
              <div className="space-y-2">
                <Label htmlFor="price">السعر</Label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Input 
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.price || ""}
                    onChange={handlePriceChange}
                    placeholder="أدخل سعر المنتج"
                    className="w-32"
                  />
                  <span>ريال</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>المقاسات والأسعار</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addVariant}
                  >
                    <Plus size={16} className="ml-2" />
                    إضافة مقاس
                  </Button>
                </div>
                {variants.length === 0 ? (
                  <div className="text-center p-4 border rounded-md text-muted-foreground">
                    لا توجد مقاسات. أضف مقاس باستخدام الزر أعلاه.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {variants.map(variant => (
                      <div key={variant.id} className="flex items-center space-x-2 space-x-reverse border p-2 rounded-md">
                        <Select 
                          value={variant.size} 
                          onValueChange={(value) => updateVariant(variant.id, 'size', value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">صغير</SelectItem>
                            <SelectItem value="medium">وسط</SelectItem>
                            <SelectItem value="large">كبير</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex items-center flex-1">
                          <Input 
                            type="number"
                            min="0"
                            step="0.01"
                            value={variant.price}
                            onChange={(e) => updateVariant(variant.id, 'price', parseFloat(e.target.value) || 0)}
                            placeholder="السعر"
                            className="w-24"
                          />
                          <span className="mr-2">ريال</span>
                        </div>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeVariant(variant.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/products")}
            >
              إلغاء
            </Button>
            <Button type="submit">
              {isEditing ? "حفظ التغييرات" : "إضافة المنتج"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
