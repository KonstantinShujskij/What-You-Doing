import { CONCAT_ACTIONS, SET_ACTIONS, CLEAR_ACTIONS, CREATE_ACTION, EDIT_ACTION_STATUS } from "./types";

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

export function editActionStatus(status, id) {
    return {
        type: EDIT_ACTION_STATUS,
        payload: { status, id }
    }
}