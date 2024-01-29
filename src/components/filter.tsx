import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { theme } from "./StateSelectionDropdown";
import { ThemeProvider } from "@mui/material/styles";
import { labelMap } from "../utils/data";
import Button from "@mui/material/Button";
import { useFromControls } from "../hooks/useFormControls";
import { Fields } from "../utils/types";

interface FilterProps {
    filterHandler: (parameters: Fields) => void
}

export function Filter({filterHandler}: FilterProps) {
  const {
    values,
    handleInputChange,
    handleSelectChange,
    submitHandler,
    errors,
  } = useFromControls();
  return (
    <>
      <Header>Statistics Filterations</Header>
      <Container>
        <ThemeProvider theme={theme}>
          <span>The state in which</span>
          <FormControl variant="standard" sx={{ m: 3, minWidth: 150 }}>
            <InputLabel id="choose-metric">Choose metric</InputLabel>
            <Select
              error={errors.metric}
              labelId="choose-metric"
              name="metric"
              onChange={handleSelectChange}
              value={values.metric}
              label="Choose metric"
              required
            >
              {Object.keys(labelMap).map((key) => {
                return (
                  <MenuItem key={key} value={labelMap[key]}>
                    {key} cases
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <span>are</span>

          <FormControl variant="standard" sx={{ m: 3, minWidth: 150 }}>
            <InputLabel id="choose-operator">Choose operator</InputLabel>
            <Select
              error={errors.operator}
              labelId="choose-operator"
              name="operator"
              value={values.operator}
              onChange={handleSelectChange}
              label="Choose operator"
              required
            >
              <MenuItem value={">"}>Greater than</MenuItem>
              <MenuItem value={"<"}>Smaller than</MenuItem>
            </Select>
          </FormControl>

          <TextField
            error={errors.value}
            required
            onChange={handleInputChange}
            name="value"
            value={values.value}
            label="Value"
            variant="standard"
            type="number"
          />
          <Button variant="outlined" onClick={() => submitHandler(filterHandler)}>
            Get
          </Button>
        </ThemeProvider>
      </Container>
    </>
  );
}

const Container = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 2rem;
  font-weight: 300;
  color: #3d3d3d;
  margin-bottom: 10rem;

  & button {
    font-size: inherit;
    margin: auto auto;
  }
`;

const Header = styled.h2`
  margin-top: 5rem;
  font-size: 2rem;
  font-weight: 400;
  color: #3d3d3d;
`;
