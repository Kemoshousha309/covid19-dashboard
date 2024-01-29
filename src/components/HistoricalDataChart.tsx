import { Slider } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { AppContext } from "../App";
import { generateContrastingColor } from "../utils/helper";
import { useDateRange } from "../hooks/useHistoricalDateRange";
import { ChartContainer } from "./StatisticsDisplayChart";

ChartJS.register(ArcElement, Tooltip, Legend);

export function HistoricalDataChart() {
  const { historicalDatasets } = useContext(AppContext);
  if (!historicalDatasets) return <h2>Loading ...</h2>;
  if(historicalDatasets.length == 0) return <h2>Please select states to view trends</h2>

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
              label: ds[0].state,
              data: ds.map((d) => d.positive),
              backgroundColor: randomClr,
              borderColor: randomClr,
            };
          }),
        }}
      />
        <Slider
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
