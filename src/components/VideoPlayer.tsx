"use client"

import ReactPlayer from 'react-player/lazy'

const VideoPlayer = ({ url }: { url: string }) => {
    console.log(url);

    return (
        <div className=" rounded-xl overflow-hidden w-[600px]  p-2">
            <div className="overflow-hidden rounded-lg">

            {url && <ReactPlayer url={url} controls={true} width="100%"/>}
            </div>
        </div>
    );
}

export default VideoPlayer;
