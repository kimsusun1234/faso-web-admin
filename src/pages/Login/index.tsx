import React, { Component, createRef } from "react";
import {
  Form,
  // Button,
  Checkbox,
  Typography,
  Alert,
  FormInstance,
  // Input
} from "antd";
import { connect } from "react-redux";
import {
  UserActions,
  ActionInterfaces,
  AuthenticationActions,
} from "redux/actions";
import { RootState } from "redux/configuration/rootReducer";
import { Dispatch } from "redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ValidationHelper } from "helpers";
import { Input, Button } from "components";
import styles from "./styles";
import { I18n, _t, translations } from "utils";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
const { Title } = Typography;

interface IProps
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps>,
    RouteComponentProps {}
interface IState {
  username: string;
  password: string;
  isRemember: boolean;
}

class Login extends Component<IProps, IState> {
  render() {
    return (
      <Form ref={this.formRef} name="normal_login" style={styles.nailForm}>
        <Title level={3}>{I18n.t(_t(translations.login.loginTitle))}</Title>
        {this.props.error?.message ? (
          <Alert
            style={styles.alert}
            message={this.props.error.message}
            type="error"
            showIcon
            closable
            onClose={() => this.props.clearError()}
          />
        ) : null}
        {this.renderInput()}
        {this.renderRemember()}
        <Form.Item>
          <Button
            type="primary"
            onClick={this.onBtnClickHandle}
            loading={this.props.isLoading}
            style={{ height: "50px", width: "100%" }}
          >
            {I18n.t(_t(translations.login.login))}
          </Button>
        </Form.Item>
      </Form>
    );
  }

  state = {
    username: "",
    password: "",
    isRemember: false,
  };

  formRef = createRef<FormInstance>();
  userRef = createRef<any>();
  passRef = createRef<any>();

  componentDidMount() {
    this.initialLoad();
  }

  componentDidUpdate() {
    this.formRef.current?.setFieldsValue({
      username: this.state.username,
      password: this.state.password,
    });
  }

  initialLoad = () => {
    const savedLoginData = localStorage.getItem("login");
    if (savedLoginData) {
      const data = JSON.parse(savedLoginData) as ActionInterfaces.ILoginRequest;
      console.log(data);
      this.setState({
        username: data.userName!,
        password: data.password,
        isRemember: data.rememberMe,
      });
    }
  };

  onBtnClickHandle = () => {
    this.props.clearError();
    if (this.validate()) {
      const data: ActionInterfaces.ILoginRequest = {
        userName: this.state.username,
        password: this.state.password,
        rememberMe: this.state.isRemember,
      };
      this.props.login(data);
    }
  };

  renderInput() {
    return (
      <>
        <Form.Item name="username">
          <Input
            ref={this.userRef}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={I18n.t(_t(translations.login.loginEmail))}
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
            onPressEnter={() => this.onEnterHandle("user")}
          />
        </Form.Item>
        <Form.Item name="password">
          <Input
            ref={this.passRef}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={I18n.t(_t(translations.login.loginPassword))}
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
            onPressEnter={() => this.onEnterHandle("password")}
          />
        </Form.Item>
      </>
    );
  }

  renderRemember() {
    return (
      <>
        <Form.Item name="nested">
          <Form.Item name="remember" noStyle>
            <Checkbox
              checked={this.state.isRemember}
              onChange={(event) =>
                this.setState({ isRemember: event.target.checked })
              }
            >
              {I18n.t(_t(translations.login.loginRememberMe))}
            </Checkbox>
          </Form.Item>

          <Link to={"forgot"} style={styles.forgotText}>
            {I18n.t(_t(translations.login.loginForgotPassword))}
          </Link>
        </Form.Item>
      </>
    );
  }

  validate = () => {
    if (!ValidationHelper.validRequire(this.state.username)) {
      this.props.dispatchError(
        new Error(I18n.t(_t(translations.login.inputUsernameMessage)))
      );
      this.userRef.current!.focus();
      return false;
    } else if (!ValidationHelper.validRequire(this.state.password)) {
      this.props.dispatchError(
        new Error(I18n.t(_t(translations.login.inputPasswordMessage)))
      );
      this.passRef.current!.focus();
      return false;
    } else {
      return true;
    }
  };
  onEnterHandle = (type: string) => {
    switch (type) {
      case "user": {
        this.passRef.current!.focus({ cursor: "all" });
        break;
      }
      case "password": {
        this.onBtnClickHandle();
        break;
      }
      default:
        break;
    }
  };
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.AppConfigReducer.showLoading,
  error: state.UserReducer.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (data: ActionInterfaces.ILoginRequest) => {
    dispatch(AuthenticationActions.authenticate.request(data));
  },
  dispatchError: (error: Error) => {
    dispatch(AuthenticationActions.authenticate.failed(error));
  },
  clearError: () => {
    dispatch(AuthenticationActions.clearError.request());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
