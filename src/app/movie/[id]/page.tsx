import VideoPlayer from "@/components/VideoPlayer";
import env from "@/lib/env";
import { timeToDuration } from "@/lib/formatDate";
import kyServer from "@/lib/ky";
import { Credits, Images, MovieDetails, Videos } from "@/lib/types";
import Image from "next/image";

const MoviePage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const movie_id = id.split("-")[0];

  const movie_details: MovieDetails = await kyServer
    .get(`movie/${movie_id}`)
    .json();
  // console.log(movie_details);

  const movie_images: Images = await kyServer
    .get(`movie/${movie_id}/images`)
    .json();
  console.log(movie_images);

  const movie_videos: Videos = await kyServer
    .get(`movie/${movie_id}/videos`)
    .json();
  // console.log(movie_videos);

  const trailers = movie_videos.results.filter((video) => {
    return video.type == "Trailer";
  });
  console.log(`https://www.youtube.com/watch?v=${trailers[0].key}`);

  console.log(movie_details);

  const credits: Credits = await kyServer
    .get(`movie/${movie_id}/credits`)
    .json();
  // console.log(credits);

  return (
    <div className="flex flex-col gap-4">
      {/* {movie_id} */}
      {/* {movie_details.overview} */}

      <div className="">
        <p className=" text-5xl">{movie_details.title}</p>
        <div className="flex gap-2 text-gray-400 tracking-wide text-sm font-semibold">
          <p className="">{movie_details.release_date.split("-")[0]}</p>
          <p className="">.</p>
          <p className="">{timeToDuration(movie_details.runtime)}</p>
        </div>
      </div>

      <div className="lg:flex gap-3 items-start">
        <div className="rounded-xl overflow-hidden max-w-64">
          <Image
            alt={movie_images.posters[0].file_path}
            src={`${env.NEXT_PUBLIC_MEDIA_URL}/w300_and_h450_bestv2${movie_images.posters[0].file_path}`}
            width={300}
            height={450}
            objectFit={"cover"}
          />
        </div>
        <div className="">
          <VideoPlayer
            url={`https://www.youtube.com/watch?v=${trailers[0].key}`}
          />
        </div>
        {/* <div className="">
          <h3 className="">More Like this</h3>
        </div> */}
      </div>

      <div className="flex gap-3">
        {movie_details.genres.map((genre) => {
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

      <div className=" w-2/3">
        <p className="">{movie_details.overview}</p>
      </div>

      <div className="">
        <div className="grid grid-cols-6">
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-y-4">
              <div className="mb-2 col-span-full flex gap-1 items-center">
                <div className="text-5xl text-red-600">I</div>
                <p className="text-4xl"> Cast</p>
              </div>
              {credits.cast.map((cast) => {
                return (
                  <div key={cast.id}>
                    {/* <div className="w-36 rounded-full overflow-hidden" >
                <Image
                  alt={cast.name}
                  width={250}
                  // fill
                  objectFit={"cover"}
                  height={317}
                  src={`${env.NEXT_PUBLIC_MEDIA_URL}/t/p/w138_and_h175_face/${cast.profile_path}`}
                />
              </div> */}
                    <div className="flex items-center gap-6">
                      <div
                        className="w-[90px] h-[90px] rounded-full bg-cover bg-center border border-white"
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_URL}/t/p/w138_and_h175_face/${cast.profile_path})`,
                        }}
                      ></div>
                      <div className="flex flex-col">
                        <p className="text-base">{cast.name}</p>
                        <p className="text-base text-gray-400 tracking-wide">
                          {cast.character}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="">
            <p className="text-2xl tracking-wide">
              Recommended
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
