import Slider from "@/components/custom/Slider";
import Img from "@/components/Img";
import MovieCardSkeleton from "@/components/Movies/MovieCardSkeleton";
import MoviesCard from "@/components/Movies/MoviesCard";
import ShowsCard from "@/components/Shows/ShowsCard";
import kyServer from "@/lib/ky";
import { Movies, Persons, Shows } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { ReactNode, Suspense } from "react";



// Reusable section header component
const SectionHeader = ({ title, redPart, linkTo = "trending" }:{ title:string, redPart:string, linkTo:string }) => (
  <div className="w-fit group">
    <a href={linkTo}>
      <div className="flex items-center w-fit">
        <p className="text-3xl font-bold">
          {title}<span className="text-red-500">{redPart}</span>
        </p>
        <ChevronRight
          strokeWidth={3}
          size={40}
          className="text-white duration-200 group-hover:text-red-500"
        />
      </div>
    </a>
  </div>
);

// Generic skeleton component
const GenericSkeleton = ({ length = 15, type = "movie" }) => (
  <Slider
    gap="10"
    elements={Array.from({ length }).map((_, index) => (
      type === "person" ? (
        <div key={index} className="flex flex-col items-center gap-4">
          <div className="w-[200px] h-[200px] bg-gray-700 rounded-full border border-gray-600" />
          <div className="w-24 h-6 bg-gray-700 rounded-md" />
        </div>
      ) : (
        <MovieCardSkeleton key={index} />
      )
    ))}
  />
);

// Component for trending movies section
async function TrendingMovies() {
  const trending_movies: Movies = await kyServer.get("trending/movie/day").json();
  return (
    <Slider
      gap="10"
      elements={trending_movies.results.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} />
      ))}
    />
  );
}

// Component for popular people section
async function PopularPeople() {
  const popular_people: Persons = await kyServer.get("person/popular").json();
  // console.log(popular_people);
  console.log(popular_people);
  
  popular_people.results.map((people)=>console.log(people.profile_path));
  
  return (
    <Slider
      gap="6"
      elements={popular_people.results.map((people) => (
        <a
          href={`/person/${people.id}-${people.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
          key={people.id}
        >
          <div className="group flex flex-col items-center gap-4">
            {people.profile_path ? (
              
              <Img w="200" h="200" path={`t/p/w276_and_h350_face${people.profile_path}`} alt={people.name} rounded="full" border="border-red-400"/>
            ):(
              <Img w="200" h="200" path={`https://avatar.iran.liara.run/username?username=${people.name.split(" ")[0]}+${people.name.split(" ")[1]}`} alt={people.name} rounded="full" border="border-red-400"/>
            )}
            {/* <div
              className="w-[200px] h-[200px] bg-cover bg-center rounded-full border border-red-600"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_URL}/t/p/w276_and_h350_face/${people.profile_path})`,
              }}
            ></div> */}
            <div className="group-hover:text-red-400 duration-200">{people.name}</div>
          </div>
        </a>
      ))}
    />
  );
}

// Component for popular movies section
async function PopularMovies() {
  const popular_movies: Movies = await kyServer.get("movie/popular").json();
  return (
    <Slider
      gap="10"
      elements={popular_movies.results.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} />
      ))}
    />
  );
}

// Component for trending shows section
async function TrendingShows() {
  const trending_shows: Shows = await kyServer.get("trending/tv/day").json();
  return (
    <Slider
      gap="10"
      elements={trending_shows.results.map((show) => (
        <ShowsCard key={show.id} show={show} />
      ))}
    />
  );
}

// Component for a section with title and content
const Section = ({ title, redPart, children, linkTo = "trending", type = "movie" }:{ title:string, redPart:string, children:ReactNode, linkTo?:string,type?:string }) => (
  <div className="flex flex-col gap-10">
    {title && (
      type === "person" ? (
        <p className="text-2xl font-bold">
          {title} <span className="text-red-500">{redPart}</span>
        </p>
      ) : (
        <SectionHeader title={title} redPart={redPart} linkTo={linkTo} />
      )
    )}
    {children}
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col gap-[80px]">
      <Section title="Tren" redPart="ding today">
        <Suspense fallback={<GenericSkeleton />}>
          <TrendingMovies />
        </Suspense>
      </Section>

      <Section title="Most" redPart="Famous People" type="person">
        <Suspense fallback={<GenericSkeleton length={10} type="person" />}>
          <PopularPeople />
        </Suspense>
      </Section>

      <Section title="Pop" redPart="ular Movies">
        <Suspense fallback={<GenericSkeleton />}>
          <PopularMovies />
        </Suspense>
      </Section>

      <Section title="Tren" redPart="ding Shows">
        <Suspense fallback={<GenericSkeleton />}>
          <TrendingShows />
        </Suspense>
      </Section>
    </div>
  );
}