import useSWR from "swr";
const API_ROOT = "https://insight-track-service-api.azurewebsites.net/api";

export const fetcher = (url: string | URL | Request) => {
  return fetch(url).then((res) => res.json());
};

export const useHTTP = (...args: any) => {
  const [url] = args;
  return useSWR(`${API_ROOT}${url}`, fetcher, {
    suspense: true,
  });
};
