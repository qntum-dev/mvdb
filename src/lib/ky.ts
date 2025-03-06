import ky from "ky";
import env from "@/lib/env";

//I've used "Server" suffix after ky to indicate that this instance will be used for server side api call.

const kyServer = ky.create({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
    headers:{
        'content-type': 'application/json',
        Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ATOKEN}`
    },
    credentials: 'include',
    mode: "cors",
    cache: "no-store",
});

export default kyServer;
