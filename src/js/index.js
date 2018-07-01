'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from "./containers/App";
import configureStore from './store/configureStore';

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));