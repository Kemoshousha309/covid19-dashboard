import { useEffect, useState } from "react";
import { fetchHistoricalDatasets } from "../services/api";
import { Record } from "../utils/types";
import {
  getPrevStates,
  getReqquiredFetchStates,
} from "./useGetCurrentDatasets";

export function useGetHistoricalDatasets(currentSates: string[]) {
  const [datasets, setDatasets] = useState<Record[][] | null>(null);
  const prevStates = datasets?.map(ds => ds[0].state) as string[];
  const reqquiredFetchStates = getReqquiredFetchStates(
    prevStates,
    currentSates
  );
  useEffect(() => {
    fetchHistoricalDatasets(reqquiredFetchStates).then((requiredDatasets) => {
        if(datasets) {
            setDatasets([
                ...datasets, 
                ...requiredDatasets as Record[][]
            ]);
        }else {
            setDatasets(requiredDatasets);
        }
    });
  }, [currentSates]);


  const displayedDatasets = getDisplayedDatasets(datasets, currentSates)

  return { displayedDatasets  };
}


function getDisplayedDatasets(datasets: Record[][] | null, currStates: string[]) {
    if(!datasets) return [];
    const displayedDatasets = [];
    for(let i =0; i < datasets.length; i ++) {
        const ds = datasets[i];
        const state = ds[0].state;
        if(currStates.includes(state)) {
            displayedDatasets.push(ds)
        }
    }
    return displayedDatasets
}