import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { AuthHeader as Header, AuthFooter as Footer } from "components";
import { ForgotPage, LoginPage } from 'pages';
const { Content } = Layout;

interface IRouteComponentProps extends RouteComponentProps {}

export default class AdminRouter extends Component<IRouteComponentProps> {
  render() {
    return (
      <Router>
        <Layout style={styles.layout}>
          <Header />
          <Content>
            <Row>
              <Col lg={9} md={6} xs={1} />
              <Col lg={6} md={12} xs={22}>   
                <Route path={`${this.props.location.pathname}/login`} component={LoginPage} />
                <Route path={`${this.props.location.pathname}/forgot`} component={ForgotPage} />
                <Redirect from="/auth" to="/auth/login" />
              </Col>
              <Col lg={9} md={6} xs={1} />
            </Row>
          </Content>
          <Footer />
        </Layout>
      </Router>
    );
  }
}

const styles = {
  layout: {
    height: "100vh"
  }
};
