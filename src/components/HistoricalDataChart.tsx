import { Slider } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { generateContrastingColor } from "../utils/helper";
import { useDateRange } from "../hooks/useHistoricalDateRange";
import { ChartContainer } from "./StatisticsDisplayChart";
import styled from "styled-components";
import { Record } from "../utils/types";

ChartJS.register(ArcElement, Tooltip, Legend);
interface HistoricalDataChartProps {
  historicalDatasets:  Record[][] | null
}

export function HistoricalDataChart({historicalDatasets}: HistoricalDataChartProps) {

  if (!historicalDatasets) return <Mess>Loading ...</Mess>;
  if(historicalDatasets.length == 0) return <Mess>Please select states to view trends</Mess>

  const {
    chartDatesLabels,
    datasets,
    marks,
    handleDateRangeChange,
    dateRange,
  } = useDateRange(historicalDatasets);

  return (
    <ChartContainer>
      <Line
        data={{
          labels: chartDatesLabels,
          datasets: datasets.map((ds) => {
            const randomClr = generateContrastingColor();
            return {
              label: ds[0].state as string,
              data: ds.map((d) => d.positive),
              backgroundColor: randomClr,
              borderColor: randomClr,
            };
          }),
        }}
      />
        <Slider
            sx={{m: 3}}
            getAriaLabel={() => "Date range"}
            value={dateRange}
            onChange={handleDateRangeChange}
            valueLabelDisplay="off"
            marks={marks}
            disableSwap
        />
    </ChartContainer>
  );
}


// style 
const Mess = styled.h2`
  color: gray;
  font-weight: 300;
`