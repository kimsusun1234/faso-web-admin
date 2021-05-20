import React, { Component } from "react";
import {
  SaleChart,
  AppointmentChart,
  AppointmentActivity,
  NextAppointment,
} from "./components";
import styles from "./styles";
import { Row, Col } from "antd";

interface IProps {}
interface IState {}

class DashBoard extends Component<IProps, IState> {
  render() {
    return (
      <>
        <Row style={styles.row} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col style={styles.col} lg={12} xs={24}>
            <SaleChart />
          </Col>
          <Col style={styles.col} lg={12} xs={24}>
            <AppointmentChart />
          </Col>
          {/* <Col style={styles.col} lg={12} xs={24}>
          <SaleChart />
        </Col>
        <Col style={styles.col} lg={12} xs={24}>
          <AppointmentChart />
        </Col> */}
        </Row>
        {/* <Row style={styles.row} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col style={styles.col} lg={12} xs={24}>
            <AppointmentActivity />
          </Col>
          <Col style={styles.col} lg={12} xs={24}>
            <NextAppointment />
          </Col>
        </Row> */}
      </>
    );
  }
}

export default DashBoard;
