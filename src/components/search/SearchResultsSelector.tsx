"use client";
import { ResultTypes } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import { useSearchContext } from "./SearchContextProvider";

const SearchResultsSelector = () => {
  const { searchResults, slug,query } = useSearchContext();
  console.log(slug);
  
  const [selectedResultType, setSelectedResultType] = useState(slug);
  if (!searchResults) {
    return;
  }
  // const firstSearchType = searchResults.results[0]?.media_type;
  // console.log(selected);
  // console.log(firstSearchType);

  const result_types: ResultTypes = [
    { endpoint: "tv", display: "TV Shows", mediaType: "tv" },
    { endpoint: "movie", display: "Movies", mediaType: "movie" },
    { endpoint: "people", display: "People", mediaType: "person" },
    // {endpoint:"tv",display:"TV Shows"},
  ];

  //   const results = await fetchSearchResults(query);
  const renderResultType = (result_type: {
    endpoint: string;
    display: string;
    mediaType: string;
  }) => (
    <a
      href={`/search/${result_type.mediaType}?query=${query}`}
      key={result_type.endpoint}
    >
      <div
        className={
          (selectedResultType == result_type.mediaType
            ? "bg-[#de3b3b1d]"
            : "hover:bg-[#de3b3b0f]") +
          " " +
          "cursor-pointer p-4"
        }
        onClick={() => {
          setSelectedResultType(result_type.mediaType);
        }}
      >
        <p>{result_type.display}</p>
      </div>
    </a>
  );
  return (
    <div className="rounded-bl-3xl rounded-tr-3xl overflow-x-hidden border border-gray-500 pb-6">
      <div className="bg-red-600 px-4 py-6">
        <h1>Search Results</h1>
      </div>
      <div className="mt-2 flex flex-col">
        {/* hover:bg-[#de3b3b] */}
        {slug &&
          renderResultType(
            result_types.find(
              (result_type) => result_type.mediaType === slug
            )!
          )}

        {result_types
          .filter((result_type) => result_type.mediaType !== slug)
          .map(renderResultType)}
      </div>
    </div>
  );
};

export default SearchResultsSelector;
