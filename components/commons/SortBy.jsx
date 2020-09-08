import React from "react";
import { arrayOf, shape, func } from "prop-types";
import { FormGroup, Label, Col, Input } from "reactstrap";
import styled from "styled-components";

const StyledInput = styled(Input)`
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 0.8rem;
  padding: 0.7rem 0.9rem;
  box-shadow: 0 2px 11px 0 rgba(147, 159, 179, 0.2);
  height: auto;
`;

const StyledLabel = styled(Label)`
  text-align: right;
  font-size: 0.9rem;
`;

function SortBy(props) {
  const { options, onChange } = props;
  return (
    <FormGroup row className="mr-0 ml-0">
      <StyledLabel for="sortBy" xs={6} className="pr-0">Ordenar por</StyledLabel>
      <Col xs={6} className="pr-0">
        <StyledInput type="select" name="sortBy" id="sortBy" onChange={(e) => onChange(e.target.value)}>
          {options && options.map((opt) => (
            <option key={opt.key} value={opt.key}>{opt.value}</option>
          ))}
        </StyledInput>
      </Col>
    </FormGroup>
  )
}

SortBy.defaultProps = {
  options: [
    { key: "time", value:"Tiempo estimado" },
    { key: "distance", value:"Kilometros" },
  ],
  onChange() {},
};

SortBy.propTypes = {
  options: arrayOf(shape()),
  onChange: func,
};

export default SortBy;
