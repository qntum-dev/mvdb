import ReadMore from "@/components/custom/ReadMore";
import Img from "@/components/custom/Img";
import PersonDetailsSkeleton from "@/components/Person/PersonDetailsSkeleton";
// import Slider from "@/components/custom/Slider";
import env from "@/lib/env";
import { fetchDetails } from "@/lib/fetchDetails";
import {
  Cast_Credits,
  CombinedCredits,
  Crew,
  PersonDetails,
} from "@/lib/types";
import { Metadata } from "next";
import { Suspense } from "react";
import Slider from "@/components/custom/Slider";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function getTop8ByVoteCount(credits: CombinedCredits): CombinedCredits {
  // Combine cast and crew into one array
  const allCredits = [...credits.cast, ...credits.crew];

  // Sort by vote_count in descending order
  allCredits.sort((a, b) => b.vote_count - a.vote_count);

  // Extract top 8 credits
  const top8 = allCredits.slice(0, 8).reverse();

  // Separate back into cast and crew
  const topCast = top8.filter(
    (credit) => "character" in credit
  ) as Cast_Credits[];
  const topCrew = top8.filter((credit) => "job" in credit) as Crew[];

  return {
    cast: topCast,
    crew: topCrew,
    id: credits.id,
  };
}

// export function getTop8ByCustomRanking(credits: CombinedCredits): CombinedCredits {
//   // Combine cast and crew into one array
//   const allCredits = [...credits.cast, ...credits.crew];

//   // Define a ranking formula using popularity, vote_average, vote_count, and latest release_date
//   const rankScore = (credit: Cast_Credits | Crew) => {
//     const releaseDate = credit.release_date ? new Date(credit.release_date).getTime() : 0;
//     return (
//       credit.vote_count * 0.5 +
//       credit.vote_average * 1.5 +
//       credit.popularity * 1.0 +
//       releaseDate * 0.000000001 // Normalize date influence
//     );
//   };

//   // Sort by the custom ranking score in descending order
//   allCredits.sort((a, b) => rankScore(b) - rankScore(a));

//   // Extract top 8 credits and reverse order
//   const top8 = allCredits.slice(0, 8).reverse();

//   // Separate back into cast and crew
//   const topCast = top8.filter(credit => 'character' in credit) as Cast_Credits[];
//   const topCrew = top8.filter(credit => 'job' in credit) as Crew[];

//   return {
//     cast: topCast,
//     crew: topCrew,
//     id: credits.id
//   };
// }

export function getTop8ByCustomRanking(credits: CombinedCredits): (Cast_Credits | Crew)[] {
  // Combine cast and crew into one array
  const allCredits = [...credits.cast, ...credits.crew];

  // Remove duplicates based on the `id`
  const uniqueCredits = Array.from(new Map(allCredits.map(credit => [credit.id, credit])).values());

  // Define a ranking formula with priority on vote_count and release_date/first_air_date
  const rankScore = (credit: Cast_Credits | Crew) => {
    // Determine the correct release date (movies: release_date, TV shows: first_air_date)
    const releaseDate = credit.media_type === "tv" && credit.first_air_date
      ? new Date(credit.first_air_date).getTime()
      : credit.release_date
      ? new Date(credit.release_date).getTime()
      : 0;

    const order = "order" in credit && credit.order !== undefined ? -credit.order : 0; // Higher priority for lower order numbers
    
    return (
      credit.vote_count * 2.0 + // Highest weight for vote count
      releaseDate * 0.000000002 + // Higher weight for newer release date
      order * 10.0 + // Higher priority for lower order values
      credit.vote_average * 1.0 +
      credit.popularity * 0.5
    );
  };

  // Sort by the custom ranking score in descending order
  uniqueCredits.sort((a, b) => rankScore(b) - rankScore(a));

  // Extract top 8 credits
  return uniqueCredits.slice(0, 8);
}



