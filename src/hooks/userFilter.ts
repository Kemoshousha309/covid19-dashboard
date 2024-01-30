import { useEffect, useState } from "react";
import { Data, Fields, Record } from "../utils/types";

export function useFilter(allStatesStatistics: Data) {
  const [filterdData, setFilterdData] = useState<Record[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [parameters, setParameters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (allStatesStatistics) {
      doFiltering(parameters);
      setLoading(false);
    }
  }, [allStatesStatistics]);

  const filterHandler = (parameters: Fields) => {
    let pars: { [key: string]: string } = {};
    parameters.forEach((p) => {
      pars[p.name] = p.value;
    });
    setParameters(pars);
    if (!allStatesStatistics) {
      setLoading(true);
      return;
    }
    doFiltering(pars);
  };

  const doFiltering = (pars: { [key: string]: string }) => {
    // filter logic go here
    const filterdRecs = allStatesStatistics?.filter((rec) => {
      if (!rec[pars.metric]) return false;
      if (pars.operator == ">") {
        return rec[pars.metric] > pars.value;
      } else if (pars.operator == "<") {
        return rec[pars.metric] < pars.value;
      }
    });
    setFilterdData(filterdRecs as []);
  };

  return { filterHandler, loading, filterdData, parameters };
}
