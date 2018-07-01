import * as ActionTypes from '../constants/ActionTypes';
import * as DiscountTypes from '../constants/DiscountTypes';

const initialDiscount = {
    type: DiscountTypes.NONE
};

export default (state = initialDiscount, action) => {
    let key;
    switch (action.type) {
        case ActionTypes.INIT_COUPON:
            return {...initialDiscount};
        case ActionTypes.SELECT_COUPON:
            key = action.key;
            if (state.type === key) {
                return state;
            }
            return {...state, type:key};
        default:
            return state
    }
};