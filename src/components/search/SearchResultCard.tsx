import { formatDate } from "@/lib/formatDate";
import Link from "next/link";

const SearchResultCard = ({
  name,
  image_url,
  release_date,
  overview,
  slug,
  id
}: {
  name: string;
  image_url: string;
  release_date?: string;
  overview: string;
  slug:string
  id:number

}) => {
    console.log(overview);
    const slugType = slug == "movie" ? "movie" : "show";
  return (
    <div className="flex gap-4 ">
      <div className="w-fit">
        <div
          className="w-[144px] h-[200px] bg-center bg-cover border border-white rounded-bl-3xl rounded-tr-3xl"
          style={{
            backgroundImage: `url(${image_url})`,
          }}
        ></div>
      </div>
      <div className="flex flex-col w-full">
        {release_date && (
          <p className="text-gray-500 font-bold text-sm">
            {formatDate(release_date)}
          </p>
        )}

        <Link className="text-xl hover:text-red-400" href={`/${slugType}/${id}-${name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}>{name}</Link>
        <p className="mt-4">{overview}</p>   
        </div>
    </div>
  );
};

export default SearchResultCard;
