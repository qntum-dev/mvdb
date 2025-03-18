import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchContext } from "./SearchContextProvider";
import { useRouter } from "next/navigation";
import SearchResultCard from "./SearchResultCard";
import SearchResultCardCast from "./SearchResultCardCast";

const SearchResults = () => {
  const { searchResults, slug, query, page } = useSearchContext();
  const totalPages = searchResults?.total_pages || 1; // Default to 1 if no results
  const currentPage = +page || 1;
  const router = useRouter();
  console.log(searchResults);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/search/${slug}?query=${query}&page=${newPage}`);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show up to 5 page numbers

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
      <PaginationItem key={index}>
        {pageNum === "..." ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Number(pageNum));
            }}
            isActive={pageNum === currentPage}
          >
            {pageNum}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  return (
    <div>
      <div className="mt-1 lg:ml-10 grid grid-cols-2 lg:flex lg:flex-col lg:gap-10 mx-auto gap-y-10 mb-10">
        {searchResults.results.map((result) => {
          const name =
            "title" in result
              ? result.title
              : "name" in result
                ? result.name
                : "Unknown";

          const image_url =
            "profile_path" in result
              ? `w600_and_h900_bestv2${result.profile_path}`
              : `w880_and_h1320_face${result.poster_path}`;

          const release_date =
            "release_date" in result
              ? result.release_date
              : "first_air_date" in result
                ? result.first_air_date
                : "";

          const overview =
            "overview" in result && result.overview ? result.overview : "";

          const known_for = "known_for" in result ? result.known_for : null;

          const department =
            "known_for_department" in result ? result.known_for_department : "";

          return !known_for ? (
            <SearchResultCard
              key={result.id}
              name={name}
              image_url={image_url}
              release_date={release_date}
              overview={overview}
              id={result.id}
              slug={`${result.media_type}`}
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default SearchResults;
