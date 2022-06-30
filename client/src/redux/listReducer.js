import { CLEAR_ACTIONS, CONCAT_ACTIONS, CREATE_ACTION, EDIT_ACTION_STATUS, SET_ACTIONS } from "./types";

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
      case CONCAT_ACTIONS:
        return {...state, actions: [...state.actions, ...action.payload]}
      case EDIT_ACTION_STATUS:
        return {...state, actions: state.actions.map((item) => {
          if(item.id === action.payload.id) { return {...item, status: action.payload.status} }
          return item
        })}
      default:
        return state
  }
}