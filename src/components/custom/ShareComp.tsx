"use client";
import { ShareIcon } from "lucide-react";
import { toast } from "sonner";

const ShareComp = ({ shareData }: { shareData: ShareData }) => {
  return (
    <div
      className="cursor-pointer w-[60px] h-[60px]"
      onClick={async () => {
        if (!navigator.canShare) {
          toast("Web Share API not available");
            return
        }
        await navigator.share(shareData);
      }}
    >
      <ShareIcon />
    </div>
  );
};

export default ShareComp;
