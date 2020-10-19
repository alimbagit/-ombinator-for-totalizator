import path from "path";
import xlsx, { WorkBook } from "xlsx";

export interface DataTable {
  namesTeams: string[][];
  betVariants: number[][];
  scoresPriorities: number[][];
  matchesScores: number[][];
}
/**Чтение excel файла
 * @param filename Имя excel файла, который нужно прочитать
 * @returns DataTable
 */
export const ReadTable = (filename: string) => {
  let dataTable: DataTable = {
    betVariants: [],
    matchesScores: [],
    namesTeams: [],
    scoresPriorities: [],
  };

  let workbook = xlsx.readFile(path.resolve(filename)); //чтение из файла
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //берем первый лист
  var data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); //преобразовываем в массив

  for (let row = 1; row <= 15; row++) {
    //формирование массива, в котором содержаться названия команд
    dataTable.namesTeams.push([]);
    dataTable.namesTeams[row - 1].push(data[row][1]);
    dataTable.namesTeams[row - 1].push(data[row][2]);

    // формиорование массива приоритетов ставок
    dataTable.scoresPriorities.push([]);
    for (let col = 4; col <= 6; col++) {
      dataTable.scoresPriorities[row - 1].push(data[row][col]);
    }

    
  }

  console.log(dataTable);
  return dataTable;
};
