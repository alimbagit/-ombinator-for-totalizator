import { Paper, TableHead, TableRow, TableCell, TableBody, Table } from "@material-ui/core";
import { DataTable } from "components/readTable";
import React, { useEffect, useState } from "react";
import { tableHeaderData } from './data';
import { TableContainer } from './elements';

const ExcelTable = ({ ...data }: DataTable) => {

  const [matchesScores, setMatchesScores] = useState(data.matchesScores); //Результаты матчей
  const [scoresPriorities, setScoresPriorities] = useState(data.scoresPriorities); //Приоритеты исходов матчей
  const [namesTeams, setNamesTeams] = useState(data.namesTeams); //Названия команд
  const [betVariants, setBetVariants] = useState(data.betVariants); //Варианты ставок

  return (
    <Paper>
      <TableContainer>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            {/* Заголовок таблицы */}
            <TableRow>
              <TableCell>№</TableCell>
              {tableHeaderData.map((column, index) => (
                <TableCell
                  key={index}
                >
                  {column}
                </TableCell>
              ))}
              {betVariants[0].map((variant, ind) => (
                <TableCell key={ind}>{ind + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Тело таблицы */}
          <TableBody>
            {matchesScores.map((match, index) => (
              // Строка таблицы
              <TableRow hover role="checkbox" key={index}>
                <TableCell>{index + 1}</TableCell>
                {/* Названия команд */}
                {namesTeams[index].map((name, key) => (
                  <TableCell key={key}>
                    {name}
                  </TableCell>
                ))}
                {/* Приоритеты ставок */}
                {scoresPriorities[index].map((priority, key) => (
                  <TableCell key={key}>
                    {priority}
                  </TableCell>
                ))}
                {/* Счет матча */}
                <TableCell>
                  {matchesScores[index]}
                </TableCell>
                {/* Варианты ставок */}
                {betVariants[index].map((variant, key) => (
                  <TableCell key={key}>
                    {variant}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ExcelTable;
