import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { labelMap } from "../utils/data";
import { generateContrastingColor } from "../utils/helper";
import styled from "styled-components";
import { Record } from "../utils/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatisticsDisplayChartProps {
  currentDatasets: Record[] | null
}

export function StatisticsDisplayChart({currentDatasets}: StatisticsDisplayChartProps) {

  // i need this comp in comperasion only
  if (!currentDatasets || currentDatasets?.length < 2) return null

  return (
    <ChartContainer>
      <Bar
        data={{
          labels: Object.keys(labelMap),
          datasets: currentDatasets.map(ds => {
            const randomColor = generateContrastingColor();
            return {
              label: ds.state as string,
              data: Object.values(labelMap).map(k => ds[k]),
              backgroundColor: randomColor,
              borderColor: randomColor,
            }
          })
        }}
      />
    </ChartContainer>
  );
}



// styles 
export const ChartContainer = styled.div`
    width: min(90%, 65rem);
    margin-bottom: 5rem;
`   