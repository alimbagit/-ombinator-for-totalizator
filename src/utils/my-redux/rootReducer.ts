import { Actions } from "./actions";
import { calculateResultHits } from "./calculateResultHits";
import {
  SET_INITIAL_VALUES,
  CHANGE_NAME_TEAM,
  CHANGE_PRIORITY,
  CHANGE_MATCHES_SCORES,
} from "./types";

export type State = {
  namesTeams: string[][];
  betVariants: string[][];
  scoresPriorities: string[][];
  matchesScores: string[];
  resultHits: number[];
};

const initialState: State = {
  betVariants: [],
  matchesScores: [],
  namesTeams: [],
  scoresPriorities: [],
  resultHits: [],
};

export const rootReducer = (
  state: State = initialState,
  action: Actions
): State => {
  const new_state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    /**Начальная инициализация состояния */
    case SET_INITIAL_VALUES:
      new_state.betVariants = action.payload.initialState.betVariants;
      new_state.matchesScores = action.payload.initialState.matchesScores;
      new_state.namesTeams = action.payload.initialState.namesTeams;
      new_state.scoresPriorities = action.payload.initialState.scoresPriorities;
      new_state.resultHits = calculateResultHits(
        action.payload.initialState.matchesScores,
        action.payload.initialState.scoresPriorities,
        action.payload.initialState.betVariants
      );
      return new_state;
    /**Редактирование имен команд */
    case CHANGE_NAME_TEAM:
      new_state.namesTeams[action.payload.indexMatch][
        action.payload.indexTeam
      ] = action.payload.value;
      return new_state;
    /**Редактирование приоритетов */
    case CHANGE_PRIORITY:
      new_state.scoresPriorities[action.payload.indexMatch][
        action.payload.indexPriority
      ] = action.payload.value;
      new_state.resultHits = calculateResultHits(
        new_state.matchesScores,
        new_state.scoresPriorities,
        new_state.betVariants
      );
      return new_state;
    /**Редаактирование результатов матчей */
    case CHANGE_MATCHES_SCORES:
      new_state.matchesScores[action.payload.indexMatch] = action.payload.score;
      new_state.resultHits = calculateResultHits(
        new_state.matchesScores,
        new_state.scoresPriorities,
        new_state.betVariants
      );
      return new_state;

    default:
      return new_state;
  }
};
