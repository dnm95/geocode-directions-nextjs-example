import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import { Map } from "immutable";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

const config = {
  dev(sagaMiddleware) {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...[sagaMiddleware]));
  },

  prod(sagaMiddleware) {
    return compose(applyMiddleware(...[sagaMiddleware]));
  },
};

const makeStore = (initialState) => {
  const isDev = process.env.NODE_ENV !== "production";
  const sagaMiddleware = createSagaMiddleware();
  const applyMiddlewares = isDev ? config.dev : config.prod;
  const store = createStore(rootReducer, Map(initialState || {}), applyMiddlewares(sagaMiddleware));

  let sagaTask;
  store.runSagaTask = sagas => {
    if (!sagaTask || sagas) {
      const nextSagas = sagas || rootSaga;
      sagaTask = sagaMiddleware.run(nextSagas);
    }
    store.sagaTask = sagaTask;
    return sagaTask;
  };

  store.close = () => {
    store.dispatch(END);
  };

  if (isDev && module.hot) {
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default;
      store.replaceReducer(nextReducer);
    });

    module.hot.accept("../sagas", () => {
      const nextSagas = require("../sagas").default;
      store.sagaTask.cancel();
      store.sagaTask.toPromise().then(() => {
        store.runSagaTask(nextSagas);
      });
    });
  }

  store.runSagaTask();
  return store;
};

export default makeStore;
