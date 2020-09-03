import React from "react";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { fromJS } from "immutable";
import { Provider } from "react-redux";
import makeStore from "../store";

import "bootstrap/dist/css/bootstrap.min.css";

class CustomApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default withRedux(makeStore, {
  serializeState: state => state.toJS(),	
  deserializeState: state => fromJS(state),	
})(withReduxSaga(CustomApp));