export function getKnownFor(credits: CombinedCredits): Cast_Credits[] {
  // Combine cast and crew into one array (considering only cast for "known for")
  const allCredits = credits.cast.filter(
    (credit) => credit.order !== undefined && credit.order < 25
  );

  // Define a ranking formula based on TMDB's known_for logic
  const rankScore = (credit: Cast_Credits) => {
    const orderScore =
      "order" in credit && credit.order !== undefined
        ? -(credit.order + 1) * 10
        : 0; // Higher priority for lower order values

    const releaseDate = credit.release_date
      ? new Date(credit.release_date).getTime() * 0.0000001
      : 0;
    return (
      credit.vote_count * 10.0 + // Highest weight for vote count
      releaseDate * 0.001 + // Higher weight for newer release date
      orderScore + // Higher priority for lower order values
      credit.vote_average * 1.0 +
      credit.popularity * 10 // Newer release date has some impact
    );
  };

  // Sort by the ranking score in descending order
  allCredits.sort((a, b) => rankScore(b) - rankScore(a));

  // Extract top 10 known_for titles
  const topCredits = allCredits.slice(0, 10);

  // Sort the final result by vote count in descending order
  topCredits.sort((a, b) => b.vote_count - a.vote_count);

  return topCredits;
}



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { id } = await params;

  console.log(id.split("-")[0]);

  // fetch data
  const person: PersonDetails = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/person/${id}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ATOKEN}`,
      },
      credentials: "include",
      mode: "cors",
      cache: "no-store",
    }
  ).then((res) => res.json());

  return {
    title: `${person.name} - MVDB`,
    description: `${person.biography}`,
    openGraph: {
      url: `${env.NEXT_PUBLIC_URL}/person/${person.id}-${person.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`,
      title: `${person.name}`,
      type: `profile`,
      description: `${person.biography}`,
      images: [
        `${env.NEXT_PUBLIC_URL}/_next/image?url=${encodeURIComponent(`${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2${person.profile_path}`)}&w=640&q=75`,
      ],
    },
  };
}

// const MovieCard=({movie}:{movie:KnownFor})=>{
//     return (
//         <div className="flex flex-col items-center gap-3">
//             <div className="bg-cover bg-center rounded-bl-3xl rounded-tr-3xl border border-white w-[150px] h-[225px]" style={{backgroundImage:`url(${env.NEXT_PUBLIC_MEDIA_URL}/w300_and_h450_bestv2/${movie.poster_path})`}}></div>
//             <p className="">{movie.title}</p>
//         </div>
//     )
// }

const PersonDetailsLoaded = async ({ id }: { id: string }) => {
  const person_details: PersonDetails = await fetchDetails("person", id);

  // console.log(person_details);

  const knownFor: CombinedCredits = await fetchDetails(
    "person",
    id,
    "combined_credits"
  );

  console.log(knownFor.cast);
  const top8 = getTop8ByCustomRanking(knownFor);
  console.log(top8);

  return (
    <div>
      <div className="lg:grid grid-cols-12">
        <div className="col-span-3 ">
          <div className="flex flex-col gap-6 items-center justify-center ">
            <div className="w-full flex items-center justify-center">
              {/* <div
                className={
                  "rounded-bl-3xl rounded-tr-3xl relative h-[500px] border border-white overflow-hidden w-[90%]"
                }
              >
                <Image
                  alt={person_details.name}
                  src={`${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2/${person_details.profile_path}`}
                  fill
                  className="object-cover object-center"
                />
              </div> */}
              <div className="lg:hidden">
                <Img
                  alt={person_details.name}
                  h="440"
                  w="300"
                  rounded="custom"
                  path={`w600_and_h900_bestv2/${person_details.profile_path}`}
                />
              </div>
              <div className="hidden lg:block">
                <Img
                  alt={person_details.name}
                  w_perc={90}
                  rounded="custom"
                  path={`w600_and_h900_bestv2/${person_details.profile_path}`}
                />
              </div>
            </div>
            {/* <div className="w-full border border-yellow-400"> */}
            {/* <div
                className="bg-cover bg-center rounded-bl-3xl rounded-tr-3xl border border-white w-full lg:w-[90%] h-[365px]"
                style={{
                  backgroundImage: `url(${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2/${person_details.profile_path})`,
                }}
              ></div> */}
            {/* </div> */}
            <div className=""></div>
          </div>
        </div>

        <div className="col-span-9 ">
          <div className="mb-8">
            <p className="text-4xl lg:text-start text-center">
              {person_details.name}
            </p>
          </div>
          <div className="flex flex-col gap-12">
            <div className="">
              <p className="text-xl mb-2 tracking-wider">Biography</p>
              <ReadMore clamp={6} text={person_details.biography} />
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-xl tracking-wider">Known for</p>
              <div className="">
                {knownFor && (
                  <Slider
                    gap="6"
                    elements={top8?.map((credit) => (
                      <a key={credit.id} href={credit.media_type =="movie" ? `/movie/${credit.id}-${credit?.title?.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}` : `/show/${credit.id}-${credit?.name?.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}>
                        <div className="flex flex-col items-center gap-5">

                      <div>
                        <Img
                          w="150"
                          path={`${env.NEXT_PUBLIC_MEDIA_URL}/w300_and_h450_bestv2${credit.poster_path}`}
                          alt={credit.media_type}
                        />
                      </div>
                      <div className="">
                        <p className="text-center text-sm">{credit.media_type =="tv" ? credit.name : credit.title}</p>
                      </div>
                        </div>
                      </a>
                    ))}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function PersonDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<PersonDetailsSkeleton />}>
      <PersonDetailsLoaded id={id} />
    </Suspense>
  );
}
