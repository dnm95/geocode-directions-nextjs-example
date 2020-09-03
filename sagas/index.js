import { all, fork } from "redux-saga/effects";
import test from "./test";

export default function* mainSagas() {
  yield all([
    fork(test),
  ]);
}
