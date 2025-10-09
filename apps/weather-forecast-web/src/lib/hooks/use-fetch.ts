import { useEffect, useState } from "react";

type TFetchOptions<P, R> = {
  enabled?: boolean;
  params?: P;
  fetch: () => Promise<R>;
};

export function useFetch<P, R>(options: TFetchOptions<P, R>) {
  const { params = {}, fetch, enabled = true } = options;
  const [data, setData] = useState<R | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function fetchData() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!enabled) return;
    fetchData();
  }, [params]);

  return { data, isLoading, error, fetchData };
}
