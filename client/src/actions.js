// action types
export const CHECK_METAMASK = "CHECK_METAMASK";
export const CHECK_METAMASK_DONE = "CHECK_METAMASK_DONE";
export const TX_ERROR_METAMASK = "TX_ERROR_METAMASK";
export const TX_ERROR_METAMASK_DONE = "TX_ERROR_METAMASK_DONE";
export const TX_SUCCESSFUL_UPDATE_UI = "TX_SUCCESSFUL_UPDATE_UI";
export const CHECKING_TX_UI = "CHECKING_TX_UI";
export const CHECKING_TX_UI_DONE = "CHECKING_TX_UI_DONE";

// reducer with initial state
// const initialState = {
//   checkMetaMask: false,
//   metaMaskReject: false,
//   checkingTx: false,
//   txSuccessful: false
// };

// export default function dappReducer(state = initialState, action) {
//   switch (action.type) {
//     case CHECK_METAMASK:
//       return { ...state, checkMetaMask: true };
//     case CHECK_METAMASK_DONE:
//       return { ...state, checkMetaMask: false };
//     case TX_ERROR_METAMASK:
//       return { ...state, checkMetaMask: false, metaMaskReject: true };
//     case TX_ERROR_METAMASK_DONE:
//       return { ...state, metaMaskReject: false };
//     case CHECKING_TX_UI:
//       return { ...state, checkMetaMask: false, checkingTx: true };
//     case CHECKING_TX_UI_DONE:
//       return { ...state, checkMetaMask: false, checkingTx: false };
//     case TX_SUCCESSFUL_UPDATE_UI:
//       return { ...state, checkingTx: false, txSuccessful: true };
//     default:
//       return state;
//   }
// }
