import styled from "styled-components"

export function Header() {
    return (
        <Container>
            <h1>Covid-19 Statistics</h1>
            <p>This app displays the statistics of COVID-19 in the United States.<br />
                <span>These statistics are not updated since March 7, 2021 </span>
            </p>
        </Container>
    )

}


const Container = styled.header`
    text-align: center;
    margin-bottom: 3rem;
    & h1 {
        font-weight: 300;
        margin-bottom: 1rem;
    }

    & p > span {
        color: red;
        font-size: 1.3rem;
    }
`
