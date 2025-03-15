"use client"

import ReactPlayer from 'react-player/lazy'

const VideoPlayer = ({ url }: { url: string }) => {
    console.log(url);

    return (
        <div className="overflow-hidden h-[365px] rounded-bl-3xl rounded-tr-3xl border border-white">
            <div className="overflow-hidden">

            {url && <ReactPlayer url={url} controls={true} width="100%" height={"365px"} />}
            </div>
        </div>
    );
}

export default VideoPlayer;
