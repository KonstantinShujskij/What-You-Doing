import { CLEAR_ACTIONS, CREATE_ACTION, SET_ACTIONS } from "./types";

const initialState = {
    actions: []
};

export default function listReducer(state=initialState, action) {
  switch(action.type) {
      case SET_ACTIONS:
        return {...state, actions: action.payload}
      case CLEAR_ACTIONS:
        return {...state, actions: []}
      case CREATE_ACTION:
        return {...state, actions: [action.payload, ...state.actions]}
      default:
        return state
  }
}