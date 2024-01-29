import { Data, Fields } from "../utils/types"

export function useFilter(allStatesStatistics: Data) {
    const filterHandler = (parameters: Fields) => {
        // filter logic go here
        console.log("Filtering")
    }

    return {filterHandler}
}