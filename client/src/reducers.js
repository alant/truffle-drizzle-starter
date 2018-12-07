import { combineReducers } from 'redux';
import { drizzleReducers } from 'drizzle';

// action types
const CHECK_METAMASK = "CHECK_METAMASK";
const CHECK_METAMASK_DONE = "CHECK_METAMASK_DONE";
const TX_ERROR_METAMASK = "TX_ERROR_METAMASK";
const TX_ERROR_METAMASK_DONE = "TX_ERROR_METAMASK_DONE";
const TX_SUCCESSFUL_UPDATE_UI = "TX_SUCCESSFUL_UPDATE_UI";
const CHECKING_TX_UI = "CHECKING_TX_UI";
const CHECKING_TX_UI_DONE = "CHECKING_TX_UI_DONE";
const REDIRECT_HOME = "REDIRECT_HOME";
const REDIRECT_TO_HOME_DONE = "REDIRECT_TO_HOME_DONE";

// reducer with initial state
const initialState = {
  checkMetaMask: false,
  metaMaskReject: false,
  checkingTx: false,
  txSuccessful: false,
  redirectToHome: false
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
      return { ...state, checkMetaMask: false, checkingTx: false, redirectToHome: false };
    case TX_SUCCESSFUL_UPDATE_UI:
      return { ...state, checkingTx: false, txSuccessful: true };
    case REDIRECT_HOME:
      return { ...state, redirectToHome: true };
    case REDIRECT_TO_HOME_DONE:
      return { ...state, redirectToHome: false};
    default:
      return state;
  }
}

export default combineReducers({
  dappReducer,
  ...drizzleReducers
});
