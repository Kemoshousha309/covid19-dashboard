import styled from "styled-components"

export function Warning() {
    return <Foot>These statistics are not updated since March 7, 2021 </Foot>
}

// style
const Foot = styled.p`
    color: red;
    opacity: .6;
    text-align: center;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
`