import { all, fork, takeLatest, put, call, take, race, select } from 'redux-saga/effects';
import { drizzleSagas } from 'drizzle';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* showMetaMaskOverlay() {
  yield put({ type: 'CHECK_METAMASK' });
}

function* showTxErrorMsg() {
  yield put({ type: 'TX_ERROR_METAMASK' });
}

function* showCheckingTxMsg() {
  yield put({ type: 'REDIRECT_HOME' });
  yield put({ type: 'CHECKING_TX_UI' });
}

function* txSuccessful() {
  yield put({ type: 'TX_SUCCESSFUL_UPDATE_UI'});
  yield put({ type: 'GET_STORED_VALUE'});
}

const getDrizzle = (state) => state.dappReducer.drizzle;
const getContracts = (state) => state.contracts;

function* pollSagaWorker(dataKey) {
  while (true) {
    const contracts = yield select(getContracts);
    if (contracts.SimpleStorage.synced) {
      const storedValueObj = contracts.SimpleStorage.storedData_[dataKey];
      if (storedValueObj && storedValueObj.value) {
          yield put({ type: 'GOT_STORED_VALUE', storedValue: storedValueObj.value });
      }
    }
    yield call(delay, 200);
  }
}

function* getStoredValueWatcher() {
  while (true) {
    yield take('GET_STORED_VALUE');
    yield put({ type: 'GETTING_STORED_VALUE' });
    const drizzle = yield select(getDrizzle);
    const dataKey = drizzle.contracts.SimpleStorage.methods.storedData_.cacheCall();
    yield race([
      call(pollSagaWorker, dataKey),
      take('GOT_STORED_VALUE')
    ])
  }
}

export default function* root() {
  yield takeLatest('PUSH_TO_TXSTACK', showMetaMaskOverlay);
  yield takeLatest('TX_ERROR', showTxErrorMsg);
  yield takeLatest('TX_BROADCASTED', showCheckingTxMsg);
  yield takeLatest('TX_SUCCESSFUL', txSuccessful);
  yield all(
    drizzleSagas.map(saga => fork(saga))
  );
  yield getStoredValueWatcher();
}
