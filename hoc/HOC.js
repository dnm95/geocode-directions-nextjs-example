import React from "react";
import { connect } from "react-redux";

const HOC = (mapStateToProps, mapDispatchToProps) => (BaseComponent, actions) => {
  class HighOrder extends React.PureComponent {
    static async getInitialProps(ctx) {
      const { store, ...rest } = ctx;
      const isServer = typeof window === "undefined";

      let action = actions && actions.type ? actions : { type: "" };
      if (actions) {
        action = actions.server || actions.client || action;
      }

      const dispatch = { ...action, isServer, query: rest.query };
      const router = {
        asPath: rest.asPath,
        pathname: rest.pathname,
        query: rest.query,
      };

      let userAgent;
      if (ctx.req) {
        userAgent = ctx.req.headers["user-agent"];
      } else {
        userAgent = navigator.userAgent;
      }

      const isMobile = Boolean(userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      ));

      if (isServer) {
        const rootTask = store.runSagaTask();

        store.dispatch(dispatch);
        store.close();
        await rootTask.toPromise().then();
      } else {
        store.runSagaTask();
        store.dispatch(dispatch);
      }

      const pageProps = BaseComponent.getInitialProps
        ? await BaseComponent.getInitialProps(ctx)
        : {};

      return {
        ...pageProps,
        router,
        isMobile,
      };
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  const superMapStateToProps = state => ({
    ...(mapStateToProps ? mapStateToProps(state) : {}),
  });

  return connect(superMapStateToProps, mapDispatchToProps)(HighOrder);
};

export default HOC;
