import React, { useState } from "react";
import { shape, func } from "prop-types";
import { Button, Form, Col } from "reactstrap";
import styled from "styled-components";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import isEmpty from "lodash/isEmpty";
import first from "lodash/first";

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const StyledAutocompleteCol = styled(Col)`
  input {
    width: 100%;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 0.8rem;
    padding: 0.8rem 1rem;
    box-shadow: 0 2px 11px 0 rgba(147, 159, 179, 0.2);
    margin-bottom: 0.5rem;
  }
  .dropdown-item {
    padding: 8px;
  }
`;

const ItemContainer = styled.div`
  font-size: 0.7rem;
`;

const initialState = {
  origin: {},
  destination: {}
};

function RouteForm(props) {
  const {
    origin, destination, onSearchAddress,
    onSubmit,
  } = props;

  const [direction, setDirection] = useState(initialState);

  const onBeforeSubmit = (e) => {
    e.preventDefault();
    onSubmit(direction);
  }

  return (
    <Form onSubmit={onBeforeSubmit}>
      <Col xs="12" className="p-0">
        <Label>¿De dondé sales?</Label>
      </Col>
      <StyledAutocompleteCol xs="12" className="p-0">
        <AsyncTypeahead
          id="origin-typeahead"
          isLoading={origin.requesting}
          labelKey="address"
          filterBy={() => true}
          minLength={2}
          onChange={(option) => setDirection({
            ...direction,
            origin: option.length ? first(option).coords : {}
          })}
          onSearch={(value) => onSearchAddress(value, "origin")}
          options={origin.suggestions}
          placeholder="Origen"
          searchText="Buscando..."
          renderMenuItemChildren={(option) => (
            <ItemContainer>
              {option.address}
            </ItemContainer>
          )}
        />
      </StyledAutocompleteCol>
      <Col xs="12" className="p-0">
        <Label>¿A donde te diriges?</Label>
      </Col>
      <StyledAutocompleteCol xs="12" className="p-0">
        <AsyncTypeahead
          id="destination-typeahead"
          isLoading={destination.requesting}
          labelKey="address"
          filterBy={() => true}
          minLength={2}
          onChange={(option) => setDirection({
            ...direction,
            destination: option.length ? first(option).coords: {},
          })}
          onSearch={(value) => onSearchAddress(value, "destination")}
          options={destination.suggestions}
          placeholder="Destino"
          searchText="Buscando..."
          renderMenuItemChildren={(option) => (
            <ItemContainer>
              {option.address}
            </ItemContainer>
          )}
        />
      </StyledAutocompleteCol>
      <Button
        color="primary"
        className="mt-2"
        type="submit"
        disabled={isEmpty(direction.origin) || isEmpty(direction.destination)}
        block
      >
        Buscar ruta
      </Button>
    </Form>
  )
}

RouteForm.defaultProps = {
  origin: {},
  destination: {},
};

RouteForm.propTypes = {
  origin: shape(),
  destination: shape(),
  onSearchAddress: func.isRequired,
  onSubmit: func.isRequired,
};

export default RouteForm;
