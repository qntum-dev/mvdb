import { KnownFor } from "@/lib/types";
import Img from "../Img";

import Link from "next/link";

const SearchResultCardCast = ({
  name,
  image_url,
  department,
  id,
}: {
  name: string;
  image_url: string;
  known_for: KnownFor[];
  department: string;
  id: number;
}) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center gap-6 ">
        <div className="block lg:hidden">
          {/* <div
                className={
                  "rounded-full relative h-[240px] border border-white overflow-hidden w-[240px]"
                }
              >
                <Image
                  alt={name}
                  src={`${env.NEXT_PUBLIC_MEDIA_URL}/${image_url}`}
                  fill
                  className="object-cover object-center"
                />
              </div> */}
          <Img
            path={`${image_url}`}
            alt={name}
            h="240"
            w="240"
            rounded="full"
          />
        </div>

        <div className="hidden lg:block">
        <Img
            path={`${image_url}`}
            alt={name}
            h="120"
            w="120"
            rounded="full"
          />
          {/* <Img
            path={`${image_url}`}
            alt={name}
            h="120"
            w="120"
            rounded="full"
          /> */}
        </div>

        <div className="flex flex-col gap-1  items-center lg:items-start">
          <Link
            className="text-xl hover:text-red-400"
            href={`/person/${id}-${name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
          >
            {name}
          </Link>
          <p className="">Career: {department}</p>
          {/* <div className="flex gap-4">
            {known_for.map((result) => (
              <p className="" key={result.id}>
                {result.original_title || result.original_name}
              </p>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchResultCardCast;
