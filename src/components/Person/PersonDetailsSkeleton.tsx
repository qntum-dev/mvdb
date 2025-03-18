import { Skeleton } from "@/components/ui/skeleton";

const PersonDetailsSkeleton = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-12 gap-6">
        {/* Left Section (Profile Image) */}
        <div className="col-span-3 flex flex-col items-center gap-6">
          <div className="w-full flex justify-center">
            <div className="rounded-bl-3xl rounded-tr-3xl h-[500px] w-[90%] border border-white overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Right Section (Details) */}
        <div className="col-span-9 flex flex-col gap-12">
          {/* Name */}
          <div className="mb-8">
            <Skeleton className="h-10 w-1/3" />
          </div>

          {/* Biography Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Known For Section */}
          {/* <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-1/4" />
            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Skeleton className="w-[150px] h-[225px] rounded-bl-3xl rounded-tr-3xl border border-white" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsSkeleton;
