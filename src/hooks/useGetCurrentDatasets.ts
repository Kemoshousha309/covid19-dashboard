import { useEffect, useState } from "react";
import { fetchStatesData } from "../services/api";
import { Record } from "../utils/types";

export function useGetCurrentDatasets(currentSates: string[]) {
  const [datasets, setDatasets] = useState<Record[] | null>(null);

  const prevStates = getPrevStates(datasets);
  const reqquiredFetchStates = getReqquiredFetchStates(
    prevStates,
    currentSates
  );    

  useEffect(() => {
    fetchStatesData(reqquiredFetchStates).then((requiredDatasets) => {
        if(datasets) {
            setDatasets([
                ...datasets, 
                ...requiredDatasets as Record[]
            ]);
        }else {
            setDatasets(requiredDatasets);
        }
    });
  }, [currentSates]);

  const displayedDatasets = datasets?.filter(ds => currentSates.includes(ds.state as string)) as Record[] | null

  return { displayedDatasets };
}

export function getPrevStates(datasets: Record[] | null) {
  if (!datasets) return [];
  return datasets.map((ds) => ds.state as string);
}

export function getReqquiredFetchStates(prev: string[], curr: string[]) {
  return curr.filter((s) => !prev.includes(s));
}
