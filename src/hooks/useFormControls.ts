import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Fields } from "../utils/types";

export function useFromControls() {
  const [fields, setValues] = useState<Fields>([
    { value: "", error: false, name: "metric" },
    { value: "", error: false, name: "value" },
    { value: "", error: false, name: "operator" },
  ]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(
      fields.map((f) => {
        if (f.name == name) {
          return {...f, value: value, error: false };
        }
        return f;
      })
    );
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setValues(
        fields.map((f) => {
          if (f.name == name) {
            return {...f, value: value, error: false };
          }
          return f;
        })
      );
  };

  const submitHandler = (filterHandler: (fields: Fields) => void) => {
    // do validation 
    let isValid = true;
    setValues(
        fields.map((f) => {
          if (f.value == "") {
            isValid = isValid && false
            return {...f, error: true };
          }
          return f;
        })
      );
      if(isValid) filterHandler(fields)
  };

  // prepare ready to use form data 
  const getValues = () => {
    const values: {[key: string]: string} = {};
    fields.forEach(f => {
        values[f.name] = f.value;
    })
    return values;
  }
  const getErrors = () => {
    const errors: {[key: string]: boolean} = {};
    fields.forEach(f => {
        errors[f.name] = f.error;
    })
    return errors;
  }


  return { handleInputChange, values: getValues(), handleSelectChange, submitHandler, errors: getErrors() };
}
