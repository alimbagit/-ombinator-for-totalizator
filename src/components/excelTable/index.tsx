import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import React, { useEffect, useState } from "react";
import ReadTable, { DataTable } from "./readTable";

const ExcelTable = () => {
  const [matchesScores, setMatchesScores] = useState<number[]>([]); //Результаты матчей
  const [scoresPriorities, setScoresPriorities] = useState<number[][]>([]); //Приоритеты исходов матчей
  const [namesTeams, setNamesTeams] = useState<string[][]>([]); //Названия команд
  const [betVariants, setBetVariants] = useState<number[][]>([]); //Варианты ставок

  //Чтение данных из excel файла
  // let tableData = ReadTable(filename);

  // useEffect(() => {
  //   setMatchesScores(tableData.matchesScores);
  //   setScoresPriorities(tableData.scoresPriorities);
  //   setNamesTeams(tableData.namesTeams);
  //   setBetVariants(tableData.betVariants);
  // });

  return (
    <div>
      <p>Тут должна быть таблица</p>
      <ReadTable />
      {/* <p>{tableData.matchesScores}</p>
      <p>{tableData.scoresPriorities}</p>
      <p>{tableData.namesTeams}</p>
      <p>{tableData.betVariants}</p> */}
    </div>
  );
};

export default ExcelTable;
