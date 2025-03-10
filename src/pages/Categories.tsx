
import React from "react";
import { Link } from "react-router-dom";
import { sampleCategories } from "@/data/sampleData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Plus } from "lucide-react";

const Categories = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">التصنيفات</h1>
        <Button>
          <Plus className="ml-2" size={16} /> إضافة تصنيف
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Tag className="ml-2" size={18} />
                {category.nameAr || category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.nameAr || category.name}
                className="w-full h-40 object-cover"
              />
            </CardContent>
            <CardFooter className="pt-4 flex justify-between">
              <Button asChild variant="outline">
                <Link to={`/products?category=${category.id}`}>تصفح المنتجات</Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Tag size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
