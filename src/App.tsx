import { createContext } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import StateSelectionDropdwon from "./components/StateSelectionDropdown";
import { useGetStates } from "./hooks/useGetStates";
import { useSelectHandler } from "./hooks/useSelectHandler";
import { useGetCurrentDatasets } from "./hooks/useGetCurrentDatasets";
import { State } from "./utils/types";
import { useGetHistoricalDatasets } from "./hooks/useGetHistoricalDatasets";
import styled from "styled-components";
import { CurrentStatistics } from "./components/currentStatistics";

const initState: State = {
  currentDatasets: null,
  historicalDatasets: null,
};
export const AppContext = createContext(initState);

function App() {
  const { currentStates, selectChangeHandler } = useSelectHandler();
  const { names } = useGetStates();
  const { displayedDatasets: currentDatasets } =
    useGetCurrentDatasets(currentStates);
  const { displayedDatasets: historicalDatasets } =
    useGetHistoricalDatasets(currentStates);

  // update the context
  const appState: State = {
    currentDatasets: currentDatasets,
    historicalDatasets: historicalDatasets,
  };


  // render the currect statics "cards"
  let currStateStatistics = null;
  if(currentDatasets) {
    // display the first record as the currect state data in cards 
    currStateStatistics = <CurrentStatistics record={currentDatasets[0]} />
  }

  return (
    <Wrapper>
      <Header />
      <AppContext.Provider value={appState}>
        <Upper>
          <SelectContainer>
            <StateSelectionDropdwon
              options={names}
              currentStates={currentStates}
              changeHandler={selectChangeHandler}
            />
          </SelectContainer>
          {currStateStatistics}
        </Upper>
        <Dashboard />
      </AppContext.Provider>
    </Wrapper>
  );
}

export default App;

// styles
const Wrapper = styled.div`
  padding: 1rem;
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap ;
  align-items: center;
`;

const SelectContainer = styled.div`
  min-width: 250px;
  width: 35vw;
`;
