import { Skeleton } from "@/components/ui/skeleton";

const ShowPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-4 w-full animate-pulse">
      {/* Title and Release Info */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-2/5" />
        <div className="flex gap-2 text-gray-400 tracking-wide text-sm font-semibold items-center">
          <Skeleton className="h-5 w-10" />
          <div className="rounded-full w-1.5 h-1.5 bg-gray-400"></div>
          <Skeleton className="h-5 w-16" />
        </div>
      </div>

      {/* Poster & Video Section */}
      <div className="lg:flex gap-6">
        <div className="hidden lg:block">
          <Skeleton className="h-[365px] w-[260px] rounded-bl-3xl rounded-tr-3xl" />
        </div>
        <div className="lg:w-[650px]">
          <Skeleton className="h-[365px] w-full rounded-bl-3xl rounded-tr-3xl" />
        </div>
      </div>

      {/* Genres */}
      <div className="flex gap-3">
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-14 rounded-full" />
      </div>

      {/* Overview */}
      <div className="lg:w-2/3">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-5/6 mb-2" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      {/* Cast Section */}
      <div className="lg:grid lg:grid-cols-12 w-full">
        <div className="lg:col-span-7 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="mb-2 lg:col-span-full flex gap-1 items-center">
              <Skeleton className="h-10 w-20" />
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-6">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Movies */}
        <div className="hidden lg:block lg:col-span-5 lg:col-start-9">
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 w-full border border-gray-600 p-4 rounded-xl">
                <Skeleton className="w-[280px] h-[160px] rounded-lg" />
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPageSkeleton;
