import kyServer from "./ky";

export const fetchDetails = async <T>(type: string, id: string, required?: string): Promise<T> => {
    const url = required ? `${type}/${id}/${required}` : `${type}/${id}`;
    return await kyServer.get(url).json<T>();
};