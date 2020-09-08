import { createSelector } from "reselect";

const makeSelector = (state) => state.get("directions").toJS();

const directionsSelector = createSelector([makeSelector], (directions) => directions);

const directions = (state) => ({
  directions: directionsSelector(state),
})

export default directions;
