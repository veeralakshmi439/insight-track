import useSWR from "swr";
const API_ROOT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.API_ROOT;

export const fetcher = (url: string | URL | Request) => {
  return fetch(url).then((res) => res.json());
};

export const useHTTP = (...args: any) => {
  const [url] = args;
  return useSWR(`${API_ROOT}`, fetcher, {
    suspense: true,
  });
};
