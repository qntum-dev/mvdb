import MoviesCard from "@/components/Movies/MoviesCard";
import ShowsCard from "@/components/Shows/ShowsCard";
import env from "@/lib/env";
import kyServer from "@/lib/ky";
import { Movies, Persons, Shows } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const head = "Trending today";
  // const subHead = "Today's trending movies";
  // const url = "trending/movie/day";
  const trending_movies: Movies = await kyServer
    .get("trending/movie/day")
    .json();
  console.log(trending_movies);

  const popular_movies: Movies = await kyServer.get("movie/popular").json();

  const popular_people: Persons = await kyServer.get("person/popular").json();

  const trending_shows:Shows =await kyServer.get("trending/tv/day").json();

  // console.log(trending_shows);
  
  // const popular_shows:

  // console.log(popular_people);

  return (
    <>
      <div className="flex flex-col gap-16">
        
{/* Trending movie section */}
        <div className="">
          <div className="w-fit group">
            <Link className="" href={`trending`}>
              <div className="flex items-center w-fit">
                <p className="text-2xl font-bold">Tren<span className="text-red-500">ding</span> today</p>
                <ChevronRight
                  strokeWidth={3}
                  size={40}
                  fontWeight={"bold"}
                  className="text-white duration-200 group-hover:text-red-500"
                />
              </div>
            </Link>
          </div>
          <div className="">
            <p className="text-gray-300 tracking-wider">
              {"Today's trending movies"}
            </p>
          </div>

          <div className="mt-3">
            <MoviesCard movies={trending_movies} />
          </div>
        </div>


{/* Popular person section */}
        <div className="flex flex-col gap-6">
          <div className="">
            <p className="text-2xl font-bold">Most <span className="text-red-500">Famous</span> People</p>
          </div>
          <div className="flex gap-6 overflow-auto">
            {popular_people.results.map((people) => (
              <Link
                href={`${people.original_name.toLowerCase()}`}
                key={people.id}
              >
                <div className="w-36">
                  <Image
                    src={`${env.NEXT_PUBLIC_MEDIA_URL}/w500/${people.profile_path}`}
                    alt={people.original_name}
                    width={500}
                    height={500}
                    // className="rounded-full"
                    objectFit="cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>


{/* Popular movie section */}
        <div className="">
          <div className="w-fit group">
            <Link className="" href={`popular`}>
              <div className="flex items-center w-fit">
                <p className="text-2xl font-bold"><span className="text-red-500">Pop</span>ular Movies</p>
                <ChevronRight
                  strokeWidth={3}
                  size={40}
                  fontWeight={"bold"}
                  className="text-white duration-200 group-hover:text-red-500"
                />
              </div>
            </Link>
          </div>
          <div className="">
            <p className="text-gray-300 tracking-wider">
              {"Explore the most popular movies"}
            </p>
          </div>

          <div className="mt-3">
            <MoviesCard movies={popular_movies} />
          </div>
        </div>

{/* Trending Shows section */}
<div className="">
          <div className="w-fit group">
            <Link className="" href={`popular`}>
              <div className="flex items-center w-fit">
                <p className="text-2xl font-bold">Tren<span className="text-red-500">ding Shows</span></p>
                <ChevronRight
                  strokeWidth={3}
                  size={40}
                  fontWeight={"bold"}
                  className="text-white duration-200 group-hover:text-red-500"
                />
              </div>
            </Link>
          </div>
          <div className="">
            <p className="text-gray-300 tracking-wider">
              {"Explore the trending shows of this week"}
            </p>
          </div>

          <div className="mt-3">
            <ShowsCard shows={trending_shows} />
          </div>
        </div>

      </div>
    </>
  );
}
