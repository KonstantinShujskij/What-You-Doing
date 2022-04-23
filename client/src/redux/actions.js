import { CONCAT_ACTIONS, SET_ACTIONS, CLEAR_ACTIONS, CREATE_ACTION } from "./types";

export function setActions(actions) {
    return {
        type: SET_ACTIONS,
        payload: actions
    };
}

export function concatActions(actions) {
    return {
        type: CONCAT_ACTIONS,
        payload: actions
    }
}

export function clearActions() {
    return {
        type: CLEAR_ACTIONS
    }
}

export function createAction(action) {
    return {
        type: CREATE_ACTION,
        payload: action
    }
}