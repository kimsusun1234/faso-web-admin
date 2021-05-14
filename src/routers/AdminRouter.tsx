import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import H from "history";
import { Layout, Menu, Affix } from "antd";
import { HomeRoute } from "./routes";
import { MenuSider, Header, NotificationDrawer, MenuTab } from "components";
const { Content, Footer } = Layout;

interface IRouteComponentProps extends RouteComponentProps {}

export default class AdminRouter extends React.Component<IRouteComponentProps> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    console.log('WAAAA',window.innerWidth)
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {window.innerWidth > 768 ?
        <MenuSider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          location={this.props.location}
        /> : null }
        <Layout>
          <Header />
          <Content style={styles.contentContainer}>
            <Switch>
              {HomeRoute.map((route) => {
                return (
                  <Route
                    exact
                    path={route.path}
                    component={route.component}
                    key={route.key}
                  />
                );
              })}
              {/* <Route exact path="/" />
              <Redirect to="/" from="/login" />
              <Redirect to="/dashboard" from="/" /> */}
            </Switch>
          </Content>
        </Layout>
        <NotificationDrawer />
        {window.innerWidth <= 768 ? <MenuTab location={this.props.location}/> : null }
      </Layout>
    );
  }
}

const styles = {
  contentContainer: {
    margin: "24px 16px",
    padding: 24,
    background: "white",
    minHeight: 280,
  },
};
