// action types
const CHECK_METAMASK = "CHECK_METAMASK";
const TX_ERROR_METAMASK = "TX_ERROR_METAMASK";

// reducer with initial state
const initialState = {
  checkMetaMask: false,
  metaMaskReject: false
};

export default function dappReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_METAMASK:
      return { ...state, checkMetaMask: true };
    case TX_ERROR_METAMASK:
      return { ...state, checkMetaMask: false, metaMaskReject: true };
    default:
      return state;
  }
}
