import { formatDate } from "@/lib/formatDate";
import { Movie } from "@/lib/types";
import { Star } from "lucide-react";
import Link from "next/link";
import Img from "../Img";

const MoviesCard = ({ movie }: { movie: Movie }) => {
  // console.log(movie.id);

  return (
    <>
      <div className="h-full w-full ">
        <Link
          className=""
          key={movie.id}
          href={`movie/${movie.id}-${movie.title.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
        >
          <div className="w-[220px] rounded-tr-full flex flex-col h-full justify-between  gap-5">
            <div className="group flex flex-col gap-4 ">
            <Img alt={movie.title} h="320" path={`w440_and_h660_face/${movie.poster_path}`}/>
              {/* <div
                className="h-[320px] bg-cover bg-center rounded-bl-3xl rounded-tr-3xl border border-white"
                style={{
                  backgroundImage: `url(${env.NEXT_PUBLIC_MEDIA_URL}/w440_and_h660_face/${movie.poster_path})`,
                }}
              ></div> */}
              {/* <Image
                src={`${env.NEXT_PUBLIC_MEDIA_URL}/w440_and_h660_face/${movie.poster_path}`}
                className="object-cover rounded-tr-xl"
                alt={movie.original_title}
                // layout="fill"
                width={440}
                height={660}
                objectFit="cover"
              /> */}
              <p className="hover:underline font-medium tracking-widest text-sm group-hover:text-red-400 duration-200">
                {movie.title}
              </p>
            </div>
            <div className="">
              <div className="flex justify-between text-gray-500 items-center">
                <div className="flex gap-2 items-center text-white text-sm">
                  <Star size={28} strokeWidth={3} className="text-yellow-400" />
                  {movie.vote_average}
                </div>
                <p className="font-bold text-sm">
                  {formatDate(movie.release_date)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MoviesCard;
