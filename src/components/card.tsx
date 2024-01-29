import styled from "styled-components";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface CardProps {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  value: string | number;
}

export function Card({ label, Icon, value }: CardProps) {
  return (
    <Container >
        <Icon  sx={{ fontSize: "4rem" }} />
      <Label>
        {label}
        <br />
        <span>{value}</span>
      </Label>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 5px;
  color: #717171;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0px 0px 5px 0px #717171;
  cursor: pointer;
`;

const Label = styled.p`
  & span {
    display: block;
    margin-top: 1rem;
  }
`;
