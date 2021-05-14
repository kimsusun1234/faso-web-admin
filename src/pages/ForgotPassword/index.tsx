import React, { Component, createRef } from "react";
import { Form, Typography, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ValidationHelper } from "helpers";
import styles from "./styles";
import { I18n, _t, translations } from "utils";
import { Input, Button } from "components";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthenticationApiService from "services/AuthenticationApiService";

const { Title, Text } = Typography;

interface IProps extends RouteComponentProps {
  setIsForgot: Function;
}
interface IState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error?: Error;
}

class ForgotPage extends Component<IProps, IState> {
  render() {
    return (
      <Form
        name="normal_login"
        className=""
        initialValues={{ remember: true }}
        style={styles.form}
      >
        <Title style={styles.title} level={3}>
          {I18n.t(_t(translations.forgot.forgotTitle))}
        </Title>
        <Text style={styles.text}>
          {I18n.t(_t(translations.forgot.forgotSub))}
        </Text>

        {this.renderAlert()}
        {this.renderInput()}
        {this.renderGoBack()}
      </Form>
    );
  }

  state = {
    email: "",
    isLoading: false,
    isSuccess: false,
    error: undefined,
  };
  emailRef = createRef<any>();

  onBtnClickHandler = async () => {
    this.setState({
      error: undefined,
      isLoading: true,
      isSuccess: false,
    });
    if (ValidationHelper.validateEmail(this.state.email)) {
      // setTimeout(() => {
      //   this.setState({
      //     isSuccess: true,
      //     isLoading: false,
      //   });
      // }, 1500);
      try {
        const result = await AuthenticationApiService.forgotPassword({
          email: this.state.email,
        });
        console.info(result);
        this.setState({
          isSuccess: true,
          isLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        isLoading: false,
        error: new Error(I18n.t(_t(translations.forgot.forgotEmailFormat))),
      });
      this.emailRef.current?.focus();
    }
  };

  onEnterHandler = () => {
    this.onBtnClickHandler();
  };

  renderAlert() {
    return (
      <>
        {this.state.error ? (
          <Alert
            style={styles.alert}
            message={this.state.error!["message"]}
            type="error"
            showIcon
            closable
            onClose={() => this.setState({ error: undefined })}
          />
        ) : null}

        {this.state.isSuccess ? (
          <Alert
            style={styles.alert}
            message={I18n.t(_t(translations.forgot.forgotSuccess))}
            type="success"
            showIcon
            closable
            onClose={() => this.setState({ isSuccess: false })}
          />
        ) : null}
      </>
    );
  }

  renderInput() {
    return (
      <>
        <Form.Item name="email">
          <Input
            ref={this.emailRef}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder={I18n.t(_t(translations.forgot.forgotEmail))}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={this.onBtnClickHandler}
            loading={this.state.isLoading}
          >
            {I18n.t(_t(translations.forgot.forgotButton))}
          </Button>
        </Form.Item>
      </>
    );
  }

  renderGoBack() {
    return (
      <>
        <div style={styles.goBack}>
          <Text style={styles.text}>
            {I18n.t(_t(translations.forgot.forgotGoBackText))}
          </Text>
          <Link to="login" style={styles.backLink}>
            {I18n.t(_t(translations.forgot.forgotGoBackLink))}
          </Link>
        </div>
      </>
    );
  }
}

export default ForgotPage;
