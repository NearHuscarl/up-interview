import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getLocations, TLocationResponse } from "../../api/location";

export function useLocations(query: string) {
  const queryClient = useQueryClient();
  const [data, setData] = useState<TLocationResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const refetch = useCallback(async () => {
    if (!query) return;

    const key = ["locations", query];
    const cached = queryClient.getQueryData<TLocationResponse>(key);

    if (cached) {
      setData(cached);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await getLocations(query);

      // TODO: e2e test
      if (import.meta.env.DEV && query === "error") {
        throw new Error("Simulated error for development");
      }

      queryClient.setQueryData(key, res);
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [query, queryClient]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}
