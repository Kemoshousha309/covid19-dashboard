import styled from "styled-components";
import { Card } from "./card";
import { labelMap } from "../utils/data";
import { Record } from "../utils/types";
import {
  Coronavirus,
  Bloodtype,
  LocalHospital,
  AirlineSeatIndividualSuite,
  MonitorHeart,
} from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface CurrentStatistics {
  record: Record;
}

export function CurrentStatistics({ record }: CurrentStatistics) {
    if(!record) return null
  const dataMap = Object.keys(labelMap).map((key: string) => {
    const recPropName = labelMap[key];
    return {
      label: `${key}(${record.state})`,
      value: record[recPropName],
      Icon: iconMap[key],
    };
  });

  return (
    <Container>
      {dataMap.map((c) => {
        if(!c.value) return null
        return <Card label={c.label} value={c.value} Icon={c.Icon} />;
      })}
    </Container>
  );
}

interface IconMap {
  [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const iconMap: IconMap = {
  Positive: Coronavirus,
  Negative: Bloodtype,
  Hospitalizations: LocalHospital,
  ICU: MonitorHeart,
  Ventilator: AirlineSeatIndividualSuite,
};

// styles
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
