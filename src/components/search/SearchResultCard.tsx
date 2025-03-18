import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import Img from "../Img";


const SearchResultCard = ({
  name,
  image_url,
  release_date,
  overview,
  slug,
  id,
}: {
  name: string;
  image_url: string;
  release_date?: string;
  overview: string;
  slug: string;
  id: number;
}) => {
  console.log(overview);
  const slugType = slug == "movie" ? "movie" : "show";
  return (
    <div className="flex gap-4 flex-col lg:flex-row items-center">
      <div className="lg:hidden w-full flex justify-center">
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
        <Img path={`${image_url}`} alt={name} w_perc={90}/>
      </div>

      <div className="hidden lg:block">
        <Img path={`${image_url}`} alt={name} h="200" w="144" />
      </div>

      {/* <div className="w-fit"> */}

      {/* <Img path={`${image_url}`} alt={name} h="200" w="144"/> */}
      {/* <div
          className="w-[144px] h-[200px] bg-center bg-cover border border-white rounded-bl-3xl rounded-tr-3xl"
          style={{
            backgroundImage: `url(${image_url})`,
          }}
        ></div> */}
      {/* </div> */}
      <div className="flex flex-col items-center lg:items-start">
        {release_date && (
          <p className="text-gray-500 font-bold text-sm">
            {formatDate(release_date)}
          </p>
        )}

        <Link
          className="lg:text-xl hover:text-red-400 text-center lg:text-start"
          href={`/${slugType}/${id}-${name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
        >
          {name}
          
        </Link>
        <p className="hidden lg:block mt-4 text-center lg:text-left line-clamp-4">{overview}</p>
      </div>
    </div>
  );
};

export default SearchResultCard;
