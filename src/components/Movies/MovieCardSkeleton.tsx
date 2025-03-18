import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton = () => {
  return (
    <div className="h-full w-full">
      <div className="w-[220px] rounded-tr-full flex flex-col h-full justify-between gap-5">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[320px] w-full rounded-bl-3xl rounded-tr-3xl border border-white" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="">
          <div className="flex justify-between text-gray-500 items-center">
            <div className="flex gap-2 items-center text-white text-sm">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;