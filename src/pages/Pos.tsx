
import React, { useEffect } from "react";
import Pos from "@/features/pos/Pos";

const PosPage: React.FC = () => {
  // Force the page to take the full viewport on mount
  useEffect(() => {
    // Add fullscreen classes to the root elements
    document.documentElement.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="min-h-screen max-w-full w-full h-full overflow-hidden m-0 p-0 pos-screen">
      <Pos />
    </div>
  );
};

export default PosPage;
