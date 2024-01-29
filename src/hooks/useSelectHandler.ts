import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export function useSelectHandler() {
  const [currentStates, setCurrentState] = useState<string[]>([]);

  const selectChangeHandler = (
    event: SelectChangeEvent<typeof currentStates>
  ) => {
    const {
      target: { value },
    } = event;
    setCurrentState(typeof value === "string" ? value.split(",") : value);
  };

  return {currentStates, selectChangeHandler}
}
