import React from "react";
import Head from "next/head";
import { arrayOf, shape } from "prop-types";
import { Container } from "reactstrap";
import styled from "styled-components";
import HOC from "../../hoc/HOC";
import actions from "../../actions/test";
import selectors from "../../selectors/test";

const StyledContainer = styled(Container)`
  background-color: #eee;
  padding: 15px;
`;

function Repo(props) {
  const { query } = props.router;
  return (
    <>
      <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <StyledContainer fluid className="mt-5 mb-5">
        <h2>Repo: {query.id}</h2>
      </StyledContainer>
    </>
  )
}

Repo.defaultProps = {
  repos: [],
};

Repo.propTypes = {
  repos: arrayOf(shape()),
};

const mapStateToProps = (state) => ({
  repos: selectors(state).test.repos,
});

export default HOC(mapStateToProps)(Repo, {
  type: actions.REQUEST_REPOS,
  payload: { username: "dnm95" },
});
