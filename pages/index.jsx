import React from "react";
import { shape, func, bool } from "prop-types";
import Head from "next/head";
import {
  Container, Row, Col,
  Button,
} from "reactstrap";
import HOC from "hoc";
import actions from "actions/directions";
import selectors from "selectors/directions";
import RouteForm from "components/forms/Route";
import MapWithDirections from "components/commons/MapWithDirections";
import RouteList from "components/commons/RouteList";
import SortBy from "components/commons/SortBy";
import { Divider, OverflowCol } from "components/styles";

function Home(props) {
  const {
    directions, onRequestGeocode, onSetRoutes,
    onSetOriginDestination, onSetActiveRoute, onSetSortBy,
    isMobile,
  } = props;

  return (
    <>
      <Head>
          <title>Geocode Directions google maps example</title>
        </Head>
      <Container className="mt-4 mb-4">
        <Row>
          <Col sm="4">
            <RouteForm
              origin={directions.origin}
              destination={directions.destination}
              onSearchAddress={onRequestGeocode}
              onSubmit={onSetOriginDestination}
            />
            <Divider>- - - - - - -</Divider>
            {directions.routes.length > 0 && (
              <SortBy onChange={onSetSortBy} />
            )}
            {directions.route >=0 && (
              <Button
                color="success"
                className="mb-3"
                onClick={() => onSetActiveRoute(-1)}
                block
              >
                Ver todas las rutas en mapa
              </Button>
            )}
            <OverflowCol xs={12} className="mt-3 mb-3 p-0">
              <RouteList
                routes={directions.routes}
                active={directions.route}
                onSetActiveRoute={onSetActiveRoute}
              />
            </OverflowCol>
          </Col>
          <Col sm="8">
            <MapWithDirections
              origin={directions.origin.coords}
              destination={directions.destination.coords}
              activeRoute={directions.route}
              isMobile={isMobile}
              onSetRoutes={onSetRoutes}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

Home.defaultProps = {
  directions: {},
  isMobile: false,
};

Home.propTypes = {
  directions: shape(),
  isMobile: bool,
  onRequestGeocode: func.isRequired,
  onSetRoutes: func.isRequired,
  onSetOriginDestination: func.isRequired,
  onSetActiveRoute: func.isRequired,
  onSetSortBy: func.isRequired,
};

const mapStateToProps = (state) => ({
  directions: selectors(state).directions,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestGeocode(query, type) {
    dispatch({
      type: actions.REQUEST_GEOCODE,
      payload: { query, type },
    });
  },
  onSetOriginDestination(direction) {
    dispatch({
      type: actions.SET_ORIGIN_DESTINATION,
      payload: { direction },
    });
  },
  onSetRoutes(routes) {
    dispatch({
      type: actions.SET_ROUTES,
      payload: { routes },
    });
  },
  onSetActiveRoute(route) {
    dispatch({
      type: actions.SET_ROUTE,
      payload: { route },
    });
  },
  onSetSortBy(sortBy) {
    dispatch({
      type: actions.SET_ROUTES_SORT,
      payload: { sortBy },
    });
  },
});

export default HOC(mapStateToProps, mapDispatchToProps)(Home);
