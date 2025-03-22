import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface NoResultsProps {
  query?: string;
  isEmptyQuery?: boolean;
}

const NoResultsFound: React.FC<NoResultsProps> = ({
  query,
  isEmptyQuery = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[60vh] text-center">
      <div className="bg-gray-100 p-10 rounded-lg shadow-md w-full max-w-2xl border border-gray-200">
        <div className="mb-6">
          <Search className="w-16 h-16 mx-auto text-gray-400" />
        </div>

        {isEmptyQuery ? (
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Search Something!
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Results Found
          </h1>
        )}

        {!isEmptyQuery && query && (
          <p className="text-xl text-gray-600 mb-6">
            We could not find any matches for{" "}
            <span className="font-semibold">{query}</span>
          </p>
        )}

        <div className="space-y-4">
          <p className="text-gray-700">Try these suggestions:</p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto text-gray-600">
            <li>Check your spelling</li>
            <li>Try more general keywords</li>
            <li>Try different keywords</li>
            <li>Try searching for a movie, TV show, or actor name</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoResultsFound;
