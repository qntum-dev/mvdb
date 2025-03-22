import SearchPage from "@/components/search/SearchPage";
import env from "@/lib/env";
import { fetchSearchResults } from "@/lib/fetchSearchResults";
import { Movie, Person, SearchResultsType, Show } from "@/lib/types";
import { Metadata } from "next";
import NoResultsFound from "@/components/custom/NoResultsFound";

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
    title: query ? `Search Results for ${query}` : "Search",
    description:
      "Your go-to site for finding movies, TV shows, and celebrity details.",
    openGraph: {
      title: query ? `Search Results for ${query}` : "Search",
      description: `Your go-to site for finding movies, TV shows, and celebrity details.`,
      images: [`${env.NEXT_PUBLIC_URL}/logo.png`],
    },
  };
}

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { query, page } = (await searchParams) || {};
  
  // If no query is provided
  if (!query || query.trim() === "") {
    return <NoResultsFound isEmptyQuery={true} />;
  }
  
  // Handle invalid page parameter
  if (page && query) {
    return <NoResultsFound query={query} />;
  }

  try {
    const allResults: SearchResultsType<Movie | Show | Person> =
      await fetchSearchResults(query, "multi");

    // If no results found
    if (!allResults.results || allResults.results.length === 0) {
      return <NoResultsFound query={query} />;
    }

    const firstSearchType = allResults.results[0].media_type;

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
  } catch (error) {
    console.error("Search error:", error);
    return <NoResultsFound query={query} />;
  }
};

export default Search;