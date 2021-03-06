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
import reducer from './reducers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

const drizzleOptions = {
  contracts: [SimpleStorage]
};

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
};

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  (
    <MuiThemeProvider theme={theme}>
      <DrizzleProvider options={drizzleOptions} store={store}>
         <App />
      </DrizzleProvider>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
