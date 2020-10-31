import { variantsCount, matchesCount } from "utils/loadDeafaultTable";

/**Вычисление совпавших вариантов */
export const calculateResultHits = (
  matchesScores: string[],
  scoresPriorities: string[][],
  betVariants: string[][],
) => {
  let result: number[] = new Array(variantsCount);
  result.fill(0);

  for (let col = 0; col < variantsCount; col++) {
    for (let row = 0; row < matchesCount; row++) {
      if (scoresPriorities[row][parseInt(betVariants[row][col])] === matchesScores[row]) result[col]++;
    }
  }
  return result;
};
