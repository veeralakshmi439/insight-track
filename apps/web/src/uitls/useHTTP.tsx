import useSWR from "swr";

export const fetcher = (url: string | URL | Request) => {
  return fetch(url).then((res) => res.json());
};

export const useHTTP = (...args) => {
  const [url] = args;
  return useSWR(`http://localhost:3000${url}`, fetcher);
};
