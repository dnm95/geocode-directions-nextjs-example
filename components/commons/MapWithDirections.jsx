import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  withScriptjs,
} from "react-google-maps";
import config from "config";

function Map (props) {
  const { origin, destination, activeRoute, isMobile, onSetRoutes } = props;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const routes = [];
          result.routes.forEach((route, index) => {
            routes.push(
              <DirectionsRenderer
                directions={result}
                routeIndex={activeRoute >=0 ?activeRoute : index}
                options={{
                  polylineOptions: {
                    strokeColor: "#f1404b",
                    strokeOpacity: 0.5,
                    strokeWeight: 5,
                  }
                }}
              />
            )
          });
          onSetRoutes(result.routes);
          setRoutes(routes);
        } else {
          onSetRoutes([]);
        }
      }
    );
  }, [origin, destination, activeRoute]);

  const GoogleMapWrapper = withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 19.394208, lng: -99.028858 }}
      defaultZoom={10}
    >
      {routes && routes.map((Route, index) => (
        <React.Fragment key={index}>
          {Route}
        </React.Fragment>
      ))}
    </GoogleMap>
  ));

  return (
    <div>
      <GoogleMapWrapper
        containerElement={<div style={{ height: isMobile ? "55vh" : "92vh" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}

const MapLoader = withScriptjs(Map);

const MapWrapper = (props) => (
  <MapLoader
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: "100%" }} />}
    origin={props.origin}
    destination={props.destination}
    activeRoute={props.activeRoute}
    isMobile={props.isMobile}
    onSetRoutes={props.onSetRoutes}
  />
);

function mapPropsAreEqual(prevProps, nextProps) {
  return prevProps.origin.lat === nextProps.origin.lat
    && prevProps.origin.lng === nextProps.origin.lng
    && prevProps.destination.lat === nextProps.destination.lat
    && prevProps.destination.lng === nextProps.destination.lng
    && prevProps.activeRoute === nextProps.activeRoute;
}

const MemoizedMap = React.memo(MapWrapper, mapPropsAreEqual);

export default MemoizedMap;
