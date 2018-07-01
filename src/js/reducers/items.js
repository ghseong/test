import * as ActionTypes from '../constants/ActionTypes';
import * as ItemTypes from '../constants/ItemTypes';

const initialItems = {
    [ItemTypes.AMERICANO_TAKEOUT] : 0,
    [ItemTypes.AMERICANO] : 0,
    [ItemTypes.CAFE_LATTE] : 0,
    [ItemTypes.CARAMEL_LATTE] : 0,
};

export default (state = initialItems, action) => {
    let key;
    switch (action.type) {
        case ActionTypes.INCREASE_ITEM:
            key = action.key;
            let increase = state[key] + 1;
            return {...state, [key] : increase};
        case ActionTypes.DECREASE_ITEM:
            key = action.key;
            let decrease = state[key] - 1;
            if (decrease < 0) {
                return state;
            }
            return {...state, [key] : decrease};
        case ActionTypes.INIT_ITEM :
            return initialItems;
        default:
            return state
    }
};