import { fromJS } from "immutable";
import actions from "actions/directions";

const initialState = fromJS({
  requesting: false,
  origin: {
    coords: {
      lat: 0,
      lng: 0,
    },
    suggestions: [],
    requesting: false,
  },
  destination: {
    coords: {
      lat: 0,
      lng: 0,
    },
    suggestions: [],
    requesting: false,
  },
  routes: [],
  route: -1,
  sort: "time",
});

const directionsState = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.REQUEST_GEOCODE: {
      return state
      .setIn([payload.type, "requesting"], true);
    }

    case actions.REQUEST_GEOCODE_SUCCESS: {
      return state
        .setIn([payload.type, "suggestions"], payload.suggestions)
        .setIn([payload.type, "requesting"], false)
        .set("route", -1)
        .set("sort", "time")
        .set("requesting", false);
    }

    case actions.REQUEST_GEOCODE_FAILED: {
      return state.merge(initialState);
    }

    case actions.SET_ORIGIN_DESTINATION: {
      return state
        .setIn(["origin", "coords"], payload.direction.origin)
        .setIn(["destination", "coords"], payload.direction.destination);
    }

    case actions.SET_ROUTES: {
      return state.set("routes", payload.routes);
    }

    case actions.SET_ROUTE: {
      return state.set("route", payload.route);
    }

    case actions.SET_ROUTES_SORT: {
      const stateRoutes = state.get("routes");
      
      /*
        Functionality neccessary for sorting the routes,
        calling the maps API or manually sorting ¿?
      */

      return state
        .set("sort", payload.sortBy)
        .set("routes", stateRoutes.reverse())
        .set("route", -1);
    }

    default:
      return state;
  }
};

export default directionsState;
