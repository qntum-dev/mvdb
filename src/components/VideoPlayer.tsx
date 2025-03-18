"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }: { url: string }) => {
  console.log(url);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a placeholder with same dimensions during SSR
    return (
      <div className="overflow-hidden rounded-bl-3xl rounded-tr-3xl border border-white">
        <div className="overflow-hidden">
          <div style={{ width: '100%', height: '365px', backgroundColor: '#000' }} />
        </div>
      </div>
    );
  }

  return (
    
    <div className="overflow-hidden lg:h-[365px] rounded-bl-3xl rounded-tr-3xl border border-white">
      <div className="overflow-hidden">
        {url && (
            <div className="">

          <div className="hidden lg:block">
            <ReactPlayer
              url={url}
              controls={true}
              width="100%"
              height={"365px"}
            />
          </div>
          <div className="block lg:hidden">
            <ReactPlayer
              url={url}
              controls={true}
              width="100%"
            //   height={"365px"}
            />
          </div>
            </div>

        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
