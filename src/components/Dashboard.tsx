import styled from "styled-components"
import { HistoricalDataChart } from "./HistoricalDataChart"
import { StatisticsDisplayChart } from "./StatisticsDisplayChart"


export function Dashboard() {
    return (
        <Wrapper>
            <StatisticsDisplayChart />
            <HistoricalDataChart />
        </Wrapper>
    )
} 


// styles 
export const Wrapper = styled.div`
    margin: 5rem auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

`