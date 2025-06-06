import { getLocation, TLocation } from "@/api/location";
import { useEffect, useState } from "react";

export function useLocations(id?: number) {
  const [data, setData] = useState<TLocation | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fn() {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await getLocation(id);
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fn();
  }, [id]);

  return { data, isLoading, error };
}
