import {
  Paper,
  TableHead,
  TableBody,
  Table,
  TableContainer,
  Typography,
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
import firebase from "firebase";
import { initialTableFromBase } from "utils/dataBaseAPI";
import { SelectNumber, TableRow, TableCell, TextInput } from "./elements";
import loadDeafaultTable, { variantsCount } from "utils/loadDeafaultTable";
import initializeAppFirebase from "utils/initializeAppFirebase";

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
    initializeAppFirebase();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        initialTableFromBase().then((data) => {
          dispatch(setInitialValues(data));
        });
      } else {
        loadDeafaultTable().then((data) => {
          dispatch(setInitialValues(data));
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    event: React.ChangeEvent<{
      name?: string | undefined;
      /** значение, которое будет возвращать SelectNumber */
      value: unknown;
    }>,
    indexMatch: number,
    indexValue?: number
  ) => {
    if (indexValue !== undefined) {
      dispatch(
        changePriority(indexMatch, indexValue, event.target.value as string)
      );
    } else {
      dispatch(changeMatchesScores(indexMatch, event.target.value as string));
    }
  };

  return (
    <Paper>
      <TableContainer>
        {namesTeams.length > 0 ? (
          <Table size="small" stickyHeader aria-label="a dense table">
            <TableHead>
              {/* Заголовок таблицы */}
              <TableRow>
                <TableCell padding="none">
                  <Typography style={{ marginLeft: "10px" }}>#</Typography>
                </TableCell>
                {tableHeaderData.map((column, index) => (
                  <TableCell key={index} padding="none">
                    <Typography style={{ marginLeft: "10px" }}>
                      {column}
                    </Typography>
                  </TableCell>
                ))}
                {new Array(variantsCount).fill(0).map((variant, ind) => (
                  <TableCell key={ind} padding="none">
                    <Typography style={{ marginLeft: "10px" }}>
                      {ind + 1}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* Тело таблицы */}
            <TableBody>
              {namesTeams.map((names, index) => (
                // Строка таблицы
                <TableRow key={index}>
                  <TableCell padding="none">
                    <Typography style={{ marginLeft: "10px" }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  {/* Названия команд */}
                  {namesTeams[index].map((name, key) => (
                    <TableCell key={key} padding="none">
                      <TextInput
                        style={{ marginLeft: "10px" }}
                        size={3}
                        type="text"
                        value={name}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChangeNameTeam(index, key, event)}
                      />
                    </TableCell>
                  ))}
                  {/* Приоритеты ставок */}
                  {scoresPriorities[index].map((priority, key) => (
                    <TableCell key={key} padding="none">
                      <SelectNumber
                        valueCell={priority}
                        handleChange={handleChange}
                        indexMatch={index}
                        indexValue={key}
                      />
                    </TableCell>
                  ))}
                  {/* Счет матча */}
                  <TableCell padding="none">
                    <SelectNumber
                      valueCell={matchesScores[index]}
                      handleChange={handleChange}
                      indexMatch={index}
                      isNeutral
                    />
                  </TableCell>
                  {/* Варианты ставок */}
                  {betVariants[index].map((variant, key) => (
                    <TableCell key={key} padding="none">
                      <Typography style={{ marginLeft: "10px", width: "25px" }}>
                        {scoresPriorities[index][parseInt(variant)]}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* Количество совпадиений в вариантах */}
              <TableRow>
                <TableCell colSpan={6} padding="none"></TableCell>
                <TableCell padding="none">
                  <Typography
                    style={{ margin: "4px 0px 3px 0px", height: "30px" }}
                  >
                    cовпад
                  </Typography>{" "}
                </TableCell>
                {resultHits.map((hit, key) => (
                  <TableCell key={key} padding="none">
                    <Typography
                      style={{ margin: "4px 0px 3px 10px", height: "30px" }}
                    >
                      {hit}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Typography variant="h6">Загрузка...</Typography>
        )}
      </TableContainer>
    </Paper>
  );
};

export default ExcelTable;
