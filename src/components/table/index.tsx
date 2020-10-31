import {
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  TextField,
  Typography
} from "@material-ui/core";
import { State } from "utils/my-redux/rootReducer";
import React, { useEffect } from "react";
import { tableHeaderData } from "./data";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialValues,
  changeNameTeam,
  changePriority,
  changeMatchesScores,
} from "utils/my-redux/actions";
import { variantsCount } from "utils/loadDeafaultTable";
import { SelectNumber } from "./elements";
import loadDeafaultTable from "utils/loadDeafaultTable";

/**Главный компонент таблицы */
const ExcelTable = () => {
  const dispatch = useDispatch();

  const matchesScores = useSelector((state: State) => state.matchesScores);
  const scoresPriorities = useSelector(
    (state: State) => state.scoresPriorities
  );
  const namesTeams = useSelector((state: State) => state.namesTeams);
  const betVariants = useSelector((state: State) => state.betVariants);
  const resultHits = useSelector((state: State) => state.resultHits);

  useEffect(() => {
    loadDeafaultTable().then((data) => dispatch(setInitialValues(data)));
  }, []);

  /**Обработчик изменения имен команд */
  const handleChangeNameTeam = (
    indexMatch: number,
    indexTeam: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(changeNameTeam(indexMatch, indexTeam, event.target.value));
  };

  /**Калбэк функция для передачи в компонент SelectNumber для изменения приоритетов и результатов матчей
   * @param value - значение, которое будет возвращать SelectNumber
   * @param indexMatch - номер матча
   * @param indexValue - индекс изменяемого значения
   */
  const handleChange = (
    value: string,
    indexMatch: number,
    indexValue?: number
  ) => {
    if (indexValue !== undefined) {
      dispatch(changePriority(indexMatch, indexValue, value));
    } else {
      dispatch(changeMatchesScores(indexMatch, value));
    }
  };

  return (
    <Paper>
      <TableContainer>
        { namesTeams.length>0 ?
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              {/* Заголовок таблицы */}
              <TableRow>
                <TableCell>№</TableCell>
                {tableHeaderData.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
                {new Array(variantsCount).fill(0).map((variant, ind) => (
                  <TableCell key={ind} style={{ width: "10px" }}>
                    {ind + 1}
                  </TableCell>
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
                    <TableCell key={key}>
                      <TextField
                        size="small"
                        variant="standard"
                        value={name}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChangeNameTeam(index, key, event)}
                      />
                    </TableCell>
                  ))}
                  {/* Приоритеты ставок */}
                  {scoresPriorities[index].map((priority, key) => (
                    <TableCell key={key}>
                      <SelectNumber
                        valueCell={priority}
                        handleChange={handleChange}
                        indexMatch={index}
                        indexValue={key}
                      />
                    </TableCell>
                  ))}
                  {/* Счет матча */}
                  <TableCell>
                    <SelectNumber
                      valueCell={matchesScores[index]}
                      handleChange={handleChange}
                      indexMatch={index}
                    />
                  </TableCell>
                  {/* Варианты ставок */}
                  {betVariants[index].map((variant, key) => (
                    <TableCell key={key}>
                      {scoresPriorities[index][parseInt(variant)]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* Количество совпадиений в вариантах */}
              <TableRow key={20}>
                <TableCell colSpan={6}></TableCell>
                <TableCell>Совпадения</TableCell>
                {resultHits.map((hit, key) => (
                  <TableCell key={key}>{hit}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        : <Typography variant="h6">Загрузка...</Typography>}
      </TableContainer>
    </Paper>
  );
};

export default ExcelTable;
