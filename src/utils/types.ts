export interface Record {
  [key: string]: string | number;
}

export type Data = Record[] | null;

export interface Dataset {
  label: string;
  data: number[];
}


export interface State {
  currentDatasets: Record[] | null,
  historicalDatasets: Record[][] | null
}

