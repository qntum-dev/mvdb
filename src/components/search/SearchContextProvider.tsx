"use client";
import { SearchContextProps } from "@/lib/types";
import { createContext, useContext, ReactNode } from "react";

const SearchContext = createContext<SearchContextProps | null>(null);

// Provider Component
export const SearchContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SearchContextProps;
}) => {
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

// Custom hook for consuming the context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context;
};
