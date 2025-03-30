"use client"
import Image from "next/image";

const Logo = () => {
    return (
        <a className=" flex justify-center items-center" onClick={(e)=>{
            e.preventDefault();
            window.location.href="/";
          }} href={`${"/"}`}>
            <Image
              alt="logo"
              src="/logo_edited.png"
              width={"100"}
              height={"100"}
              className="object-cover object-center"
            />
          </a>
    );
}

export default Logo;