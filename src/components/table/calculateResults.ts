import { variantsCount } from 'components/readTable'
/**Вычисление совпавших вариантов */
export const calculateBetVariants = (matchesScores: number[], betVariants: number[][]) => {
    let result: number[] = new Array(variantsCount);
    result.fill(0);
    for (let col = 0; col < betVariants.length; col++) {
        for (let row = 0; row < betVariants.length; row++) {
            if (betVariants[row][col] === matchesScores[row]) result[row]++;
        }
    }
    return result;
}