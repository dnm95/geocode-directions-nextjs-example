import React from "react";
import { arrayOf, shape } from "prop-types";
import Head from "next/head";
import Link from "next/link";
import {
  Container, Row, Col, Card, CardBody,
  CardTitle, CardText, CardImg, Button
} from "reactstrap";
import HOC from "../hoc/HOC";
import actions from "../actions/test";
import selectors from "../selectors/test";

function Home(props) {
  const { repos } = props;

  return (
    <>
      <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Container className="mt-5 mb-5">
        <Row>
          {repos && repos.map((repo) => (
            <Col sm="4" className="mb-4" key={repo.id}>
              <Card>
                <CardBody>
                  <CardImg top src={repo.owner.avatar_url} />
                  <CardTitle className="mt-2">{repo.name}</CardTitle>
                  <CardText>{repo.language}</CardText>
                  <Link href="/repo/[pid]" as={`/repo/${repo.id}`}>
                    <a>
                      <Button>Ver repositorio</Button>
                    </a>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

Home.defaultProps = {
  repos: [],
};

Home.propTypes = {
  repos: arrayOf(shape()),
};

const mapStateToProps = (state) => ({
  repos: selectors(state).test.repos,
});

/*
const mapDispatchToProps = dispatch => ({
  onRequestRepos() {
    dispatch({
      type: actions.REQUEST_REPOS,
      payload: { username: "dnm95" },
    });
  },
});
*/

export default HOC(mapStateToProps)(Home, {
  type: actions.REQUEST_REPOS,
  payload: { username: "dnm95" },
});
