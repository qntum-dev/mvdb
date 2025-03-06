import kyServer from "@/lib/ky";

const LatestMovies = async () => {
    const url="movie/now_playing"
    const data=await kyServer.get(url).json();
    console.log(data);
    
    return (
        <div>
            Enter
        </div>
    );
}

export default LatestMovies;