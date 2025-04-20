
import React from "react";
import MainLayout from "@/components/layout/MainLayout";

const Orders: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="bg-card p-6 rounded-lg shadow">
          <p className="text-center text-muted-foreground">Orders page content will be implemented here.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;
