import { Record } from "../utils/types";

const baseUrl = "https://api.covidtracking.com";

export async function fetchStates() {
  try {
    const response = await fetch(`${baseUrl}/v1/states/info.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchStatesData(states: string[]) {
  try {
    const datasets = await Promise.all(
      states.map(async (state) => {
        return fetch(
          `${baseUrl}/v1/states/${state.toLowerCase()}/current.json`
        ).then((response) => response.json());
      })
    );
    return datasets as Record[];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchHistoricalDatasets(states: string[]) {
  try {
    const datasets = await Promise.all(
      states.map(async (state) => {
        return fetch(
          `${baseUrl}/v1/states/${state.toLowerCase()}/daily.json`
        ).then((response) => response.json());
      })
    );
    //   console.log({historical: datasets})
    return datasets as Record[][];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAllStatesStatistics() {
  try {
    const data = await fetch(`${baseUrl}/v1/states/current.json`).then((res) =>
      res.json()
    );
    return data as Record[];
  } catch (error) {
    console.log(error);
    return null;
  }
}
