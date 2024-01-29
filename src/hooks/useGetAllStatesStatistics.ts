import { useEffect, useState } from "react";
import { Data } from "../utils/types";
import { fetchAllStatesStatistics } from "../services/api";

export function useGetAllStatesStatistics(isFilterUsed: boolean) {
  const [allStatesStatistics, setAllStatesStatistics] = useState<Data>(null);

  useEffect(() => {
    if (!allStatesStatistics && isFilterUsed) {
      fetchAllStatesStatistics().then((data) => {
        setAllStatesStatistics(data);
        console.log(data);
      });
    }
  }, [isFilterUsed]);

  return { allStatesStatistics };
}
