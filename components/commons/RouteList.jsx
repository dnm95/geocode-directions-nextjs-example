import React from "react";
import { arrayOf, shape, func, number } from "prop-types";
import styled from "styled-components";
import { Col } from "reactstrap";
import first from "lodash/first";

const StyledCol = styled(({ active, ...rest }) => <Col {...rest} />)`
  border-radius: 8px;
  padding: 12px 20px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 5px 0 rgba(147, 159, 179, 0.3);
  cursor: pointer;
  div {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${props => (props.active && `
    border: 1px solid #f1404b;
  `)}
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddressText = styled.p`
  margin-bottom: 0;
  width: 70%;
  display: inline-block;
  font-size: 0.8rem;
  color: #252c41;
`;

const InfoText = styled.p`
  font-size: 0.7rem;
  display: inline-block;
  width: 30%;
  text-align: right;
  color: #252c41;
  margin-bottom: 0;
`;

const LatLngText = styled.span`
  font-size: 0.65rem;
`;

const RouteList = ({ routes, active, onSetActiveRoute }) => (routes && routes.map((route, index) => (
  <StyledCol
    className="mb-4"
    xs="12"
    key={route.summary}
    active={active === index}
    onClick={() => onSetActiveRoute(index)}
  >
    <AddressContainer>
      <AddressText>
        {first(route.legs).start_address}
        <br />
        <LatLngText>
          @{first(route.legs).start_location.lat()}
          {first(route.legs).start_location.lng()}
        </LatLngText>
      </AddressText>
      <InfoText>{first(route.legs).duration.text}<br />de viaje</InfoText>
    </AddressContainer>
    <AddressContainer>
      <AddressText>
        {first(route.legs).end_address}
        <br />
        <LatLngText>
          @{first(route.legs).end_location.lat()}
          {first(route.legs).end_location.lng()}
        </LatLngText>
      </AddressText>
      <InfoText>{first(route.legs).distance.text}<br />de viaje</InfoText>
    </AddressContainer>
  </StyledCol>
)));

RouteList.defaultProps = {
  routes: [],
  active: 0,
};

RouteList.propTypes = {
  routes: arrayOf(shape()),
  active: number,
  onSetActiveRoute: func.isRequired,
}

export default RouteList;
