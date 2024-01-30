import { useEffect, useState } from "react";
import { Data } from "../utils/types";
import { fetchAllStatesStatistics } from "../services/api";

export function useGetAllStatesStatistics(isFilterUsed: boolean) {
  const [allStatesStatistics, setAllStatesStatistics] = useState<Data>(null);
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    if (!allStatesStatistics && isFilterUsed) {
      setLoading(true)
      fetchAllStatesStatistics().then((data) => {
        setLoading(false)
        setAllStatesStatistics(data);
      });
    }
  }, [isFilterUsed]);

  return { allStatesStatistics, loading };
}
