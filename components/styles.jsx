import styled from "styled-components";
import { Col } from "reactstrap";

export const Divider = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 2rem auto;
  color: #252c41;
  @media screen and (max-width: 768px) {
    margin: 1.5rem auto;
  }
`;

export const OverflowCol = styled(Col)`
  max-height: 38vh;
  overflow-y: auto;
`;

export const Logo = styled.img`
  width: 120px;
  margin-bottom: 2rem;
`;

export default Divider;
