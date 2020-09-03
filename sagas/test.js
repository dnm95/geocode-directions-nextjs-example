import {
  takeEvery, put, call,
} from "redux-saga/effects";
import api from "../services/api";
import actions from "../actions/test";

function* watchTestSaga(action) {
  try {
    const { username } = action.payload;
    api.resource = `${username}/repos`;
    const repos = yield call(api.get);
    return yield put({
      type: actions.REQUEST_REPOS_SUCCESS,
      payload: { repos },
    });
  } catch (err) {
    console.log(err);
    return yield put({ type: actions.REQUEST_REPOS_FAILED });
  }
}


export default function* sagas() {
  yield takeEvery(actions.REQUEST_REPOS, watchTestSaga);
}
