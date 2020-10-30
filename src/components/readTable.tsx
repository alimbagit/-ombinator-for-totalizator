import xlsx from "xlsx";
import { State } from "my-redux/rootReducer";

/** Имя excel файла, который нужно прочитать*/
export const fileName: string = "/combinate.xlsx";
/**Количество вариантов в тотализаторе */
export const matchesCount = 15;
/**Количество вариантов ставок */
export const variantsCount = 36;

/**Чтение xlsx файла */
const readTable = async () => {
  let url = window.location.href + fileName;
  let response = await fetch(url);
  let tableJson = await response.arrayBuffer();
  let workbook = xlsx.read(tableJson, { type: 'buffer' });
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //берем первый лист
  let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as string[][]; //преобразовываем в массив
  return data;
}

let dataTable: State = {
  betVariants: [],
  matchesScores: [],
  namesTeams: [],
  scoresPriorities: [],
};

/**Возвращает структурированные данные из таблицы*/
const loadDeafaultTable = () => {

  readTable().then((data) => { dataRefactoring(data) });
  return dataTable;
}

/**Преобразование данных из файла*/
const dataRefactoring = (data: string[][]) => {  
  for (let row = 1; row <= matchesCount; row++) {
    //формирование массива, в котором содержаться названия команд
    dataTable.namesTeams.push([]);
    dataTable.namesTeams[row - 1].push(data[row][1]);
    dataTable.namesTeams[row - 1].push(data[row][2]);

    // формиорование массива приоритетов ставок
    dataTable.scoresPriorities.push([]);
    for (let col = 4; col <= 6; col++) {
      data[row][col] === "0"
        ? dataTable.scoresPriorities[row - 1].push("X")
        : dataTable.scoresPriorities[row - 1].push(data[row][col]);
    }

    //формирование массива вариантов ставок
    dataTable.betVariants.push([]);
    for (let col = 9; col <= variantsCount + 8; col++) {
      dataTable.betVariants[row - 1].push(data[row][col]);
    }

    //формирование массива результатов матчей
    data[row][8] === "0"
      ? dataTable.matchesScores.push("X")
      : dataTable.matchesScores.push(data[row][8]);
  }

  return dataTable;
}

export default loadDeafaultTable;
