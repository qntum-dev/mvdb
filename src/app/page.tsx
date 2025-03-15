import Slider from "@/components/custom/Slider";
import MoviesCard from "@/components/Movies/MoviesCard";
import ShowsCard from "@/components/Shows/ShowsCard";
import kyServer from "@/lib/ky";
import { Movies, Persons, Shows } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MVDB: Explore Trending, Popular TV shows and Movies",
  description: "Explore trending, popular TV shows, movies and much more ",
};

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

  const trending_shows: Shows = await kyServer.get("trending/tv/day").json();

  // console.log(trending_shows);

  // const popular_shows:

  // console.log(popular_people);

  return (
    <>
      <div className="flex flex-col gap-[80px]">
        {/* Trending movie section */}
        <div className="flex flex-col gap-10">
          <div className="w-fit group">
            <Link className="" href={`trending`}>
              <div className="flex items-center w-fit">
                <p className="text-3xl font-bold">
                  Tren<span className="text-red-500">ding</span> today
                </p>
                <ChevronRight
                  strokeWidth={3}
                  size={40}
                  fontWeight={"bold"}
                  className="text-white duration-200 group-hover:text-red-500"
                />
              </div>
            </Link>
          </div>
          <Slider
            gap="10"
            elements={trending_movies.results.map((movie) => (
              <MoviesCard key={movie.id} movie={movie} />
            ))}
          />
          {/* <div className="mt-1">
            <p className="text-gray-300 text-sm tracking-wider">
              {"Today's trending movies"}
            </p>
          </div> */}
        </div>

        {/* Popular person section */}
        <div className="flex flex-col gap-8">
          <div className="">
            <p className="text-2xl font-bold">
              Most <span className="text-red-500">Famous</span> People
            </p>
          </div>
          <div className="">
            <Slider
              gap="6"
              elements={popular_people.results.map((people) => (
                <Link
                  href={`/person/${people.id}-${people.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
                  key={people.id}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="w-[200px] h-[200px] bg-cover bg-center rounded-full border border-red-600"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_URL}/t/p/w276_and_h350_face/${people.profile_path})`,
                      }}
                    ></div>
                    <div className="">{people.name}</div>
                  </div>
                  {/* <div className="w-36">
                    <Image
                      src={`${env.NEXT_PUBLIC_MEDIA_URL}/w500/${people.profile_path}`}
                      alt={people.original_name}
                      width={500}
                      height={500}
                      
                      objectFit="cover"
                    />
                  </div> */}
                </Link>
              ))}
            />
          </div>
        </div>

        {/* Popular movie section */}
        <div className="flex flex-col gap-10">
          <div className="w-fit group">
            <Link className="" href={`trending`}>
              <div className="flex items-center w-fit">
                <p className="text-3xl font-bold">
                  <span className="text-red-500">Pop</span>ular Movies
                </p>
                <ChevronRight
                  strokeWidth={3}
                  size={40}
                  fontWeight={"bold"}
                  className="text-white duration-200 group-hover:text-red-500"
                />
              </div>
            </Link>
          </div>
          <Slider
            gap="10"
            elements={popular_movies.results.map((movie) => (
              <MoviesCard key={movie.id} movie={movie} />
            ))}
          />
          {/* <div className="mt-1">
            <p className="text-gray-300 text-sm tracking-wider">
              {"Today's trending movies"}
            </p>
          </div> */}
        </div>

        {/* Trending Shows section */}

        <div className="flex flex-col gap-10">
          <div className="w-fit group">
            <Link className="" href={`trending`}>
              <div className="flex items-center w-fit">
                <p className="text-3xl font-bold">
                  Tren<span className="text-red-500">ding Shows</span>
                </p>
                <ChevronRight
                  strokeWidth={3}
                  size={40}
                  fontWeight={"bold"}
                  className="text-white duration-200 group-hover:text-red-500"
                />
              </div>
            </Link>
          </div>
          <Slider
            gap="10"
            elements={trending_shows.results.map((show) => (
              <ShowsCard key={show.id} show={show} />
            ))}
          />
          {/* <div className="mt-1">
            <p className="text-gray-300 text-sm tracking-wider">
              {"Today's trending movies"}
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}
