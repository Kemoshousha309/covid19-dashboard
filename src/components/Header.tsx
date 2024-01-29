import styled from "styled-components"

export function Header() {
    return (
        <Container>
            <h1>Covid-19 Dashboard</h1>
            <p>This app displays the statistics of COVID-19 in the United States.
            </p>
        </Container>
    )

}


const Container = styled.header`
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h1 {
        font-size: 2.5rem;
        font-weight: 300;
        margin-bottom: 1rem;
    }

    & p {
        font-size: 1.5rem;
        font-weight: 300;
        color: gray;
    }

`
