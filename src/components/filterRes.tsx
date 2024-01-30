import styled from "styled-components";
import { Record } from "../utils/types";
import { Mess } from "../utils/styles";

interface FilterResultsProps {
  data: Record[];
  loading: boolean;
  parameters: { [key: string]: string };
}

export function FilterResults({
  data,
  loading,
  parameters,
}: FilterResultsProps) {
  if (loading) return <Mess>Loading ....</Mess>;

  return (
    <Container>
      {data.length == 0 ? (
        <Mess>No Results !</Mess>
      ) : (
        <ul>
          {data.map((rec) => {
            return <li key={rec[parameters.metric]}>{`${rec.state} (${rec[parameters.metric]})`} | </li>;
          })}
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div`
  font-size: 2rem;
  font-weight: 300;
  color: #3d3838;
  margin-bottom: 15rem;
  & ul {
    display: flex;
    list-style: none;
    width: 100%;
    flex-wrap: wrap;
  }

  & li {
    margin: 1rem;
  }
`;
