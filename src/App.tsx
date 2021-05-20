import React from "react";
import "./App.less";
import { I18n, _t, translations } from "utils";
import configureStore from "redux/configuration/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { connect } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Switch, Route, BrowserRouter, Redirect, Router } from "react-router-dom";
import { AdminRouter, AuthenticationRouter } from "routers";
import { RootState } from "redux/configuration/rootReducer";
import { ServicesDetailPage } from "pages";
import UserApiService from "services/UserApiService";
import { HomeRoute } from "routers/routes";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

interface iProps extends ReturnType<typeof mapStateToProps> {}

class App extends React.Component<iProps> {
  async componentDidMount() {
    const test = await UserApiService.getUserInfo(
      "218636dc-6940-4033-8721-15d561967743"
    );
    console.log("TEST ====>", test);
  }
  render() {
    return (
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <Router history={history}>
          <HelmetProvider>
            <Helmet
              titleTemplate="%s - React Boilerplate"
              defaultTitle="React Boilerplate"
            >
              <meta
                name="description"
                content="A React Boilerplate application"
              />
            </Helmet>
          </HelmetProvider>
          <Switch>
            <Redirect exact to='/dashboard' from='/' />
            <Redirect exact to='/' from='/login' />
            {this.props.user ? (
                  <Route exact path={HomeRoute.map((element) => element.path)} component={AdminRouter} />
              ) : (
                <>
                  <Route path={['/', '/login']} component={AuthenticationRouter} />
                </>
              )}
            {/* <Route
              exact
              path="/services/addNew"
              component={ServicesDetailPage}
            /> */}

            {/* <Route path="/services/edit/:id" component={ServicesDetailPage} />
            <Route exact path="/:path?" component={AdminRouter} /> */}
          </Switch>
        </Router>
      </PersistGate>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  user: state.AuthenticationReducer.user,
});

export default connect(mapStateToProps)(App);
