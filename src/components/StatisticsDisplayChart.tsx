import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { labelMap } from "../utils/data";
import { AppContext } from "../App";
import { generateContrastingColor } from "../utils/helper";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);


export function StatisticsDisplayChart() {

  const { currentDatasets } = useContext(AppContext);


  if(!currentDatasets) return <h2>Loading Data ...</h2>
  if (currentDatasets && currentDatasets?.length == 0)
    return <h2>Select at least one state to view trends</h2>;

  return (
    <ChartContainer>
      <Bar
        data={{
          labels: Object.keys(labelMap),
          datasets: currentDatasets.map(ds => {
            const randomColor = generateContrastingColor();
            return {
              label: ds.state,
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