
import ReadMore from "@/components/custom/ReadMore";
// import Slider from "@/components/custom/Slider";
import env from "@/lib/env";
import { fetchDetails } from "@/lib/fetchDetails";
import {  PersonDetails } from "@/lib/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

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

const page = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {

  const { id } = await params;

  const person_details: PersonDetails = await fetchDetails("person", id);

  console.log(person_details);

  // const knownFor:=

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-3 ">
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <div
                className="bg-cover bg-center rounded-bl-3xl rounded-tr-3xl border border-white w-[90%] h-[365px]"
                style={{
                  backgroundImage: `url(${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2/${person_details.profile_path})`,
                }}
              ></div>
            </div>
            <div className=""></div>
          </div>
        </div>

        <div className="col-span-9 ">
          <div className="mb-8">
            <p className="text-4xl">{person_details.name}</p>
          </div>
          <div className="flex flex-col gap-12">
            <div className="">
              <p className="text-xl mb-2 tracking-wider">Biography</p>
              <ReadMore clamp={5} text={person_details.biography}/>
            </div>
            <div className="tracking-wider">
                <p className="text-xl">Known for</p>
                <div className="">
                    {/* <Slider gap="6" elements={person_details?.known_for?.map((movie)=>(
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}/> */}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
