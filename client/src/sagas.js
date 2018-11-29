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
  yield put({ type: 'POLL_START'});
}

function* txSuccessful() {
  yield put({ type: 'TX_SUCCESSFUL_UPDATE_UI'});
}

const getTransactionStack = (state) => state.transactionStack;
const getTransactions = (state) => state.transactions;

function* pollSagaWorker() {
  console.log("pollSagaWorker Begin!!");
  let counter = 0
  const transactionStack = yield select(getTransactionStack);
  while (true) {
    counter += 1;
    const txHash = transactionStack[transactionStack.length - 1];
    const transactions = yield select(getTransactions);
    console.log("poll worker at work", counter, transactions[txHash].status, txHash, transactionStack, transactions);
    yield call(delay, 1000);
    if (counter === 30) {
      yield put({ type: 'TX_POLL_TIMEOUT' });
    }
    if (transactions[txHash].status === 'success') {
      yield put({ type: 'TX_SUCCESSFUL_UPDATE_UI' });
    }
  }
}

function* pollSagaWatcher() {
  while (true) {
    yield take('POLL_START');
    yield race([
      call(pollSagaWorker),
      take('TX_SUCCESSFUL_UPDATE_UI'),
      take('TX_POLL_TIMEOUT')
    ]);
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
  yield pollSagaWatcher();
}
