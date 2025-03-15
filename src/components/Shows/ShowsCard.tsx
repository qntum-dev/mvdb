import env from "@/lib/env";
import { formatDate } from "@/lib/formatDate";
import { Show } from "@/lib/types";
import { Star } from "lucide-react";
import Link from "next/link";

const ShowsCard = ({ show }: { show: Show }) => {
  console.log(show.id);

  return (
    <>
      <div className="h-full  ">
        <Link
          className=""
          key={show.id}
          href={`show/${show.id}-${show.name.toLowerCase().replace(/:\s+/g, "-").replace(/\s+/g, "-")}`}
        >
          <div className="w-[220px] rounded-tr-full flex flex-col h-full justify-between  gap-5">
            <div className="flex flex-col gap-4 ">
              <div
                className="h-[320px] bg-cover bg-center rounded-bl-3xl rounded-tr-3xl border border-white"
                style={{
                  backgroundImage: `url(${env.NEXT_PUBLIC_MEDIA_URL}/w440_and_h660_face/${show.poster_path})`,
                }}
              ></div>
              <p className="hover:underline font-medium tracking-widest text-sm">
                {show.name}
              </p>
            </div>
            <div className="">
              <div className="flex justify-between text-gray-500 items-center">
                <div className="flex gap-2 items-center text-white text-sm">
                  <Star size={28} strokeWidth={3} className="text-yellow-400" />
                  {show.vote_average}
                </div>
                <p className="font-bold text-sm">
                  {formatDate(show.first_air_date)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ShowsCard;
