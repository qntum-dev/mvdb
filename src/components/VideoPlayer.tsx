"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
const getYouTubeID = (url: string) => {
  const match = url.match(/(?:\?v=|\/embed\/|\/v\/|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
};
const VideoPlayer = ({ url }: { url: string }) => {
  // console.log(url.split("/")[url.length-1].split("?")[1].split("=")[1]);
  const video_id=getYouTubeID(url)
  console.log(video_id);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a placeholder with same dimensions during SSR
    return (
      <div className="overflow-hidden rounded-bl-3xl rounded-tr-3xl border border-white">
        <div className="overflow-hidden">
          <div
            style={{ width: "100%", height: "365px", backgroundColor: "#000" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-bl-3xl rounded-tr-3xl border border-white h-fit">
      <div className="overflow-hidden">
        {url && (
          <div className="">
            <div className="hidden lg:block">
              {/* <ReactPlayer
                url={url}
                controls={true}
                width="100%"
                height={"365px"}
              /> */}
              <iframe
                // width="560"
                
                src={`https://www.youtube.com/embed/${video_id}`}
                // frameBorder="0"
                className="aspect-video w-[100%]"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                // allowFullScreen
              ></iframe>
            </div>
            <div className="lg:hidden">
              <iframe
                // width="560"
                // height="315"
                src={`https://www.youtube.com/embed/${video_id}`}
                // frameBorder="0"
                className="aspect-video w-[95vw]"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                // allowFullScreen
              ></iframe>
            </div>
            {/* <div className="block lg:hidden aspect-video w-[90%]">
            <ReactPlayer
              url={url}
              controls={true}
              height={"100%"}
              width={"100%"}
              // style={
              //   {
              //     width:`${0.2*16}vw`,
              //     height:`${0.2*9}vw`
              //   }
              // }
              // width={"400px"}
              // width="100%"
              // height={"400px"}
            />
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
