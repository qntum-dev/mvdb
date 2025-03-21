import Slider from "@/components/custom/Slider";
import Img from "@/components/custom/Img";
import MoviePageSkeleton from "@/components/Movies/MoviePageSkeleton";
import VideoPlayer from "@/components/custom/VideoPlayer";
import env from "@/lib/env";
import { fetchDetails } from "@/lib/fetchDetails";
import { formatDate, timeToDuration } from "@/lib/formatDate";
import { Credits, Images, MovieDetails, Movies, Videos } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import ShareComp from "@/components/custom/ShareComp";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { id } = await params;

  console.log(id.split("-")[0]);
  const movie_images: Images = await fetchDetails("movie", id, "images");

  console.log(
    `/_next/image?url=${encodeURIComponent(`${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2${movie_images?.posters[0]?.file_path}`)}`
  );

  // fetch data
  const movie: MovieDetails = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/movie/${id}`,
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
    title: `${movie.title} (${formatDate(movie.release_date).split(" ")[2]}) - MVDB`,
    description: `${movie.overview}`,
    openGraph: {
      url: `${env.NEXT_PUBLIC_URL}/movie/${movie.id}-${movie.title.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`,
      title: `${movie.title} - MVDB`,
      type: `video.movie`,
      description: `${movie.overview}`,
      images: [
        `${env.NEXT_PUBLIC_URL}/_next/image?url=${encodeURIComponent(`${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2${movie_images?.posters[0]?.file_path}`)}&w=640&q=75`,
      ],
    },
  };
}

const MoviePageContent = async ({ id }: { id: string }) => {
  const movie_id = id.split("-")[0];

  const movie_details: MovieDetails = await fetchDetails("movie", movie_id);
  // console.log(movie_details);

  const movie_images: Images = await fetchDetails("movie", movie_id, "images");

  const movie_videos: Videos = await fetchDetails("movie", movie_id, "videos");
  // console.log(movie_videos);

  const credits: Credits = await fetchDetails("movie", movie_id, "credits");
  // console.log(credits);

  const recommendations: Movies = await fetchDetails(
    "movie",
    movie_id,
    "recommendations"
  );

  // console.log(movie_images);

  const trailers = movie_videos.results.filter((video) => {
    return video.type == "Trailer";
  });
  // console.log(trailers);

  // console.log(`https://www.youtube.com/watch?v=${trailers[0].key}`);

  console.log(movie_details.imdb_id);

  // console.log(recommendations);

  console.log(credits);
  console.log(credits.cast.length);

  console.log(movie_images);

  return (
    <div className="flex flex-col gap-10 lg:gap-4 w-full">
      {/* {movie_id} */}
      {/* {movie_details.overview} */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center items-start gap-2">
          <div className="flex gap-5">
            <p className=" text-2xl lg:text-4xl lg:text-start ">
              {movie_details.title}
            </p>
            <ShareComp
              shareData={{
                title: `${movie_details.title} - MVDB`,
                text: `${movie_details.overview}`,
                url: `${env.NEXT_PUBLIC_URL}/show/${movie_details.id}-${movie_details.title.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`,
              }}
            />
          </div>

          <div className="flex gap-2 text-gray-400 tracking-wide text-sm font-semibold items-center justify-start">
            {/* <p className="">
                      {movie_details}
                    </p> */}
            {movie_details.release_date != null && (
              <div className="">
                <p className="text-sm">
                  {movie_details.release_date.split("-")[2]}/
                  {movie_details.release_date.split("-")[1]}/
                  {movie_details.release_date.split("-")[0]}
                </p>
              </div>
            )}

            {/* <p className="">.</p> */}
            <div className="rounded-full w-1.5 h-1.5 bg-gray-400"></div>
            <p className="text-sm">{timeToDuration(movie_details.runtime)}</p>
          </div>
        </div>
        {/* <div className="flex justify-between items-start ">
                <ShareComp
                  shareData={{
                    title: `${movie_details.name} - MVDB`,
                    text: `${movie_details.overview}`,
                    url: `${env.NEXT_PUBLIC_URL}/show/${movie_details.id}-${movie_details.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`,
                  }}
                />
              </div> */}

        <div className="flex justify-center lg:justify-normal lg:gap-6 ">
          <div className="md:hidden">
            {trailers.length > 0 ? (
              <div className="">
                <VideoPlayer
                  url={`https://www.youtube.com/watch?v=${trailers[0].key}`}
                />
              </div>
            ) : (
              <Img
                alt={movie_details.title}
                h="440"
                w="300"
                // w_perc={100}
                path={`w600_and_h900_bestv2${movie_images.posters[0].file_path}`}
              />
            )}
          </div>
          <div className="hidden lg:block">
            <Img
              alt={movie_details.title}
              w="250"
              path={`w600_and_h900_bestv2${movie_images?.posters[0]?.file_path}`}
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
          {/* {movie_images.backdrops.length < 1 && (
                  <div className="lg:hidden">
                    <Img
                      alt={movie_details.title}
                      h="440"
                      w="300"
                      // w_perc={95}
                      rounded="custom"
                      path={`w600_and_h900_bestv2/${movie_details.poster_path}`}
                    />
                  </div>
                )} */}
          {trailers.length < 1 &&
            (movie_images.backdrops.length > 1 ? (
              <div className="hidden md:block">
                <Img
                  path={`w1066_and_h600_bestv2/${movie_images.backdrops[0].file_path}`}
                  alt={movie_details.title}
                  // w_perc={100}
                  h="360"
                  w="650"
                />
              </div>
            ) : (
              <div className="">
                <div className="hidden md:block lg:hidden">
                  <Img
                    alt={movie_details.title}
                    h="440"
                    w="300"
                    // w_perc={100}
                    path={`w600_and_h900_bestv2${movie_images.posters[0].file_path}`}
                  />
                </div>
                <div className="hidden rounded-bl-3xl rounded-tr-3xl border border-white lg:h-[365px] lg:w-[650px] w-full  lg:flex items-center justify-center">
                  <p className="text-4xl text-red-600">No media Available</p>
                </div>
              </div>
            ))}
          {trailers[0]?.key && (
            <div className="hidden md:block md:w-full lg:w-[650px]">
              <VideoPlayer
                url={`https://www.youtube.com/watch?v=${trailers[0].key}`}
              />
            </div>
          )}

          {/* <div className="">
                <h3 className="">More Like this</h3>
              </div> */}
        </div>
        <div className="flex overflow-x-auto gap-4 no-scrollbar">
          {movie_details.genres.map((genre) => {
            return (
              <div
                className="flex items-center justify-center border border-red-500 py-2 tracking-wide rounded-bl-xl rounded-tr-xl px-4"
                key={genre.id}
              >
                <p className="text-sm text-nowrap">{genre.name}</p>
              </div>
            );
          })}
        </div>
        <div className="lg:w-2/3 text-center lg:text-start ">
          <p className="">{movie_details.overview}</p>
        </div>
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
                    <a
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
                          <p className="text-xl lg:text-base group-hover:text-red-400">
                            {cast.name}
                          </p>
                          <p className="text-base text-gray-400 tracking-wide w-40 line-clamp-2">
                            {cast.character}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* mobile view */}
              <div className="lg:hidden block ">
                {credits.cast.length > 2 ? (
                  <Slider
                    gap="10"
                    elements={credits.cast.map((cast) => {
                      return (
                        <a
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
                        </a>
                      );
                    })}
                  />
                ) : (
                  <div className="flex gap-12">
                    {credits.cast.map((cast) => (
                      <a
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
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:hidden lg:block lg:col-span-5 lg:col-start-9">
            <p className="text-2xl tracking-wide mb-6">Recommended</p>
            <div className="flex flex-col gap-6 overflow-auto  ">
              {recommendations.results
                .slice(0, credits.cast.length / 2)
                .map((recommendation) => {
                  return (
                    <a
                      key={recommendation.id}
                      href={`${recommendation.id}-${recommendation.title.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
                    >
                      <div className="flex gap-4 w-full border border-gray-600 p-4 rounded-xl group">
                        <div className="w-[280px] rounded-lg overflow-hidden ">
                          <Image
                            alt={recommendation.title}
                            width={500}
                            height={282}
                            src={`${env.NEXT_PUBLIC_MEDIA_URL}/w500_and_h282_face${recommendation.backdrop_path}`}
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <p className="group-hover:text-red-400">
                            {recommendation.original_title}
                          </p>
                          {recommendation.release_date != "" && (
                            <p className="text-gray-400">
                              {formatDate(recommendation.release_date)}
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
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="block md:block lg:hidden">
        <p className="text-2xl tracking-wide mb-6">Recommended</p>
        <Slider
          gap="10"
          elements={recommendations.results.map((recommendation) => {
            return (
              <a
                key={recommendation.id}
                href={`${recommendation.id}-${recommendation.title.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
              >
                <div className="flex flex-col gap-4 w-full border border-gray-600 p-4 rounded-xl items-center justify-center">
                  <div className="w-[280px] rounded-lg overflow-hidden ">
                    <Image
                      alt={recommendation.title}
                      width={500}
                      height={282}
                      src={`${env.NEXT_PUBLIC_MEDIA_URL}/w500_and_h282_face${recommendation.backdrop_path}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full items-center">
                    <p className="text-xl">{recommendation.original_title}</p>
                    {recommendation.release_date != "" && (
                      <p className="text-gray-400">
                        {formatDate(recommendation.release_date)}
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
              </a>
            );
          })}
        />
      </div>
    </div>
  );
};

const MoviePage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  return (
    <Suspense fallback={<MoviePageSkeleton />}>
      <MoviePageContent id={id} />
    </Suspense>
  );
};

export default MoviePage;
