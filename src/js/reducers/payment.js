import * as ActionTypes from '../constants/ActionTypes';
import * as PaymentTypes from '../constants/PaymentTypes';

const initialPayment = {
    type: PaymentTypes.CARD
};

export default (state = initialPayment, action) => {
    let key;
    switch (action.type) {
        case ActionTypes.INIT_PAYMENT:
            return {...initialPayment};
        case ActionTypes.SELECT_PAYMENT:
            key = action.key;
            return {...state, type:key};
        default:
            return state
    }
};