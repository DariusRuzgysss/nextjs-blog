import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingDashboard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[400px] w-full rounded-xl bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-5/6 bg-gray-300" />
        <Skeleton className="h-4 w-4/5 bg-gray-200" />
      </div>
    </div>
  );
};

export default LoadingDashboard;
