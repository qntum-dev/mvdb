"use client"
import Image from "next/image";

const Logo = ({w,h}:{
  w:number,
  h:number
}) => {
  
    return (
        <a className=" flex justify-center items-center" onClick={(e)=>{
            e.preventDefault();
            window.location.href="/";
          }} href={`${"/"}`}>
            <Image
              alt="logo"
              src="/logo_edited.png"
              width={w}
              height={h}
              className="object-cover object-center"
            />
          </a>
    );
}

export default Logo;