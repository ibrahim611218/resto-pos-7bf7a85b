
import React from "react";

interface LoadingStateProps {
  isArabic: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isArabic }) => {
  return (
    <div className="container p-4 flex justify-center items-center min-h-[50vh]">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">
          {isArabic ? "جاري تحميل البيانات..." : "Loading inventory data..."}
        </h3>
        <p className="text-muted-foreground">
          {isArabic ? "يرجى الانتظار" : "Please wait"}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
