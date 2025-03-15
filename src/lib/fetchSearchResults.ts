import kyServer from "./ky";

export const fetchSearchResults = async <T>(query: string, type: string, page?: string): Promise<T> => {
  return await kyServer.get(page ? `search/${type}?query=${query}&page=${page}`: `search/${type}?query=${query}`).json<T>();
};
