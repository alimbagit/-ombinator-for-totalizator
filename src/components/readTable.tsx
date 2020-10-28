import path from "path";
import xlsx, { WorkBook } from "xlsx";
import { GetStaticProps } from "next";
import { State } from "my-redux/rootReducer";

/** Имя excel файла, который нужно прочитать*/
export const fileName: string = "/static/combinate.xlsx";
/**Количество вариантов в тотализаторе */
export const matchesCount = 15;
/**Количество вариантов ставок */
export const variantsCount = 36;

/**Возвращает структурированные данные из таблицы*/
export const getStaticProps: GetStaticProps = async () => {
  let workbook = xlsx.readFile(path.join(process.cwd(), fileName)); //чтение из файла
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //берем первый лист
  let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); //преобразовываем в массив

  let dataTable: State = {
    betVariants: [],
    matchesScores: [],
    namesTeams: [],
    scoresPriorities: [],
  };

  /**Преобразование данных из файла*/
  for (let row = 1; row <= matchesCount; row++) {
    //формирование массива, в котором содержаться названия команд
    dataTable.namesTeams.push([]);
    dataTable.namesTeams[row - 1].push(data[row][1]);
    dataTable.namesTeams[row - 1].push(data[row][2]);

    // формиорование массива приоритетов ставок
    dataTable.scoresPriorities.push([]);
    for (let col = 4; col <= 6; col++) {
      data[row][col] == "0"
        ? dataTable.scoresPriorities[row - 1].push("X")
        : dataTable.scoresPriorities[row - 1].push(data[row][col]);
    }

    //формирование массива вариантов ставок
    dataTable.betVariants.push([]);
    for (let col = 9; col <= variantsCount + 8; col++) {
      dataTable.betVariants[row - 1].push(data[row][col]);
    }

    //формирование массива результатов матчей
    data[row][8] == "0"
      ? dataTable.matchesScores.push("X")
      : dataTable.matchesScores.push(data[row][8]);
  }

  return {
    props: {
      dataTable,
    },
  };
};
