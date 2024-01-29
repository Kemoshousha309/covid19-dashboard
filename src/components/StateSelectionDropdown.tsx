import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "1.6rem",
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface StateSelectionDropdwonProps {
  options: string[][];
  currentStates: string[];
  changeHandler: (event: SelectChangeEvent<string[]>) => void;
}

export default function StateSelectionDropdwon({
  options,
  currentStates,
  changeHandler,
}: StateSelectionDropdwonProps) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <FormControl
          sx={{
            m: 1,
            width: "100%",
            // [theme.breakpoints.down("md")]: {
            //   width: "100%",
            // },
          }}
        >
          <InputLabel id="select-label">Select states</InputLabel>
          <Select
            labelId="select-label"
            id="select-state-dropdown"
            multiple
            value={currentStates}
            onChange={changeHandler}
            input={<OutlinedInput label="Select states" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {options.map(([name, state]) => (
              <MenuItem key={state} value={state}>
                <Checkbox checked={currentStates.indexOf(state) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
