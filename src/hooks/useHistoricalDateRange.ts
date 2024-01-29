import { useState } from "react";
import { Record } from "../utils/types";
import { getDate } from "../utils/helper";

type Mark = {
  value: number;
  label: string;
};

export function useDateRange(datasets: Record[][]) {
  const [dateRange, setDateRange] = useState<number[]>([20, 37]);


  const handleDateRangeChange = (event: Event, newValue: number[] | number) => {
    if (typeof newValue == "number") {
      return setDateRange([newValue, newValue]);
    }
    setDateRange(newValue);
  };

  // apply the date range on the all datasets
  let maxDsLenInx = 0; // find maximum dataset
  const dataRanges = datasets.map((ds, i) => {
    if (datasets[maxDsLenInx].length < ds.length) {
      maxDsLenInx = i;
    }
    return getDataRange(ds, dateRange);
  });


  return {
    handleDateRangeChange,
    chartDatesLabels: prepareDates(dataRanges[0]),
    dateRange,
    datasets: dataRanges.reverse(),
    marks: prepareMarks(datasets[maxDsLenInx]),
  };
}

const prepareDates = (records: Record[]): string[] => {
  // return list of Dates in string formate for one dataset
  const dates: string[] = [];
  const decrement = 10;
  if (records) {
    for (let i = records.length - 1; i > 0; i -= decrement) {
      dates.push(getDate(records[i].date as number, true));
    }
  }
  return dates;
};

const getDataRange = (dataset: Record[], dateRange: number[]) => {
  // take one recordset and the dateRange to
  // return a new dataset between the ranage
  // if(dateRange[0] == dateRange[1]) debugger;
  const [start, end] = dateRange.map((v) => {
    return Math.round((v * dataset?.length) / 100);
  });
  return dataset?.slice(start, end + 1);
};

const prepareMarks = (data: Record[]): Mark[] => {
  const marks = [];
  const increment = 50;
  for (let i = 0; i < data.length; i += increment) {
    const mark = {
      value: Math.abs(Math.round(((i / data.length) * 100)-100)),
      label: getDate(data[i].date as number, false),
    };
    marks.push(mark);
  }
  return marks;
};
