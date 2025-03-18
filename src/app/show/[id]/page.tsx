import Slider from "@/components/custom/Slider";
import Img from "@/components/Img";
import ShowPageSkeleton from "@/components/Shows/ShowPageSkeleton";
import VideoPlayer from "@/components/VideoPlayer";
import env from "@/lib/env";
import { fetchDetails } from "@/lib/fetchDetails";
import { formatDate } from "@/lib/formatDate";
import { Credits, Images, ShowDetails, Shows, Videos } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { id } = await params;

  console.log(id.split("-")[0]);

  // fetch data
  const show: ShowDetails = await fetch(`${env.NEXT_PUBLIC_API_URL}/tv/${id}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ATOKEN}`,
    },
    credentials: "include",
    mode: "cors",
    cache: "no-store",
  }).then((res) => res.json());

  return {
    title: `${show.name} (${formatDate(show.first_air_date).split(" ")[2]}) - MVDB`,
  };
}

const ShowPageContent = async ({ id }: { id: string }) => {
  const show_id = id.split("-")[0];

  const show_details: ShowDetails = await fetchDetails("tv", show_id);
  // console.log(show_details);

  const show_images: Images = await fetchDetails("tv", show_id, "images");

  const show_videos: Videos = await fetchDetails("tv", show_id, "videos");
  // console.log(movie_videos);

  const credits: Credits = await fetchDetails("tv", show_id, "credits");
  // console.log(credits);

  const recommendations: Shows = await fetchDetails(
    "tv",
    show_id,
    "recommendations"
  );

  // console.log(movie_images);

  const trailers = show_videos.results.filter((video) => {
    return video.type == "Trailer";
  });
  // console.log(trailers);

  // console.log(`https://www.youtube.com/watch?v=${trailers[0].key}`);

  // console.log(movie_details);

  // console.log(recommendations);

  console.log(credits);

  return (
    <div className="flex flex-col gap-10 lg:gap-4 w-full">
      {/* {movie_id} */}
      {/* {movie_details.overview} */}
      <div className="flex flex-col gap-4">
        <div className="">
          <p className=" text-4xl">{show_details.name}</p>
          <div className="flex gap-2 text-gray-400 tracking-wide text-sm font-semibold items-center">
            {/* <p className="">
                {movie_details}
              </p> */}
            {show_details.first_air_date != null && (
              <div className="">
                <p className="text-sm">
                  {show_details.first_air_date.split("-")[2]}/
                  {show_details.first_air_date.split("-")[1]}/
                  {show_details.first_air_date.split("-")[0]}
                </p>
              </div>
            )}

            {/* <p className="">.</p> */}
            <div className="rounded-full w-1.5 h-1.5 bg-gray-400"></div>
          </div>
        </div>

        <div className="lg:flex gap-6 ">
          <div className="hidden lg:block">
            <Img
              alt={show_details.name}
              h="365"
              w="260"
              path={`w600_and_h900_bestv2${show_images.posters[0].file_path}`}
            />
          </div>
          {/* <div
            className="w-[260px] h-[365px] bg-cover bg-center rounded-bl-3xl rounded-tr-3xl border border-white"
            style={{
              backgroundImage: `url(${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2${movie_images.posters[0].file_path})`,
            }}
          ></div> */}
          {/* <div className="rounded-xl overflow-hidden ">
              <Image
                alt={movie_images.posters[3].file_path}
                src={`${env.NEXT_PUBLIC_MEDIA_URL}/w300_and_h450_bestv2${movie_images.posters[0].file_path}`}
                width={300}
                height={450}
                objectFit={"cover"}
                className="object-cover"
              />
            </div> */}
          {trailers.length < 1 && (
            <div className="lg:w-[650px]">
              <div
                className="bg-cover bg-center rounded-bl-3xl rounded-tr-3xl border border-white lg:h-[365px]"
                style={{
                  backgroundImage: `url(${env.NEXT_PUBLIC_MEDIA_URL}/w1066_and_h600_bestv2/${show_images.backdrops[0].file_path})`,
                }}
              ></div>
            </div>
          )}
          {trailers[0]?.key && (
            <div className="lg:w-[650px]">
              <VideoPlayer
                url={`https://www.youtube.com/watch?v=${trailers[0].key}`}
              />
            </div>
          )}

          {/* <div className="">
          <h3 className="">More Like this</h3>
        </div> */}
        </div>
      </div>

      <div className="flex gap-3 ">
        {show_details.genres.map((genre) => {
          return (
            <div
              className="border border-red-500 py-1 tracking-wide px-3 rounded-full"
              key={genre.id}
            >
              <p className="text-sm">{genre.name}</p>
            </div>
          );
        })}
      </div>

      <div className="lg:w-2/3 ">
        <p className="">{show_details.overview}</p>
      </div>

      <div className="w-full">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="mb-2 lg:col-span-full flex gap-1 items-center">
                <div className="text-5xl text-red-600">I</div>
                <p className="text-4xl"> Cast</p>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-6">
                {credits.cast.map((cast) => {
                  return (
                    <Link
                      key={cast.id}
                      href={`/person/${cast.id}-${cast.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
                    >
                      <div className="group flex items-center gap-6 ">
                        <div className="hidden lg:block">
                          <Img
                            alt={cast.name}
                            h="90"
                            w="90"
                            path={`t/p/w138_and_h175_face/${cast.profile_path}`}
                            rounded="full"
                          />
                        </div>
                        <div className="block lg:hidden">
                          <Img
                            alt={cast.name}
                            h="150"
                            w="150"
                            path={`t/p/w470_and_h470_face/${cast.profile_path}`}
                            rounded="full"
                          />
                        </div>
                        {/* <div
                          className="w-[90px] h-[90px] bg-center bg-cover rounded-full border border-white"
                          style={{
                            backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_URL}/t/p/w138_and_h175_face/${cast.profile_path})`,
                          }}
                        ></div> */}
                        <div className="flex flex-col gap-1">
                          <p className="text-xl lg:text-base group-hover:text-red-400">{cast.name}</p>
                          <p className="text-base text-gray-400 tracking-wide w-40 line-clamp-2">
                            {cast.character}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* mobile view */}
              {/* mobile view */}
              <div className="lg:hidden block ">
                {credits.cast.length > 2 ? (
                  <Slider
                    gap="10"
                    elements={credits.cast.map((cast) => {
                      return (
                        <Link
                          key={cast.id}
                          href={`/person/${cast.id}-${cast.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
                        >
                          <div className="flex flex-col gap-6 items-center justify-center w-max h-full ">
                            <div className="">
                              <Img
                                alt={cast.name}
                                h="150"
                                w="150"
                                path={`t/p/w470_and_h470_face/${cast.profile_path}`}
                                rounded="full"
                              />
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                              <p className="text-lg lg:text-base">
                                {cast.name}
                              </p>
                              <p className="text-base text-gray-400 tracking-wide line-clamp-2">
                                {cast.character}
                              </p>
                            </div>
                            {/* <div className="flex flex-col gap-1 w-full justify-center border border-red-400 items-center">
                        </div> */}
                          </div>
                        </Link>
                      );
                    })}
                  />
                ) : (
                  <div className="flex gap-12">
                    {credits.cast.map((cast) => (
                      <Link
                        key={cast.id}
                        href={`/person/${cast.id}-${cast.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
                      >
                        <div className="flex flex-col gap-6 items-center justify-center w-max h-full ">
                          <div className="">
                            <Img
                              alt={cast.name}
                              h="150"
                              w="150"
                              path={`t/p/w470_and_h470_face/${cast.profile_path}`}
                              rounded="full"
                            />
                          </div>
                          <div className="flex flex-col gap-1 items-center">
                            <p className="text-lg lg:text-base">{cast.name}</p>
                            <p className="text-base text-gray-400 tracking-wide line-clamp-2">
                              {cast.character}
                            </p>
                          </div>
                          {/* <div className="flex flex-col gap-1 w-full justify-center border border-red-400 items-center">
                        </div> */}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 lg:col-start-9">
            <p className="text-2xl tracking-wide mb-6">Recommended</p>
            <div className="flex flex-col gap-6 overflow-auto  ">
              {recommendations.results
                .slice(0, credits.cast.length / 2)
                .map((recommendation) => {
                  return (
                    <Link
                      key={recommendation.id}
                      href={`${recommendation.id}-${recommendation.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
                    >
                      <div className="group flex gap-4 w-full border border-gray-600 p-4 rounded-xl">
                        <div className="w-[280px] rounded-lg overflow-hidden ">
                          <Image
                            alt={recommendation.name}
                            width={500}
                            height={282}
                            src={`${env.NEXT_PUBLIC_MEDIA_URL}/w500_and_h282_face${recommendation.backdrop_path}`}
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <p className="group-hover:text-red-400">{recommendation.original_name}</p>
                          {recommendation.first_air_date != "" && (
                            <p className="text-gray-400">
                              {formatDate(recommendation.first_air_date)}
                            </p>
                          )}

                          {/* <p className="text-gray-400">
                        {Math.floor(recommendation.vote_average * 10)}%
                      </p> */}
                          <div className="relative w-52 bg-gray-200 rounded-md h-4 overflow-hidden">
                            <div
                              className="bg-red-600 h-full transition-all duration-500"
                              style={{
                                width: `${Math.floor(recommendation.vote_average * 10)}%`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                              {Math.floor(recommendation.vote_average * 10)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <p className="text-2xl tracking-wide mb-6">Recommended</p>
        <Slider
          gap="10"
          elements={recommendations.results.map((recommendation) => {
            return (
              <Link
                key={recommendation.id}
                href={`${recommendation.id}-${recommendation.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
              >
                <div className="flex flex-col gap-4 w-full border border-gray-600 p-4 rounded-xl items-center justify-center">
                  <div className="w-[280px] rounded-lg overflow-hidden ">
                    <Image
                      alt={recommendation.name}
                      width={500}
                      height={282}
                      src={`${env.NEXT_PUBLIC_MEDIA_URL}/w500_and_h282_face${recommendation.backdrop_path}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full items-center">
                    <p className="text-xl">{recommendation.original_name}</p>
                    {recommendation.first_air_date != "" && (
                      <p className="text-gray-400">
                        {formatDate(recommendation.first_air_date)}
                      </p>
                    )}

                    {/* <p className="text-gray-400">
                        {Math.floor(recommendation.vote_average * 10)}%
                      </p> */}
                    <div className="relative w-52 bg-gray-200 rounded-md h-6 overflow-hidden">
                      <div
                        className="bg-red-600 h-full transition-all duration-500"
                        style={{
                          width: `${Math.floor(recommendation.vote_average * 10)}%`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-white">
                        {Math.floor(recommendation.vote_average * 10)}%
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        />
      </div>
    </div>
  );
};

const ShowPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  return (
    <Suspense fallback={<ShowPageSkeleton />}>
      <ShowPageContent id={id} />
    </Suspense>
  );
};

export default ShowPage;
