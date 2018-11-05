import { all, fork, takeLatest, put } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

function* showMetaMaskOverlay() {
  yield put({ type: 'CHECK_METAMASK' });
}

function* showTxErrorMsg() {
  yield put({ type: 'TX_ERROR_METAMASK' });
}

export default function* root() {
  yield takeLatest('PUSH_TO_TXSTACK', showMetaMaskOverlay);
  yield takeLatest('TX_ERROR', showTxErrorMsg);
  yield all(
    drizzleSagas.map(saga => fork(saga))
  );
}