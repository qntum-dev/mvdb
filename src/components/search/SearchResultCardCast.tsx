import { KnownFor } from "@/lib/types";

const SearchResultCardCast = ({
  name,
  image_url,
  known_for,
  department
}: {
  name: string;
  image_url: string;
  known_for: KnownFor[];
  department:string
}) => {
  return (
    <div>
      <div className="flex items-center gap-6 ">
        <div className="w-fit">

        <div
          className="w-[120px] h-[120px] bg-center bg-cover rounded-full border border-white"
          style={{
            backgroundImage: `url(${image_url})`,
          }}
        ></div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl">{name}</p>
            <p className="">Career: {department}</p>
          <div className="flex gap-4">
            {known_for.map((result)=>(
                <p className="" key={result.id}>
                    {result.original_title || result.original_name}
                </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCardCast;
