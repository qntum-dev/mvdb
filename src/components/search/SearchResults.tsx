import { useSearchContext } from "./SearchContextProvider";
import SearchResultCard from "./SearchResultCard";
import SearchResultCardCast from "./SearchResultCardCast";
import clsx from "clsx";

const SearchResults: React.FC = () => {
  const { searchResults, slug, query, page } = useSearchContext();
  const totalPages: number = searchResults?.total_pages || 1;
  const currentPage: number = +page || 1;
  console.log(searchResults);

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage < 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers.map((pageNum, index) => (
      <li key={index} className="inline-block mx-1">
        {pageNum === "..." ? (
          <span className="px-3 py-1">...</span>
        ) : (
          <a
            href={`/search/${slug}?query=${query}&page=${pageNum}`}
            className={clsx(
              "px-3 py-1 rounded-md border border-gray-300",
              pageNum === currentPage && "bg-red-600 text-white"
            )}
          >
            {pageNum}
          </a>
        )}
      </li>
    ));
  };

  return (
    <div>
      <div className="mt-1 lg:ml-10 grid grid-cols-2 lg:flex lg:flex-col lg:gap-10 mx-auto gap-y-10 mb-10">
        {searchResults.results.map((result) => {
          const name: string =
            "title" in result
              ? result.title
              : "name" in result
              ? result.name
              : "Unknown";

          const image_url: string =
            "profile_path" in result
              ? `w600_and_h900_bestv2${result.profile_path}`
              : `w880_and_h1320_face${result.poster_path}`;

          const release_date: string =
            "release_date" in result
              ? result.release_date
              : "first_air_date" in result
              ? result.first_air_date
              : "";

          const overview: string =
            "overview" in result && result.overview ? result.overview : "";

          const known_for = "known_for" in result ? result.known_for : null;

          const department: string =
            "known_for_department" in result ? result.known_for_department : "";

          return !known_for ? (
            <SearchResultCard
              key={result.id}
              name={name}
              image_url={image_url}
              release_date={release_date}
              overview={overview}
              id={result.id}
              slug={slug}
            />
          ) : (
            <SearchResultCardCast
              id={result.id}
              key={result.id}
              image_url={image_url}
              name={name}
              known_for={known_for}
              department={department}
            />
          );
        })}
      </div>

      <div className="flex justify-center mt-4">
        <ul className="flex items-center">
          <li className="mr-2">
            {currentPage > 1 ? (
              <a
                href={`/search/${slug}?query=${query}&page=${currentPage - 1}`}
                className="px-3 py-1 border border-gray-300 rounded-md"
              >
                Prev
              </a>
            ) : (
              <span className="px-3 py-1 border border-gray-300 rounded-md text-gray-400 cursor-default">
                Prev
              </span>
            )}
          </li>
          {renderPageNumbers()}
          <li className="ml-2">
            {currentPage < totalPages ? (
              <a
                href={`/search/${slug}?query=${query}&page=${currentPage + 1}`}
                className="px-3 py-1 border border-gray-300 rounded-md"
              >
                Next
              </a>
            ) : (
              <span className="px-3 py-1 border border-gray-300 rounded-md text-gray-400 cursor-default">
                Next
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;