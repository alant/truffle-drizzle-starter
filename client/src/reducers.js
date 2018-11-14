import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { drizzleReducers } from 'drizzle';

import {
  CHECK_METAMASK,
  CHECK_METAMASK_DONE,
  TX_ERROR_METAMASK,
  TX_ERROR_METAMASK_DONE,
  CHECKING_TX_UI,
  CHECKING_TX_UI_DONE,
  TX_SUCCESSFUL_UPDATE_UI
} from './actions';


// reducer with initial state
const initialState = {
  checkMetaMask: false,
  metaMaskReject: false,
  checkingTx: false,
  txSuccessful: false
};

function dappReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_METAMASK:
      return { ...state, checkMetaMask: true };
    case CHECK_METAMASK_DONE:
      return { ...state, checkMetaMask: false };
    case TX_ERROR_METAMASK:
      return { ...state, checkMetaMask: false, metaMaskReject: true };
    case TX_ERROR_METAMASK_DONE:
      return { ...state, metaMaskReject: false };
    case CHECKING_TX_UI:
      return { ...state, checkMetaMask: false, checkingTx: true };
    case CHECKING_TX_UI_DONE:
      return { ...state, checkMetaMask: false, checkingTx: false };
    case TX_SUCCESSFUL_UPDATE_UI:
      return { ...state, checkingTx: false, txSuccessful: true };
    default:
      return state;
  }
}

export default (history) => combineReducers({
  router: connectRouter(history),
  dappReducer,
  ...drizzleReducers
});
