import { variantsCount, matchesCount } from "components/readTable";
/**Вычисление совпавших вариантов */
export const calculateBetVariants = (
  matchesScores: string[],
  betVariants: string[][]
) => {
  let result: number[] = new Array(variantsCount);
  result.fill(0);
 
  for (let col = 0; col < variantsCount; col++) {
    for (let row = 0; row < matchesCount; row++) {
      if (betVariants[row][col] === matchesScores[row]) result[col]++;
    }
  }
  return result;
};
