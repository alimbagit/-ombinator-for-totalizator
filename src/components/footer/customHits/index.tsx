import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "utils/my-redux/rootReducer";
import { WrapperHits } from "./elements";

/**
 * Количество совпадений по текущим подсчетам
 */
const CustomHits = () => {
  const resultHits = useSelector((state: State) => state.resultHits);
  const countMatches = useSelector(
    (state: State) => state.matchesScores.length
  );

  const customResultHits = (hits: number) => {
    let result = resultHits.filter((hit) => hit === hits);
    return result.length.toString();
  };

  return (
    <>
    <Typography>Количество совпадений</Typography>
    <WrapperHits>
      {new Array(7).fill(0).map((value, index) => {
        let result = customResultHits(countMatches - index);
        return (
          <>
            {result !== "0" && (
              <Typography key={index}>
                {(countMatches - index).toString() + ":" + result}
              </Typography>
            )}
          </>
        );
      })}
    </WrapperHits>
    </>
  );
};

export default CustomHits;
