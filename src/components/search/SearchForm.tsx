"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("query") || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const searchUrl = `/search?query=${encodeURIComponent(query)}`;
    window.location.href = searchUrl; // Simulates "a-tag" navigation
  }

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search for Movie, TV shows, Person name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        {/* Search Button with Next.js Link */}
        <a
          href={`/search?query=${encodeURIComponent(query)}`}
          className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Search
        </a>
      </div>
    </form>
  );
};

export default SearchForm;
