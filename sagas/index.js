import { all, fork } from "redux-saga/effects";
import directions from "./directions";

export default function* mainSagas() {
  yield all([
    fork(directions),
  ]);
}
