import { State } from "./rootReducer";
import { SET_INITIAL_VALUES, CHANGE_NAME_TEAM, CHANGE_PRIORITY, CHANGE_MATCHES_SCORES } from "./types";

/**Устанавливает начальные значения */
export function setInitialValues(initialState: State) {
  return {
    type: SET_INITIAL_VALUES,
    payload: { initialState },
  }
}

/**Редктирование имени команды 
 * @param indexMatch - номер матча
 * @param indexTeam - Индекс команды в одном матче. Если хозяева, то 0, если гости, то 1
*/
export function changeNameTeam(indexMatch: number, indexTeam: number, value: string) {
  return {
    type: CHANGE_NAME_TEAM,
    payload: { indexMatch, indexTeam, value },
  };
}

/**Редактирование приоритетов прогнозов */
export function changePriority(indexMatch: number, indexPriority: number, value: number) {
  return {
    type: CHANGE_PRIORITY,
    payload: { indexMatch, indexPriority, value }
  };
}
/**Редактирование исходов матчей*/
export function changeMatchesScores(indexMatch: number, score: number) {
  return {
    type: CHANGE_MATCHES_SCORES,
    payload: { indexMatch, score }
  };
}

export type Actions =
  | ReturnType<typeof setInitialValues>
  | ReturnType<typeof changeNameTeam>
  | ReturnType<typeof changePriority>
  | ReturnType<typeof changeMatchesScores>;
