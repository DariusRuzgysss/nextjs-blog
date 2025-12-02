import { Skeleton } from "@/components/ui/skeleton";

const LoadingDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 lg:px-0">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[400px] w-full rounded-xl bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-5/6 bg-gray-300" />
            <Skeleton className="h-4 w-4/5 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingDashboard;
