import { all, fork, takeLatest, put } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

function* showMetaMaskOverlay() {
  yield put({ type: 'CHECK_METAMASK' });
}

function* showTxErrorMsg() {
  yield put({ type: 'TX_ERROR_METAMASK' });
}

function* showCheckingTxMsg() {
  yield put({ type: 'REDIRECT_HOME'});
  yield put({ type: 'CHECKING_TX_UI'});
}

function* txSuccessful() {
  yield put({ type: 'TX_SUCCESSFUL_UPDATE_UI'});
}

export default function* root() {
  yield takeLatest('PUSH_TO_TXSTACK', showMetaMaskOverlay);
  yield takeLatest('TX_ERROR', showTxErrorMsg);
  yield takeLatest('TX_BROADCASTED', showCheckingTxMsg);
  yield takeLatest('TX_SUCCESSFUL', txSuccessful);
  yield all(
    drizzleSagas.map(saga => fork(saga))
  );
}