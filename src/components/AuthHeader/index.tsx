import './style.css'
import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { I18n, _t, translations } from 'utils';
import Logo from './logo';
const { Header } = Layout;
const { Text } = Typography;

const AuthHeader = () => (
  <Header className="nail-header">
    <Row>
      <Col className="nail-side-col" lg={1} xs={1} />
      <Col lg={22} xs={22}>
        <Row style={{ margin: "0 auto" }}>
          <Logo className="nail-header-logo" />
        </Row>
        <Row>
          <Text className="nail-header-slogan" strong>
            {I18n.t(_t(translations.login.slogan))}
          </Text>
        </Row>
      </Col>
      <Col className="nail-side-col" lg={1} xs={1} />
    </Row>
  </Header>
);

export default AuthHeader;
