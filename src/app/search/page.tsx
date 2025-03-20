import SearchPage from "@/components/search/SearchPage";
import { fetchSearchResults } from "@/lib/fetchSearchResults";
import { Movie, Person, SearchResultsType, Show } from "@/lib/types";
import { error } from "console";
import { Metadata } from "next";

type Props = {
  params: Promise<{ query: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const { query } = await searchParams;

  return {
    title: `Search Results for ${query}`,
    description:"Your go-to site for finding movies, TV shows, and celebrity details.",
     openGraph: {
      title:`Search Results for ${query}`,
      description:`Your go-to site for finding movies, TV shows, and celebrity details.`,
      // images: [
      //   `${env.NEXT_PUBLIC_URL}/_next/image?url=${encodeURIComponent(`${env.NEXT_PUBLIC_MEDIA_URL}/w600_and_h900_bestv2${movie_images?.posters[0]?.file_path}`)}&w=640&q=75`,
      // ],
    },
  };
}

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { query, page } = (await searchParams) || "";
  if (!query) {
    return (
      <div className="">No search results</div>
    )
  }
  if (page && query) {
    // console.log(page);
    throw error("slug is required");
  }

  const allResults: SearchResultsType<Movie | Show | Person> =
    await fetchSearchResults(query, "multi");
console.log(allResults.results);

  const firstSearchType = allResults.results[0].media_type;
  console.log(firstSearchType);
  

  const searchResults: SearchResultsType<Movie | Show | Person> =
    await fetchSearchResults(query, firstSearchType);

  const searchData = {
    page: "1",
    query,
    searchResults,
    slug: firstSearchType,
  };

  return (
    <div>
      <SearchPage searchData={searchData} />
    </div>
  );
};

export default Search;
