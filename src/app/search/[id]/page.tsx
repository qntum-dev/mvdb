// app/search/page.tsx

// import { fetchDetails } from "@/lib/fetchDetails";
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
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;

  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // const [se]
  const { id } = await params;
  console.log(id);

  const { query, page } = await searchParams;
  if (!query) {
    return;
  }
  if (page) {
    console.log(page);
  }
  const searchResults: SearchResultsType<Movie | Show | Person> =
    await fetchSearchResults(query, id,page);

  //   console.log(query);
  console.log(searchResults);

  console.log(searchResults.results[0]);
  console.log(searchResults.total_results);
  const searchData={
    page: page || "1",
    query,
    searchResults,
    slug: id,
  };

  return (
    <SearchPage searchData={searchData}/>
    
  );
}
