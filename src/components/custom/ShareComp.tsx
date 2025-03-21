"use client";
import { Forward, Share2Icon, ShareIcon } from "lucide-react";
import { toast } from "sonner";

const ShareComp = ({ shareData }: { shareData: ShareData }) => {
  return (
    <div
      className="flex cursor-pointer items-center  lg:border border-yellow-400"
      onClick={async () => {
        if (!navigator.canShare) {
          toast("Web Share API not available");
            return
        }
        await navigator.share(shareData);
      }}
    >
      <ShareIcon size={27} className=""/>
        {/* <div className="bg-red-500 px-1 py-1 rounded-br-xl rounded-tl-xl">

        </div> */}
    </div>
  );
};

export default ShareComp;
