import SearchPage from "@/components/search/SearchPage";
import { fetchSearchResults } from "@/lib/fetchSearchResults";
import { Movie, Person, SearchResultsType, Show } from "@/lib/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ query: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
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
    return;
  }
  
  const searchResults: SearchResultsType<Movie | Show | Person> =
  await fetchSearchResults(query, "multi");
  
  const firstSearchType = searchResults.results[0].media_type;
  
  if (page) {
    // console.log(page);
  }

  const searchData = {
    page: page || "1",
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
