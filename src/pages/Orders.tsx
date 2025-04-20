
import React from "react";
import MainLayout from "@/components/layout/MainLayout";

const Orders: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="bg-card p-6 rounded-lg shadow">
        <p className="text-center text-muted-foreground">Orders page content will be implemented here.</p>
      </div>
    </div>
  );
};

// Export the component for direct use
export { Orders };

// Export a default component for routing
const OrdersPage: React.FC = () => (
  <MainLayout />
);

export default OrdersPage;
