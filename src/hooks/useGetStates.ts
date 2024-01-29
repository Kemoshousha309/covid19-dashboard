import { useEffect, useState } from "react";
import { Data } from "../utils/types";
import { fetchStates } from "../services/api";

export function useGetStates() {
    const [states, setStates] = useState<Data>();

    useEffect(() => {
        fetchStates().then((data: Data) => {
        setStates(data);
        });
    }, []);

    const getStatesNames = () => {
        let names: string[][] = [['New York', 'NY']]; // add new york initaily
        if (states) {
        names = states.map((s) => [s.name as string, s.state as string]);
    }
    console.log(names)
    return names;
  };

  
  const isComperasion = getStatesNames().length > 1 

  return { states, names: getStatesNames(), isComperasion };
}
