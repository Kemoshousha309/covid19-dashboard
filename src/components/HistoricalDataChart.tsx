import { Slider } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { generateContrastingColor } from "../utils/helper";
import { useDateRange } from "../hooks/useHistoricalDateRange";
import { ChartContainer } from "./StatisticsDisplayChart";
import { Record } from "../utils/types";
import { Mess } from "../utils/styles";

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
            if(ds.length == 0) return {
              label: "state",
              data: []
            }
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
            onChange={(e, v) => handleDateRangeChange(v)}
            valueLabelDisplay="off"
            marks={marks}
            disableSwap
        />
    </ChartContainer>
  );
}


