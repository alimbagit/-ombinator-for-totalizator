import path from "path";
import xlsx, { WorkBook } from "xlsx";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export type DataTable = {
  namesTeams: string[][];
  betVariants: number[][];
  scoresPriorities: number[][];
  matchesScores: number[];
};

let fileName: string="combinate.xlsx";

/**Возвращает структурированные данные из таблицы
 * @param filename Имя excel файла, который нужно прочитать
 */
const ReadTable = ({
  dataTable,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <p>{dataTable.matchesScores}</p>
      <p>{dataTable.scoresPriorities}</p>
      <p>{dataTable.namesTeams}</p>
      <p>{dataTable.betVariants}</p>
    </div>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  console.log("hello getStaticProps");
  let workbook = xlsx.readFile(path.join(process.cwd(), fileName)); //чтение из файла
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //берем первый лист
  let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); //преобразовываем в массив
 
  let dataTable: DataTable = {
    betVariants: [],
    matchesScores: [],
    namesTeams: [],
    scoresPriorities: [],
  };

  /**Преобразование данных из файла*/
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

    //формирование массива вариантов ставок
    dataTable.betVariants.push([]);
    for (let col = 10; col <= 46; col++) {
      dataTable.betVariants[row - 1].push(data[row][col]);
    }

    //формирование массива результатов матчей
    dataTable.matchesScores.push(data[row][8]);
  }

  return {
    props: {
      dataTable,
    },
  };
};

export default ReadTable;