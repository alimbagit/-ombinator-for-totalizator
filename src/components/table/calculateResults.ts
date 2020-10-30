import { variantsCount, matchesCount } from "components/readTable";
/**Вычисление совпавших вариантов */
export const calculateBetVariants = (
  matchesScores: string[],
  scoresPriorities: string[][],
  betVariants: string[][],
) => {
  let result: number[] = new Array(variantsCount);
  result.fill(0);
  console.log(betVariants);
  console.log("Hello!!!");
  for (let col = 0; col < variantsCount; col++) {
    for (let row = 0; row < matchesCount; row++) {
      console.log(betVariants[0][0]);
      console.log(scoresPriorities[0][0]);
      if (scoresPriorities[row][parseInt(betVariants[row][col])] === matchesScores[row]) result[col]++;
    }
  }
  return result;
};
