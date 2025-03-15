"use client";
import { SearchContextProps } from "@/lib/types";
import { SearchContextProvider } from "./SearchContextProvider";
import SearchResults from "./SearchResults";
import SearchResultsSelector from "./SearchResultsSelector";

const SearchPage = ({ searchData }: { searchData: SearchContextProps }) => {

  // if (!searchData.searchResults) {
  //   return;
  // }


  const {slug } = searchData;
  console.log(searchData.query);

  console.log(slug);
  return (
    <SearchContextProvider value={searchData}>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          {slug ? (
            <SearchResultsSelector/>
          ) : (
            <SearchResultsSelector />
          )}
        </div>
        <div className="col-span-9">
          <SearchResults/>
        </div>
      </div>
    </SearchContextProvider>
  );
};

export default SearchPage;
