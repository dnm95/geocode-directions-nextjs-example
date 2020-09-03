import { fromJS } from "immutable";
import actions from "../actions/test";

const initialState = fromJS({
  requesting: false,
  repos: [],
  repo: {},
});

const testState = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.REQUEST_REPOS: {
      return state.set("requesting", true);
    }

    case actions.REQUEST_REPOS_SUCCESS: {
      const { repos } = payload;

      return state
        .set("repos", repos)
        .set("requesting", false);
    }

    case actions.REQUEST_REPOS_FAILED: {
      return state.merge(initialState);
    }

    default:
      return state;
  }
};

export default testState;
