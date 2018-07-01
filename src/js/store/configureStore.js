import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import webSocket from '../middleware/websocket';
import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
);

export default configureStore;
