import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { DrizzleProvider } from 'drizzle-react';
import SimpleStorage from './contracts/SimpleStorage.json';
import { createStore, applyMiddleware, compose } from 'redux';
import { generateContractsInitialState } from 'drizzle';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
// import { createBrowserHistory } from 'history';
import reducer from './reducers';
// import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
// import { BrowserRouter, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { BrowserRouter as Router } from "react-router-dom";

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

// const history = createBrowserHistory();

const store = createStore(
  reducer,
  // createRootReducer(history),
  initialState,
  composeEnhancers(
    applyMiddleware(
      // routerMiddleware,
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store)

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
