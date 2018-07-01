import {combineReducers} from 'redux';

import items from './items';
import discount from './discount';
import payment from './payment';
import toggle from './toggle';

const rootReducer = combineReducers({
    items,
    discount,
    payment,
    toggle,
});

export default rootReducer