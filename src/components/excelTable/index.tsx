import React, { useState } from "react";
import { ReadTable, DataTable } from "./readTable";

const filename = "src/components/excelTable/combinate.xlsx";

const ExcelTable = () => {
  const [matchesScores, setMatchesScores] = useState<number[]>([]);
  const [scoresPriorities, setScoresPriorities] = useState<number[][]>([]);
  const [namesTeams, setNamesTeams] = useState<string[][]>([]);
  const [betVariants, setBetVariants] = useState<number[][]>([]);

  let load = ReadTable(filename);
  return (
    <div>
      <p>Тут должна быть таблица</p>
      <p>{load.namesTeams}</p>
    </div>
  );
};

export default ExcelTable;
