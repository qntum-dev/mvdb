"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";

const ReadMore = ({ clamp, text }: { clamp: number; text: string }) => {
  const paragraphStyles:CSSProperties={
    overflow:"hidden",
    display:"-webkit-box",
    WebkitBoxOrient:"vertical",
    WebkitLineClamp:clamp
  
  }
  const [isActive, setIsActive] = useState(true);
  const [showReadMore, SetShowReadMore] = useState(false);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const toggleIsActive = () => {
    setIsActive((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    if (paraRef.current) {
      console.log(paraRef.current.scrollHeight, paraRef.current.clientHeight);
      SetShowReadMore(
        paraRef.current.scrollHeight !== paraRef.current.clientHeight
      );
    }
  }, []);
  return (
    <div className="relative ">
      <div style={isActive ? paragraphStyles : undefined}>
        <p ref={paraRef}>{text}</p>
      </div>
      <div className={showReadMore ? `block` : "hidden"}>
        <div
          className={
            (isActive ? "block" : "hidden") +
            " " +
            `absolute z-10 h-[22px]  bg-gradient-to-r from-[rgba(255,255,255,0)] via-transparent to-black to-[87%] w-full bottom-0 right-0`
          }
        ></div>
        <div
          className={
            `cursor-pointer w-full h-[22px] flex justify-end absolute z-20 text-blue-400` +
            " " +
            (isActive ? "bottom-[2px]" : "mt-1")
          }
          onClick={toggleIsActive}
        >
          {isActive ? (
            <div className="flex">
              Read More <ChevronDown />
            </div>
          ) : (
            <div className="flex">
              Read less
              <ChevronUp />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
