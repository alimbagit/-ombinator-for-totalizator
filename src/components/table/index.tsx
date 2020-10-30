import {
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  TextField,
} from "@material-ui/core";
import { State } from "my-redux/rootReducer";
import React, { useEffect, useState, useRef } from "react";
import { tableHeaderData } from "./data";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialValues,
  changeNameTeam,
  changePriority,
  changeMatchesScores,
} from "my-redux/actions";
import { variantsCount } from "components/readTable";
import { calculateBetVariants } from "./calculateResults";
import { SelectNumber } from "./elements";
import loadDeafaultTable from "components/readTable";


/**Главный компонент таблицы */
const ExcelTable = () => {
  const dispatch = useDispatch();

  const matchesScores = useSelector((state: State) => state.matchesScores);
  const scoresPriorities = useSelector(
    (state: State) => state.scoresPriorities
  );
  const namesTeams = useSelector((state: State) => state.namesTeams);
  const betVariants = useSelector((state: State) => state.betVariants);
  const [resultHits, setResultHits] = useState<number[]>([]);

  useEffect(() => {
    const data = loadDeafaultTable();

    dispatch(setInitialValues(data));
    console.log("data= ", data);
    setResultHits(calculateBetVariants(data.matchesScores, data.scoresPriorities, data.betVariants));
  }, []);

  const firstUpdate = useRef(true); //Переменная для пропуска первой загрузки
  useEffect(() => {
    // Пропускаем первый запуск
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log("useEffect2");
    setResultHits(calculateBetVariants(matchesScores, scoresPriorities, betVariants));
  }, [matchesScores, betVariants]);

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
      dispatch(
        changePriority(indexMatch, indexValue, value)
      );
    }
    else {
      dispatch(
        changeMatchesScores(indexMatch, value)
      );
    }
    const calculate = calculateBetVariants(matchesScores, scoresPriorities, betVariants);
    setResultHits(calculate);
  };

  return (
    <Paper>
      <TableContainer>
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
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeNameTeam(index, key, event)
                      }
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
      </TableContainer>
    </Paper>
  );
};

export default ExcelTable;
