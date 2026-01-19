import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[400px] w-full rounded-xl bg-skeleton" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-5/6 bg-skeleton" />
            <Skeleton className="h-4 w-4/5 bg-skeleton/50" />
          </div>
        </div>
      ))}
    </main>
  );
};

export default SkeletonLoader;
