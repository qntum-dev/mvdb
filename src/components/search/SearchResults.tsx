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
import env from "@/lib/env";
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
      <div className="mt-1 ml-10 flex flex-col gap-10">
        {searchResults.results.map((result) => {
          const name =
            "title" in result
              ? result.title
              : "name" in result
              ? result.name
              : "Unknown";

          const image_url =
            "profile_path" in result
              ? `${env.NEXT_PUBLIC_MEDIA_URL}/w188_and_h282_bestv2/${result.profile_path}`
              : `${env.NEXT_PUBLIC_MEDIA_URL}/w188_and_h282_bestv2/${result.poster_path}`;

          const release_date =
            "release_date" in result
              ? result.release_date
              : "first_air_date" in result
              ? result.first_air_date
              : "";

          const overview = "overview" in result && result.overview ? result.overview : "";

          const known_for = "known_for" in result ? result.known_for : null;

          const department="known_for_department" in result ? result.known_for_department :""

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
