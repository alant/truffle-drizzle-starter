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
const SET_DRIZZLE_STATE = "SET_DRIZZLE_STATE";
const GETTING_STORED_VALUE = "GETTING_STORED_VALUE";
const GOT_STORED_VALUE = "GOT_STORED_VALUE";

// reducer with initial state
const initialState = {
  checkMetaMask: false,
  metaMaskReject: false,
  checkingTx: false,
  txSuccessful: false,
  redirectToHome: false,
  drizzle: null,
  gotStoredValue: false,
  storedValue: null
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
      return { ...state, redirectToHome: false };
    case SET_DRIZZLE_STATE:
      return { ...state, drizzle: action.drizzle };
    case GETTING_STORED_VALUE:
      return { ...state, gotStoredValue: false };
    case GOT_STORED_VALUE:
      return { ...state, gotStoredValue: true, storedValue: action.storedValue };
    default:
      return state;
  }
}

export default combineReducers({
  dappReducer,
  ...drizzleReducers
});
