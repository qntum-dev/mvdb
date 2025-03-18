import env from "@/lib/env";
import Image from "next/image";

const Img = ({
  alt,
  path,
  h,
  w,
  w_perc,
  rounded = "custom",
  border
}: {
  alt: string;
  path: string;
  h?: string;
  w?: string;
  w_perc?: number;
  rounded?: "full" | "custom";
  border?: string;
}) => {
  const borderClass = border ? `border ${border}` : "border border-white";
  const roundedClass = rounded === "full" ? "rounded-full" : "rounded-bl-3xl rounded-tr-3xl";

  // Ensure width is always set (avoid width: 0 issue)
  const computedWidth = w
    ? `${w}px`
    : w_perc
    ? `${w_perc}%`
    : "100%"; // Defaults to full width
  
  return (
    <div
      className={`relative overflow-hidden flex justify-center items-center ${borderClass} ${roundedClass}`}
      style={{ 
        width: computedWidth, 
        height: h ? `${h}px` : "auto",
        minWidth: "100px" // Prevents width from collapsing to 0
      }}
    >
      <Image
        alt={alt}
        src={path.includes("https") ? path :`${env.NEXT_PUBLIC_MEDIA_URL}/${path}`}
        {...(w && h
          ? { width: parseInt(w), height: parseInt(h) } // Explicit width & height
          : { layout: "intrinsic", width: 600, height: 900 })} // Defaults if no width/height
        className="object-cover object-center"
      />
    </div>
  );
};

export default Img;
