import React, { CSSProperties } from "react";
import { Typography, Button, Layout, Space, Col, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { I18n, _t, translations } from "utils";

import {
  FormBasicInfo,
  FormOnlineBooking,
  FormSalesSettings,
  FormStaff,
  FormPricingAndDuration,
} from "./component";

import "./styles.css";
import styles from "./styles";

const { Title } = Typography;

interface IProps {
  history: any;
}
interface IStates {}
class ServicesDetailPage extends React.Component<IProps, IStates> {
  state = {
    show: true,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", () => this.handleScroll);
  }

  handleScroll = () => {
    console.log(document.body.getBoundingClientRect());
    this.setState({
      show: document.body.getBoundingClientRect().top === 0,
    });
  };

  render() {
    return (
      <Layout style={styles.layout}>
        {this.renderHeader()}
        {this.renderForm()}
      </Layout>
    );
  }

  renderHeader = () => {
    const titleEnd: CSSProperties = {
      textAlign: "center",
      zIndex: 9999,
    };
    const headerContainer: CSSProperties = !this.state.show
      ? {
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
          position: "fixed",
          boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.2)",
        }
      : {};
    return (
      <Col span={24} style={headerContainer}>
        <Row justify="space-between" style={styles.rowHeader}>
          <CloseOutlined
            onClick={() => this.props.history.goBack()}
            style={styles.icClose}
          />
          {/* <Title style={styleTitle}>
            {I18n.t(_t(translations.servicesDetail.titlePage))}
          </Title> */}
          <Space direction="horizontal" size="middle">
            <Button danger size="large">
              {I18n.t(_t(translations.servicesDetail.delete))}
            </Button>
            <Button type="primary" size="large">
              {I18n.t(_t(translations.servicesDetail.save))}
            </Button>
          </Space>
        </Row>
        <Title style={titleEnd}>
          {I18n.t(_t(translations.servicesDetail.titlePage))}
        </Title>
      </Col>
    );
  };

  renderForm = () => {
    const hiddenCol = !this.state.show ? { height: 170 } : {};
    return (
      <>
        <Col style={hiddenCol} />
        <Col lg={24} xl={16} style={styles.formContainer}>
          <Space direction="vertical" size="small" style={styles.maxWidth}>
            <FormBasicInfo />
            <FormOnlineBooking />
            <FormStaff />
            <FormPricingAndDuration />
            <FormSalesSettings />
          </Space>
        </Col>
      </>
    );
  };
}

export default ServicesDetailPage;
