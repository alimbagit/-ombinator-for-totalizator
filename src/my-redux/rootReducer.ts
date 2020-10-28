import { Actions } from "./actions";
import {
  SET_INITIAL_VALUES,
  CHANGE_NAME_TEAM,
  CHANGE_PRIORITY,
  CHANGE_MATCHES_SCORES,
} from "./types";

export type State = {
  namesTeams: string[][];
  betVariants: number[][];
  scoresPriorities: number[][];
  matchesScores: number[];
};

/** */
const initialState: State = {
  betVariants: [],
  matchesScores: [],
  namesTeams: [],
  scoresPriorities: [],
};

export const rootReducer = (
  state: State = initialState,
  action: Actions
): State => {
  const new_state = JSON.parse(JSON.stringify(state));
  // const new_state = { ...state };
  switch (action.type) {
    case SET_INITIAL_VALUES:
      new_state.betVariants = action.payload.initialState.betVariants;
      new_state.matchesScores = action.payload.initialState.matchesScores;
      new_state.namesTeams = action.payload.initialState.namesTeams;
      new_state.scoresPriorities = action.payload.initialState.scoresPriorities;
      return new_state;
    /**Редактирование имен команд */
    case CHANGE_NAME_TEAM:
      new_state.namesTeams[action.payload.indexMatch][
        action.payload.indexTeam
      ] = action.payload.value;
      return new_state;
    /**Редактирование приоритетов */
    case CHANGE_PRIORITY:
      console.log(typeof action.payload.value);
      new_state.scoresPriorities[action.payload.indexMatch][
        action.payload.indexPriority
      ] = action.payload.value;
      return new_state;
    /**Редаактирование результатов матчей */
    case CHANGE_MATCHES_SCORES:
      new_state.matchesScores[action.payload.indexMatch] = action.payload.score;
      return new_state;

    default:
      return new_state;
  }
};
