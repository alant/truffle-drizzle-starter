import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { DrizzleProvider } from 'drizzle-react';
import SimpleStorage from './contracts/SimpleStorage.json';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { drizzleReducers, generateContractsInitialState } from 'drizzle';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import dappReducer from './actions';
import reducer from './reducers';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';

const drizzleOptions = {
  contracts: [SimpleStorage]
};

// const reducer = combineReducers({
//   dappReducer,
//   ...drizzleReducers
// });

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
};

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const store = createStore(
  // reducer,
  createRootReducer(history),
  initialState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <DrizzleProvider options={drizzleOptions} store={store}>
    <App />
  </DrizzleProvider>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
