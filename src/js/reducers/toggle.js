import * as ActionTypes from '../constants/ActionTypes';
import * as ToggleTypes from '../constants/ToggleTypes';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_TOGGLED:
            return setToggled(state, action.toggleType);
        case ActionTypes.RESET_TOGGLED:
            return resetToggled(state, action.toggleType);
    }
    return state;
}

function setToggled(state, toggleType) {
    const toggleObject = {};
    toggleObject[toggleType] = !state[toggleType];
    return Object.assign({}, state, toggleObject);
}

function resetToggled(state, toggleType) {
    const toggleObject = {};
    toggleObject[toggleType] = false;
    return Object.assign({}, state, toggleObject);
}