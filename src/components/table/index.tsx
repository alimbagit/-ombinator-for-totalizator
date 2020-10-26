import { Paper, TableHead, TableRow, TableCell, TableBody, Table, TableContainer, TextField, TextFieldProps } from "@material-ui/core";
import { State } from "my-redux/rootReducer";
import React, { useEffect, useState } from "react";
import { tableHeaderData } from './data';
// import { TableWrapper } from './elements';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialValues, changeNameTeam, changePriority, changeMatchesScores } from 'my-redux/actions';
import { variantsCount } from 'components/readTable';
import { calculateBetVariants } from './calculateResults';

const ExcelTable = ({ ...data }: State) => {

  const dispatch = useDispatch();

  const matchesScores = useSelector((state: State) => state.matchesScores);
  const scoresPriorities = useSelector((state: State) => state.scoresPriorities);
  const namesTeams = useSelector((state: State) => state.namesTeams);
  const betVariants = useSelector((state: State) => state.betVariants);
  const [resultHits, setResultHits] = useState([]);

  useEffect(() => {
    dispatch(setInitialValues(data));
    setResultHits(calculateBetVariants(matchesScores, betVariants));
  }, []);

  const handleChangeNameTeam = (indexMatch: number, indexTeam: number, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeNameTeam(indexMatch, indexTeam, event.currentTarget.value));
    // setResultHits(calculateBetVariants(matchesScores, betVariants));
  }

  const handleChangePriority = (indexMatch: number, indexPriority: number, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changePriority(indexMatch, indexPriority, parseInt(event.currentTarget.value)));
  }

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
              {new Array(variantsCount).fill(0).map((variant, ind) => (
                <TableCell key={ind} style={{ width: '10px' }}>{ind + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Тело таблицы */}
          <TableBody>
            {matchesScores.map((match, index) => (
              // Строка таблицы
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                {/* Названия команд */}
                {namesTeams[index].map((name, key) => (
                  <TableCell key={key} >
                    <TextField
                      style={{ width: '100px' }}
                      size="small"
                      variant="standard"
                      value={name}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeNameTeam(index, key, event)}
                    />
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
                    {scoresPriorities[index][variant]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow key={20}>
              <TableCell colSpan={6}></TableCell>
              <TableCell>Совпадения</TableCell>
              {resultHits.map((hit, key) => <TableCell key={key}>{hit}</TableCell>)}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
};

export default ExcelTable;
