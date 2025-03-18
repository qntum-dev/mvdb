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
    title: `${query} - MVDB`,
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
};

export default Search;
