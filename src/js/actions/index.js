import * as ActionTypes from '../constants/ActionTypes';
import * as ToggleTypes from '../constants/ToggleTypes';


export const  increaseItem = (name) => (dispatch, getState) => {
    return dispatch({type: ActionTypes.INCREASE_ITEM, key:name});
};


export const  decreaseItem = (name) => (dispatch, getState) => {
    return dispatch({type: ActionTypes.DECREASE_ITEM, key:name});
};


export const  selectCoupon = (name) => (dispatch, getState) => {
    return dispatch({type: ActionTypes.SELECT_COUPON, key:name});
};


export const  selectPayment = (name) => (dispatch, getState) => {
    return dispatch({type: ActionTypes.SELECT_PAYMENT, key:name});
};
export const initItem = () =>(dispatch, getState)=>{
    return dispatch({type: ActionTypes.INIT_ITEM});
};

export const setToggle = (toggleType)  => (dispatch, getState) => {
    return dispatch({
        type: ActionTypes.SET_TOGGLED,
        toggleType
    });
};
export const resetToggle = (toggleType)  => (dispatch, getState) => {
    return dispatch({
        type: ActionTypes.RESET_TOGGLED,
        toggleType
    });
};

export const init = () => (dispatch, getState) => {
    dispatch({type: ActionTypes.INIT_ITEM});
    dispatch({type: ActionTypes.INIT_COUPON});
    dispatch({type: ActionTypes.INIT_PAYMENT});
    dispatch({type:  ActionTypes.RESET_TOGGLED, toggleType: ToggleTypes.SHOW_PAYMENT});
};