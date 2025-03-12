
import React from "react";
import Pos from "@/features/pos/Pos";

const PosPage: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900 fixed top-0 left-0 z-50">
      <Pos />
    </div>
  );
};

export default PosPage;
