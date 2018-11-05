// action types
const CHECK_METAMASK = "CHECK_METAMASK";
const CHECK_METAMASK_DONE = "CHECK_METAMASK_DONE";
const TX_ERROR_METAMASK = "TX_ERROR_METAMASK";
const TX_ERROR_METAMASK_DONE = "TX_ERROR_METAMASK_DONE";

// reducer with initial state
const initialState = {
  checkMetaMask: false,
  metaMaskReject: false
};

export default function dappReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_METAMASK:
      return { ...state, checkMetaMask: true };
    case CHECK_METAMASK_DONE:
      return { ...state, checkMetaMask: false };
    case TX_ERROR_METAMASK:
      return { ...state, checkMetaMask: false, metaMaskReject: true };
    case TX_ERROR_METAMASK_DONE:
      return { ...state, metaMaskReject: false };
    default:
      return state;
  }
}
