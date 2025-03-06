import env from "@/lib/env";
import { formatDate } from "@/lib/formatDate";
import { Movies } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MoviesCard = ({ movies }: { movies: Movies }) => {
  return (
    <>
      <div className="mt-3">
        <div className="flex gap-8 overflow-auto">
          {movies.results.map((movie) => (
            <Link
              className=""
              key={movie.id}
              href={`movie/${movie.id}-${movie.title.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
            >
              <div className="w-52 h-full overflow-hidden bg-[#1a1a1a] rounded-tr-xl">
                <Image
                  src={`${env.NEXT_PUBLIC_MEDIA_URL}/w440_and_h660_face/${movie.poster_path}`}
                  className="object-cover border border-red-500 rounded-tr-xl"
                  alt={movie.original_title}
                  // layout="fill"
                  width={440}
                  height={660}
                  objectFit="cover"
                />
                <div className="flex flex-col mt-3 px-2 gap-2 mb-1">
                  <div className="flex justify-between text-red-700 items-center">
                    <div className="flex gap-2 items-center text-white">
                      <Star
                        size={28}
                        strokeWidth={3}
                        className="text-yellow-400"
                      />
                      {movie.vote_average}
                    </div>
                    <p className="font-bold">
                      {formatDate(movie.release_date)}
                    </p>
                  </div>
                  <p className="hover:underline font-medium tracking-wider">{movie.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoviesCard;
