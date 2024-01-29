import { Header } from "./components/Header";
import StateSelectionDropdwon from "./components/StateSelectionDropdown";
import { useGetStates } from "./hooks/useGetStates";
import { useSelectHandler } from "./hooks/useSelectHandler";
import { useGetCurrentDatasets } from "./hooks/useGetCurrentDatasets";
import { useGetHistoricalDatasets } from "./hooks/useGetHistoricalDatasets";
import styled from "styled-components";
import { CurrentStatistics } from "./components/currentStatistics";
import { StatisticsDisplayChart } from "./components/StatisticsDisplayChart";
import { HistoricalDataChart } from "./components/HistoricalDataChart";
import { Warning } from "./components/warning";
import { Filter } from "./components/filter";
import { useFilter } from "./hooks/userFilter";
import { useGetAllStatesStatistics } from "./hooks/useGetAllStatesStatistics";
import { useState } from "react";

function Dashboard() {
  const [isFilterUsed, setIsFilterUsed] = useState<boolean>(false)

  // HOOKS ********
  // fetch all states if only we use the filter other than that we should fetch each state independently
  const {allStatesStatistics} = useGetAllStatesStatistics(isFilterUsed)
  // fetch all the states data to render the select drop down
  const { names } = useGetStates();
  const { currentStates, selectChangeHandler } = useSelectHandler();
  // fetch the current state data state by state unless we got all of them when using filter
  // if we got all the the state statistics after using filter we wouldn't fetch states any more
  const { displayedDatasets: currentDatasets } =
    useGetCurrentDatasets(currentStates);

  const { displayedDatasets: historicalDatasets } =
    useGetHistoricalDatasets(currentStates);  
  // 
  const { filterHandler } = useFilter(allStatesStatistics);


  // render the currect statics "cards"
  let currStateStatistics = null;
  if (currentDatasets?.length == 1) {
    // display the first record as the currect state data in cards
    currStateStatistics = <CurrentStatistics record={currentDatasets[0]} />;
  }

  return (
    <Wrapper>
      <Header />
      <SelectContainer>
        <StateSelectionDropdwon
          options={names}
          currentStates={currentStates}
          changeHandler={selectChangeHandler}
        />
      </SelectContainer>
      {currStateStatistics}
      <Lower>
        <StatisticsDisplayChart currentDatasets={currentDatasets} />
        <HistoricalDataChart historicalDatasets={historicalDatasets} />
      </Lower>
      <Filter filterHandler={(parameters) => {
        setIsFilterUsed(true)
        filterHandler(parameters)
      }} />
      <Warning />
    </Wrapper>
  );
}

export default Dashboard;

// styles
const Wrapper = styled.div`
  padding: 1rem;
  margin: auto 4rem;
`;

const SelectContainer = styled.div`
  min-width: 250px;
  width: 35vw;
`;
// styles
const Lower = styled.div`
  margin: 2rem auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
`;
