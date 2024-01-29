interface LabelMap {
    [key: string]: string;
}

export const labelMap: LabelMap = {
    Positive: "positive",
    Negative: "negative",
    Hospitalizations: "hospitalized",
    ICU: "inIcuCurrently",
    Ventilator: "onVentilatorCumulative"
}


