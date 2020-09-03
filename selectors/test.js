import { createSelector } from "reselect";

const makeSelector = (state) => state.get("test").toJS();

const testSelector = createSelector([makeSelector], (test) => test);

const test = (state) => ({
  test: testSelector(state),
})

export default test;
