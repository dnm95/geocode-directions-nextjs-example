import {
  takeEvery, put, call,
} from "redux-saga/effects";
import api from "services/gapi";
import actions from "actions/directions";

function* watchRequestGeocode(action) {
  try {
    const { query, type } = action.payload;
    const response = yield call(api.geocode, query);

    return yield put({
      type: actions.REQUEST_GEOCODE_SUCCESS,
      payload: {
        suggestions: response.map((item) => ({
          address: item.formatted_address,
          coords: item.geometry.location,
          id: item.place_id,
        })),
        type,
      },
    });
  } catch (err) {
    return yield put({ type: actions.REQUEST_GEOCODE_FAILED });
  }
}


export default function* sagas() {
  yield takeEvery(actions.REQUEST_GEOCODE, watchRequestGeocode);
}
